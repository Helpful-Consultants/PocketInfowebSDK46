import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import InlineIcon from '../components/InlineIcon';
import Colors from '../constants/Colors';

// import moment from 'moment';
import serviceMeasuresDummyData from '../dummyData/serviceMeasuresDummyData';
const now = moment();

const getDisplayDate = (rawDate) => {
  return (
    (rawDate && moment(rawDate, 'DD/MM/YYYY hh:mm:ss').format('Do MMM YYYY')) ||
    ''
  );
};

const getItemStatus = (startDate, expiryDate) => {
  let theFromDate = null;
  let theToDate = null;
  let ageOfExpiry = 0;
  let ageOfStart = 0;

  if (expiryDate && expiryDate.length > 0) {
    theToDate = moment(expiryDate, 'DD/MM/YYYY HH:mm:ss');
    ageOfExpiry = (now && now.diff(moment(theToDate), 'days')) || 0;
    console.log('ageOfExpiry', ageOfExpiry);
  }

  if (ageOfExpiry >= 1) {
    return false;
  } else {
    if (startDate && startDate.length > 0) {
      theFromDate = moment(startDate, 'DD/MM/YYYY HH:mm:ss');
      ageOfStart = (now && now.diff(moment(theFromDate), 'days')) || 0;
      console.log('ageOfStart', ageOfStart);
    }

    if (ageOfStart >= 0) {
      return true;
    }
  }
  return false;
};

export default function ServiceMeasuresList(props) {
  const windowDim = useWindowDimensions();

  const items = props.items || [];
  //   const items = serviceMeasuresDummyData;
  //   let now = moment();

  const FlatListItem = (props) => {
    const { item } = props;
    const baseStyles = windowDim && getBaseStyles(windowDim);

    // const { onSelectItem } = props;
    const measureIsLive =
      (item.dateCreated &&
        item.expiryDate &&
        getItemStatus(item.dateCreated, item.expiryDate)) ||
      false;

    return (
      <ListItem bottomDivider>
        <ListItem.Content style={baseStyles.containerNoMargin}>
          <ListItem.Title
            style={baseStyles.textLeftAlignedBold}
          >{`${item.menuText}`}</ListItem.Title>
          <ListItem.Subtitle>
            <View>
              <View
                style={{
                  ...baseStyles.viewRowFlexCentreAligned,
                  marginTop: 5,
                }}
              >
                <InlineIcon
                  itemType='font-awesome'
                  iconName={measureIsLive ? 'calendar-check' : 'calendar-times'}
                  iconSize={RFPercentage(2.4)}
                  iconColor={
                    //item.status && item.status.toLowerCase() === 'c'
                    measureIsLive ? Colors.vwgKhaki : Colors.vwgWarmRed
                  }
                />
                <Text
                  style={{ ...baseStyles.textLeftAligned, paddingLeft: 7 }}
                >{`Service measure ${
                  //item.status && item.status.toLowerCase() === 'c'
                  measureIsLive ? 'still open' : 'closed'
                }`}</Text>
              </View>
              <View style={baseStyles.viewRowFlexCentreAligned}>
                <InlineIcon
                  itemType='font-awesome'
                  iconName={item.retailerStatus ? 'praying-hands' : 'hands'}
                  iconSize={RFPercentage(2)}
                  iconColor={
                    item.retailerStatus ? Colors.vwgKhaki : Colors.vwgWarmRed
                  }
                />
                <Text
                  style={{ ...baseStyles.textLeftAligned, paddingLeft: 5 }}
                >{`Retailer actions ${
                  item.retailerStatus ? 'completed' : 'not completed'
                }`}</Text>
              </View>
              <Text
                style={{
                  ...baseStyles.textLeftAligned,
                  ...baseStyles.textBold,
                  marginTop: 5,
                  color: Colors.vwgDarkSkyBlue,
                }}
              >
                {item.toolsAffected}
              </Text>
              {item.retailerStatus &&
              item.retailerStatus.toLowercase() === 'y' ? null : (
                <Text
                  style={{ ...baseStyles.textLeftAlignedBold, marginTop: 5 }}
                >{`You have not yet responded`}</Text>
              )}
              {item.retailerStatus ? null : (
                <Text
                  style={{ ...baseStyles.textLeftAligned, marginTop: 5 }}
                >{`Start date: ${getDisplayDate(item.dateCreated)}`}</Text>
              )}
              {item.retailerStatus ? null : (
                <Text
                  style={baseStyles.textLeftAligned}
                >{`To be completed by: ${getDisplayDate(
                  item.expiryDate
                )}`}</Text>
              )}
            </View>
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
          now={now}
        />
      ) : null}
    </View>
  );
}
