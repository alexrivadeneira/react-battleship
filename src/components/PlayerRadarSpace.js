import React, { Component } from 'react';

class PlayerRadarSpace extends Component {
  
  handleClick = (row, col) => {
    this.props.fireMissle(row,col);
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
