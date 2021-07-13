import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
// import HeaderButton from '../components/HeaderButton';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
// import { getDealerWipsRequest } from '../actions/serviceMeasures';
// import { getDealerToolsRequest } from '../actions/dealerTools';
import ServiceMeasuresList from './ServiceMeasuresList';
// import Colors from '../constants/Colors';
import searchItems from '../helpers/searchItems';
// import userDummyData from '../dummyData/userDummyData.js';
import serviceMeasuresDummyData from '../dummyData/serviceMeasuresDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

const minSearchLength = 1;

export default ServiceMeasuresScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const serviceMeasuresItems = useSelector(
    (state) => state.serviceMeasures.serviceMeasuresItems
  );
  const [searchInput, setSearchInput] = useState('');
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userRequestedDemo = useSelector((state) => state.user.requestedDemo);
  const isLoading = useSelector((state) => state.stats.isLoading);
  const dataError = useSelector((state) => state.stats.error);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);

  //   console.log('in serviceMeasures screen - userDataObj is set to ', userDataObj);

  const userApiFetchParamsObj = {
    dealerId: (userDataObj && userDataObj.dealerId) || null,
    intId: (userDataObj && userDataObj.intId.toString()) || null,
  };

  //   console.log(
  //     'in serviceMeasures screen - userApiFetchParamsObj is set to ',
  //     userApiFetchParamsObj,
  //     'serviceMeasuresItems ',
  //     serviceMeasuresItems
  //   );

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getServiceMeasuresData', getServiceMeasuresData);

  //   const { navigation } = props;

  const getItems = useCallback(async (userApiFetchParamsObj) => {
    // console.log(
    //   'in serviceMeasures getItems userApiFetchParamsObj',
    //   userApiFetchParamsObj
    // );
    dispatch(getServiceMeasuresRequest(userApiFetchParamsObj)),
      [serviceMeasuresItems];
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

  //   useEffect(() => {
  //     // runs only once
  //     console.log('in serviceMeasures useEffect', userApiFetchParamsObj);
  //     //   setGetWipsDataObj(userApiFetchParamsObj);
  //     getItemsAsync();
  //   }, [userApiFetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        revalidateUserCredentials({
          calledBy: 'ServiceMeasures Screen',
        })
      );
      console.log('in serviceMeasures focusffect ');
      setSearchInput('');
      getItemsAsync();
    }, [])
  );

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

  //   let uniqueServiceMeasuresSorted = sortObjectList(
  //     unsortedUniqueServiceMeasures,
  //     'loanToolNo',
  //     'asc'
  //   );

  //   setUniqueserviceMeasureItems(serviceMeasuresItems);

  const serviceMeasuresItemsDataCount = 0;

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(serviceMeasuresItems, searchInput);
      //   console.log(
      //     'ServiceMeasures Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'ServiceMeasures: ',
      //     serviceMeasuresItems && serviceMeasuresItems.length,
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

  //   const items = (!isLoading && !dataError && serviceMeasuresItems) || [];

  const items =
    !isLoading && !dataError
      ? userRequestedDemo
        ? serviceMeasuresDummyData
        : serviceMeasuresItems
      : [];

  //   let itemsToShow =
  //     searchInput && searchInput.length > minSearchLength ? filteredItems : items;

  let itemsToShow = !isLoading
    ? searchInput && searchInput.length > minSearchLength
      ? filteredItems
      : items
    : [];

  //   console.log(
  //     'rendering ServiceMeasures screen, dataError:',
  //     dataError,
  //     'filteredItems',
  //     filteredItems && filteredItems.length,
  //     ' itemsToShow length',
  //     (itemsToShow && itemsToShow.length) || '0'
  //   );

  return (
    <View style={baseStyles.containerFlex}>
      <SearchBarWithRefresh
        dataName={'ServiceMeasures items'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={serviceMeasuresItems.length}
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
              No service measures to show.
            </Text>
          </View>
        )
      ) : (
        <View style={baseStyles.viewPromptRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Complete these on Tools Infoweb.
          </Text>
        </View>
      )}
      {userRequestedDemo ? (
        <View style={baseStyles.viewDummyDataRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data - change in menu.
          </Text>
          <Ionicons name='arrow-up' size={20} color={Colors.vwgWhite} />
        </View>
      ) : null}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing Service Measures'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          <ServiceMeasuresList items={itemsToShow} showFullDetails={true} />
        </ScrollView>
      )}
    </View>
  );
};
const titleString = 'Serv Measures';
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
        name={Platform.OS === 'ios' ? 'checkbox' : 'checkbox'}
        size={size}
      />
    ),
  };
};
