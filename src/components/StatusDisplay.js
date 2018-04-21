import React, { Component } from 'react';

class StatusDisplay extends Component {
  

  render() {
  	const displayStyle = {
  		border: "1px solid black",
  		padding: "5px",
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

  	const showCurrentPlayer = this.props.playersTurn ? <span>Human</span> : <span>Computer</span>;

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
