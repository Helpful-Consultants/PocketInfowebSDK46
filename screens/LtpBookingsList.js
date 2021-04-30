import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
// import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
// import InlineIcon from '../components/InlineIcon';
// import Colors from '../constants/Colors';

// import moment from 'moment';
import ltpBookingsDummyData from '../dummyData/ltpBookingsDummyData';
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

export default function LtpBookingsList(props) {
  const windowDim = useWindowDimensions();

  const items = ltpBookingsDummyData;
  //   const items = props.items || [];
  console.log('ltp list props', props);
  //   const items = ltpBookingsDummyData;
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
          <ListItem.Title style={baseStyles.textLeftAlignedBold}>
            {`${item.loanToolNo} ${item.toolDescription}`}
          </ListItem.Title>
          <ListItem.Subtitle>
            <View>
              {item.startDate || item.endDateDue ? (
                <View
                  style={{
                    ...baseStyles.viewRowFlexCentreAligned,
                    marginTop: 3,
                  }}
                >
                  <Text style={{ ...baseStyles.textLeftAligned, marginTop: 2 }}>
                    {item.startDate
                      ? `${getDisplayDate(item.startDate)}`
                      : null}
                    {item.endDateDue
                      ? ` to ${getDisplayDate(item.endDateDue)}`
                      : null}
                  </Text>
                </View>
              ) : null}
              {item.createdBy ? (
                <Text style={{ ...baseStyles.textLeftAligned, marginTop: 3 }}>
                  {item.createdBy.toLowerCase() === 'lyndon evans'
                    ? 'Loan arranged by Tools & Equipment Manager'
                    : `Ordered by: ${item.createdBy}`}
                </Text>
              ) : null}
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
