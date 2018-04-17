import React, { Component } from 'react';
import Game from '././components/Game';

class App extends Component {

	checkWin = () => {
		if(this.state.playerShipUnits === 0 || this.state.compShipUnits === 0){
			this.setState({gameInProgress: false});
		}
	}

	fireMissle = (row, col) => {
		console.log(row, col);
		// add source and target args later
		// check target's shipMap for row and col
		if(this.state.compShips[row][col] === 1){
		// got a hit
			console.log("hit!");
			let updateCompShips = this.state.compShips.slice("");
			updateCompShips[row][col] = 8;
			this.setState({compShips: updateCompShips});

			let updatePlayerHits = this.state.playerHits.slice("");
			updatePlayerHits[row][col] = 2;
			this.setState({playerHits: updatePlayerHits});

			this.setState({compShipUnits: this.state.compShipUnits - 1});

		} else if (this.state.compShips[row][col] === 0){
			console.log("miss!");
			let updatePlayerHits = this.state.playerHits.slice("");
			updatePlayerHits[row][col] = 1;
			this.setState({playerHits: updatePlayerHits});

		} else if (this.state.compShips[row][col] === 8){
			console.log("miss");
		}

		this.checkWin();
	}

	state = {
		gameInProgress: true,
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
			[0,0,0,0,1,1,1,0,0,0],
			[1,0,1,1,0,0,0,0,0,0],
			[1,0,0,0,0,1,0,0,0,0],
			[1,0,0,0,0,1,0,0,0,0],
			[1,0,0,0,0,1,0,0,0,0],
			[1,0,0,0,0,1,0,0,0,0],
			[0,1,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
		],			
	}

  render() {
    return (
    	<Game
    		playerShips={this.state.playerShips}
    		fireMissle={this.fireMissle}
    		compShips={this.state.compShips}
    		playerHits={this.state.playerHits}
    	/>
    );
  }
}

export default App;
