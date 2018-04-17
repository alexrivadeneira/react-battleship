import React, { Component } from 'react';
import PlayerShipsMapSpace from './PlayerShipsMapSpace';

class PlayerShipsMap extends Component {
  render() {
  	const boardStyle = {
  		width: "270px",
  		display: "block",
  		margin: "0 auto",
  	};

  	let spaces = [];
  	let index = 0;

  	for(var row = 0; row < this.props.playerShips.length; row++){
  		for(var col = 0; col < this.props.playerShips[row].length; col++){
  			spaces.push(
  				<PlayerShipsMapSpace fill={this.props.playerShips[row][col]}
  				row={row}
  				col={col}
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

export default PlayerShipsMap;
