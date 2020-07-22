import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

export default ScaledImage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState(props.uri);
  const [calculatedHeight, setCalculatedHeight] = useState(0);
  const [calculatedWidth, setCalculatedWidth] = useState(0);

  //   console.log(props);

  const { uri } = props;
  //   console.log(uri);

  useEffect(() => {
    // console.log('uri is ', uri);
    let mounted = true;
    setSource(uri);

    if (uri) {
      console.log(' inner uri is ', uri);
      Image.getSize(
        uri,
        (width, height) => {
          if (width && !props.height) {
            setCalculatedWidth(props.width);
            setCalculatedHeight(height * (props.width / width));
            setIsLoading(false);
          } else if (!props.width && props.height) {
            setCalculatedWidth(width * (props.height / height));
            setCalculatedHeight(props.height);
            setIsLoading(false);
          } else {
            setCalculatedWidth(width);
            setCalculatedHeight(height);
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);

          // console.log(error);
        }
      );
    }
    return () => {
      console.log('in return');
    };
  }, [uri]);

  return (
    <Image
      source={{ uri: uri }}
      style={{ height: calculatedHeight, width: calculatedWidth }}
    />
  );
};
