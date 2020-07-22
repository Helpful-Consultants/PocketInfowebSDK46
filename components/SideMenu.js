import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MenuOverlay from '../components/MenuOverlay';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default SideMenu = (props) => {
  let { navigation, onToggleMenu } = props;

  return (
    <View style={styles.container}>
      <MenuOverlay onToggleMenu={onToggleMenu} navigation={navigation} />
      <View style={styles.menu}>
        <Text>Test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  menu: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.8,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  menuItem: {
    paddingTop: 10,
  },
});
