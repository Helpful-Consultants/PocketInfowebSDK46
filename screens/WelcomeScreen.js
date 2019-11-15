import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>WelcomeScreen</Text>
        <Button
          title='Dashboard'
          onPress={() => {
            this.props.navigation.navigate('Dashboard');
          }}
        />
        <Button
          title='Home'
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />
      </View>
    );
  }
}

export default WelcomeScreen;
