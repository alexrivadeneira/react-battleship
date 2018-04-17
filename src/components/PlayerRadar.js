import React, { Component } from 'react';
import Space from './Space';

class PlayerRadar extends Component {
  render() {
  	const boardStyle = {
  		width: "270px",
  		display: "inline-block",
  	};

  	let spaces = [];
  	let index = 0;

  	for(var row = 0; row < this.props.compShips.length; row++){
  		for(var col = 0; col < this.props.compShips[row].length; col++){
  			spaces.push(
  				<Space fill={this.props.compShips[row][col]}
  				row={row}
  				col={col}
  				key={index}
  				fireMissle={this.props.fireMissle}
  				/>
  			);
  			index++;
  		}
  	}


    return (
    	<div style={boardStyle}>
    	    <h3>Radar</h3>
    		{spaces}
    	</div>
    );
  }
}

export default PlayerRadar;
