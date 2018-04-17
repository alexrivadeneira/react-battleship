import React, { Component } from 'react';
import Space from './Space';

class Board extends Component {
  render() {
  	const boardStyle = {
  		width: "520px",
  		border: "3px solid blue",
  		display: "block",
  		margin: "0 auto",
  	};

  	let spaces = [];

  	for(var i = 0; i < this.props.playerBoard.length; i++){
  		for(var j = 0; j < this.props.playerBoard[i].length; j++){
  			spaces.push(
  				<Space fill={this.props.playerBoard[i][j]}
  				i={i}
  				j={j}
  				/>
  			);
  		}
  	}


    return (
    	<div style={boardStyle}>
    		{spaces}
    	</div>
    );
  }
}

export default Board;
