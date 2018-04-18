import React, { Component } from 'react';
import PlayerShipsMap from './PlayerShipsMap';
import PlayerRadar from './PlayerRadar';
import StatusDisplay from './StatusDisplay';


class Game extends Component {
  render() {
  	const boardsStyle = {
  		margin: "0 auto",
  		width: "70%",
  		marginTop: "30px",
  	};
    return (
      <div className="game">

        <StatusDisplay
          statusMessage={this.props.statusMessage} 
        />

      	<div className="boards" style={boardsStyle}>
  	      <PlayerShipsMap 
  	      	playerShips={this.props.playerShips}
  	      />  
  	      <PlayerRadar
  	      	compShips={this.props.compShips}
  	      	playerHits={this.props.playerHits}
  	      	fireMissle={this.props.fireMissle}

            updateStatusMessage={this.props.updateStatusMessage}
  	      />  
  	    </div>	
      </div>
    );
  }
}

export default Game;
