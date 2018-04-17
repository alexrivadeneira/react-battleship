import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  render() {
    return (
      <Board playerBoard={this.props.playerBoard}/>
    );
  }
}

export default Game;
