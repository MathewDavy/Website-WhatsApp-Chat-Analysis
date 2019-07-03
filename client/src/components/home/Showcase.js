import React from 'react'

const showcase = {
	height: '300px',
	color: '#ffffff',
    borderBottom: '#d3ff95 4px solid',
    position: 'relative'
}


function Home() {
  return ( 
        <section style={showcase} className="getImg">
            <div className="vertHorCent">
                <h1>Extract and Visualise Meaningful Data From Your WhatsApp Conversations</h1>
            </div>
        </section>   
  )
}




export default Home;