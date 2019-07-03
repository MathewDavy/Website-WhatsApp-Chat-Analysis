import React, { Component } from 'react';
import BarGraphTimeline from '../../BarGraph/BarGraphTimeline';



class GraphTL extends Component {
  
  //once the html has loaded, draw the timeline graph
  componentDidMount(){

    var greatest = this.props.graphTL.mostActiveDateNumP1;
    if (this.props.graphTL.mostActiveDateNumP2 > greatest){
      greatest = this.props.graphTL.mostActiveDateNumP2;
    }
    var convoLength = Number(this.props.graphTL.convoLength);

    var barGraph = new BarGraphTimeline("dateCanvas", "Timeline", "Number of Texts", greatest, this.props.graphTL.p1DatesObj, 
      this.props.graphTL.p2DatesObj, convoLength, this.props.graphTL.p1Name, this.props.graphTL.p2Name);
    barGraph.ignoreWarning();
  }
  render() {
    
    return(     
      <div className="container">
          <div >
              <h1>Timeline Graph</h1>
              <canvas id="dateCanvas" width="1200" height="300">
              </canvas>
          </div>
      </div>
    )   
  }
}



export default GraphTL;