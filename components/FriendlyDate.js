import React from 'react';
import moment from 'moment';
import { Text } from 'react-native-elements';
import { useWindowDimensions } from 'react-native';

export default FriendlyDate = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in FriendlyDate');

  //   console.log('FriendlyDate - end props');

  const { date } = props;
  //   console.log(
  //     'IN FRIENDLY DATE',
  //     date,
  //     moment(date, 'DD/MM/YYYY hh:mm:ss').toString(),
  //     moment(date, 'DD/MM/YYYY hh:mm:ss').format('h:mma, dddd Do MMM')
  //   );
  return true !== false ? (
    <Text
      style={{
        ...baseStyles.textSmallLight,
      }}
    >{`${
      moment(date, 'DD/MM/YYYY hh:mm:ss').format('h:mma, dddd Do MMM') || null
    }`}</Text>
  ) : null;
};
