import React, { useState } from 'react';
import { Image, Platform, Text, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import Touchable from 'react-native-platform-touchable';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BadgedText from '../components/BadgedText';
import Colors from '../constants/Colors';

const catalogueUrl = 'https://grp.volkswagenag.com/';
const buttonTextColor = Colors.vwgWhite;
let iconSize = RFPercentage(5);

export default ElsaScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const showLink =
    userDataObj && userDataObj.userName
      ? userDataObj.userName.toLowerCase().indexOf('lyndon') > -1 ||
        userDataObj.userName.toLowerCase().indexOf('upstone') > -1 ||
        (userDataObj.userName.toLowerCase().indexOf('simon') > -1 &&
          userDataObj.userName.toLowerCase().indexOf('groves') > -1)
        ? true
        : false
      : false;
  const [browserResult, setBrowserResult] = useState(null);

  const pressOpenHandler = async () => {
    if (Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
      setBrowserResult(null);
    }

    let result = await WebBrowser.openBrowserAsync(catalogueUrl);
    setBrowserResult(result);
  };

  return showLink ? (
    <View
      style={{
        ...baseStyles.viewColumnFlexCentre,
        marginTop: 20,
        marginHorizontal: 10,
      }}
    >
      <Text style={baseStyles.textItemMain}>
        The Volkswagen Group Aftersales application, Elsa2Go, is here.
      </Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Touchable
        style={{ ...baseStyles.viewHomeGridCell, marginVertical: 30 }}
        onPress={() => pressOpenHandler()}
      >
        <View style={baseStyles.viewColumnFlexCentre}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'phone-portrait' : 'phone-portrait'}
            type='ionicon'
            color={buttonTextColor}
            size={iconSize}
          />
          <BadgedText
            showBadge={false}
            focused={false}
            text={'Open Elsa2Go'}
            value={'+'}
          />
        </View>
      </Touchable>
      <Text style={baseStyles.textItemMain}></Text>
      <Image
        source={require('../assets/images/elsa2go.jpg')}
        style={baseStyles.inlineImageElsa}
      ></Image>
    </View>
  ) : (
    <View
      style={{
        ...baseStyles.viewColumnFlexCentre,
        marginTop: 20,
        marginHorizontal: 10,
      }}
    >
      <Text style={baseStyles.textItemMain}>
        The Volkswagen Group Aftersales application, Elsa2Go, is coming soon.
      </Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Text style={baseStyles.textItemMain}>
        Look out for further information at Tools Infoweb. If you've got
        notifications enabled for Pocket Infoweb you'll be notified directly on
        your phone.
      </Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Text style={baseStyles.textItemMain}></Text>
      <Image
        source={require('../assets/images/elsa2go.jpg')}
        style={baseStyles.inlineImageElsa}
      ></Image>
    </View>
  );
};
