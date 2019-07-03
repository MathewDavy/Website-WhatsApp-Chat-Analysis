import React, { Component } from 'react';

const graph1 = {
    float: 'left'
}
const graph2 = {
    float: 'right'
}

class Graphs extends Component {
  render() {
    
    return(       
        <div className="container">
            <div style={graph1} id="graph1">
            <h2>Graph 1</h2>
                <canvas id="myCanvas" width="600" height="300"></canvas>
            </div>
            <div style={graph2} id="graph2">
                <h2>Graph 2</h2>
                <canvas id="myCanvas1" width="600" height="300"></canvas>
            </div>
        </div>
    )   
  }
}



export default Graphs;