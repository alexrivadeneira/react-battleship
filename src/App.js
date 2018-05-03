import React, { Component } from 'react';
import Game from '././components/Game';

const BOATCODE_NAME = {
	"B": "Battleship",
	"C": "Carrier",
	"S": "Submarine",
	"CG": "Cargo",
	"P": "Patrol"
};

const OFFSETS = {
	"left": [0, -1],
	"right": [0, 1],
	"up": [-1, 0],
	"down": [1, 0],
};


class App extends Component {

	componentDidMount(){
		this.refreshRadarMap();
		document.body.style.background = "linear-gradient(to bottom, #45484d 0%,#000000 100%)";
	}


	processMove = (missleSource,row,col) => {

		console.log(missleSource, row, col);
		console.log("tracking? ", this.state.comp.trackingShip);
		console.log("TIF ", this.state.comp.targetInFocus);
		console.log("HIF: ", this.state.comp.hitsInFocus);

		const missleTarget = missleSource === "player" ? "comp" : "player";
		const stuffInTargetSpace = this.state[missleTarget].shipsDisplay[row][col];

		// update visited map for computer
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

	hitAShip = (shipCode, missleTarget, row, col) => {
		this.updateStatusMessage("Hit!");

		// target's ship data
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

		this.checkForDestroyedShip(missleTarget, functionalUnitsUpdate, shipCode, row, col);

		// run after you have hit but not destroyed a ship

		if(missleTarget === "player"){
			if(functionalUnitsUpdate.length !== 0){
				let comp = this.state.comp;
				this.setState({...comp});
				this.updatesForCompHit(row,col);
			}			
		}


		const updatedDestroyedUnits = [...destroyedUnits, [row, col]];

		currentShipDataOnTarget.functionalUnits = functionalUnitsUpdate;
		currentShipDataOnTarget.destroyedUnits = updatedDestroyedUnits;

		this.setState({currentShipDataOnTarget});
	}

	checkForDestroyedShip = (missleTarget, functionalUnits, shipCode, row, col) => {
		if(functionalUnits.length === 0){
			const message = BOATCODE_NAME[shipCode] + " sunk!";
			this.updateStatusMessage(message);
			this.decrementRemainingShips(missleTarget);

			// need to refactor:
			// basically, if it's the computer, then you need to clear out inFocus list because you already blew up the ship
			if(missleTarget === "player"){
				let comp = this.state.comp;
				comp.trackingShip = false;
				comp.hitsInFocus = [];
				comp.targetInFocus = [];

				this.setState({...comp});
			}
		}
	}

	updatesForCompHit(row, col){
	// feels unwieldly and inelegant

		// if you have two hits in a row, now you can search a line
		let hits = this.state.comp.hitsInFocus;
		hits.push([row, col]);

		if(this.state.comp.trackingShip === true){
			return;
			// stop the whole thing before you check hitsInFocus length again, because you've already found all the points in a line you should check which will result in blowing up the ship
			// could this ever go wrong?
		}
		else if(this.state.comp.hitsInFocus.length === 2){
			// get the common direction and then keep adding those to neighbors radaiating out

			// clear out anything in targetInFocus

			// determine direction

			// get neighbors in one direction
			let neighbors = this.getNeighborsOneDirection(hits[0], hits[1]);
			let comp = this.state.comp;
			comp.targetInFocus = neighbors; 
			comp.trackingShip = true;
			this.setState({...comp});

		} else {
		// BUT, while you're tracking a ship, you don't need to do this at all
		// otherwise, add the neighbors around the hit to the search queue
			
			let targetUpdate = this.state.comp.targetInFocus;
			let neighbors = this.getNeighbors(row, col);
			for(let i = 0; i < neighbors.length; i++){
				targetUpdate.push(neighbors[i]);
			}
			let compUpdate = this.state.comp;
			compUpdate.targetInFocus = targetUpdate;
			this.setState({comp: compUpdate});			
		}

	}		

	//TODO: Change so that we're not adding in the given points
	getNeighborsOneDirection = (pt1, pt2) => {
		let newNeighbors = [];

		if(pt1[0] === pt2[0]){
			for(let col = 9; col >= 0; col--){
				newNeighbors.push([pt1[0], col]);
			}
		} else if (pt1[1] === pt2[1]){
			for(let row = 9; row >= 0; row--){
				newNeighbors.push([row, pt1[1]]);
			}

		}
		return newNeighbors;
	};

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
			console.log("comp is making random move");
			while(this.state.comp.visited[newRow][newCol] === true){
				newRow = Math.round(Math.random() * 9);
				newCol = Math.round(Math.random() * 9);
			}
			this.fireMissle("comp", newRow, newCol);
		} else {
			console.log("comp is watching a target");
			let targetInFocus = this.state.targetInFocus;
			const tryNextCoordinates = targetInFocus.pop();
			this.setState({...targetInFocus});
			this.fireMissle("comp", tryNextCoordinates[0], tryNextCoordinates[1]);
		}
		this.updateStatusMessage("COMPUTER FIRING!");
	}

	getNeighbors(row, col){

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

		let currPlayer = this.state[player];
		let opponentPlayer = this.state[opponent];

		let currMap = this.state[player].hits;
		let opponentDisplayMap = this.state[opponent].shipsDisplay;

		
		if(hit){
			currMap[row][col] = 2;
		} else {
			currMap[row][col] = 1;
			// also, add the miss to the opposite player's display
			opponentDisplayMap[row][col] = "M";
		}

		currPlayer.hits = currMap;
		opponentPlayer.shipsDisplay = opponentDisplayMap;

		this.setState({
			[player]: currPlayer});
		this.setState({
			[opponent]: opponentPlayer
		});
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
					functionalUnits: [[0,1],[1,1],[2,1],[3,1]],
					destroyedUnits: [],
				},
				//carrier
				"C": {
					functionalUnits: [[1,3],[2,3],[3,3],[4,3],[5,3]],
					destroyedUnits: [],				
				},
				//patrol			
				"P": {
					functionalUnits: [[0,5],[0,6]],
					destroyedUnits: [],				
				},
				//submarine
				"S": {
					functionalUnits: [[9,2],[9,3],[9,4]],
					destroyedUnits: [],				
				},
				//cargo			
				"CG": {
					functionalUnits: [[8,4],[8,5],[8,6],[8,7]],
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
			trackingShip: false,
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
			hitsInFocus: [],
			targetInFocus: [],
			remainingShips: 5,			
			shipsData: {
				//battleship
				"B": {
					functionalUnits: [[0,9],[1,9],[2,9],[3,9],[4,9]],
					destroyedUnits: [],
				},
				//carrier
				"C": {
					functionalUnits: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8]],
					destroyedUnits: [],				
				},
				//patrol			
				"P": {
					functionalUnits: [[5,8],[6,8],[7,8]],
					destroyedUnits: [],				
				},
				//submarine
				"S": {
					functionalUnits: [[0,6],[1,6],[2,6],[3,6]],
					destroyedUnits: [],				
				},
				//cargo			
				"CG": {
					functionalUnits: [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]],
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
