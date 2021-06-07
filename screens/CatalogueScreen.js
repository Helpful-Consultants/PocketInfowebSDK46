import React from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import * as WebBrowser from 'expo-web-browser';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BadgedText from '../components/BadgedText';
import Colors from '../constants/Colors';

const catalogueUrl =
  'https://toolsinfoweb.co.uk/VW_AG_Sales_Catalogue/Catalogue_2021_May/';
const buttonTextColor = Colors.vwgWhite;
let iconSize = RFPercentage(5);

export default CatalogueScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const pressOpenHandler = async () => {
    if (Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
    }
    try {
      let result = await WebBrowser.openBrowserAsync(catalogueUrl);
      setBrowserResult(result);
    } catch (e) {
      console.error(e);
    }
  };

  console.log('rendering Catalogue screen');

  return (
    <View
      style={{
        ...baseStyles.viewColumnFlexCentre,
        marginTop: 20,
      }}
    >
      <Text>
        The Volkswagen AG Group Aftersales Catalogue is a document on the web.
        The button below will open it on your phone.
      </Text>
      <Touchable
        style={{ ...baseStyles.viewHomeGridCell, marginVertical: 20 }}
        onPress={() => pressOpenHandler()}
      >
        <View style={baseStyles.viewColumnFlexCentre}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'book' : 'book'}
            type='ionicon'
            color={buttonTextColor}
            size={iconSize}
          />
          <BadgedText
            showBadge={false}
            focused={false}
            text={'Catalogue'}
            value={'+'}
          />
        </View>
      </Touchable>
      <Text>
        You can also see the catalogue on Tools Infoweb in the Product,
        Information, Marketing section.
      </Text>
    </View>
  );
};

const titleString = 'Catalogue';

export const screenOptions = (navData) => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'book' : 'book'}
        size={size}
      />
    ),
  };
};
