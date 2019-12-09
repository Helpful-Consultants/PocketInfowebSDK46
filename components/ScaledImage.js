import React from 'react';
// import { Image } from 'react-native';

import Image from 'react-native-scalable-image';

export default ScaledImage = props => {
  //   console.log('in scaledImage');
  //   console.log(props);
  //   console.log('end props');

  return <Image source={{ uri: props.uri }} width={props.width} />;
};
