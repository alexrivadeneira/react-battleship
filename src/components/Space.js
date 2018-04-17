import React, { Component } from 'react';

class Space extends Component {
  render() {

    const colorKey = {
      0: "blue",
      1: "cyan",
      2: "red",
    };

    const spaceStyle = {
      width: "50px",
      height: "50px",
      backgroundColor: colorKey[this.props.fill],
      display: "inline-block",
      margin: "1px",
      color: "#fff",
    }

    return (
      <div className="space" style={spaceStyle}>
        {this.props.i}, {this.props.j}
      </div>
    );
  }
}

export default Space;
