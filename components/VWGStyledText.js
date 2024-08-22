import React from 'react';
import { Text } from '@rneui/themed';

export default function VWGStyledText(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'TheGroupTEXT-Regular' }]}
    />
  );
}
