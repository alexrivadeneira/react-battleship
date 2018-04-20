import React, { Component } from 'react';
import Game from '././components/Game';



class App extends Component {

	componentDidMount(){
		console.log("starting game");
		this.refreshRadarMap();
		console.log(this.state.comp.shipsDisplay);
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
		if(this.state.player.remainingShips === 0){
			this.setState({gameInProgress: false});
			this.setState({winner: "Computer"}, this.updateStatusMessage("Computer has won!"));

		} else if (this.state.comp.remainingShips === 0){
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

	fireMissle = (missleSource, row, col) => {
		// missleSource, missleTarget also passed to processMove -- refactor?
		console.log(row, col);

		setTimeout(function(){
			this.processMove(missleSource, row,col);
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

	decrementRemainingShips(playerName){
		let currPlayer = this.state[playerName];
		console.log(currPlayer);
		let shipsNum = this.state[playerName].remainingShips;
		shipsNum--;

		currPlayer.remainingShips = shipsNum;
		this.setState({playerName: currPlayer});
	}




	hitAShip(shipCode, missleTarget, row, col){
		console.log("HIT A SHIP");
		this.updateStatusMessage("Hit!");

	// marks unit of ship as being destroyed		
	// logs if the ship has been totally destroyed to the status display
	// checks if all the ships were destroyed to check for win

		let currentShipDataOnTarget = this.state[missleTarget].shipsData[shipCode];

		let functionalUnitsUpdate = currentShipDataOnTarget.functionalUnits;
		const destroyedUnits = currentShipDataOnTarget.destroyedUnits;

		let idxToRemove;

		for(let i = 0; i < functionalUnitsUpdate.length; i++){
			console.log("got here");
			if(this.checkEqualArrays(functionalUnitsUpdate[i], [row, col])){
				idxToRemove = i;
			}
		}

		functionalUnitsUpdate.splice(idxToRemove, 1);

		const BOATCODE_NAME = {
			"B": "Battleship",
			"C": "Carrier",
			"S": "Submarine",
			"CG": "Cargo",
			"P": "Patrol"
		};

		// should ship decrementing go here?
		if(functionalUnitsUpdate.length === 0){
			const message = BOATCODE_NAME[shipCode] + " sunk!";
			this.updateStatusMessage(message);
			this.decrementRemainingShips(missleTarget);
		}

		const updatedDestroyedUnits = [...destroyedUnits, [row, col]];

		console.log(functionalUnitsUpdate, updatedDestroyedUnits);

		currentShipDataOnTarget.functionalUnits = functionalUnitsUpdate;
		currentShipDataOnTarget.destroyedUnits = updatedDestroyedUnits;

		this.setState({currentShipDataOnTarget}, this.refreshRadarMap());
	}

	checkEqualArrays(arr1, arr2){
		if(arr1.length !== arr2.length){
			return false;
		}
		for(let i = 0; i < arr1.length; i++){
			if(arr1[i] !== arr2[i]){
				return false;
			}
		}
		return true;
	}

	updateHitsMap(player, hit, row, col){
		let currPlayer = this.state[player];
		let currMap = this.state[player].hits;
		
		if(hit){
			currMap[row][col] = 2;
		} else {
			currMap[row][col] = 1;
		}

		currPlayer.hits = currMap;
		this.setState({player: currPlayer});
	}

	processMove(missleSource,row,col){

		const missleTarget = missleSource === "player" ? "comp" : "player";
	
		// if you get a hit, update the ship data
		// update and refresh the display map
		// change players

		const stuffInTargetSpace = this.state[missleTarget].shipsDisplay[row][col];

		if(stuffInTargetSpace === "C" ||
			stuffInTargetSpace === "P" ||
			stuffInTargetSpace === "CG" ||
			stuffInTargetSpace === "B" ||
			stuffInTargetSpace === "S"){

			this.hitAShip(stuffInTargetSpace, missleTarget, row, col);
			this.updateHitsMap(missleSource, true, row, col);
		} else if (stuffInTargetSpace === "X"){
			this.updateStatusMessage("Already hit!");
		} else {
			this.updateHitsMap(missleSource, false, row, col);
			this.updateStatusMessage("Miss!");

		}


		// this.setState(this.changePlayers());



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

		// add X to mark anywhere a ship has been hit

		for(let ship in shipData){

			for(let destroyedUnit in shipData[ship]["destroyedUnits"]){
				console.log("adding destroyed ship");
				map[shipData[ship]["destroyedUnits"][destroyedUnit][0]][shipData[ship]["destroyedUnits"][destroyedUnit][1]] = "X";
			}
		}		

					console.log("updatedmap: ", map);

		return map;
	}



	state = {
		player: {
			remainingShips: 5,
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
			remainingShips: 5,			
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
	    		fireMissle={this.fireMissle}

	    		playerShips={this.state.player.shipsDisplay}
	    		playerHits={this.state.player.hits}

	    		compRemainingShips={this.state.comp.remainingShips}
	    		playerRemainingShips={this.state.player.remainingShips}

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
