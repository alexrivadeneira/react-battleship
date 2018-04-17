import React, { Component } from 'react';
import Game from './components/Game';

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
		playerBoard: 
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
		compBoard: 
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
	      <Game 
	      	playerBoard={this.state.playerBoard}
	      	fireMissle={this.fireMissle}
	      />
      </div>
    );
  }
}

export default App;
