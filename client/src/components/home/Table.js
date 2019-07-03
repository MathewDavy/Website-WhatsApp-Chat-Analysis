import React, { Component } from 'react';
import BarGraph2Bars from '../../BarGraph/BarGraph2Bars';

const leftButton = {
  marginRight: '7px'
}

const button = {
  marginLeft: '10px'
}

class Table extends Component {

  //state of the buttons
  state = {  
      currentText: "",
      baseText: "",
      currentId: "",
      baseId: ""   
  }

  drawGraph = (e, row) => {
  
    //don't draw occurrence graphs unless submit has been clicked
    if (row.id != null){ 
      this.setBtn(e);
      //'t' is on the end of the graph2 button
      var id = e.target.id.slice(-1);
      
      var idCanvas = "myCanvas";
      if (id === 't'){
        idCanvas = "myCanvas1";
      }

      var title = row.title;
      var yAxisTitle = row.yAxisTitle;
      var p1Num = Number(row.val1.replace(/,/g, ''));
      var p2Num = Number(row.val2.replace(/,/g, ''));

      var greatest = p1Num;
      if (p2Num > p1Num){
        greatest = p2Num;
      }
      var p1Name = this.props.tableData[0].p1Name;
      var p2Name = this.props.tableData[0].p2Name;
      var barTest = new BarGraph2Bars(idCanvas, title, yAxisTitle, 
      greatest, p1Num, p2Num, p1Name, p2Name);  
      barTest.ignoreWarning();
    } 
  }

  setBtn = (e) => {
    var id = e.target.id;
    var currentText = this.state.currentText;
    var baseText = this.state.baseText;
    var currentId = this.state.currentId;
    var baseId = this.state.baseId;
       
    //what button we just clicked
    var clickedText = document.getElementById(id).innerText;
    //make what we just clicked green
    this.colorInButton(true, id);

    //if current or base are not set
    if(currentId === "" || (clickedText !== currentText && baseId === "")){
      baseId = currentId;
      baseText = currentText;
      currentId = id;
      currentText = clickedText;

      this.setState( 
        {
          currentText,
          baseText,
          currentId,
          baseId
        }
      )
     
    }
    //else they are set
    else{   
      //if we click an already green button, do nothing
      if (id !== currentId && id !== baseId){
        //if what we just clicked was the same graph as immediately previously clicked,
        //set previous to grey
        if (clickedText === currentText){
            this.colorInButton(false, currentId);
        }
        //if what we clicked was the same graph as base set base to grey
        if (clickedText === baseText){
            this.colorInButton(false, baseId);
            baseId = currentId;
            baseText = currentText;
        }
        
        //set previously clicked for next time
        currentId = id;
        currentText = clickedText;

        this.setState( 
          {
            currentText,
            baseText,
            currentId,
            baseId
          }
        )
      }
    }   
  }

  colorInButton(green, id){

    var color = "#e5e5e5";
    if (green){
        color = "#a7db4b";
    }
    document.getElementById(id).style.backgroundColor = color;
  }

  render() {
    
    return (
      <section id="table">
        <div className="container">
          <h2>Stats</h2>
          <table className="table" border={1}>
            <thead>
              <tr>{/*Names*/}
                <th></th>
                  <th className="name1">{this.props.tableData[0].p1Name}</th>
                  <th className="name2">{this.props.tableData[0].p2Name}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>{/*Number of Texts*/}                
                <th>{this.props.tableData[1].title}</th>
                <td className="col1">{this.props.tableData[1].val1}</td>                
                <td className="col2">{this.props.tableData[1].val2}</td> 
                <td >
                  <button id={this.props.tableData[1].id} style={leftButton} onClick={(e) => this.drawGraph(e, this.props.tableData[1])}>Graph 1</button>
                  <button id={this.props.tableData[1].id + "t"} onClick={(e) => this.drawGraph(e, this.props.tableData[1])}>Graph 2</button>
                </td>                               
              </tr>
              <tr>{/*Number of Words */}              
                <th>{this.props.tableData[2].title}</th>
                <td>{this.props.tableData[2].val1}</td>                
                <td>{this.props.tableData[2].val2}</td> 
                <td>
                  <button id={this.props.tableData[2].id} style={leftButton} onClick={(e) => this.drawGraph(e, this.props.tableData[2])}>Graph 1</button>
                  <button id={this.props.tableData[2].id + "t"} onClick={(e) => this.drawGraph(e, this.props.tableData[2])}>Graph 2</button>
                </td>                               
              </tr>
              <tr>{/*Average Number of Words */}             
                <th>{this.props.tableData[3].title}</th>
                <td className="col1">{this.props.tableData[3].val1}</td>                
                <td className="col2">{this.props.tableData[3].val2}</td> 
                <td>
                  <button id={this.props.tableData[3].id} style={leftButton} onClick={(e) => this.drawGraph(e, this.props.tableData[3])}>Graph 1</button>
                  <button id={this.props.tableData[3].id + "t"} onClick={(e) => this.drawGraph(e, this.props.tableData[3])}>Graph 2</button>
                </td>                               
              </tr>
              <tr>{/*Number of times particular word is said*/}
                <th>             
                    Number of Times '<input type="text" id="textbox"/>' is Said
                    <button style={button} onClick={this.props.submitOccurrence}>Submit</button>                 
                </th>
                <td>{this.props.tableTextbox[0].wordDis} {this.props.tableTextbox[0].val1Dis}</td>
                <td>{this.props.tableTextbox[0].wordDis} {this.props.tableTextbox[0].val2Dis}</td>
                <td >
                  <button id={this.props.tableTextbox[0].id} style={leftButton} onClick={(e) => this.drawGraph(e, this.props.tableTextbox[0])}>Graph 1</button>
                  <button id={this.props.tableTextbox[0].id + "t"} onClick={(e) => this.drawGraph(e, this.props.tableTextbox[0])}>Graph 2</button>
                </td>
              </tr> 

              <tr>{/*Percentage of times particular word is said*/}
                <th>{this.props.tableTextbox[1].title}</th>
                <td className="col1">{this.props.tableTextbox[1].wordDis} {this.props.tableTextbox[1].val1Dis}</td>
                <td className="col2">{this.props.tableTextbox[1].wordDis} {this.props.tableTextbox[1].val2Dis}</td>
                <td >
                  <button id={this.props.tableTextbox[1].id} style={leftButton} onClick={(e) => this.drawGraph(e, this.props.tableTextbox[1])}>Graph 1</button>
                  <button id={this.props.tableTextbox[1].id + "t"} onClick={(e) => this.drawGraph(e, this.props.tableTextbox[1])}>Graph 2</button>
                </td>
              </tr>             
              <tr>{/*Most Sent Word*/}                 
                <th>{this.props.tableData[4].title}</th>
                <td>'{this.props.tableData[4].word1}' {this.props.tableData[4].num1} times</td>                
                <td>'{this.props.tableData[4].word2}' {this.props.tableData[4].num2} times</td>         
                <td></td>                               
              </tr>
              <tr>{/*Second Most Sent Word*/}                
                <th>{this.props.tableData[5].title}</th>
                <td className="col1">'{this.props.tableData[5].word1}' {this.props.tableData[5].num1} times</td>                
                <td className="col2">'{this.props.tableData[5].word2}' {this.props.tableData[5].num2} times</td>         
                <td></td>                               
              </tr>
              <tr>{/*Third Most Sent Word*/}                
                <th>{this.props.tableData[6].title}</th>
                <td>'{this.props.tableData[6].word1}' {this.props.tableData[6].num1} times</td>                
                <td>'{this.props.tableData[6].word2}' {this.props.tableData[6].num2} times</td>         
                <td></td>                               
              </tr>               
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}



export default Table;

