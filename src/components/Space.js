import React, { Component } from 'react';

class Space extends Component {
  render() {
    const spaceStyle = {
      width: "50px",
      height: "50px",
      backgroundColor: "blue",
      display: "inline-block",
      margin: "5px",
    }
    return (
      <div className="space" style={spaceStyle}>
      </div>
    );
  }
}

export default Space;
