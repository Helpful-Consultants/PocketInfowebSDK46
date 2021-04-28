import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
// import Touchable from 'react-native-platform-touchable';
// import moment from 'moment';
// import ltpDummyData from '../dummyData/ltpDummyData';

export default function LtpList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
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

  const FlatListItem = (props) => {
    const { item } = props;
    // const { onSelectItem } = props;

    return (
      <ListItem bottomDivider>
        <ListItem.Content style={baseStyles.containerNoMargin}>
          <ListItem.Title style={baseStyles.textLeftAlignedBold}>
            {`${item.loanToolNo}${
              (item.supplierPartNo && !item.orderPartNo) ||
              (item.supplierPartNo &&
                item.supplierPartNo.toLowerCase() !==
                  item.orderPartNo.toLowerCase())
                ? ` (${item.supplierPartNo})`
                : ``
            }`}
          </ListItem.Title>
          <ListItem.Subtitle>
            {
              <View>
                <Text
                  style={baseStyles.textLeftAligned}
                >{`${item.toolDescription}`}</Text>
                {item.orderPartNo &&
                item.orderPartNo.toLowerCase() !==
                  item.toolDescription.toLowerCase() ? (
                  <Text style={baseStyles.textLeftAlignedSmall}>
                    {item.orderPartNo}
                  </Text>
                ) : null}
              </View>
            }
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
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
