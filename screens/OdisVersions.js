import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Card, Image, Text } from 'react-native-elements';
import vwLogo from '../assets/images/logos/vw-logo.png';
import audiLogo from '../assets/images/logos/audi-logo.png';
import skodaLogo from '../assets/images/logos/skoda-logo.png';
import seatLogo from '../assets/images/logos/seat-logo.png';
import cvLogo from '../assets/images/logos/cv-logo.png';

import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function OdisVersions(props) {
  //   console.log(props.items);
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  const items = (props.items && props.items) || [];
  const logoChooser = {
    au: audiLogo,
    cv: cvLogo,
    se: seatLogo,
    vw: vwLogo,
    sk: skodaLogo
  };
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  //   console.log('odisData', items);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);

  return (
    <View style={styles.container}>
      <View style={styles.rowWithImage}>
        <Image
          source={require('../assets/images/content/odis.jpg')}
          style={styles.contentImage}
        />
      </View>

      <View>
        {items.map((item, i) => (
          <View key={i}>
            <View style={styles.odisRow}>
              <View style={styles.odisLogoContainer}>
                <Image
                  source={logoChooser[item.brandCode.toLowerCase()]}
                  style={styles.logo}
                />
              </View>
              <View style={styles.odisVersionRow}>
                <Text style={styles.odisVersionText}>
                  Product: {item.productVersion}
                </Text>
                <Text style={styles.odisVersionText}>
                  Main feature: {item.mainFeatureVersion}
                </Text>
                <Text style={styles.odisVersionText}>
                  Data: {item.dataVersion}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
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
