import React, { Component } from 'react';

class StatusDisplay extends Component {
  

  render() {
  	const displayStyle = {
  		padding: "5px",
      background: "linear-gradient(to bottom, #f2f6f8 0%,#d8e1e7 50%,#b5c6d0 51%,#e0eff9 100%)",
  	};

    const playerScore = {
      float: "left",
      fontSize: "30px",
    };

    const compScore = {
      float: "right",
      fontSize: "30px",
    };

    const messageArea = {
      clear: "both",
      textAlign: "center",
      fontSize: "25px",
    }

    return (
      <div style={displayStyle}>
        <div style={compScore}>
          {this.props.compRemainingShips}
        </div>
        <div style={playerScore}>
          {this.props.playerRemainingShips}
        </div>
        <div style={messageArea}>
      	 {this.props.statusMessage}
         </div>
      </div>
    );
  }
}

export default StatusDisplay;
