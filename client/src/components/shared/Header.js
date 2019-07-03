import React from 'react';
import { Link } from 'react-router-dom';

const header = {
    backgroundColor: '#416456',
	color: '#ffffff',
    borderBottom: '#d3ff95 4px solid',   
    height: '100px',
    position: 'relative'
}

const span = {   
    color: '#d3ff95',
    fontSize: '45px'
}

const titleDiv = {
    marginLeft: '10%',
}
const nav = {
    float: 'right',
    marginRight: '15%'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
    margin: '0 10px'

}

function Header() {
  return (   
    <header style={header}>      
        <div style={titleDiv} className="verticalCenter">
            <h1>
                <span style={span}>WhatsApp </span>
                Chat Analysis
            </h1>
        </div>
        <div style={nav}>
            <div  className="verticalCenter">
                <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/timeline">Timeline</Link>
            </div>
        </div>
    </header>  
  )
}





export default Header;