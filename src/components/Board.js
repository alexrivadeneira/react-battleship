import React, { Component } from 'react';
import Space from './Space';

class Board extends Component {
  render() {
  	const boardStyle = {
  		width: "520px",
  		display: "block",
  		margin: "0 auto",
  	};

  	let spaces = [];
  	let index = 0;

  	for(var row = 0; row < this.props.playerBoard.length; row++){
  		for(var col = 0; col < this.props.playerBoard[row].length; col++){
  			spaces.push(
  				<Space fill={this.props.playerBoard[row][col]}
  				row={row}
  				col={col}
  				fireMissle={this.props.fireMissle}
  				key={index}
  				/>
  			);
  			index++;
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
