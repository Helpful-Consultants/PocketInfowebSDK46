import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Card, Image, Text } from 'react-native-elements';
import vwLogo from '../assets/images/logos/vw-logo.png';
import audiLogo from '../assets/images/logos/audi-logo.png';
import skodaLogo from '../assets/images/logos/skoda-logo.png';
import seatLogo from '../assets/images/logos/seat-logo.png';
import cvLogo from '../assets/images/logos/cv-logo.png';
import odisGrab from '../assets/images/content/odis.jpg';
export default function ProductsLinks({ ...props }) {
  // console.log(props.items);
  //   const items = props.items[0].brandVersions || [];
  const items = odisDummyData[0].brandVersions || [];
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
  imageSource =
    'https://react-native-elements.github.io/react-native-elements/img/card.png';
  return (
    <View style={styles.container}>
      {items && items.length > 0 ? (
        <View>
          {items.map((item, i) => (
            <Card key={i}>
              <View style={styles.odisRow}>
                <Image
                  source={logoChooser[item.brandCode.toLowerCase()]}
                  style={styles.logo}
                />
                <View>
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
            </Card>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

_handlePressDocs = url => {
  WebBrowser.openBrowserAsync(url);
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 0
    // backgroundColor: '#00889d'
  },
  odisRow: {
    flexDirection: 'row',
    padding: 5,
    borderColor: '#000',
    fontSize: 12
  },
  odisVersionText: {
    fontSize: 12
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10
  },
  contentImage: {
    // height: 50,
    width: 205,
    height: 70,
    resizeMode: 'contain',
    marginTop: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
    // paddingLeft: 20,
    // paddingRight: 20
  },
  tipText: {
    fontSize: 12,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 20
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000'
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20
  }
});
