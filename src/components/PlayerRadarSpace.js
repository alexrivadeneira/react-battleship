import React, { Component } from 'react';

class PlayerRadarSpace extends Component {
  
  handleClick = (row, col) => {
    // only allow click on players turn and while game in progress
    if(this.props.playersTurn && this.props.gameInProgress){
      this.props.updateStatusMessage("PLAYER FIRING!");
      this.props.fireMissle("player", this.props.playerHits, this.props.compShips, row,col);     
    }
  }

  render() {

    const colorKey = {
      0: "blue",
      1: "cyan",
      2: "red",
    };

    const spaceStyle = {
      width: "25px",
      height: "25px",
      backgroundColor: colorKey[this.props.fill],
      display: "inline-block",
      margin: "1px",
      color: "#fff",
    }

    return (
      <div 
        className="space" 
        style={spaceStyle}
        onClick={() => this.handleClick(this.props.row, this.props.col)}
        >
      </div>
    );
  }
}

export default PlayerRadarSpace;
