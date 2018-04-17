import React, { Component } from 'react';
import PlayerRadarSpace from './PlayerRadarSpace';

class PlayerRadar extends Component {
  render() {
  	const boardStyle = {
  		width: "270px",
  		display: "inline-block",
  	};

  	let spaces = [];
  	let index = 0;

  	for(var row = 0; row < this.props.playerHits.length; row++){
  		for(var col = 0; col < this.props.playerHits[row].length; col++){
  			spaces.push(
  				<PlayerRadarSpace fill={this.props.playerHits[row][col]}
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