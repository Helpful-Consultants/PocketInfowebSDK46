import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

var { screenHeight, screenWidth } = Dimensions.get('window');
var gridHeight = screenHeight * 0.18;
var gridWidth = screenWidth * 0.3;
// console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);
var iconSizeSmall = RFPercentage(3.5);

const buttonColor = Colors.vwgDeepBlue;
const buttonTextColor = Colors.vwgWhite;
const disabledButtonTextColor = Colors.vwgDarkGay;
const actionTextColor = Colors.vwgDeepBlue;
const disabledButtonColor = Colors.vwgMidGray;

export default function OdisStatus(props) {
  //   console.log(props.items);
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const { itemsObj, navigation, userBrand } = props;

  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  console.log('in odisstatus userBrand', userBrand && userBrand);
  console.log('in odisstatus odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);
  let odisStatus = null;

  //   const getOdisStatusForBrands = itemObj => {
  //     return 'updated';
  //   };

  //   const getOdisStatusForBrands = itemsObj => {
  //     if (userBrand) {
  //       if (userBrand === 'au') {
  //         console.log('au');
  //         odisStatus = getOdisStatusForBrand(itemsObj.au);
  //       } else if (userBrand === 'cv') {
  //         console.log('cv');
  //         odisStatus = getOdisStatusForBrand(itemsObj.cv);
  //       } else if (userBrand === 'se') {
  //         console.log('se');
  //         odisStatus = getOdisStatusForBrand(itemsObj.se);
  //       } else if (userBrand === 'sk') {
  //         console.log('sk');
  //         odisStatus = getOdisStatusForBrand(itemsObj.sk);
  //       } else if (userBrand === 'vw') {
  //         console.log('vw');
  //         odisStatus = getOdisStatusForBrand(itemsObj.vw);
  //       }
  //     } else {
  //       odisStatus = getOdisStatusForAllBrands(itemsObj);
  //     }
  //   };
  //   itemsObj && getOdisStatusForBrands(itemsObj);

  return (
    <Touchable onPress={() => navigation.navigate('Odis')}>
      <View style={styles.odisRow}>
        <Icon
          name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
          type='ionicon'
          size={iconSizeSmall}
          color={actionTextColor}
        />

        <Text style={styles.odisCellText}> See latest ODIS versions</Text>
      </View>
    </Touchable>
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
  odisCellText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
  odisVersionTextHiglighted: {
    fontFamily: 'the-sans-bold',
    fontSize: RFPercentage(2.1),
    color: Colors.vwgCoolOrange
  },
  logo: {
    height: 70,
    width: 70,
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
