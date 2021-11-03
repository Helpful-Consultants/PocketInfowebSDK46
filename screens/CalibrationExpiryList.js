import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InlineIcon from '../components/InlineIcon';
import Colors from '../constants/Colors';
// import Touchable from 'react-native-platform-touchable';
// import ltpDummyData from '../dummyData/ltpDummyData';

export default function CalibrationExpiryList(props) {
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

  const getFormattedNotification = (item) => {
    const expiryText = item.expiry ? item.expiry.toLowerCase() : '';
    if (item) {
      if (expiryText.indexOf('expired') !== -1) {
        return (
          <View style={baseStyles.viewRowFlexCentreAligned}>
            <InlineIcon
              itemType='font-awesome'
              iconName={'thumbs-down'}
              iconSize={RFPercentage(2.4)}
              iconColor={
                //item.status && item.status.toLowerCase() === 'c'
                Colors.vwgWarmRed
              }
            />
            <Text style={baseStyles.textLeftAligned}>{`  ${item.howMany} ${
              item.howMany == 1
                ? `item's calibration has expired.`
                : `items' calibrations have expired.`
            }`}</Text>
          </View>
        );
      } else if (expiryText.indexOf('2.') !== -1) {
        return (
          <View style={baseStyles.viewRowFlexCentreAligned}>
            <InlineIcon
              itemType='font-awesome'
              iconName={'thumbs-up'}
              iconSize={RFPercentage(2.4)}
              iconColor={
                //item.status && item.status.toLowerCase() === 'c'
                Colors.vwgCoolOrange
              }
            />
            <Text style={baseStyles.textLeftAligned}>{`  ${item.howMany} ${
              item.howMany == 1
                ? `item's calibration expires within 30 days.`
                : `items' calibrations expire within 30 days.`
            }`}</Text>
          </View>
        );
      } else if (expiryText.indexOf('3.') !== -1) {
        return (
          <View style={baseStyles.viewRowFlexCentreAligned}>
            <InlineIcon
              itemType='font-awesome'
              iconName={'thumbs-up'}
              iconSize={RFPercentage(2.4)}
              iconColor={
                //item.status && item.status.toLowerCase() === 'c'
                Colors.vwgMintGreen
              }
            />
            <Text style={baseStyles.textLeftAligned}>{`  ${item.howMany} ${
              item.howMany == 1
                ? `item's calibration expires within 60 days.`
                : `items' calibrations expire within 60 days.`
            }`}</Text>
          </View>
        );
      }
    } else {
      return '';
    }
  };

  return (
    <View style={baseStyles.viewDataList}>
      {items && items.length > 0
        ? items.map((item, i) => (
            <View key={i} style={baseStyles.viewDataListItemNoBorder}>
              {getFormattedNotification(item)}
            </View>
          ))
        : null}
    </View>
  );
}
{
  /* <View style={baseStyles.viewRowFlexSpaceBetween}>
  <Text>{`${item.expiry.slice(3)}: `}</Text>
  <Text>{`${item.howMany} items`}</Text>
</View>; */
}
