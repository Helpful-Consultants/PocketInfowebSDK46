import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
// import Touchable from 'react-native-platform-touchable';
// import moment from 'moment';
import campaignsDummyData from '../dummyData/campaignsDummyData';

export default function CampaignsList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');
  const limit = 10;
  //   const allItems = props.items || [];
  //   //   const allItems = campaignsDummyData && campaignsDummyData;
  //   const items = allItems && allItems.slice(0, limit);

  //   const items = props.items || [];

  const items = campaignsDummyData.slice(0, limit);
  //   const items = campaignsDummyData;
  // console.log('start campaignsDummyData');
  //   console.log(items);
  // console.log('campaignsDummyData');

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

  const FlatListItem = (props) => {
    const { item } = props;
    // const { onSelectItem } = props;

    return (
      <ListItem
        title={`${item.menuText}`}
        titleStyle={baseStyles.textLeftAlignedBold}
        contentContainerStyle={baseStyles.containerNoMargin}
        bottomDivider
        subtitle={
          <View>
            <Text
              style={baseStyles.textLeftAligned}
            >{`Tools: ${item.toolsAffected}`}</Text>
            <Text
              style={baseStyles.textLeftAligned}
            >{`Start date: ${item.dateCreated.substr(0, 10)}`}</Text>

            <Text
              style={baseStyles.textLeftAligned}
            >{`Complete all actions by: ${item.expiryDate}`}</Text>

            <Text
              style={baseStyles.textLeftAligned}
            >{`Service Measure status: ${item.status}`}</Text>

            <Text
              style={baseStyles.textLeftAligned}
            >{`Retailer status: ${item.retailerStatus}`}</Text>
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
          renderItem={(itemData) => <FlatListItem item={itemData.item} />}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </View>
  );
}
