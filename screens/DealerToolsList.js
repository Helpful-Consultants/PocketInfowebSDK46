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
import placeholderImage from '../assets/images/robot-prod.png';
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';
import { tsConstructSignatureDeclaration } from '@babel/types';

export default function DealerToolsList({ ...props }) {
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');
  const limit = 3;
  const allItems = props.items || [];
  //   const allItems = dealerToolsDummyData && dealerToolsDummyData;
  const items = allItems && allItems.slice(0, limit);
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

  const FlatListItem = ({ ...props }) => {
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
          titleStyle={{ color: 'green' }}
          subtitle={
            <View>
              <Text>{`${item.partDescription}`}</Text>
              <Text>{`Last location: ${item.location}`}</Text>
              <Text>{`Last Job: ${item.lastWIP}`}</Text>
            </View>
          }
          bottomDivider
          rightIcon={
            <View>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
                type='ionicon'
              />
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-arrow-round-up'
                    : 'md-arrow-round-up'
                }
                type='ionicon'
              />
            </View>
          }
        />
      </Touchable>
    );
  };

  return (
    <View>
      {items && items.length > 0 ? (
        <FlatList
          data={items && items}
          renderItem={itemData => (
            <FlatListItem item={itemData.item} onSelectItem={onSelectItem} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#222'
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
