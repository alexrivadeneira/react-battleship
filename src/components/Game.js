import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  render() {
    return (
      <Board 
      	compBoard={this.props.compBoard}
      	fireMissle={this.props.fireMissle}
      />
    );
  }
}

export default Game;
