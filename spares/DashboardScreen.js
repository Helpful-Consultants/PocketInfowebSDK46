import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashBoardScreen</Text>
        {/* <Button
          title='Sign In'
          onPress={() => {
            this.props.navigation.navigate('dashboard');
          }}
        />
        <Button
          title='Register'
          onPress={() => {
            alert('btn pressed');
          }}
        /> */}
      </View>
    );
  }
}

export default DashboardScreen;
