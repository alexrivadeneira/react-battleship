import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  render() {
    return (
      <Board compBoard={this.props.compBoard}/>
    );
  }
}

export default Game;
