import React, { Component } from 'react';

class StatusDisplay extends Component {
  

  render() {

    return (
      <div>
      	<h2>Status</h2>
      	<p>{this.props.statusMessage}</p>
      </div>
    );
  }
}

export default StatusDisplay;
