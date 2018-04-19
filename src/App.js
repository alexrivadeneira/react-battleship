import React, { Component } from 'react';
import Game from '././components/Game';



class App extends Component {

	componentDidMount(){
		console.log("starting game");
		this.refreshRadarMap();
		console.log(this.state.player.shipsDisplay, this.state.comp.shipsDisplay);
	}

	refreshRadarMap(){
		// probably don't need to update both comp and player?
		const compShipMap = this.newShipMap(this.state.comp.shipsData);
		const playerShipMap = this.newShipMap(this.state.player.shipsData);

		let player = this.state.player;
		player.shipsDisplay = playerShipMap;

		let comp = this.state.comp;
		comp.shipsDisplay = compShipMap;

		this.setState({...player, ...comp});


	}

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

		// improve this algorithm:

		// computer will make random selection until it finds a hit

		// performs depth first search once tracking a ship to find all connections and sink the ship

		// when it sinks a ship, starts randomly searching again

		console.log("comp making move");
		this.updateStatusMessage("COMPUTER FIRING!");
		const row = Math.round(Math.random() * 9);
		const col = Math.round(Math.random() * 9);
		this.fireMissle(this.state.comp.hits, this.state.player.shipData, row, col);
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

	hitAShip(missleTarget){

	}


	processMove(missleSource, missleTarget, row,col){
	// look at target ships map
	// update source hits map

		if(isNaN(missleTarget[row][col])){
			console.log(">>>>>Got a hit!");
		// got a hit
		// destroy piece of the target's ship
		// refresh the radar

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

	newShipMap(shipData){
		let map = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
								];

		for(let ship in shipData){
			for(let functionalUnit in shipData[ship]["functionalUnits"]){
				map[shipData[ship]["functionalUnits"][functionalUnit][0]][shipData[ship]["functionalUnits"][functionalUnit][1]] = ship;
			}
		}
		return map;
	}



	state = {
		player: {
			shipsData: {
				//battleship
				"B": {
					functionalUnits: [[0,0], [0,1], [0,2], [0,3]],
					destroyedUnits: [],
				},
				//carrier
				"C": {
					functionalUnits: [[1,1], [2,1], [3,1], [4,1], [5,1]],
					destroyedUnits: [],				
				},
				//patrol			
				"P": {
					functionalUnits: [[1,6],[1,7]],
					destroyedUnits: [],				
				},
				//submarine
				"S": {
					functionalUnits: [[6,3],[6,4],[6,5]],
					destroyedUnits: [],				
				},
				//cargo			
				"CG": {
					functionalUnits: [[9,5],[9,6],[9,7],[9,8]],
					destroyedUnits: [],				
				},									
			},
			hits: 
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
			shipsDisplay: 
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
		},
		comp: {
			shipsData: {
				//battleship
				"B": {
					functionalUnits: [[0,0], [0,1], [0,2], [0,3]],
					destroyedUnits: [],
				},
				//carrier
				"C": {
					functionalUnits: [[1,2], [2,2], [3,2], [4,2], [5,2]],
					destroyedUnits: [],				
				},
				//patrol			
				"P": {
					functionalUnits: [[1,9],[2,9]],
					destroyedUnits: [],				
				},
				//submarine
				"S": {
					functionalUnits: [[8,1],[8,2],[8,3]],
					destroyedUnits: [],				
				},
				//cargo			
				"CG": {
					functionalUnits: [[9,0],[9,1],[9,2],[9,3]],
					destroyedUnits: [],				
				},									
			},	
			hits: 
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
			shipsDisplay: 
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
		},
		statusMessage: "Player's Turn",
		playersTurn: true,
		gameInProgress: true,
		winner: null,		
	}

  render() {
    return (
    	<div>
	    	<Game
	    		playerShips={this.state.player.shipsDisplay}
	    		fireMissle={this.fireMissle}
	    		compShips={this.state.comp.shipsDisplay}
	    		playerHits={this.state.player.hits}

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
