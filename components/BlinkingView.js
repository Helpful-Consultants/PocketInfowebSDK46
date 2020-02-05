/*This is an Example of React Native Blinking Animation */
import React, { Component } from 'react';
//import react in our project
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
//import all the components we needed

export default class BlinkingView extends Component {
  constructor(props) {
    super(props);
    this.state = { showItem: true };

    // Change the state every second or the time given by User.
    setInterval(
      () => {
        this.setState(previousState => {
          return { showItem: !previousState.showItem };
        });
      },
      // Define blinking time in milliseconds
      500
    );
  }

  render() {
    // let display = this.state.showItem ? this.props.text : ' ';
    // let color = this.state.showItem ? this.props.colorOne : this.props.colorTwo;

    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name={this.props.iconName}
          type={this.props.iconType}
          size={this.props.iconSize}
          color={
            this.props.blink ? this.props.fallbackColor : this.props.colorOne
          }
        />
        <Text> </Text>
        <Text
          style={{
            paddingTop: RFPercentage(0.09),
            fontSize: RFPercentage(2.3),
            color: this.props.blink
              ? this.state.showItem
                ? this.props.colorOne
                : this.props.colorTwo
              : this.props.colorOne
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}
