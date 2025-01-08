import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import React, { useMemo } from 'react';
import Touchable from 'react-native-platform-touchable';
import Colors from '../constants/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import BlinkingView from './BlinkingView';
import { useDimensions } from '../helpers/dimensions';
import getBaseStyles from '../helpers/getBaseStyles';

var iconSize = RFPercentage(5);
var iconSizeSmall = RFPercentage(3.5);

export default function OdisLinkWithStatus(props) {
  const windowDim = useDimensions();
  const baseStyles = useMemo(
    () => windowDim && getBaseStyles(windowDim),
    [windowDim]
  );
  var gridHeight = windowDim.height * 0.18;
  var gridWidth = windowDim.width * 0.3;
  //   console.log('%%%%%% in OdisLinkWithStatus ');
  //   const items = props.items[0].brandVersions || [];
  //   const items = odisDummyData[0].brandVersions || [];
  //   const items = (props.items && props.items) || [];
  const { navigation, showOdisAlert, showAlert, showSevereAlert } = props;
  // console.log('start odisDummyData');
  // console.log(odisDummyData);
  //   console.log('in odisstatus userBrand', userBrand && userBrand);
  //   console.log('in odisstatus odisData', itemsObj);
  //   console.log(logoChooser);
  //   console.log('odisDummyData', odisDummyData);
  //   console.log(
  //     'OdisLinkWithStatus showOdisAlert',
  //     showOdisAlert
  //   );

  return (
    <Touchable
      onPress={() => navigation.navigate('RemindersTabs', { screen: 'ODIS' })}
      style={{ padding: 5 }}
    >
      <BlinkingView
        iconName={'tv'}
        iconType="ionicon"
        iconSize={iconSizeSmall}
        text={
          showAlert ? 'See changed ODIS versions' : 'See current ODIS versions'
        }
        colorOne={Colors.vwgDeepBlue}
        colorTwo={Colors.vwgWarmRed}
        fallbackColor={Colors.vwgCoolOrange}
        showAlert={showAlert}
        showSevereAlert={showSevereAlert}
      />
    </Touchable>
  );
}
