import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import Colors from '../constants/Colors';

export default function HighlightedText(props) {
  const { item, now } = props;

  //   console.log(item);

  let dateCreated =
    item &&
    item.createdDate &&
    item.createdDate.length > 0 &&
    moment(item.createdDate, 'DD/MM/YYYY HH:mm:ss');

  let dateUpdated =
    item &&
    item.lastUpdated &&
    item.lastUpdated.length > 0 &&
    moment(item.lastUpdated, 'DD/MM/YYYY HH:mm:ss');

  console.log(dateCreated);
  console.log(dateUpdated);

  return (
    <HighlightedText>
      <Text style={styles.itemLastUpdated}>
        {item && item.createdDate && item.createdDate.length > 0
          ? item && item.lastUpdated && item.lastUpdated.length > 0
            ? `${moment(item.lastUpdated, 'DD/MM/YYYY hh:mm:ss').format(
                'Do MMM YYYY'
              )}`
            : `${moment(item.createdDate, 'DD/MM/YYYY hh:mm:ss').format(
                'Do MMM YYYY'
              ) || null}`
          : null}
      </Text>
    </HighlightedText>
  );
}

const styles = StyleSheet.create({
  itemLastUpdated: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.6),
    color: Colors.vwgDarkGray,
    paddingTop: 5
    // marginRight: 20,
    // borderColor: 'orange',
    // borderWidth: 1
  },
  itemLastUpdatedHighlighted: {
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(1.6),
    color: Colors.vwgCoolOrange,
    paddingTop: 5
    // marginRight: 20,
    // borderColor: 'orange',
    // borderWidth: 1
  }
});
