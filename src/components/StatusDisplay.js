import React, { Component } from 'react';

class StatusDisplay extends Component {
  

  render() {
  	const displayStyle = {
  		border: "1px solid black",
  		padding: "5px",
  	};

  	const showCurrentPlayer = this.props.playersTurn ? <span>Human</span> : <span>Computer</span>;

    return (
      <div style={displayStyle}>
        <p>Comp Ships: {this.props.compRemainingShips} Player Ships: {this.props.playerRemainingShips}</p>
      	<p>Current player: <strong>{showCurrentPlayer}</strong></p>
      	<p><em>{this.props.statusMessage}</em></p>

      </div>
    );
  }
}

export default StatusDisplay;
