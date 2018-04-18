import React, { Component } from 'react';
import Game from '././components/Game';

class App extends Component {

	checkWin = () => {
		if(this.state.playerShipUnits === 0 || this.state.compShipUnits === 0){
			this.setState({gameInProgress: false});
		} 
	}

	changePlayers = () => {
		this.setState({playersTurn: !this.state.playersTurn}, this.updateMessageAreaIndicateWhoIsPlaying());
	}

	updateMessageAreaIndicateWhoIsPlaying(){
		if(this.state.playersTurn){
			this.updateStatusMessage("Player's turn");
		} else {
			this.updateStatusMessage("Computer playing...");
		}
	}

	updateStatusMessage = (newMessage) => {
		this.setState({statusMessage: newMessage});
	}

	fireMissle = (row, col) => {
		console.log(row, col);

		setTimeout(function(){
			this.processMove(row,col);
		}.bind(this), 1000);
		// add source and target args later
		// check target's shipMap for row and col


		this.checkWin();
	}


	processMove(row,col){
		if(this.state.playersTurn){
			if(this.state.compShips[row][col] === 1){
			// got a hit
				console.log("hit!");
				let updateCompShips = this.state.compShips.slice("");
				updateCompShips[row][col] = 8;
				this.setState({compShips: updateCompShips});

				let updatePlayerHits = this.state.playerHits.slice("");
				updatePlayerHits[row][col] = 2;
				this.setState({playerHits: updatePlayerHits});

				this.setState({compShipUnits: this.state.compShipUnits - 1}, this.changePlayers());

			// miss
			} else if (this.state.compShips[row][col] === 0){
				console.log("miss!");
				let updatePlayerHits = this.state.playerHits.slice("");
				updatePlayerHits[row][col] = 1;
				this.setState({playerHits: updatePlayerHits}, this.changePlayers());

			// already went here - miss!
			} else if (this.state.compShips[row][col] === 8){
				console.log("miss");
				this.setState(this.changePlayers());
			}					
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
    	{this.state.playersTurn ? <p>Players turn</p> : <p>Comp's turn</p>}
	    	<Game
	    		playerShips={this.state.playerShips}
	    		fireMissle={this.fireMissle}
	    		compShips={this.state.compShips}
	    		playerHits={this.state.playerHits}

	    		updateStatusMessage={this.updateStatusMessage}
	    		statusMessage={this.state.statusMessage}
	    	/>
    	</div>
    );
  }
}

export default App;
