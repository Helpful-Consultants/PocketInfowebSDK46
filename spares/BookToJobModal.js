import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import Colors from '../constants/Colors';

// Call as <NewJobButton setIsModalVisible={setIsModalVisible} />
// Needs this function in the props
// const [isThisModalVisible, setIsThisModalVisible] = useState(false);

export default BookToJobModal = ({ setIsThisModalVisible }) => (
  <Modal
    animationType={'slide'}
    transparent={false}
    visible={isThisModalVisible}
    onRequestClose={() => {
      console.log('Modal has been closed.');
    }}
  >
    <View style={styles.viewModal}>
      <Text style={styles.text}>Create job</Text>

      <TouchableHighlight
        onPress={() => {
          setIsThisModalVisible(false);
        }}
      >
        <Text style={styles.text}>Cancel</Text>
      </TouchableHighlight>
      <Button
        title=' Save job'
        onPress={() => {
          createDealerWip('3333');
          setIsThisModalVisible(false);
        }}
        titleStyle={{ fontSize: 10 }}
        buttonStyle={{
          height: 30,
          marginBottom: 2,
          marginTop: 2,
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 20,
          backgroundColor: Colors.vwgDeepBlue,
        }}
        icon={
          <Icon
            name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'}
            type='ionicon'
            size={25}
            color='white'
          />
        }
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});
