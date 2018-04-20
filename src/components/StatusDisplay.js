import React, { Component } from 'react';

class StatusDisplay extends Component {
  

  render() {
  	const displayStyle = {
  		border: "1px solid black",
  		padding: "5px",
  	};

  	const showCurrentPlayer = this.props.playersTurn ? <span>Human</span> : <span>Computer</span>;
    	console.log("playersTurn: ", this.props.playersTurn);

    return (
      <div style={displayStyle}>
      	<h2>MessageArea:</h2>
        <table>
          <th>
            <td>CompShips</td>
            <td>PlayerShips</td>
          </th>
          <tr>
            <td>{this.props.compRemainingShips}</td>
            <td>{this.props.playerRemainingShips}</td>
          </tr>
        </table>
      	<p>Current player: <strong>{showCurrentPlayer}</strong></p>
      	<p><em>{this.props.statusMessage}</em></p>

      </div>
    );
  }
}

export default StatusDisplay;
