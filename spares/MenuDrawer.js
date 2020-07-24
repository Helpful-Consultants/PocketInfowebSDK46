import React, { useCallback, useEffect, useState } from 'react';

import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import Modal from 'react-native-modal';

import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function MenuDrawer(props) {
  console.log('in MenuDrawer');
  console.log(props);
  let drawer = (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => props.backdropPressHandler()}
      onSwipeComplete={() => props.setIsBasketVisible(false)}
      propagateSwipe
      style={styles.menuDrawer}
      backdropOpacity={0.6}
      animationIn='zoomInDown'
      animationOut='zoomOutUp'
    >
      <View style={{ backgroundColor: 'red' }}>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
      </View>
    </Modal>
  );
  console.log(drawer);
  return drawer;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuDrawer: {
    justifyContent: 'flex-end',
    marginRight: 30,
    margin: 0,
  },
});
