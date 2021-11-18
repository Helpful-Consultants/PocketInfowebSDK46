import React from 'react';
import { useWindowDimensions, ScrollView, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import vwLogo from '../assets/images/vw-logo.png';
import audiLogo from '../assets/images/audi-logo.png';
import skodaLogo from '../assets/images/skoda-logo.png';
import seatLogo from '../assets/images/seat-logo.png';
import cvLogo from '../assets/images/cv-logo.png';
import { getShortDisplayDate } from '../helpers/dates';
import { checkOdisChangeAge } from '../helpers/odis';
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
  //   console.log(
  //     '$$$$$$$getOdisForBrands',
  //     itemsObj && itemsObj,
  //     userBrand && userBrand
  //   );

  const displayTime = Date.now();

  const getOdisForBrand = (item) => {
    // if (brand === 'sk') {
    // console.log('getOdisForBrand', item && item);
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
    const isRecentChange = checkOdisChangeAge(
      item.lastUpdated && item.lastUpdated.length > 0 ? item.lastUpdated : null,
      displayTime
    );
    // console.log(
    //   'is recent change',
    //   isRecentChange,
    //   'for',
    //   item.brandCode,
    //   item,
    //   item.previousProductVersion && item.previousProductVersion
    // );
    return item ? (
      <View style={baseStyles.viewRowFlex}>
        <View style={baseStyles.odisLogoContainer}>
          <Image
            source={logoChooser[item.brandCode.toLowerCase()]}
            style={baseStyles.imageBrandLogo}
          />
        </View>
        <View style={{ padding: 5 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={
                isRecentChange &&
                (!item.previousProductVersion ||
                  item.previousProductVersion !== item.ProductVersion)
                  ? baseStyles.textOdisVersionHighlighted
                  : baseStyles.textOdisVersion
              }
            >
              {`Product: ${item.productVersion}`}
            </Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text
              style={
                isRecentChange &&
                (!item.previousMainFeatureVersion ||
                  item.previousMainFeatureVersion !== item.mainFeatureVersion)
                  ? baseStyles.textOdisVersionHighlighted
                  : baseStyles.textOdisVersion
              }
            >
              {`Main feature: ${item.mainFeatureVersion}`}
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={
                isRecentChange &&
                (!item.previousDataVersion ||
                  item.previousDataVersion !== item.DataVersion)
                  ? baseStyles.textOdisVersionHighlighted
                  : baseStyles.textOdisVersion
              }
            >
              {`Data: ${item.dataVersion}`}
            </Text>
          </View>

          {item.lastUpdated && item.lastUpdated.length > 0 ? (
            <Text style={baseStyles.textOdisVersionSmaller}>
              {`Last changed ${getShortDisplayDate(item.lastUpdated)}`}
            </Text>
          ) : null}
        </View>
      </View>
    ) : null;
    // }
  };

  const getOdisForBrands = (itemsObj) => {
    // console.log('getOdisForBrands', itemsObj, userBrand && userBrand);
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
          {itemsObj && itemsObj.vw ? getOdisForBrand(itemsObj.vw) : null}
          {itemsObj && itemsObj.au ? getOdisForBrand(itemsObj.au) : null}
          {itemsObj && itemsObj.se ? getOdisForBrand(itemsObj.se) : null}
          {itemsObj && itemsObj.sk ? getOdisForBrand(itemsObj.sk) : null}
          {itemsObj && itemsObj.cv ? getOdisForBrand(itemsObj.cv) : null}
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
