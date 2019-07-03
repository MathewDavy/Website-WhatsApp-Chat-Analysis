//Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
//Global components
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
//Home components
import Showcase from './components/home/Showcase';
import Upload from './components/home/Upload';
import Table from './components/home/Table';
import Graphs from './components/home/Graphs';
//Timeline components
import TableTL1 from './components/timeline/TableTL1';
import TableTL2 from './components/timeline/TableTL2';
import GraphTL from './components/timeline/GraphTL';

//Our whole app
class App extends Component {
  //Create a child reference so we can use the Tables' component's methods and state (set in render method)
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  //State for the whole app
  state = { 
    //Home page table, array of objects (rows in table)
    tableData: [],       
    fileLoaded: false,
    fileName: "No file chosen",
    fileName1: "",
    //2 rows in home page table for entering a word
    tableTextbox: [

      {
        wordDis: "",
        val1Dis: "",
        val2Dis: ""
       
      },
      {
        wordDis: "",
        val1Dis: "",
        val2Dis: "",
        //need title here as must be dynamic
        title: "Percentage of Texts Where ' ' is Sent"
      }
    ],
    //1st table on timeline page, shared stats
    tableTL1: {},
    //individual stats
    tableTL2: [],
    graphTL: {}    
  }

  uploadFile = (e) =>{
    this.clearPage();
    //get the file path
    var a = document.getElementById('myFile');
    //get the file name
    var fileName = a.value.split('\\');
    fileName = fileName[fileName.length - 1];
  
    //for setting state of App.js not the onload function below
    var orgThis = this;
    //read the file
    var reader = new FileReader();   
    var file = e.target.files[0];  
    reader.readAsText(file);
    //once it's finished loading file
    reader.onload = function(e) {
      //file selected so start loader
      document.getElementById('loader').style.display = 'inline-block';
      //Get every line into an array
      var lines = this.result.split('\n');
      //send every line and the filename to backend
      axios.post('/api/home', {
        lines: lines,
        fileName: fileName
      })//then set the state to the backend's response
      .then(res => {
        orgThis.setState(res.data);
        document.getElementById('loader').style.display = 'none';      
      })         
    }   
    
   
  }

  clearPage(){
    //clear page components. if first time uploading, id's of elements won't be there so no need to clear
    var canvas = document.getElementById('myCanvas');
    if (canvas !== null){ 
      //clear graphs
      this.clearGraph('myCanvas');
      this.clearGraph('myCanvas1'); 

      //check which buttons are green and make them grey
      var currentId = this.child.current.state.currentId;
      var baseId = this.child.current.state.baseId;
      if (currentId !== ""){
        this.child.current.colorInButton(false, currentId);
      }
      if (baseId !== ""){
        this.child.current.colorInButton(false, baseId);
      }
      //reset child state
      this.child.current.setState({
        currentText: "",
        baseText: "",
        currentId: "",
        baseId: ""
      })

      //clear textbox
      document.getElementById('textbox').value = "";
      //clear table data of occurrence of word 
      var s1 = {...this.state};
      s1.tableTextbox = [ 
          
        {
          wordDis: "",
          val1Dis: "",
          val2Dis: ""
        },

        {
          wordDis: "",
          val1Dis: "",
          val2Dis: "",
          title: "Percentage of Texts Where ' ' is Sent"
        }
      ]; 
     
      this.setState(s1);
    }
  }

  uploadSampleFile = (e) => {
    
    this.clearPage();
    //for setting state of App.js not the onload function below
    var orgThis = this;
    //read the file
    
      //file selected so start loader
      document.getElementById('loader').style.display = 'inline-block';
      //Get every line into an array
    
      //send every line and the filename to backend
      axios.get('/api/home')
      .then(res => {
        orgThis.setState(res.data);
        document.getElementById('loader').style.display = 'none';     
      })
            
    
    
    
  }

  clearGraph = (id) => {
    var canvas = document.getElementById(id);     
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  //if either of the button ids are selected, reset the table state.
  checkTextboxBtns = (id, s1) =>{

    var currentId = this.child.current.state.currentId;
    var baseId = this.child.current.state.baseId;
   
    //if both graph1 and graph2 buttons are selected selected 
    if ((baseId === id || baseId === id + 't') && 
        (currentId === id || currentId === id + 't')) {
      //reset table state
      s1.baseId = "";
      s1.baseText= "";
      s1.currentText = "";
      s1.currentId = "";
      this.child.current.colorInButton(false, baseId);
      this.child.current.colorInButton(false, currentId);
     
      this.clearGraph('myCanvas1');   
      this.clearGraph('myCanvas');     
    }
    //else if current button === a textbox button
    else if (currentId === id || currentId === id + 't'){
      
      //set current to old base
      s1.currentId = s1.baseId;
      s1.currentText = s1.baseText;
      //clear base
      s1.baseId = "";
      s1.baseText = "";
      this.child.current.colorInButton(false, currentId);

      if (currentId === id){
        this.clearGraph('myCanvas');      
      }
      else{
        this.clearGraph('myCanvas1');    
      }     
    }
    // else if base selected button is a textbox button
    else if (baseId === id || baseId === id + 't'){
      
      s1.baseId = "";
      s1.baseText= "";
      this.child.current.colorInButton(false, baseId);

      if (baseId === id + 't'){
        this.clearGraph('myCanvas1');
      }
      else{
        this.clearGraph('myCanvas');
      }
    }
    this.child.current.setState(s1);
  }

  //Fired when user clicks 'submit' in the textbox row
  submitOccurrence = () => {
    //table state
    var s1 = {...this.child.current.state};
    //number row buttons
    var numberId = this.state.tableTextbox[0].id;
    //percentage row buttons
    var percId = this.state.tableTextbox[1].id;
    var baseId = s1.baseId;
    var currentId = s1.currentId;

    //if both a number button and a percentage button is selected
    if((numberId === baseId || numberId === currentId || numberId + 't' === baseId || numberId + 't' === currentId) 
      && (percId === baseId || percId === currentId || percId + 't' === baseId || percId + 't' === currentId)){
      s1.baseId = "";
      s1.baseText= "";
      s1.currentText = "";
      s1.currentId = "";
      this.child.current.setState(s1);
      this.clearGraph('myCanvas');
      this.clearGraph('myCanvas1');
      this.child.current.colorInButton(false, baseId);
      this.child.current.colorInButton(false, currentId);
    }
    else{   
      this.checkTextboxBtns(this.state.tableTextbox[0].id, s1);
      this.checkTextboxBtns(this.state.tableTextbox[1].id, s1);
    }
   
    //POST
    var word = document.getElementById('textbox').value;
    axios.post('/api/occurrence', {
      word: word
      
    })
    .then(res => this.setState({ tableTextbox: res.data }));       
  
  }


  render() {
   
    //IF first time entering page when we havent loaded a file i.e. on refresh
    if (this.state.tableData.length === 0){   
      return (
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>       
                <Showcase />  
                <Upload fileName={this.state.fileName}
                fileName1={this.state.fileName1}
                uploadFile={this.uploadFile}
                uploadSampleFile={this.uploadSampleFile}/>   
              </React.Fragment>
            )}/>                                           
            
            <Route path="/timeline" />
            <Footer />
          </div>
        </Router>
      );    
    }
    //we have loaded a file
    else{
      return (
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Showcase />
                <Upload fileName={this.state.fileName}
                fileName1={this.state.fileName1}
                uploadFile={this.uploadFile} 
                uploadSampleFile={this.uploadSampleFile}/>              
                <Table ref={this.child}
                tableData={this.state.tableData}
                tableTextbox={this.state.tableTextbox}          
                submitOccurrence={this.submitOccurrence} />
                <Graphs />  
              </React.Fragment>      
            )}/>

            <Route path="/timeline" render={props => (
              <React.Fragment>             
                <TableTL1 tableTL1={this.state.tableTL1}/>
                <TableTL2 tableTL2={this.state.tableTL2}/>
                <GraphTL graphTL={this.state.graphTL}/>
              </React.Fragment>
            )}/>
            <Footer />          
          </div>
        </Router>
      ) 
    }
  }
}

export default App;
