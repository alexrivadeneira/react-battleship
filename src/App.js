import React, { Component } from 'react';
import Game from '././components/Game';



class App extends Component {




	checkWin = () => {
		if(this.state.playerShipUnits === 0){
			this.setState({gameInProgress: false});
			this.setState({winner: "Computer"}, this.updateStatusMessage("Computer has won!"));

		} else if (this.state.compShipUnits === 0){
			this.setState({gameInProgress: false});
			this.setState({winner: "Player"}, this.updateStatusMessage("Player has won"));
		}
	}

	changePlayers = () => {
	// change the player and check if the computer is playing
		this.setState({playersTurn: !this.state.playersTurn});
		this.setState(this.checkCompPlayingAndTriggerCompMove(), this.updateStatusMessageWhoIsFiring());
	}

	updateStatusMessageWhoIsFiring(){
		if(this.state.gameInProgress){
			if(this.state.playersTurn){
				this.updateStatusMessage("Ready for player...")
			} else {
				this.updateStatusMessage("Computer firing!!!")
			}
		}

	}

	checkCompPlayingAndTriggerCompMove(){
		if(this.state.playersTurn === false && this.state.gameInProgress){
			this.compMakeRandomMove();
		}
	}

	updateStatusMessage = (newMessage) => {
		this.setState({statusMessage: newMessage});
	}

	fireMissle = (missleSourceName, missleSource, missleTarget, row, col) => {
		// missleSource, missleTarget also passed to processMove -- refactor?
		console.log(row, col);

		setTimeout(function(){
			this.processMove(missleSourceName, missleSource, missleTarget, row,col);
		}.bind(this), 1000);
		// add source and target args later
		// check target's shipMap for row and col
		this.checkWin();
	}

	compMakeRandomMove = () => {

		// improve this algorithm:

		// computer will make random selection until it finds a hit

		// performs depth first search once tracking a ship to find all connections and sink the ship

		// when it sinks a ship, starts randomly searching again

		console.log("comp making move");
		this.updateStatusMessage("COMPUTER FIRING!");
		const row = Math.round(Math.random() * 9);
		const col = Math.round(Math.random() * 9);
		this.fireMissle("comp", this.state.compHits, this.state.playerShips, row, col);
	}





	getNeighbors(row, col){
		const OFFSETS = {
			"left": [0, -1],
			"right": [0, 1],
			"up": [-1, 0],
			"down": [1, 0],
		};

		let possibleNeighbors = [];

		for(let direction in OFFSETS){
			possibleNeighbors.push([row + OFFSETS[direction][0], col + OFFSETS[direction][1]]);
		}

		const neighbors = possibleNeighbors.filter(neighbor => 
			neighbor[0] >= 0 && 
			neighbor[0] < 10 && 
			neighbor[1] >= 0 &&
			neighbor[1] < 10
		);

		return neighbors;
	}


	decrementShipUnits(missleSourceName){
		if(missleSourceName === "player"){
			let shipUnits = this.state.compShipUnits;
			shipUnits--;
			this.setState({compShipUnits: shipUnits});
		} else if (missleSourceName === "comp"){
			let shipUnits = this.state.playerShipUnits;
			shipUnits--;
			this.setState({playerShipUnits: shipUnits});
		}
	}


	processMove(missleSourceName, missleSource, missleTarget, row,col){
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

			this.decrementShipUnits(missleSourceName);
			
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
		playerShipUnits: 4,
		playerShips: 
		[
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[1,1,1,1,1,1,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
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
		compShipUnits: 4,
		compShips: 
		[
			[0,0,0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,1],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
		],	
		winner: null,		
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

	    		compShipUnits={this.state.compShipUnits}
	    		playerShipUnits={this.state.playerShipUnits}
	    	/>
    	</div>
    );
  }
}



export default App;
