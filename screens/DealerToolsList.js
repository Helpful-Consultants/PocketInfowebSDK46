import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import ScaledImageFinder from '../components/ScaledImageFinder';
import Colors from '../constants/Colors';
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

export default function DealerToolsList(props) {
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');
  //   const limit = 10;
  //   const allItems = props.items || [];
  //   //   const allItems = dealerToolsDummyData && dealerToolsDummyData;
  //   const items = allItems && allItems.slice(0, limit);

  const items = props.items || [];
  const { onSelectItem } = props;
  //   const items = dealerToolsDummyData.slice(0, limit);
  //   const items = dealerToolsDummyData;
  // console.log('start dealerToolsDummyData');
  //   console.log(items);
  // console.log('dealerToolsDummyData');

  //   const onSelectItem = item => {
  //     return alert(
  //       `the user selected tool ${item.id} for job 999? ; OK; change job; cancel`
  //     );
  //   };

  const FlatListItem = props => {
    const { item } = props;
    const { onSelectItem } = props;

    return (
      <Touchable
        style={styles.toolItem}
        background={Touchable.Ripple('#FFD700')}
        onPress={() => onSelectItem(item)}
      >
        <ListItem
          title={`${item.partNumber} (${item.toolNumber})`}
          titleStyle={{ color: Colors.vwgMidBlue, fontSize: RFPercentage(2.1) }}
          subtitle={
            <View>
              <Text
                style={{ fontSize: RFPercentage(2.0) }}
              >{`${item.partDescription}`}</Text>
              {item.location ? (
                <Text
                  style={{ fontSize: RFPercentage(2.0) }}
                >{`Location: ${item.location}`}</Text>
              ) : (
                <Text style={{ fontSize: RFPercentage(2.0) }}>
                  Location not recorded
                </Text>
              )}
              {item.lastWIP ? (
                <Text
                  style={{ fontSize: RFPercentage(2.0) }}
                >{`Last Job: ${item.lastWIP}`}</Text>
              ) : null}
            </View>
          }
          bottomDivider
        />
      </Touchable>
    );
  };

  return (
    <ScrollView>
      {props.showPrompt === true ? (
        <View style={styles.searchFoundPrompt}>
          <Text style={styles.searchFoundPromptText}>
            {`Search the list to find a tool to add to your job.`}
          </Text>
        </View>
      ) : null}
      <FlatList
        data={items && items}
        renderItem={itemData => (
          <FlatListItem item={itemData.item} onSelectItem={onSelectItem} />
        )}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#222'
  },
  searchFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  searchFoundPromptText: {
    textAlign: 'center',

    color: Colors.vwgWhite
  },
  tipText: {
    fontSize: 12,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 20
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000'
  },
  toolItem: {
    backgroundColor: '#888',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20
  }
});
