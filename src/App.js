import React, { Component } from 'react';
import Game from '././components/Game';

class App extends Component {

	checkWin = () => {
		if(this.state.playerShipUnits === 0 || this.state.compShipUnits === 0){
			this.setState({gameInProgress: false});
		} 
	}

	changePlayers = () => {
		console.log("changing players");
	// change the player and check if the computer is playing
		this.setState({playersTurn: !this.state.playersTurn});
		this.setState(this.checkCompPlayingAndTriggerCompMove());
	}

	checkCompPlayingAndTriggerCompMove(){
		console.log("checking if comp should move");
		console.log("PLAYERS TURN?", this.state.playersTurn);
		if(this.state.playersTurn === false){
			console.log("TRIGGERING COMP MOVe");
			this.compMakeRandomMove();
		}
	}

	updateStatusMessage = (newMessage) => {
		this.setState({statusMessage: newMessage});
	}

	fireMissle = (missleSource, missleTarget, row, col) => {
		// missleSource, missleTarget also passed to processMove -- refactor?
		console.log(row, col);

		setTimeout(function(){
			this.processMove(missleSource, missleTarget, row,col);
		}.bind(this), 1000);
		// add source and target args later
		// check target's shipMap for row and col
		this.checkWin();
	}

	compMakeRandomMove = () => {
		console.log("comp making move");
		const row = Math.round(Math.random() * 10);
		const col = Math.round(Math.random() * 10);
		this.fireMissle(this.compHits, this.playerShips, row, col);
	}


	processMove(missleSource, missleTarget, row,col){
	// look at target ships map
	// update source hits map

		if(missleTarget[row][col] === 1){
		// got a hit
			console.log("hit!");
			let updateMissleTarget = missleTarget.slice("");
			updateMissleTarget[row][col] = 8;
			this.setState({missleTarget: updateMissleTarget});

			let updateMissleSource = missleSource.slice("");
			updateMissleSource[row][col] = 2;
			this.setState({missleSource: updateMissleSource}, this.changePlayers());

			// this.setState({compShipUnits: this.state.compShipUnits - 1}, this.changePlayers());

		// miss
		} else if (missleTarget[row][col] === 0){
			console.log("miss!");
			let updateMissleSource = missleSource.slice("");
			updateMissleSource[row][col] = 1;
			this.setState({missleSource: updateMissleSource}, this.changePlayers());

		// already went here - miss!
		} else if (missleTarget[row][col] === 8){
			console.log("miss");
			this.setState(this.changePlayers());
		}	

	}


	state = {
		statusMessage: "Player's Turn",
		playersTurn: true,
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
    	<div>
	    	<Game
	    		playerShips={this.state.playerShips}
	    		fireMissle={this.fireMissle}
	    		compShips={this.state.compShips}
	    		playerHits={this.state.playerHits}

	    		updateStatusMessage={this.updateStatusMessage}
	    		statusMessage={this.state.statusMessage}
	    		playersTurn={this.state.playersTurn}
	    		gameInProgress={this.state.gameInProgress}
	    	/>
    	</div>
    );
  }
}

export default App;
