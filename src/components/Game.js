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
          playersTurn={this.props.playersTurn}
          playerRemainingShips={this.props.playerRemainingShips}
          compRemainingShips={this.props.compRemainingShips}

        />

      	<div className="boards" style={boardsStyle}>
  	      <PlayerShipsMap 
  	      	playerShips={this.props.playerShips}
  	      />  
  	      <PlayerRadar
            playerShips={this.props.playerShip}
  	      	playerHits={this.props.playerHits}
  	      	fireMissle={this.props.fireMissle}

            playersTurn={this.props.playersTurn}
            gameInProgress={this.props.gameInProgress}

            updateStatusMessage={this.props.updateStatusMessage}
  	      />  
  	    </div>	
      </div>
    );
  }
}

export default Game;
