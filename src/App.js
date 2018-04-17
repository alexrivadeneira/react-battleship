import React, { Component } from 'react';
import Game from './components/Game';

class App extends Component {

	handleClick(){
		console.log(this.state.compShips);
	}

	fireMissle(row, col){
		// add source and target args later
		// check target's shipMap for row and col
		console.log(this.state.playerBoard);
		// if(this.state.compShips[row][col] === 1){
		// 	const updateCompShips = this.state.compShips.splice("");
		// 	updateCompShips[row][col] = 2;
		// 	this.setState({compShips: updateCompShips});

		// 	const updatePlayerBoard = this.state.playerBoard.splice("");
		// 	updatePlayerBoard[row][col] = 2;
		// 	this.setState({playerBoard: updatePlayerBoard});
		// }
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
	      	compBoard={this.state.compBoard}
	      	fireMissle={this.fireMissle}
	      />
	      <button
	      	onClick={() => this.handleClick()}
	      >Click me
	      </button>
      </div>
    );
  }
}

export default App;
