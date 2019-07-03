import React, { Component } from 'react';


class TableTL2 extends Component {


  render() {
	
    return (
        
		  <div className="container">
        <h1>Individual Stats</h1>
        <table className="table" border={1}>
        <thead>
          <tr>{/*Names*/}
            <th></th>
              <th className="name1">{this.props.tableTL2[0].name1}</th>
              <th className="name2">{this.props.tableTL2[0].name2}</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <th>Most Active Date</th>
                <td className="col1">{this.props.tableTL2[1].v1Date}, {this.props.tableTL2[1].v1Num} texts</td>
                <td className="col2">{this.props.tableTL2[1].v2Date}, {this.props.tableTL2[1].v2Num} texts</td>
            </tr>
            <tr>
                <th>Average Number Of Texts Per Day</th>
                <td>{this.props.tableTL2[2].v1}</td>
                <td>{this.props.tableTL2[2].v2}</td>
            </tr>
            <tr>
                <th>Days More Active Than Other Person</th>
                <td className="col1">{this.props.tableTL2[3].v1}</td>
                <td className="col2">{this.props.tableTL2[3].v2}</td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}



export default TableTL2;