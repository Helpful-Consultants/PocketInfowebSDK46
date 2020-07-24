import React from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { Card, Image, Text } from 'react-native-elements';
import vwLogo from '../assets/images/vw-logo.png';
import audiLogo from '../assets/images/audi-logo.png';
import skodaLogo from '../assets/images/skoda-logo.png';
import seatLogo from '../assets/images/seat-logo.png';
import cvLogo from '../assets/images/cv-logo.png';

import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function OdisVersions(props) {
  //   console.log(props.items);
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const windowDim = useWindowDimensions();
  const { itemsObj, userBrand, viewCount } = props;

  const baseStyles = windowDim && getBaseStyles(windowDim);
  const logoChooser = {
    au: audiLogo,
    cv: cvLogo,
    se: seatLogo,
    vw: vwLogo,
    sk: skodaLogo,
  };
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  //   console.log('in odiscdetails userBrand', userBrand && userBrand);
  //   console.log('in odiscdetails odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);

  //   console.log('viewCount', viewCount && viewCount);

  let odisDetails = null;

  const getOdisForBrand = (item) => {
    // if (brand === 'sk') {
    // console.log('getOdisForBrand', item);
    // console.log('getOdisForBrand brand is ', item.brandCode);
    return (
      <View style={baseStyles.odisRow}>
        <View style={baseStyles.odisLogoContainer}>
          <Image
            source={logoChooser[item.brandCode.toLowerCase()]}
            style={baseStyles.brandLogo}
          />
        </View>
        <View style={baseStyles.odisVersionRow}>
          <Text style={baseStyles.odisVersionText}>
            {item.previousProductVersion &&
            item.previousProductVersion !== item.productVersion ? (
              <Text style={baseStyles.odisVersionTextHighlighted}>
                {`Product: ${item.productVersion}`}
                <Text style={baseStyles.odisVersionTextSmaller}>
                  {` (from ${item.previousProductVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={baseStyles.odisVersionText}>
                {`Product: ${item.productVersion}`}
              </Text>
            )}
          </Text>

          <Text style={baseStyles.odisVersionText}>
            {item.previousMainFeatureVersion &&
            item.previousMainFeatureVersion !== item.mainFeatureVersion ? (
              <Text style={baseStyles.odisVersionTextHighlighted}>
                {`Main feature: ${item.mainFeatureVersion}`}
                <Text style={baseStyles.odisVersionTextSmaller}>
                  {` (from ${item.previousMainFeatureVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={baseStyles.odisVersionText}>
                {`Main Feature: ${item.mainFeatureVersion}`}
              </Text>
            )}
          </Text>
          <Text style={baseStyles.odisVersionText}>
            {item.previousDataVersion &&
            item.previousDataVersion !== item.dataVersion ? (
              <Text style={baseStyles.odisVersionTextHighlighted}>
                {`Data: ${item.dataVersion}`}
                <Text style={baseStyles.odisVersionTextSmaller}>
                  {` (from ${item.previousDataVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={baseStyles.odisVersionText}>
                {`Data: ${item.dataVersion}`}
              </Text>
            )}
          </Text>
        </View>
      </View>
    );
    // }
  };

  const getOdisForBrands = (itemsObj) => {
    if (userBrand) {
      if (userBrand === 'au') {
        // console.log('au');
        odisDetails = getOdisForBrand(itemsObj.au);
      } else if (userBrand === 'cv') {
        // console.log('cv');
        odisDetails = getOdisForBrand(itemsObj.cv);
      } else if (userBrand === 'se') {
        // console.log('se');
        odisDetails = getOdisForBrand(itemsObj.se);
      } else if (userBrand === 'sk') {
        // console.log('sk');
        odisDetails = getOdisForBrand(itemsObj.sk);
      } else if (userBrand === 'vw') {
        // console.log('vw');
        odisDetails = getOdisForBrand(itemsObj.vw);
      }
    } else {
      odisDetails = (
        <View>
          {getOdisForBrand(itemsObj.vw)}
          {getOdisForBrand(itemsObj.au)}
          {getOdisForBrand(itemsObj.se)}
          {getOdisForBrand(itemsObj.sk)}
          {getOdisForBrand(itemsObj.cv)}
        </View>
      );
    }
  };
  itemsObj && getOdisForBrands(itemsObj);
  //   if (items && items.length > 0) {
  //     odisDetails = items.map((item, i) =>
  //       !userBrand || userBrand === item.brandCode.toLowerCase() ? (
  //         <View>{getOdisForBrands()}</View>
  //       ) : null
  //     );
  //     // console.log(odisDetails);
  //   }
  //   if (items && items.length > 0) {
  //     odisDetails = items.map((item, i) =>
  //       !userBrand || userBrand === item.brandCode.toLowerCase() ? (
  //         <View key={i}>
  //           <View style={baseStyles.odisRow}>
  //             <View style={baseStyles.odisLogoContainer}>
  //               <Image
  //                 source={logoChooser[item.brandCode.toLowerCase()]}
  //                 style={baseStyles.logo}
  //               />
  //             </View>
  //             <View style={baseStyles.odisVersionRow}>
  //               <Text style={baseStyles.odisVersionText}>
  //                 Product: {item.productVersion}
  //               </Text>
  //               <Text style={baseStyles.odisVersionText}>
  //                 Main feature: {item.mainFeatureVersion}
  //               </Text>
  //               <Text style={baseStyles.odisVersionText}>
  //                 Data: {item.dataVersion}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       ) : null
  //     );
  //     // console.log(odisDetails);
  //   }

  return (
    <View style={baseStyles.containerFlexJustfied}>
      <View style={baseStyles.rowWithImage}>
        <Image
          source={require('../assets/images/odis.jpg')}
          style={baseStyles.contentImage}
        />
      </View>

      {/* {viewCount && viewCount > 0 ? (
        <View>
          <Text>{`Viewed ${viewCount}`}</Text>
        </View>
      ) : null} */}

      <View>{itemsObj && Object.keys(itemsObj).length > 0 && odisDetails}</View>
    </View>
  );
}
