import React, { Component } from 'react';
import PlayerShipsMap from './components/PlayerShipsMap';

class App extends Component {

	fireMissle = (row, col) => {
		console.log(row, col);
		// add source and target args later
		// check target's shipMap for row and col
		if(this.state.compShips[row][col] === 1){
		// got a hit
			console.log("hit!");
			let updateCompShips = this.state.compShips.slice("");
			updateCompShips[row][col] = 2;
			this.setState({compShips: updateCompShips});

			let updatePlayerBoard = this.state.playerBoard.slice("");
			updatePlayerBoard[row][col] = 2;
			this.setState({playerBoard: updatePlayerBoard});
		} else if (this.state.compShips[row][col] === 0){
			console.log("miss!");
			let updatePlayerBoard = this.state.playerBoard.slice("");
			updatePlayerBoard[row][col] = 1;
			this.setState({playerBoard: updatePlayerBoard});

		}
	}

	state = {
		playerHits: 
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
		],
		playerShipUnits: 18,
		playerShips: 
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,1,0,0,1,1,1,0,0],
			[0,0,1,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,1],
			[0,0,1,0,0,0,0,0,0,1],
			[0,0,1,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,1],
			[0,1,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1,0,0],
		],			
		compHits: 
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
		],		
		compShipUnits: 18,
		compShips: 
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,1,0,0,1,1,1,0,0],
			[0,0,1,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,1],
			[0,0,1,0,0,0,0,0,0,1],
			[0,0,1,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,1],
			[0,1,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1,0,0],
		],			
	}

  render() {
    return (
    	<div>
	      <PlayerShipsMap 
	      	playerShips={this.state.playerShips}
	      	fireMissle={this.fireMissle}
	      />
      </div>
    );
  }
}

export default App;
