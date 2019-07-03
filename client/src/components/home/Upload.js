import React, { Component } from 'react';


const h2 = {
  display: 'inline',
  marginRight: '20px'
}
const form = {
  display: 'inline'
}
const p = {
  lineHeight: '45px',
  margin: 'auto',
  marginBottom: '30px'
}
const loader = { 
  border: '12px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '12px solid #3498db',
  width: '90px',
  height: '90px',
  animation: 'spin 2s linear infinite',
  margin: '0 45%',
  display: 'none' 
}



class Upload extends Component {


  render() {
    return (    
      <div className="container">
        <h2>Get Started</h2>
        <p style={p}>Step 1: Export your WhatsApp chat from within WhatsApp.<br/>
            Step 2: Download the exported chat as a CSV file.<br/>
            Step 3: Click the button below to upload and analyse your WhatsApp chat!</p>
    
        <div >
          <h2 style={h2}>Upload CSV File:</h2>
          <form style={form} action="/api/persons" method="post" encType="multipart/form-data" id="fileForm">
            <input type="file" onChange={this.props.uploadFile} id="myFile" /> 
            <label>{this.props.fileName}</label>                     
          </form>
          <div>
            <h2 style={h2}>Sample CSV File:</h2>
            <button onClick={this.props.uploadSampleFile}>Sample File</button>
            <label>{this.props.fileName1}</label> 
          </div> 
        </div>
        <div style={loader} id="loader"></div>
      </div>    
    )
  }
}


export default Upload;