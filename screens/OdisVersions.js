import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ScrollView, View } from 'react-native';

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

  const { itemsObj, userBrand, viewCount } = props;
  const logoChooser = {
    au: audiLogo,
    cv: cvLogo,
    se: seatLogo,
    vw: vwLogo,
    sk: skodaLogo
  };
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  //   console.log('in odiscdetails userBrand', userBrand && userBrand);
  //   console.log('in odiscdetails odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);

  //   console.log('viewCount', viewCount && viewCount);

  let odisDetails = null;

  const getOdisForBrand = item => {
    // if (brand === 'sk') {
    // console.log('getOdisForBrand', item);
    // console.log('getOdisForBrand brand is ', item.brandCode);
    return (
      <View style={styles.odisRow}>
        <View style={styles.odisLogoContainer}>
          <Image
            source={logoChooser[item.brandCode.toLowerCase()]}
            style={styles.logo}
          />
        </View>
        <View style={styles.odisVersionRow}>
          <Text style={styles.odisVersionText}>
            {item.previousProductVersion &&
            item.previousProductVersion !== item.productVersion ? (
              <Text style={styles.odisVersionTextHighlighted}>
                {`Product: ${item.productVersion}`}
                <Text style={styles.odisVersionTextSmaller}>
                  {` (from ${item.previousProductVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={styles.odisVersionText}>
                {`Product: ${item.productVersion}`}
              </Text>
            )}
          </Text>

          <Text style={styles.odisVersionText}>
            {item.previousMainFeatureVersion &&
            item.previousMainFeatureVersion !== item.mainFeatureVersion ? (
              <Text style={styles.odisVersionTextHighlighted}>
                {`Main feature: ${item.mainFeatureVersion}`}
                <Text style={styles.odisVersionTextSmaller}>
                  {` (from ${item.previousMainFeatureVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={styles.odisVersionText}>
                {`Main Feature: ${item.mainFeatureVersion}`}
              </Text>
            )}
          </Text>
          <Text style={styles.odisVersionText}>
            {item.previousDataVersion &&
            item.previousDataVersion !== item.dataVersion ? (
              <Text style={styles.odisVersionTextHighlighted}>
                {`Data: ${item.dataVersion}`}
                <Text style={styles.odisVersionTextSmaller}>
                  {` (from ${item.previousDataVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={styles.odisVersionText}>
                {`Data: ${item.dataVersion}`}
              </Text>
            )}
          </Text>
        </View>
      </View>
    );
    // }
  };

  const getOdisForBrands = itemsObj => {
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
  //           <View style={styles.odisRow}>
  //             <View style={styles.odisLogoContainer}>
  //               <Image
  //                 source={logoChooser[item.brandCode.toLowerCase()]}
  //                 style={styles.logo}
  //               />
  //             </View>
  //             <View style={styles.odisVersionRow}>
  //               <Text style={styles.odisVersionText}>
  //                 Product: {item.productVersion}
  //               </Text>
  //               <Text style={styles.odisVersionText}>
  //                 Main feature: {item.mainFeatureVersion}
  //               </Text>
  //               <Text style={styles.odisVersionText}>
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
    <View style={styles.container}>
      <View style={styles.rowWithImage}>
        <Image
          source={require('../assets/images/odis.jpg')}
          style={styles.contentImage}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  odisRow: {
    flexDirection: 'row',
    borderColor: '#000'
  },
  odisVersionRow: {
    flexDirection: 'column',
    padding: 5,
    borderColor: '#000'
  },
  odisVersionText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.1),
    color: Colors.vwgVeryDarkGray
  },
  odisVersionTextSmaller: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgVeryDarkGray
  },
  odisVersionTextHighlighted: {
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(2.1),
    color: Colors.vwgCoolOrange
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10
  },
  rowWithImage: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },
  contentImage: {
    width: 225,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});
