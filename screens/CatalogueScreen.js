import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { RFPercentage } from 'react-native-responsive-fontsize';

import BadgedText from '../components/BadgedText';
import TabBarIcon from '../components/TabBarIcon';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import Colors from '../constants/Colors';

const catalogueUrl = 'https://www.toolsinfoweb.co.uk/VW_AG_Sales_Catalogue/Catalogue_2021_May/';
const buttonTextColor = Colors.vwgWhite;
const iconSize = RFPercentage(5);

export default CatalogueScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [browserResult, setBrowserResult] = useState(null);

  const pressOpenHandler = async () => {
    if (Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
      setBrowserResult(null);
    }

    const result = await WebBrowser.openBrowserAsync(catalogueUrl);
    setBrowserResult(result);
  };

  //   console.log('rendering Catalogue screen', browserResult);

  return (
    <View
      style={{
        ...baseStyles.viewColumnFlexCentre,
        marginTop: 20,
        marginHorizontal: 10,
      }}
    >
      <Text style={baseStyles.textItemMain}>
        The Volkswagen AG Group Aftersales Catalogue is a document on the web. The button below will open it on your
        phone.
      </Text>
      <Touchable style={{ ...baseStyles.viewHomeGridCell, marginVertical: 30 }} onPress={() => pressOpenHandler()}>
        <View style={baseStyles.viewColumnFlexCentre}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'book' : 'book'}
            type="ionicon"
            color={buttonTextColor}
            size={iconSize}
          />
          <BadgedText showBadge={false} focused={false} text="Catalogue" value="+" />
        </View>
      </Touchable>
      <Text style={baseStyles.textItemMain}>
        You can also see the catalogue on the Tools Infoweb website in the{' '}
        <Text style={{ fontStyle: 'italic' }}>Product, Information, Marketing</Text> section.
      </Text>
      {browserResult &&
      browserResult.type !== 'opened' &&
      browserResult.type !== 'cancel' &&
      browserResult.type !== 'dismiss' ? (
        <Text>{JSON.stringify(browserResult)}</Text>
      ) : null}
    </View>
  );
};
