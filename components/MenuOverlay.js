import React from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, Text } from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default MenuOverlay = () => (
  <TouchableHighlight
    onPress={() => {
      props.onToggleMenu();
    }}
    style={styles.overlay}
  >
    <Text>fgfgdgdsgggdf</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
});
