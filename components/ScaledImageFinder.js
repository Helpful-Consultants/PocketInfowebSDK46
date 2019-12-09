import React from 'react';
import ScaledImage from '../components/ScaledImage';

export default ScaledImageFinder = props => {
  //   console.log('in scaledImageFinder');
  //   console.log(props && props);
  const stripForImage = toolNumber => {
    // console.log(toolNumber);
    let retValue =
      props.baseImageUrl + toolNumber.replace(/[^a-z0-9+]+/gi, '') + '.png';
    // console.log('strip retValue is ', retValue);
    return retValue;
  };

  const getImageUrl = item => {
    // console.log('in ScaledImageFinder', item);

    let retValue = '';
    if (item.toolType && item.toolType.toLowerCase() == 'tool') {
      //   console.log('part ', item.toolType);
      retValue = stripForImage(item.partNumber && item.partNumber);
    } else {
      //   console.log('tool ', item.toolType);
      retValue = stripForImage(item.toolNumber && item.toolNumber);
    }
    //console.log(toolType,toolType.toLowerCase(), partNumber, toolNumber, retValue);
    // console.log('imageName is ', retValue);
    return retValue;
  };

  const imageUrl = getImageUrl(props.item);

  return <ScaledImage width={props.width} uri={imageUrl} />;
};

// ScaledImage.propTypes = {
//   uri: PropTypes.string.isRequired,
//   width: PropTypes.number,
//   height: PropTypes.number
// };
