import React, { useState } from 'react';
import { Image } from 'react-native';
import ScalableImage from 'react-native-scalable-image';

export default ScaledImage = props => {
  const [isImageFound, setIsImageFound] = useState(false);
  //   let isImageFound = false;

  const checkImage = async uri => {
    // console.log(props.uri, 'checking ');
    Image.getSize(
      props.uri,
      () => {
        // console.log(props.uri, 'image found');
        // imageFound = true;
        setIsImageFound(true);
        // isImageFound = true;
      },
      () => {
        // console.log(props.uri, 'image not found');
        // imageFound = false;
        setIsImageFound(false);
        // isImageFound = false;
      }
    );
  };

  checkImage(props.uri);

  return isImageFound === true ? (
    <ScalableImage source={{ uri: props.uri }} width={props.width} />
  ) : (
    <Image
      source={require('../assets/images/no-image-placeholder.png')}
      width={props.width}
    />
  );
};
