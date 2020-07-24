import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import Colors from '../constants/Colors';

export default HighlightedText = (props) => {
  const windowDim = useWindowDimensions();
  const { item, now, notificationLimit } = props;
  const notificationLimitToUse = notificationLimit || 7;

  //   console.log('windowDim', windowDim && windowDim);
  //   console.log('in HighlightedText, windowDim:', windowDim);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in HighlightedText, baseStyles:', baseStyles);

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
    <Text style={baseStyles.dateHighlighted}>{displayDate}</Text>
  ) : (
    <Text style={baseStyles.date}>{displayDate}</Text>
  );
};
