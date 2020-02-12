import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
// import Touchable from 'react-native-platform-touchable';
// import moment from 'moment';
// import ltpDummyData from '../dummyData/ltpDummyData';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
export default function LtpList(props) {
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');
  //   const limit = 10;
  //   const allItems = props.items || [];
  //   //   const allItems = ltpDummyData && ltpDummyData;
  //   const items = allItems && allItems.slice(0, limit);

  const items = props.items || [];

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

  //   const orderAs = () => (
  //     // not wanted yet
  //     <Text>{`Order as ${item.orderPartNo}, from ${moment(
  //       item.nextAvailableDate,
  //       'YYYY-MM-DD'
  //     ).format('Do MMM') || null}`}</Text>
  //   );

  //   const rightIcon = () => (
  //     // not wanted yet
  //     <View>
  //       <Icon
  //         name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
  //         type='ionicon'
  //       />
  //       <Icon
  //         name={
  //           Platform.OS === 'ios' ? 'ios-arrow-round-up' : 'md-arrow-round-up'
  //         }
  //         type='ionicon'
  //       />
  //     </View>
  //   );

  const FlatListItem = props => {
    const { item } = props;
    // const { onSelectItem } = props;

    return (
      <ListItem
        title={`${item.loanToolNo}${
          (item.supplierPartNo && !item.orderPartNo) ||
          (item.supplierPartNo &&
            item.supplierPartNo.toLowerCase() !==
              item.orderPartNo.toLowerCase())
            ? ` (${item.supplierPartNo})`
            : ``
        }`}
        titleStyle={{
          color: Colors.vwgBlack,
          fontFamily: 'the-sans-bold',
          fontSize: RFPercentage(1.9)
        }}
        contentContainerStyle={styles.listItem}
        bottomDivider
        subtitle={
          <View>
            <Text
              style={{
                color: Colors.vwgVeryDarkGray,
                fontFamily: 'the-sans',
                fontSize: RFPercentage(1.9)
              }}
            >{`${item.toolDescription}`}</Text>
            {item.orderPartNo &&
            item.orderPartNo.toLowerCase() !==
              item.toolDescription.toLowerCase() ? (
              <Text
                style={{
                  color: Colors.vwgVeryDarkGray,
                  fontFamily: 'the-sans',
                  fontSize: RFPercentage(1.9)
                }}
              >
                {item.orderPartNo}
              </Text>
            ) : null}
          </View>
        }
      ></ListItem>
    );
  };
  //   console.log(items && items);

  return (
    <View>
      {items && items.length > 0 ? (
        <FlatList
          data={items && items}
          renderItem={itemData => <FlatListItem item={itemData.item} />}
          keyExtractor={item => item.id}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // paddingTop: 15,
  },
  noItems: {
    fontSize: 16,
    fontFamily: 'the-sans-bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  },

  listItem: {
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20
  }
});
