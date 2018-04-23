import React, { Component } from 'react';
import PlayerShipsMapSpace from './PlayerShipsMapSpace';

class PlayerShipsMap extends Component {
  render() {
    const boardStyle = {
      width: "270px",
      display: "grid",
      transform: "rotateX(50deg)",
      boxShadow: "5px 10px 20px #000",
      gridTemplateColumns: "27px 27px 27px 27px 27px 27px 27px 27px 27px 27px",   
    };

    const mapStyle = {
      display: "inline-block",
      padding: "15px",
      perspective: "1000px",


    }    


  	let spaces = [];
  	let index = 0;

  	for(var row = 0; row < this.props.playerShips.length; row++){
  		for(var col = 0; col < this.props.playerShips[row].length; col++){
  			spaces.push(
  				<PlayerShipsMapSpace 
          fill={this.props.playerShips[row][col]}
  				row={row}
  				col={col}
  				key={index}
  				/>
  			);
  			index++;
  		}
  	}


    return (
      <div style={mapStyle}>
        <h3>My Ships</h3>
      	<div style={boardStyle}>
      		{spaces}
      	</div>
      </div>
    );
  }
}

export default PlayerShipsMap;
