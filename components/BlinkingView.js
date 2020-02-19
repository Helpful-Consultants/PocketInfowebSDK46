import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default BlinkingView = props => {
  const [showItem, setShowItem] = useState(true);

  const {
    blink,
    colorOne,
    colorTwo,
    fallbackColor,
    iconName,
    iconSize,
    iconType,
    text
  } = props;

  //   if (blink) {
  //     setInterval(
  //       setShowItem(!showItem),
  //       // Define blinking time in milliseconds
  //       500
  //     );
  //   }
  //   useEffect(() => {
  //     if (blink) {
  //       setInterval(
  //         setShowItem(!showItem),
  //         // Define blinking time in milliseconds
  //         500
  //       );
  //     }
  //     return () => {
  //       //   cleanup
  //     };
  //   }, [blink]);

  // let display = this.state.showItem ? this.props.text : ' ';
  // let color = this.state.showItem ? this.props.colorOne : this.props.colorTwo;

  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        name={iconName}
        type={iconType}
        size={iconSize}
        color={blink ? fallbackColor : colorOne}
      />
      <Text> </Text>
      <Text
        style={{
          paddingTop: RFPercentage(0.09),
          fontSize: RFPercentage(2.5),
          color: blink ? (showItem ? colorOne : colorTwo) : colorOne
        }}
      >
        {text}
      </Text>
    </View>
  );
};
