import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getLtpBookingsRequest } from '../actions/ltpBookings';
// import { getDealerWipsRequest } from '../actions/ltpBookings';
// import { getDealerToolsRequest } from '../actions/dealerTools';
import LtpBookingsList from './LtpBookingsList';
import Colors from '../constants/Colors';
import searchItems from '../helpers/searchItems';
// import userDummyData from '../dummyData/userDummyData.js';
// import ltpBookingsDummyData from '../dummyData/ltpBookingsDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

const minSearchLength = 1;

export default LtpBookingsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const ltpBookingsItems = useSelector(
    (state) => state.ltpBookings.ltpBookingsItems
  );
  const [searchInput, setSearchInput] = useState('');
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const isLoading = useSelector((state) => state.stats.isLoading);
  const dataError = useSelector((state) => state.stats.error);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);

  //   console.log('in ltpBookings screen - userDataObj is set to ', userDataObj);

  const userApiFetchParamsObj = {
    dealerId: (userDataObj && userDataObj.dealerId) || null,
    intId: (userDataObj && userDataObj.intId.toString()) || null,
  };
  //   console.log('in ltpBookings screen - point 1');
  //   console.log(
  //     'in ltpBookings screen - userApiFetchParamsObj is set to ',
  //     userApiFetchParamsObj,
  //     'ltpBookingsItems ',
  //     ltpBookingsItems
  //   );

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getLtpBookingsData', getLtpBookingsData);

  //   const { navigation } = props;

  const getItems = useCallback(async (userApiFetchParamsObj) => {
    console.log(
      'in ltpBookings getItems userApiFetchParamsObj',
      userApiFetchParamsObj
    );
    dispatch(getLtpBookingsRequest(userApiFetchParamsObj)), [ltpBookingsItems];
  });

  //   console.log('in ltpBookings screen - point 2');

  const getItemsAsync = async () => {
    console.log(
      'rendering LtpBookings screen, userApiFetchParamsObj:',
      userApiFetchParamsObj
    );

    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };

  //   console.log('in ltpBookings screen - point 3');
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

  //   useEffect(() => {
  //     // runs only once
  //     console.log('in ltpBookings useEffect', userApiFetchParamsObj);
  //     //   setGetWipsDataObj(userApiFetchParamsObj);
  //     getItemsAsync();
  //   }, [userApiFetchParamsObj]);
  //   console.log('in ltpBookings screen - point 4');
  useFocusEffect(
    useCallback(() => {
      dispatch(
        revalidateUserCredentials({
          calledBy: 'LtpBookings Screen',
        })
      );
      console.log('in ltpBookings focusffect ');
      setSearchInput('');
      getItemsAsync();
    }, [])
  );
  //   console.log('in ltpBookings screen - point 5');
  useEffect(() => {
    // runs only once
    // console.log('in booked useEffect', userApiFetchParamsObj && userApiFetchParamsObj.dealerId);
    console.log(
      'in ltpBookings getItems userApiFetchParamsObj',
      userApiFetchParamsObj
    );
  }, []);

  //   console.log('in ltpBookings screen - point 6');
  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItemsAsync();
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

  //   let uniqueLtpBookingsSorted = sortObjectList(
  //     unsortedUniqueLtpBookings,
  //     'loanToolNo',
  //     'asc'
  //   );

  //   setUniqueserviceMeasureItems(ltpBookingsItems);

  const ltpBookingsItemsDataCount = 0;

  //   console.log('in ltpBookings screen - point 7');

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(ltpBookingsItems, searchInput);
      //   console.log(
      //     'LtpBookings Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'LtpBookings: ',
      //     ltpBookingsItems && ltpBookingsItems.length,
      //     'itemsToShow: ',
      //     itemsToShow && itemsToShow.length,
      //     'uniqueserviceMeasureItems: ',
      //     'newFilteredItems:',
      //     newFilteredItems && newFilteredItems.length,
      //     newFilteredItems
      //   );
      setFilteredItems(newFilteredItems);
    }
  };

  //   let itemsToShow = !isLoading
  //     ? searchInput && searchInput.length > minSearchLength
  //       ? filteredItems
  //       : uniqueserviceMeasureItems
  //     : [];

  //   console.log('in ltpBookings screen - point 8');
  const items = (!isLoading && !dataError && ltpBookingsItems) || [];

  //   let itemsToShow =
  //     searchInput && searchInput.length > minSearchLength ? filteredItems : items;
  //   console.log('in ltpBookings screen - point 9');
  let itemsToShow = !isLoading
    ? searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : items
    : [];

  //   console.log(
  //     'rendering LtpBookings screen, dataError:',
  //     dataError,
  //     'filteredItems',
  //     filteredItems && filteredItems.length,
  //     ' itemsToShow length',
  //     (itemsToShow && itemsToShow.length) || '0'
  //   );
  console.log('in ltpBookings screen - point 10', itemsToShow);
  return (
    <View style={baseStyles.containerFlexAndMargin}>
      <SearchBarWithRefresh
        dataName={'LtpBookings items'}
        someDataExpected={false}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={ltpBookingsItems.length}
      />
      {dataError ? null : itemsToShow && itemsToShow.length === 0 ? (
        searchInput.length >= minSearchLength ? (
          <View style={baseStyles.viewPromptRibbonNoneFound}>
            <Text style={baseStyles.textPromptRibbon}>
              Your search found no results.
            </Text>
          </View>
        ) : isLoading ? null : (
          <View style={baseStyles.viewPromptRibbon}>
            <Text style={baseStyles.textPromptRibbon}>
              No live LTP bookings to show.
            </Text>
            <Text style={baseStyles.textPromptRibbon}>
              Showing sample data for Lyndon
            </Text>
          </View>
        )
      ) : (
        <View style={baseStyles.viewPromptRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data for Lyndon
          </Text>
        </View>
      )}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing Service Measures'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <View>
          <LtpBookingsList items={itemsToShow} />
        </View>
      )}
    </View>
  );
};

const titleString = 'LTP Bookings';
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
        name={Platform.OS === 'ios' ? 'calendar' : 'calendar'}
        size={size}
      />
    ),
  };
};
