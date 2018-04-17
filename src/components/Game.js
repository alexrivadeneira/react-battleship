import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  render() {
    return (
      <Board 
      	playerBoard={this.props.playerBoard}
      	fireMissle={this.props.fireMissle}
      />
    );
  }
}

export default Game;
