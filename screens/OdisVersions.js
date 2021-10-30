import React from 'react';
import { useWindowDimensions, ScrollView, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { parse } from 'date-fns';
import vwLogo from '../assets/images/vw-logo.png';
import audiLogo from '../assets/images/audi-logo.png';
import skodaLogo from '../assets/images/skoda-logo.png';
import seatLogo from '../assets/images/seat-logo.png';
import cvLogo from '../assets/images/cv-logo.png';
import { getShortDisplayDateAndTime } from '../helpers/dates';

export default function OdisVersions(props) {
  //   console.log('props fetchTime', props.fetchTime);
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const windowDim = useWindowDimensions();
  const { fetchTime, itemsObj, userBrand, viewCount } = props;

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
    // const parsedUpdatedDate =
    //   (item.lastUpdated &&
    //     parse(item.lastUpdated, 'dd/MM/yyyy HH:mm:ss', new Date())) ||
    //   null;
    // console.log(
    //   'parsedUpdatedDate =',
    //   parsedUpdatedDate,
    //   'from',
    //   item.lastUpdated
    // );
    return (
      <View style={baseStyles.viewRowFlex}>
        <View style={baseStyles.odisLogoContainer}>
          <Image
            source={logoChooser[item.brandCode.toLowerCase()]}
            style={baseStyles.imageBrandLogo}
          />
        </View>
        <View style={{ padding: 5 }}>
          <Text style={baseStyles.textOdisVersion}>
            {item.previousProductVersion &&
            item.previousProductVersion !== item.productVersion ? (
              <Text style={baseStyles.textOdisVersionHighlighted}>
                {`Product: ${item.productVersion}`}
                <Text style={baseStyles.textOdisVersionSmaller}>
                  {` (from ${item.previousProductVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={baseStyles.textOdisVersion}>
                {`Product: ${item.productVersion}`}
              </Text>
            )}
          </Text>
          {item.previousMainFeatureVersion &&
          item.previousMainFeatureVersion !== item.mainFeatureVersion ? (
            <View style={{ flexDirection: 'column' }}>
              <Text style={baseStyles.textOdisVersionHighlighted}>
                {`Main feature: ${item.mainFeatureVersion}`}
              </Text>
              <Text style={baseStyles.textOdisVersionSmaller}>
                {` (from ${item.previousMainFeatureVersion})`}
              </Text>
            </View>
          ) : (
            <Text style={baseStyles.textOdisVersion}>
              {`Main Feature: ${item.mainFeatureVersion}`}
            </Text>
          )}
          <Text style={baseStyles.textOdisVersion}>
            {item.previousDataVersion &&
            item.previousDataVersion !== item.dataVersion ? (
              <Text style={baseStyles.textOdisVersionHighlighted}>
                {`Data: ${item.dataVersion}`}
                <Text style={baseStyles.textOdisVersionSmaller}>
                  {` (from ${item.previousDataVersion})`}
                </Text>
              </Text>
            ) : (
              <Text style={baseStyles.textOdisVersion}>
                {`Data: ${item.dataVersion}`}
              </Text>
            )}
          </Text>

          {item.lastUpdated && item.lastUpdated.length > 0 ? (
            <Text style={baseStyles.textOdisVersionSmaller}>
              {`Last changed ${getShortDisplayDateAndTime(item.lastUpdated)}`}
            </Text>
          ) : null}
        </View>
      </View>
    );
    // }
  };

  const getOdisForBrands = (itemsObj) => {
    // console.log('getOdisForBrands', userBrand && userBrand);
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

  return (
    <ScrollView>
      <View style={baseStyles.containerFlexJustfied}>
        <View style={baseStyles.viewRowWithImage}>
          <Image
            source={require('../assets/images/odis.jpg')}
            style={baseStyles.imageContent}
          />
        </View>

        {/* {viewCount && viewCount > 0 ? (
          <View>
            <Text>{`Viewed ${viewCount}`}</Text>
          </View>
        ) : null} */}

        <View>
          {itemsObj && Object.keys(itemsObj).length > 0 && odisDetails}
        </View>
      </View>
    </ScrollView>
  );
}

//  {
//    fetchTime ? (
//      <Text
//        style={{ ...baseStyles.textLeftAligned, marginTop: 5 }}
//      >{`Last checked : ${getDisplayDate(fetchTime)}`}</Text>
//    ) : null;
//  }
