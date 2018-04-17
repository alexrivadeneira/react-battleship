import React, { Component } from 'react';
import Space from './Space';

class Board extends Component {
  render() {
  	const boardStyle = {
  		width: "600px",
  		border: "3px solid blue",
  		display: "block",
  		margin: "0 auto",
  	};

  	let spaces = [];

  	for(var i = 0; i < 100; i++){
  		spaces.push(<Space key={i} />);
  	}

    return (
    	<div style={boardStyle}>
    		{spaces}
    	</div>
    );
  }
}

export default Board;
