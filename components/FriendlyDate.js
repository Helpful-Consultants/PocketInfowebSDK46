import React from 'react';
import moment from 'moment';
import { Text } from 'react-native';

export default FriendlyDate = props => {
  //   console.log('in scaledImage');
  //   console.log(props);
  //   console.log('end props');

  return true === false ? (
    <Text
      style={{
        fontSize: RFPercentage(1.8),
        textAlign: 'left',
        marginBottom: 5
      }}
    >{`Job added/changed ${moment(
      item.createdDate,
      'YYYY-MM-DD hh:mm:ss'
    ).format('h:MMa Do MMM ') || null}`}</Text>
  ) : null;
};
