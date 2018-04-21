import React, { Component } from 'react';
import Game from '././components/Game';



class App extends Component {

	componentDidMount(){
		this.refreshRadarMap();
		document.body.style.backgroundColor = "#000";
	}

	refreshRadarMap(){
		const compShipMap = this.newShipMap(this.state.comp.shipsData, this.state.comp.shipsDisplay);
		const playerShipMap = this.newShipMap(this.state.player.shipsData, this.state.player.shipsDisplay);

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
		setTimeout(function(){
			this.processMove(missleSource, row, col);
		}.bind(this), 1000);
	}

	compMakeRandomMove = () => {

		let newRow = Math.round(Math.random() * 9);
		let newCol = Math.round(Math.random() * 9);

		if(this.state.targetInFocus.length === 0){
			while(this.state.comp.visited[newRow][newCol] == true){
				newRow = Math.round(Math.random() * 9);
				newCol = Math.round(Math.random() * 9);
			}
			this.fireMissle("comp", newRow, newCol);
		} else {
			let targetInFocus = this.state.targetInFocus;
			const tryNextCoordinates = targetInFocus.pop();
			this.setState({...targetInFocus});
			this.fireMissle("comp", tryNextCoordinates[0], tryNextCoordinates[1]);
		}
		this.updateStatusMessage("COMPUTER FIRING!");


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

	decrementRemainingShips = (playerName) => {
		let currPlayer = this.state[playerName];
		let shipsNum = this.state[playerName].remainingShips;
		shipsNum--;

		currPlayer.remainingShips = shipsNum;
		this.setState({playerName: currPlayer});
	}


	hitAShip = (shipCode, missleTarget, row, col) => {
		this.updateStatusMessage("Hit!");

		let currentShipDataOnTarget = this.state[missleTarget].shipsData[shipCode];

		let functionalUnitsUpdate = currentShipDataOnTarget.functionalUnits;
		const destroyedUnits = currentShipDataOnTarget.destroyedUnits;

		let idxToRemove;

		for(let i = 0; i < functionalUnitsUpdate.length; i++){
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

		if(functionalUnitsUpdate.length === 0){
			const message = BOATCODE_NAME[shipCode] + " sunk!";
			this.updateStatusMessage(message);
			this.decrementRemainingShips(missleTarget);

			// need to refactor:
			// basically, if it's the computer, then you need to clear out inFocus list because you already blew up the ship
			if(missleTarget === "player"){
				let compUpdate = this.state.comp;
				compUpdate.targetInFocus = [];
				this.setState({comp: compUpdate});
			}
		}

		const updatedDestroyedUnits = [...destroyedUnits, [row, col]];

		currentShipDataOnTarget.functionalUnits = functionalUnitsUpdate;
		currentShipDataOnTarget.destroyedUnits = updatedDestroyedUnits;

		this.setState({currentShipDataOnTarget});
	}

	checkEqualArrays = (arr1, arr2) => {
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

	updateHitsMap = (player, hit, row, col) => {

		const opponent = player === "player" ? "comp" : "player";
		console.log(player, opponent);

		let currPlayer = this.state[player];
		let opponentPlayer = this.state[opponent];

		console.log("OP:::", opponentPlayer);

		let currMap = this.state[player].hits;
		let opponentDisplayMap = this.state[opponent].shipsDisplay;

		
		if(hit){
			currMap[row][col] = 2;
		} else {
			console.log("marking a miss");
			currMap[row][col] = 1;
			// also, add the miss to the opposite player's display
			opponentDisplayMap[row][col] = "M";
			console.log("ODM ", opponentDisplayMap);
		}

		currPlayer.hits = currMap;
		opponentPlayer.shipsDisplay = opponentDisplayMap;

		this.setState({
			[player]: currPlayer});
		this.setState({
			[opponent]: opponentPlayer
		});
	}

	processMove = (missleSource,row,col) => {

		const missleTarget = missleSource === "player" ? "comp" : "player";
		const stuffInTargetSpace = this.state[missleTarget].shipsDisplay[row][col];

		if(missleSource === "comp"){
			let visitedMapUpdate = this.state.comp.visited;
			visitedMapUpdate[row][col] = true;
			let compUpdate = this.state.comp;
			compUpdate.visited = visitedMapUpdate;
			this.setState({comp: compUpdate});
		}

		if(stuffInTargetSpace === "C" ||
			stuffInTargetSpace === "P" ||
			stuffInTargetSpace === "CG" ||
			stuffInTargetSpace === "B" ||
			stuffInTargetSpace === "S"){

			this.hitAShip(stuffInTargetSpace, missleTarget, row, col);
			this.updateHitsMap(missleSource, true, row, col);
			if(missleSource === "comp"){
				let targetUpdate = this.state.comp.targetInFocus;
				let neighbors = this.getNeighbors(row, col);
				for(let i = 0; i < neighbors.length; i++){
					targetUpdate.push(neighbors[i]);
				}
				let compUpdate = this.state.comp;
				compUpdate.targetInFocus = targetUpdate;
				this.setState({comp: compUpdate});
			}
		} else if (stuffInTargetSpace === "X"){
			this.updateStatusMessage("Already hit!");
		} else {
			this.updateHitsMap(missleSource, false, row, col);
			this.updateStatusMessage("Miss!");
		}

		this.setState(
			this.checkWin(), 
			this.refreshRadarMap(), 
			this.changePlayers()
		);
	}

	newShipMap = (shipData, shipsDisplay) => {
		let map = shipsDisplay;

		for(let ship in shipData){
			for(let functionalUnit in shipData[ship]["functionalUnits"]){
				map[shipData[ship]["functionalUnits"][functionalUnit][0]][shipData[ship]["functionalUnits"][functionalUnit][1]] = ship;
			}
		}

		for(let ship in shipData){
			for(let destroyedUnit in shipData[ship]["destroyedUnits"]){
				map[shipData[ship]["destroyedUnits"][destroyedUnit][0]][shipData[ship]["destroyedUnits"][destroyedUnit][1]] = "X";
			}
		}		
		return map;
	}


	state = {
		player: {
			remainingShips: 5,
			shipsData: {
				//battleship
				"B": {
					functionalUnits: [[0,9],[1,9],[2,9],[3,9]],
					destroyedUnits: [],
				},
				//carrier
				"C": {
					functionalUnits: [[0,8],[1,8],[2,8],[3,8],[4,8]],
					destroyedUnits: [],				
				},
				//patrol			
				"P": {
					functionalUnits: [[5,8],[6,8]],
					destroyedUnits: [],				
				},
				//submarine
				"S": {
					functionalUnits: [[0,6],[1,6],[2,6]],
					destroyedUnits: [],				
				},
				//cargo			
				"CG": {
					functionalUnits: [[5,0],[5,1],[5,2],[5,3]],
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
			visited: 
				[
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				[false,false,false,false,false,false,false,false,false,false],
				],
			targetInFocus: [],
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

	const globalStyle = {
		background: "#000",
		color: "red",
	}

    return (
    	<div style={globalStyle}>
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
