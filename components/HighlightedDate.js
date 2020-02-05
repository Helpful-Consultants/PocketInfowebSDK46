import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import Colors from '../constants/Colors';

export default HighlightedText = props => {
  const { item, now, notificationLimit } = props;
  const notificationLimitToUse = notificationLimit || 7;

  let itemDate = null;
  let highlight = false;

  if (item && item.lastUpdated && item.lastUpdated.length > 0) {
    itemDate = moment(item.lastUpdated, 'DD/MM/YYYY HH:mm:ss');
  } else if (item && item.createdDate && item.createdDate.length > 0) {
    itemDate = moment(item.createdDate, 'DD/MM/YYYY HH:mm:ss');
  }

  let ageOfChange = (now && now.diff(moment(itemDate), 'days')) || 0;
  if (ageOfChange <= notificationLimitToUse) {
    highlight = true;
    //   console.log('!!!!! alertNeeded', alertNeeded);
  }

  //   console.log('ageOfChange ', ageOfChange, highlight);
  //   console.log(
  //     itemDate &&
  //       'itemDate ' +
  //         moment(itemDate, 'DD/MM/YYYY hh:mm:ss').format('Do MMM YYYY')
  //   );
  //   console.log(
  //     now && 'now ' + moment(now, 'DD/MM/YYYY hh:mm:ss').format('Do MMM YYYY')
  //   );
  //   console.log('ageOfChange ', ageOfChange);
  //   console.log(dateUpdated);
  const displayDate =
    (itemDate &&
      moment(itemDate, 'DD/MM/YYYY hh:mm:ss').format('Do MMM YYYY')) ||
    null;

  return ageOfChange && ageOfChange <= 7 ? (
    <Text style={styles.dateHighlighted}>{displayDate}</Text>
  ) : (
    <Text style={styles.date}>{displayDate}</Text>
  );
};

const styles = StyleSheet.create({
  date: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8),
    color: Colors.vwgDarkGray,
    paddingTop: 5
  },
  dateHighlighted: {
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(1.8),
    color: Colors.vwgCoolOrange,
    paddingTop: 5
  }
});
