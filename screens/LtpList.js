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
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import placeholderImage from '../assets/images/robot-prod.png';
import ltpDummyData from '../dummyData/ltpDummyData';
import { tsConstructSignatureDeclaration } from '@babel/types';
import Colors from '../constants/Colors';
export default function LtpList({ ...props }) {
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');
  const limit = 10;
  const allItems = props.items || [];
  //   const allItems = ltpDummyData && ltpDummyData;
  const items = allItems && allItems.slice(0, limit);
  const { onSelectItem } = props;
  //   const items = ltpDummyData.slice(0, limit);
  //   const items = ltpDummyData;
  // console.log('start ltpDummyData');
  //   console.log(items);
  // console.log('ltpDummyData');

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
          title={`${item.loanToolNo} (${item.supplierPartNo})`}
          titleStyle={{ color: Colors.vwgDarkSkyBlue }}
          bottomDivider
          rightIcon={
            <View>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
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
          subtitle={
            <View>
              <Text
                style={{
                  color: Colors.vwgDeepBlue
                }}
              >{`${item.toolDescription}`}</Text>
              <Text>{`Order as ${item.orderPartNo}, from ${moment(
                item.nextAvailableDate,
                'YYYY-MM-DD'
              ).format('Do MMM') || null}`}</Text>
            </View>
          }
        ></ListItem>
      </Touchable>
    );
  };
  console.log(items & items);
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
    color: '#333'
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
