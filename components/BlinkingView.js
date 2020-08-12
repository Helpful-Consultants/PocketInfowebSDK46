import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default BlinkingView = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [showItem, setShowItem] = useState(true);

  const {
    blink,
    colorOne,
    colorTwo,
    fallbackColor,
    iconName,
    iconSize,
    iconType,
    text,
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
    <View style={baseStyles.viewRowFlex}>
      <Icon
        name={iconName}
        type={iconType}
        size={iconSize}
        color={blink ? fallbackColor : colorOne}
      />
      <Text> </Text>
      <Text
        style={{
          ...baseStyles.textColoured,
          color: blink ? (showItem ? colorOne : colorTwo) : colorOne,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
