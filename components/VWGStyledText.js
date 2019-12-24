import React from 'react';
import { Text } from 'react-native-elements';

export default function VWGStyledText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'the-sans' }]} />;
}
