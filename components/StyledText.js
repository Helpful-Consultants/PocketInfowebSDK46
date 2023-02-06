import React from 'react';
import { Text } from '@rneui/themed';

export default StyledText = (props) => {
  const { text, style, stylee, textStyle } = props;

  //   console.log('style is', style);
  //   console.log('stylee is', stylee);
  //   console.log('textStyle is', textStyle);
  //   console.log('text', text);
  //   //   console.log('baseStyles', baseStyles);

  return (
    <Text style={style} allowFontScaling={false}>
      {text}
    </Text>
  );
};
