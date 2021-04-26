import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
// import { getCatalogueRequest } from '../actions/dealerCatalogue';
// import { getDealerWipsRequest } from '../actions/dealerCatalogue';
// import { getDealerToolsRequest } from '../actions/dealerTools';
// import CatalogueSummary from './CatalogueSummary';
import Colors from '../constants/Colors';
// import userDummyData from '../dummyData/userDummyData.js';
// import statsDummyData from '../dummyData/statsDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

export default CatalogueScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  //   const dealerCatalogueAction
  //   Items = useSelector(
  //     (state) => state.dealerCatalogue.dealerCatalogueActionItems
  //   );
  const dealerCatalogueActionItems = [];

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

  //   console.log('getCatalogueData', getCatalogueData);

  //   const { navigation } = props;

  const getItems = useCallback(async () => []);

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

  useFocusEffect(
    useCallback(() => {
      const getItemsAsync = async () => {
        getItems();
      };
      dispatch(revalidateUserCredentials({ calledBy: 'CatalogueScreen' }));
      getItemsAsync();
    }, [])
  );

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', getCatalogueData);
    getItems();
  };

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
  const catalogueItemsDataCount = 0;
  console.log('rendering Catalogue screen');

  return (
    <View>
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing the stats data'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <Text>
            Catalogue Screen will go here when Volkswagen AG release it the new
            version.
          </Text>
        </View>
      )}
    </View>
  );
};
const titleString = 'Catalogue';
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
        name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
        size={size}
      />
    ),
  };
};
