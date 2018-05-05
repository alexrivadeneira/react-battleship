import React, { Component } from 'react';

class PlayerRadarSpace extends Component {
  
  handleClick = (row, col) => {
    // only allow click on players turn and while game in progress
    if(this.props.playersTurn && this.props.gameInProgress){
      this.props.updateStatusMessage("PLAYER FIRING!");
      this.props.fireMissle("player", row, col);     
    }
  }

  render() {

    const colorKey = {
      0: "blue",
      1: "cyan",
      2: "red",
      "M": "cyan",
      "B": "grey",
      "C": "grey",
      "CG": "grey",
      "S": "grey",
      "P": "grey",
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
