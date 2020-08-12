import React from 'react';
import moment from 'moment';
import { Text } from 'react-native-elements';
import { useWindowDimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default FriendlyDate = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in FriendlyDate');
  //   console.log(props);
  //   console.log('FriendlyDate - end props');

  const { date } = props;

  return true !== false ? (
    <Text
      style={{
        ...baseStyles.textSmallLight,
      }}
    >{`${
      moment(date, 'YYYY-MM-DD hh:mm:ss').format('h:MMa, Do MMM ') || null
    }`}</Text>
  ) : null;
};
