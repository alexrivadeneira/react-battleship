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

  	for(var row = 0; row < this.props.compBoard.length; row++){
  		for(var col = 0; col < this.props.compBoard[row].length; col++){
  			spaces.push(
  				<Space fill={this.props.compBoard[row][col]}
  				row={row}
  				col={col}
  				fireMissle={this.props.fireMissle}
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
