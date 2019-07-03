import React, { Component } from 'react';


const table = {

	marginBottom: '0',
	paddingBottom: '0',
	margin: 'auto'
}
const td = {
	fontSize: '30px',
	textAlign: 'left'
}
const th = {
	textAlign: 'left',
	paddingRight: '100px'
}


class TableTL1 extends Component {


  render() {
		
    return (      
		<div className="container">
			<h1>Shared Stats</h1>
			<table style={table} id="timeFrameData">
				<tbody>
					<tr>
						<th style={th}>Start Date</th>
						<td style={td}>{this.props.tableTL1.value1}</td>
					</tr>
					<tr>
						<th style={th}>End Date</th>
						<td style={td}>{this.props.tableTL1.value2}</td>
					</tr>
					<tr>
						<th style={th}>Total Number of Days</th>
						<td style={td}>{this.props.tableTL1.value3}</td>
					</tr>
					<tr>
						<th style={th}>Days of Activity</th>
						<td style={td}>{this.props.tableTL1.value4}</td>
					</tr>
				</tbody>
			</table>
			
		</div>

    )
  }
}



export default TableTL1;
