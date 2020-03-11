import React from 'react';
import { Image } from 'react-native';
import ScaledImage from '../components/ScaledImage';

export default ScaledImageFinder = props => {
  //   console.log('in scaledImageFinder');
  //   console.log(props && props);

  const { baseImageUrl, item, uri, width } = props;
  const stripForImage = toolNumber => {
    // console.log(toolNumber);
    let retValue = toolNumber.replace(/[^a-z0-9+]+/gi, '');
    // console.log('strip retValue is ', retValue);
    return retValue;
  };

  const defaultImage = (
    <Image
      source={require('../assets/images/no-image-placeholder.png')}
      width={props.width}
    />
  );

  const getImageUrl = item => {
    // console.log('in ScaledImageFinder', item);

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
    //console.log(toolType,toolType.toLowerCase(), partNumber, toolNumber, retValue);
    // console.log('imageName is ', retValue);
    return retValue;
  };

  const imageUrl = uri ? uri : baseImageUrl + getImageUrl(item) + '.png';
  if (item && item.loanToolNo) {
    return null;
  } else if (item && item.toolType === ('Local' || 'local')) {
    return defaultImage;
  } else {
    return <ScaledImage width={width} uri={imageUrl} />;
  }
};

// ScaledImage.propTypes = {
//   uri: PropTypes.string.isRequired,
//   width: PropTypes.number,
//   height: PropTypes.number
// };
