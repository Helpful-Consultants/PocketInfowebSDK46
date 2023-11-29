/*This is an Example of React Native Blinking Animation */
import React, { Component } from 'react';
//import react in our project

import { Ionicons } from '@expo/vector-icons';
//import all the components we needed

export default class BlinkingIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { showItem: true };

    // Change the state every second or the time given by User.
    setInterval(
      () => {
        this.setState((previousState) => {
          return { showItem: !previousState.showItem };
        });
      },
      // Define blinking time in milliseconds
      500
    );
  }

  render() {
    // let display = this.state.showItem ? this.props.text : ' ';
    let color = this.state.showItem ? this.props.colorOne : this.props.colorTwo;
    return (
      <Ionicons
        name={this.props.iconName}
        size={this.props.iconSize}
        color={color}
      />
    );
  }
}
