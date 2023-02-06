import React from 'react';
// import { useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';

export default function TabBarText(props) {
  //   const windowDim = useWindowDimensions();
  //   const baseStyles = windowDim && getBaseStyles(windowDim);
  //   const { value, status, focused, showBadge, text } = props;
  const { text } = props;

  return (
    <Text
      style={{
        fontSize: 44,
      }}
    >
      {text}
    </Text>
  );
}
