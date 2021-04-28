import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { createFilter } from 'react-native-search-filter';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
// import HeaderButton from '../components/HeaderButton';
import { revalidateUserCredentials } from '../actions/user';
import { getProductsRequest } from '../actions/products';
import Urls from '../constants/Urls';
import ProductsLinks from './ProductsLinks';
// import Colors from '../constants/Colors';
// import productsDummyData from '../dummyData/productsDummyData.js';

const KEYS_TO_FILTERS = ['headline', 'newstext'];

const checkUrl = (rawUrl) => {
  if (rawUrl.substring(0, 4) == 'http') {
    return rawUrl;
  } else {
    return Urls.toolsInfoweb + '/' + rawUrl;
  }
};

export default ProductsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();
  const productsItems = useSelector((state) => state.products.productsItems);
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userData = useSelector((state) => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;
  //   const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dataError = useSelector((state) => state.products.error);
  const dataStatusCode = useSelector((state) => state.products.statusCode);
  const dataErrorUrl = useSelector((state) => state.products.dataErrorUrl);
  //   const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [browserResult, setBrowserResult] = useState(null);

  //   const { navigation } = props;

  if (productsItems && productsItems.length > 0) {
    // console.log('in products screen,productsItems', productsItems.length);
  } else {
    // console.log('in products screen, no productsItems');
  }
  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);

  const getItems = useCallback(async () => dispatch(getProductsRequest()), [
    productsItems,
  ]);

  //   useEffect(() => {
  //     // runs only once
  //     const getItemsAsync = async () => {
  //       //   console.log('in products use effect');
  //       setIsRefreshNeeded(false);
  //       getItems();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  useFocusEffect(
    useCallback(() => {
      const getItemsAsync = async () => {
        getItems();
      };
      //   if (searchInput && searchInput.length > 0) {
      //     setSearchInput('');
      //   }
      dispatch(
        revalidateUserCredentials({
          calledBy: 'ProductsScreen',
        })
      );
      setSearchInput('');
      getItemsAsync();
    }, [])
  );

  const pressOpenHandler = async (url) => {
    // console.log('in pressOpenHandler', url);
    let checkedUrl = checkUrl(url);

    if (Platform.OS === 'ios') {
      //   let result = await WebBrowser.openAuthSessionAsync(checkedUrl);
      WebBrowser.dismissBrowser();
      let result = await WebBrowser.openBrowserAsync(checkedUrl);
      setBrowserResult(result);
    } else {
      //   WebBrowser.dismissBrowser();
      let result = await WebBrowser.openBrowserAsync(checkedUrl);
      setBrowserResult(result);
    }
  };

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     if (searchInput && searchInput.length > 0) {
  //       setSearchInput('');
  //     }
  //     setIsRefreshNeeded(true);
  //   });

  const searchInputHandler = (searchInput) => {
    // console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler');
    getItems();
  };

  //   console.log('productsItems AREEEEEEEEEE', productsItems);
  const items = (!isLoading && !dataError && productsItems) || [];
  //   console.log('items AREEEEEEEEEE', items);
  //   console.log(
  //     'isLoading ',
  //     isLoading,
  //     'dataError ',
  //     dataError,
  //     ' items ',
  //     items.length
  //   );

  const filteredItems =
    (!isLoading && items.filter(createFilter(searchInput, KEYS_TO_FILTERS))) ||
    [];

  console.log('rendering Products screen');

  return (
    <View style={baseStyles.containerFlexAndReducedMargin}>
      {/* <Text>{browserResult && JSON.stringify(browserResult)}</Text> */}
      <SearchBarWithRefresh
        dataName={'products'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        isLoading={isLoading}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        dataCount={productsItems.length}
      />
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing product news items'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <ScrollView>
          {filteredItems && filteredItems.length > 0 ? (
            <View style={baseStyles.viewPromptRibbon}>
              <Text style={baseStyles.textPromptRibbon}>
                Touch a product to see more on Tools Infoweb.
              </Text>
            </View>
          ) : null}
          <ProductsLinks
            items={filteredItems}
            pressOpenHandler={pressOpenHandler}
            baseImageUrl={Urls.productsHeadlineImage}
            userIntId={userData && userData.intId}
          />
        </ScrollView>
      )}
    </View>
  );
};
const titleString = 'Key Products';
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
        name={Platform.OS === 'ios' ? 'speedometer' : 'speedometer'}
        size={size}
      />
    ),
  };
};
