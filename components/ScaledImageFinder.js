import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
// import ScaledImage from '../components/ScaledImage';
// import ScalableImage from 'react-native-scalable-image';

export default ScaledImageFinder = (props) => {
  //   console.log('in scaledImageFinder');
  //   console.log(props && props);

  const [imageToShow, setImageToShow] = useState(null);
  const { baseImageUrl, item, uri, desiredWidth } = props;

  const defaultImage = (
    <Image
      source={require('../assets/images/no-image-placeholder.png')}
      width={desiredWidth}
    />
  );

  const stripForImage = (toolNumber) => {
    // console.log(toolNumber);
    let retValue = toolNumber.replace(/[^a-z0-9+]+/gi, '');
    // console.log('strip retValue is ', retValue);
    return retValue;
  };

  const getImageUrl = (item) => {
    let retValue = '';
    if (item.toolType && item.toolType.toLowerCase() == 'tool') {
      //   console.log('part ', item.toolType);
      retValue = stripForImage(item.partNumber && item.partNumber);
    } else if (item.toolNumber) {
      //   console.log('tool ', item.toolType);
      retValue = stripForImage(item.toolNumber);
    } else if (item.loanToolNo && item.supplierPartNo) {
      retValue =
        stripForImage(item.loanToolNo) +
        '/' +
        stripForImage(item.supplierPartNo);
    }
    return retValue;
  };

  let isMounted;

  useEffect(() => {
    isMounted = true;
    // console.log('in useEffect, wdth', desiredWidth && desiredWidth);

    const imageUrl = uri ? uri : baseImageUrl + getImageUrl(item) + '.png';
    (async () => {
      try {
        Image.getSize(
          imageUrl,
          (Width, Height) => {
            const ratio = Width && desiredWidth ? desiredWidth / Width : 0;
            const calculatedHeight = Height ? Height * ratio : 0;
            // console.log(
            //   imageUrl,
            //   'image was found',
            //   'desiredWidth',
            //   desiredWidth && desiredWidth,
            //   'Width',
            //   Width && Width,
            //   'Height',
            //   Height && Height,
            //   'calculatedHeight',
            //   calculatedHeight && calculatedHeight,
            //   'ratio',
            //   ratio && ratio
            // );

            isMounted &&
              setImageToShow(
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: desiredWidth,
                    height: calculatedHeight,
                  }}
                />
              );
          },
          () => {
            // console.log(imageUrl, 'image was not found');
            isMounted && setImageToShow(defaultImage);
          }
        );
        // controller = null;
      } catch (e) {
        isMounted && setImageToShow(defaultImage);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [uri]);
  //   const checkImage = async (imageUrl) => {
  //     // console.log(imageUrl, 'checking ');
  //     Image.getSize(
  //       imageUrl,
  //       () => {
  //         // console.log(imageUrl, 'image found');
  //         setIsImageFound(true);
  //       },
  //       () => {
  //         // console.log(imageUrl, 'image not found');
  //         setIsImageFound(false);
  //       }
  //     );
  //   };

  //   useEffect(() => {
  //     let isCancelled = false;
  //     const adjustedImageUrl = uri
  //       ? uri
  //       : baseImageUrl + getImageUrl(item) + '.png';
  //     setImageUrl(adjustedImageUrl);

  //     if (!isCancelled) {
  //       checkImage(adjustedImageUrl);
  //     }

  //     return () => {
  //       isCancelled = true;
  //     };
  //   }, [uri]);

  //   useEffect(() => {
  //     let isCancelled = false;

  //     if (!isCancelled) {
  //       if (isImageFound === true) {
  //         // console.log('setImageToShow', imageUrl);
  //         setImageToShow(
  //           <ScalableImage source={{ uri: imageUrl }} width={desiredWidth} />
  //         );
  //       }
  //     }

  //     return () => {
  //       isCancelled = true;
  //     };
  //   }, [isImageFound]);

  if (item && item.loanToolNo) {
    return defaultImage;
  } else if (item && item.toolType === ('Local' || 'local')) {
    return defaultImage;
  } else {
    return imageToShow;
  }
};
