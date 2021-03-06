import React, { Component } from 'react';

class PlayerShipsMapSpace extends Component {
  
  render() {

    const colorKey = {
      0: "blue",
      1: "grey",
      2: "cyan",
      "X": "red",
      "B": "grey",
      "C": "grey",
      "CG": "grey",
      "S": "grey",
      "P": "grey",
      "M": "cyan",
      8: "red",
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
        >
      </div>
    );
  }
}

export default PlayerShipsMapSpace;
