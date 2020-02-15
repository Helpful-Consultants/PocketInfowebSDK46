import React, { useState } from 'react';
import { Image } from 'react-native';

import ScalableImage from 'react-native-scalable-image';

export default ScaledImage = props => {
  //   let imageFound = false;

  const [imageFound, setImageFound] = useState(false);

  const checkImage = async uri => {
    // console.log(props.uri, 'checking ');
    Image.getSize(
      props.uri,
      () => {
        // console.log(props.uri, 'image found');
        // imageFound = true;
        setImageFound(true);
      },
      () => {
        // console.log(props.uri, 'image not found');
        // imageFound = false;
        setImageFound(false);
      }
    );
  };

  checkImage(props.uri);

  return imageFound === true ? (
    <ScalableImage source={{ uri: props.uri }} width={props.width} />
  ) : (
    <Image
      source={require('../assets/images/no-image-placeholder.png')}
      width={props.width}
    />
  );
};
