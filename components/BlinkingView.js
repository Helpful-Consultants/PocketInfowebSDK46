import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

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
    showAlert,
    showSevereAlert,
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
      <Ionicons
        name={iconName}
        size={iconSize}
        color={
          showSevereAlert
            ? Colors.vwgWarmRed
            : showAlert
            ? Colors.vwgWarmOrange
            : Colors.vwgDeepBlue
        }
      />
      <Text> </Text>
      <Text
        style={{
          ...baseStyles.textColouredBold,
          color: showSevereAlert
            ? Colors.vwgWarmRed
            : showAlert
            ? Colors.vwgWarmOrange
            : Colors.vwgDeepBlue,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
