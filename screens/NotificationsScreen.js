import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
// import HeaderButton from '../components/HeaderButton';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import CalibrationExpiryList from './CalibrationExpiryList';
import calibrationExpiryDummyData from '../dummyData/calibrationExpiryDummyData.js';

const demoModeOn = true;

export default NotificationsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const calibrationExpiryItems = useSelector(
    (state) => state.calibrationExpiry.calibrationExpiryItems
  );
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();
  const isLoading = useSelector((state) => state.stats.isLoading);
  const dataError = useSelector((state) => state.stats.error);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const userApiFetchParamsObj = {
    dealerId: dealerId,
    intId: userIntId,
  };
  //   console.log('userApiFetchParamsObj is set to ', userApiFetchParamsObj);

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getAlertsData', getAlertsData);

  //   const { navigation } = props;
  const getItems = useCallback(async (userApiFetchParamsObj) => {
    console.log(
      'in calibrationExpiry getItems userApiFetchParamsObj',
      userApiFetchParamsObj
    );
    dispatch(getCalibrationExpiryRequest(userApiFetchParamsObj)), [];
  });

  const getItemsAsync = async () => {
    // console.log(
    //   'rendering ServiceMeasures screen, userApiFetchParamsObj:',
    //   userApiFetchParamsObj
    // );

    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in stats use effect');
  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     setIsRefreshNeeded(true);
  //   });

  const filterCalibrationExpiryItems = (calibrationExpiryItems) => {
    let calibrationExpiryItemsFiltered = [];
    if (calibrationExpiryItems && calibrationExpiryItems.length > 0) {
      calibrationExpiryItemsFiltered = calibrationExpiryItems.filter(
        (item) =>
          (item.expiry && item.expiry.indexOf('1.') !== -1) ||
          item.expiry.indexOf('2.') !== -1 ||
          item.expiry.indexOf('3.') !== -1
      );
    }

    console.log(
      'calibrationExpiryItemsFiltered',
      calibrationExpiryItemsFiltered
    );
    return calibrationExpiryItemsFiltered;
  };

  useFocusEffect(
    useCallback(() => {
      //   dispatch(revalidateUserCredentials({ calledBy: 'NotificationsScreen' }));
      console.log('in Notifications focusEffect ');
      getItemsAsync();
    }, [])
  );

  //   if (!userIsValidated) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  //   const userDataPresent =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  //   if (userDataPresent === true) {
  //     // console.log('in stats screen,userDataObj OK', userDataPresent);
  //   } else {
  //     // console.log('in stats screen, no userDataObj');
  //     getItems();
  //   }

  //   let itemsToShow = !isLoading ? filterCalibrationExpiryItems(calibrationExpiryItems) : [];
  let itemsToShow =
    !isLoading && !dataError
      ? demoModeOn
        ? filterCalibrationExpiryItems(calibrationExpiryDummyData)
        : filterCalibrationExpiryItems(calibrationExpiryItems)
      : [];

  console.log('rendering Notifications screen');

  return (
    <View>
      {demoModeOn ? (
        <View style={baseStyles.viewPromptRibbonNoneFound}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data for Lyndon.
          </Text>
        </View>
      ) : dataError ? null : itemsToShow.length === 0 ? (
        isLoading ? null : (
          <View style={baseStyles.viewPromptRibbon}>
            <Text style={baseStyles.textPromptRibbon}>
              No calibration expiry notifications to show.
            </Text>
          </View>
        )
      ) : null}
      {!isLoading ? (
        dataError ? (
          <ErrorDetails
            errorSummary={'Error syncing calibration expiry'}
            dataStatusCode={dataStatusCode}
            errorHtml={dataError}
            dataErrorUrl={dataErrorUrl}
          />
        ) : itemsToShow.length > 0 ? (
          <View>
            <View style={baseStyles.viewPromptRibbon}>
              <Text style={baseStyles.textPromptRibbon}>
                Calibration expiry coming up
              </Text>
            </View>
            <CalibrationExpiryList items={itemsToShow} />
          </View>
        ) : null
      ) : null}
    </View>
  );
};
const titleString = 'Notifications';
// const tabBarLabelFunction = ({ focused }) => (
//   <BadgedTabBarText
//     showBadge={false}
//     text={titleString}
//     focused={focused}
//     value={0}
//   />
// );
export const screenOptions = (navData) => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'alert-circle' : 'alert-circle'}
        size={size}
      />
    ),
  };
};
