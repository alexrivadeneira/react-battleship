import React, { Component } from 'react';
import Space from './Space';

class Board extends Component {
  render() {
  	let spaces = [];
  	for(var i = 0; i < 100; i++){
  		spaces.push(<Space key={i} />);
  	}

    return (
      spaces.map(space => {
      	return <Space />
      })
    );
  }
}

export default Board;
