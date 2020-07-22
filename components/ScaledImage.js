import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import ScalableImage from 'react-native-scalable-image';

export default ScaledImage = (props) => {
  const [isImageFound, setIsImageFound] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  //   let isImageFound = false;

  const defaultImage = (
    <Image
      source={require('../assets/images/no-image-placeholder.png')}
      width={props.width}
    />
  );

  const checkImage = async (uri) => {
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

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      checkImage(props.uri);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      if (isImageFound === true)
        setImageToShow(
          <ScalableImage source={{ uri: props.uri }} width={props.width} />
        );
    }

    return () => {
      isCancelled = true;
    };
  }, [isImageFound]);

  //   checkImage(props.uri);

  return imageToShow || defaultImage;
};
