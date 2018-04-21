import React, { Component } from 'react';
import PlayerRadarSpace from './PlayerRadarSpace';

class PlayerRadar extends Component {
  render() {
    const boardStyle = {
      width: "270px",
      display: "grid",
      gridTemplateColumns: "27px 27px 27px 27px 27px 27px 27px 27px 27px 27px",
    };

    const mapStyle = {
      display: "inline-block",
      padding: "15px",
      border: "2px solid black",
    }    

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
          updateStatusMessage={this.props.updateStatusMessage}
          playersTurn={this.props.playersTurn}
          gameInProgress={this.props.gameInProgress}

          playerHits={this.props.playerHits}
  				/>
  			);
  			index++;
  		}
  	}


    return (
      <div style={mapStyle}>
        <h3>Enemy Radar</h3>
      	<div style={boardStyle}>
      		{spaces}
      	</div>
      </div>
    );
  }
}

export default PlayerRadar;
