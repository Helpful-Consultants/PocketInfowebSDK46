import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Button, Divider, Input, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { createFilter } from 'react-native-search-filter';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import BadgedTabBarText from '../components/BadgedTabBarText';
import TabBarIcon from '../components/TabBarIcon';
// import HeaderButton from '../components/HeaderButton';
import sortObjectList from '../helpers/sortObjectList';
import { revalidateUserCredentials } from '../actions/user';
import { getDealerToolsRequest } from '../actions/dealerTools';
import {
  getDealerWipsRequest,
  deleteDealerWipRequest,
} from '../actions/dealerWips';
import { getLtpRequest } from '../actions/ltp';
import { createDealerWipRequest } from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import Types from '../constants/Types';
import DealerToolsList from './DealerToolsList';

import searchItems from '../helpers/searchItems';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const minSearchLength = 1;

const screenHeight = Math.round(Dimensions.get('window').height);
const maxModalHeight = screenHeight - 150;
const screenWidth = Math.round(Dimensions.get('window').width);
const bottomTabHeight = screenHeight && screenHeight > 1333 ? 100 : 80;
// console.log('bottomTabHeight', bottomTabHeight && bottomTabHeight);

const formReducer = (state, action) => {
  if (action.type === Types.FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

// const identifyUnavailableTool = (toolId, unavailableToolsArr) => {
//   let retValue = null;
//   unavailableToolsArr.forEach((item, index) => {
//     // console.log(item.tools_id);
//     if (item.tools_id && item.tools_id === toolId) {
//       //   console.log('match on', item.tools_id);
//       retValue = index;
//     }
//   });
//   return retValue;
// };

const getUnavailableToolDetails = (toolId, unavailableToolsArr) => {
  let retValue = null;

  unavailableToolsArr.forEach((item, index) => {
    if (item.tools_id && item.tools_id === toolId) {
      //   console.log('match on', item.tools_id);
      retValue = `Unavailable. Now booked out to ${
        item.updatedBy && item.updatedBy
      }, job ${item.wipNumber && item.wipNumber}`;
    }
  });
  //   console.log(
  //     'in identifyUnavailableTool',
  //     toolId,
  //     unavailableToolsArr,
  //     'retvalue',
  //     retValue
  //   );
  return retValue;
};

const getWipIdByWipNumber = (wipNumber, userIntId, dealerWips) => {
  let retValue = null;
  //   if (dealerWips && dealerWips.length) {
  //     console.log('dealerWips[0]', dealerWips[0]);
  //   }
  dealerWips.forEach((item) => {
    // console.log(
    //   'in loop',
    //   item.wipNumber && item.wipNumber,
    //   item.id && item.id
    // );
    if (
      item.wipNumber &&
      item.wipNumber === wipNumber &&
      item.userIntId &&
      item.userIntId.toString() === userIntId
    ) {
      //   console.log('match on', item.tools_id);
      retValue = item.id.toString();
    }
  });
  //   console.log(
  //     'in getWipIdByWipNumber',
  //     'wipNumber',
  //     wipNumber,
  //     'userIntId',
  //     userIntId,
  //     'dealerWips',
  //     dealerWips.length,
  //     'retvalue',
  //     retValue
  //   );
  return retValue;
};

export default FindToolsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const dispatch = useDispatch();
  const userApiFetchParamsObj = useSelector(
    (state) => state.user.userApiFetchParamsObj
  );
  const userName = useSelector((state) => state.user.userName);
  const userBrand = useSelector((state) => state.user.userBrand);

  const dealerToolsItems = useSelector(
    (state) => state.dealerTools.dealerToolsItems
  );
  const dealerWipsItems = useSelector(
    (state) => state.dealerWips.dealerWipsItems
  );
  const ltpItems = useSelector((state) => state.ltp.ltpItems);
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const isLoadingTools = useSelector((state) => state.dealerTools.isLoading);
  const dataErrorTools = useSelector((state) => state.dealerTools.error);
  const dataErrorUrlTools = useSelector(
    (state) => state.dealerTools.dataErrorUrl
  );
  const dataStatusCodeTools = useSelector(
    (state) => state.dealerTools.statusCode
  );
  const isLoadingWips = useSelector((state) => state.dealerWips.isLoading);
  const isSendingWip = useSelector((state) => state.dealerWips.isSending);
  const dataErrorWips = useSelector((state) => state.dealerWips.error);
  const dataErrorUrlWips = useSelector(
    (state) => state.dealerWips.dataErrorUrl
  );
  const dataStatusCodeWips = useSelector(
    (state) => state.dealerWips.statusCode
  );

  const lastWipProcessed = useSelector(
    (state) => state.dealerWips.lastWipProcessed
  );
  const isLoadingLtp = useSelector((state) => state.ltp.isLoading);
  const dataErrorLtp = useSelector((state) => state.ltp.error);
  const dataErrorUrlLtp = useSelector((state) => state.ltp.dataErrorUrl);
  const dataStatusCodeLtp = useSelector((state) => state.ltp.statusCode);

  const [isLoadingAny, setIsLoadingAny] = useState(false);
  const [dataNameInPlay, setDataNameInPlay] = useState('');
  const [dataErrorAny, setDataErrorAny] = useState('');
  const [dataStatusCodeAny, setDataStatusCodeAny] = useState('');
  const [dataErrorUrlAny, setDataErrorUrlAny] = useState('');
  const [dataErrorSummary, setDataErrorSummary] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [uniqueLtpItems, setUniqueLtpItems] = useState([]);
  const [combinedItems, setCombinedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [bookedToolsList, setBookedToolsList] = useState([]);
  const [isBasketVisible, setIsBasketVisible] = useState(true);
  const [isDupPickedAlertVisible, setIsDupPickedAlertVisible] = useState(false);
  const [mode, setMode] = useState('list');
  const [toolBasket, setToolBasket] = useState([]);
  const [wipNumber, setWipNumber] = useState('');

  const input = React.createRef();
  //   const userDataCount =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  const insets = useSafeArea();

  const getWipsItems = useCallback((userApiFetchParamsObj) => {
    // console.log('in getWipsItems', userApiFetchParamsObj);
    dispatch(getDealerWipsRequest(userApiFetchParamsObj)), [dealerWipsItems];
  });

  const getWipsItemsAsync = async () => {
    console.log(
      'find tools - getWipsItemsAsync, userApiFetchParamsObj is',
      userApiFetchParamsObj
    );
    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    )
      getWipsItems(userApiFetchParamsObj);
  };

  const getOtherItems = useCallback(async () => {
    // console.log('in getOtherItems');
    console.log(
      'find tools - getOtherItems, userApiFetchParamsObj is',
      userApiFetchParamsObj
    );
    dispatch(getDealerToolsRequest(userApiFetchParamsObj));
    // dispatch(getDealerWipsRequest(userApiFetchParamsObj));
    if (!ltpItems || ltpItems.length === 0) {
      dispatch(getLtpRequest());
    }
  });

  const getOtherItemsAsync = async () => {
    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getOtherItems(userApiFetchParamsObj);
    }
  };

  const dispatchNewWip = useCallback(
    (wipObj) =>
      dispatch(createDealerWipRequest({ wipObj, userApiFetchParamsObj })),
    [userApiFetchParamsObj] // something that doesn't change
  );

  const deleteDealerWip = useCallback(
    (payload) => dispatch(deleteDealerWipRequest(payload)),
    [dealerWipsItems]
  );

  const saveToJob = (wipObj) => {
    dispatchNewWip(wipObj);
  };

  useEffect(() => {
    // runs only once
    console.log(
      'in findtools, isSendingWip is ',
      isSendingWip,
      'code is ',
      dataStatusCodeWips
    );
    if (isSendingWip === false) {
      if (dataStatusCodeWips === 201) {
        // console.log(
        //   'isSendingWip is ',
        //   isSendingWip,
        //   'code is 201',
        //   lastWipProcessed && lastWipProcessed,
        //   dataStatusCodeWips,
        //   'mode is ',
        //   mode
        // );
        setMode('confirm');
      } else if (dataStatusCodeWips === 409) {
        // console.log(
        //   'isSendingWip is ',
        //   isSendingWip,
        //   'code is 409',
        //   dataStatusCodeWips,
        //   lastWipProcessed && lastWipProcessed,
        //   'mode is ',
        //   mode
        // );
        if (mode === 'sending') {
          //   console.log(
          //     'changing mode to unavailable, userApiFetchParamsObj is ',
          //     userApiFetchParamsObj
          //   );
          //   console.log('unavailable ', lastWipProcessed && lastWipProcessed);
          if (
            lastWipProcessed &&
            lastWipProcessed.tools &&
            lastWipProcessed.tools.length > 0
          ) {
            // console.log('some unavailable');
            setMode('some-unavailable');
            markUnavailableBasketItems();
            getWipsItemsAsync();
          } else {
            // console.log('all unavailable');
            setMode('all-unavailable');
            getWipsItemsAsync();
          }
        }
      }
    }
  }, [isSendingWip]);

  useEffect(() => {
    getWipsItemsAsync();
    getOtherItemsAsync();
  }, [userApiFetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      console.log(
        'find tools - useFocusEffect, userApiFetchParamsObj is',
        userApiFetchParamsObj
      );
      dispatch(revalidateUserCredentials({ calledBy: 'FindToolsScreen' }));
      setSearchInput('');
      getWipsItemsAsync();
    }, [userApiFetchParamsObj])
  );

  useEffect(() => {
    let bookedToolsList = [];

    dealerWipsItems &&
      dealerWipsItems.forEach((wip) => {
        if (wip.tools && wip.tools.length > 0) {
          wip.tools.forEach((tool) => bookedToolsList.push(tool.tools_id));
        }
      });
    setBookedToolsList(bookedToolsList);
  }, [dealerWipsItems]);

  useEffect(() => {
    // runs only once
    // console.log('in tools use effect');
    if (isLoadingUser || isLoadingTools || isLoadingWips || isLoadingLtp) {
      setIsLoadingAny(true);
    } else {
      setIsLoadingAny(false);
    }
  }, [isLoadingUser, isLoadingTools, isLoadingWips, isLoadingLtp]);

  useEffect(() => {
    // runs only once
    if (dataErrorTools) {
      setDataErrorAny(dataErrorTools);
      setDataStatusCodeAny(dataStatusCodeTools);
      setDataErrorUrlAny(dataErrorUrlTools);
      setDataErrorSummary('Error syncing tools');
      setDataNameInPlay('tools');
    } else if (dataErrorWips) {
      setDataErrorAny(dataErrorWips);
      setDataStatusCodeAny(dataStatusCodeWips);
      setDataErrorUrlAny(dataErrorUrlWips);
      setDataErrorSummary('Error syncing jobs');
      setDataNameInPlay('jobs');
    } else if (dataErrorLtp) {
      setDataErrorAny(dataErrorLtp);
      setDataStatusCodeAny(dataStatusCodeLtp);
      setDataErrorUrlAny(dataErrorUrlLtp);
      setDataErrorSummary('Error syncing LTP');
      setDataNameInPlay('LTP');
      // } else if (
      //   !isLoadingTools &&
      //   dealerToolsItems &&
      //   dealerToolsItems.length === 0
      // ) {
      //   //   console.log('empty tools items');
      //   setDataErrorAny('Does your site have a tools list?');
      //   setDataStatusCodeAny(dataStatusCodeTools);
      //   setDataErrorUrlAny('');
      //   setDataErrorSummary('No tools fetched from web server');
      //   setDataNameInPlay('tools');
      // } else if (!isLoadingLtp && ltpItems && ltpItems.length === 0) {
      //   //   console.log('empty ltp items', ltpItems);
      //   setDataErrorAny('The LTP list should not be empty. Please refresh.');
      //   setDataStatusCodeAny(dataStatusCodeLtp);
      //   setDataErrorUrlAny('');
      //   setDataErrorSummary(
      //     'No LTP items fetched from web server. Please try again.'
      //   );
      //   setDataNameInPlay('LTP');
    } else {
      setDataErrorAny('');
      setDataStatusCodeAny('');
      setDataErrorUrlAny('');
      setDataErrorSummary('');
      setDataNameInPlay('');
    }
  }, [
    dataErrorTools,
    dataErrorWips,
    dataErrorLtp,
    dealerToolsItems,
    ltpItems,
    isLoadingTools,
    isLoadingLtp,
  ]);

  useEffect(() => {
    // console.log('getting unique LTP items', ltpItems && ltpItems.length);
    // console.log('userBrand is ', userBrand);
    let ltpItemsAll = (ltpItems && ltpItems.length > 0 && ltpItems) || [];
    let ltpItemsFiltered = [];
    if (userBrand) {
      //   console.log('userBrand is ', userBrand);
      ltpItemsFiltered =
        userBrand &&
        ltpItemsAll.filter((item) => item[userBrand] === ('Y' || 'y'));
    } else {
      //   console.log('userBrand isnt : ', userBrand);
      ltpItemsFiltered = ltpItemsAll.filter(
        (item) =>
          item.au === ('Y' || 'y') ||
          item.cv === ('Y' || 'y') ||
          item.se === ('Y' || 'y') ||
          item.sk === ('Y' || 'y') ||
          item.vw === ('Y' || 'y')
      );
    }

    let unsortedUniqueLtpItems =
      ltpItemsFiltered.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.orderPartNo === item.orderPartNo)
      ) || [];

    let uniqueLtpItemsSorted = sortObjectList(
      unsortedUniqueLtpItems,
      'loanToolNo',
      'asc'
    );

    setUniqueLtpItems(uniqueLtpItemsSorted);
    // console.log('filtered items', uniqueLtpItemsTemp);
  }, [ltpItems, userBrand]);

  useEffect(() => {
    let concatItems = dealerToolsItems.concat(uniqueLtpItems);
    setCombinedItems(concatItems);
  }, [dealerToolsItems, uniqueLtpItems]);

  const selectItemHandler = (tool, lastPerson) => {
    // console.log('in selectItemHandler');
    let dup =
      (toolBasket && toolBasket.filter((item) => item.id === tool.id)) || [];

    if (dup.length === 0) {
      const pickedTool = { ...tool, lastPerson };
      setToolBasket([...toolBasket, pickedTool]);
      setMode('basket');
      setIsBasketVisible(true);
    } else {
      setMode('basket');
      setIsBasketVisible(false);
      setIsDupPickedAlertVisible(true);
    }
    // console.log(toolBasket && toolBasket);
  };

  const cancelDupPickedHandler = () => {
    setIsDupPickedAlertVisible(false);
    setIsBasketVisible(true);
  };

  const deleteWipRequestHandler = () => {
    const wipNumber = (lastWipProcessed && lastWipProcessed.wipNumber) || '';
    // console.log(
    //   'in deleteWipRequestHandler last wip',
    //   lastWipProcessed && lastWipProcessed
    // );

    const wipId =
      (wipNumber && lastWipProcessed.wipId) ||
      getWipIdByWipNumber(
        wipNumber,
        userApiFetchParamsObj.intId,
        dealerWipsItems
      );

    const wipObj = {
      wipNumber: wipNumber,
      id: wipId,
      userIntId: userApiFetchParamsObj.intId,
      dealerId: userApiFetchParamsObj.dealerId,
    };

    let payload = {
      dealerId: userApiFetchParamsObj.dealerId,
      wipObj: wipObj,
      userApiFetchParamsObj: userApiFetchParamsObj,
    };

    console.log('in deleteWipRequestHandler', payload);
    setToolBasket([]);
    setMode('list');
    setIsBasketVisible(false);
    inputChangeHandler('wipNumber', '');
    deleteDealerWip(payload);
  };

  const removeBasketHandler = () => {
    setToolBasket([]);
    setMode('list');
    setIsBasketVisible(false);
  };

  const bookToolsHandler = () => {
    setMode('book');
    setWipNumber('');
    setIsBasketVisible(true);
  };

  const backdropPressHandler = () => {
    if (mode === 'all-unavailable') {
      console.log(
        'inbackdropPressHandler, calling acceptNotBookedMessageHandler'
      );
      acceptNotBookedMessageHandler();
      setIsBasketVisible(false);
    }
  };

  const basketBackHandler = () => {
    inputChangeHandler('wipNumber', '');
    setMode('basket');
  };

  const removeBasketItemHandler = (deadItemId) => {
    if (toolBasket && toolBasket.length > 1) {
      const newBasket = toolBasket.filter((item) => item.id !== deadItemId);
      setToolBasket(newBasket);
    } else {
      removeBasketHandler();
    }
  };

  const markUnavailableBasketItems = () => {
    let unavailableToolIdsArr = [];
    lastWipProcessed.unavailableTools.forEach((item) => {
      // console.log(item.tools_id);
      unavailableToolIdsArr.push(item.tools_id);
    });
    // console.log('lastWipProcessed', lastWipProcessed);
    // console.log('unavailableToolIdsArr', unavailableToolIdsArr);
    // console.log('old toolBasket', toolBasket);
    let newToolBasket = toolBasket.map((item) => {
      return {
        ...item,
        unavailable: unavailableToolIdsArr.includes(item.id) ? true : false,
      };
    });
    // console.log('newToolBasket', newToolBasket);
    setToolBasket(newToolBasket);
  };

  const addBasketItemHandler = () => {
    // console.log('in addBasketItemHandler');
    setMode('list');
    setIsBasketVisible(false);
  };

  const toggleBaskethandler = (action) => {
    // console.log('in toggleBaskethandler');
    if (action) {
      setIsBasketVisible(action);
      setMode('basket');
    } else {
      setMode('basket');
      setIsBasketVisible(!isBasketVisible);
    }
  };

  const acceptMessageHandler = () => {
    removeBasketHandler();
    setMode('list');
    setIsBasketVisible(false);
    inputChangeHandler('wipNumber', '');
  };

  const dropUnavailableHandler = () => {
    // console.log('in dropUnavailableHandler');
    // console.log('old toolBasket before drop', toolBasket);
    let newToolBasket = toolBasket.filter(
      (item) => !item.unavailable || item.unavailable === false
    );
    // console.log('newToolBasket after drop', newToolBasket);
    setToolBasket(newToolBasket);
    setMode('confirm-revised-list');
  };

  const acceptNotBookedMessageHandler = () => {
    removeBasketHandler();
    setMode('list');
    setIsBasketVisible(false);
    inputChangeHandler('wipNumber', '');
    deleteWipRequestHandler();
  };

  //   if (this.timeout) {
  //     clearTimeout(this.timeout);
  //   }
  //   this.timeout = setTimeout(() => {
  //     console.log('timeout');
  //   }, 2000);

  const searchInputHandler = (searchInput) => {
    console.log('searchInputHandler ' + searchInput);
    setSearchInput(searchInput);

    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(combinedItems, searchInput);
      setFilteredItems(newFilteredItems);
      console.log('searchInputHandler ' + newFilteredItems);
    }
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getOtherItemsAsync();
  };

  const saveToJobRequestHandler = () => {
    const removeLastWip = (item) => {
      const newItem = { ...item };
      delete newItem.lastWIP;
      return newItem;
    };
    if (formState.formIsValid) {
      setWipNumber(formState.inputValues.wipNumber);
      setMode('sending');
      setIsBasketVisible(true);

      let newToolBasket = toolBasket.map((item) => removeLastWip(item));

      const wipObj = {
        wipNumber: formState.inputValues.wipNumber.toString(),
        createdBy: userName,
        createdDate: new Date(),
        userIntId: userApiFetchParamsObj.intId,
        dealerId: userApiFetchParamsObj.dealerId,
        tools: newToolBasket,
      };

      saveToJob(wipObj);
      inputChangeHandler('wipNumber', '');
    } else {
      setMode('book');
      setIsBasketVisible(true);
    }
  };

  let itemsToShow =
    searchInput && searchInput.length > minSearchLength
      ? filteredItems.slice(0, 100)
      : combinedItems.slice(0, 100);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: { wipNumber: '' },
    inputValidities: {
      wipNumber: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, text) => {
      //   console.log('inputChangeHandler', text && text);
      let isValid = false;
      if (text.trim().length > 0) {
        isValid = true;
      }
      dispatchFormState({
        type: Types.FORM_INPUT_UPDATE,
        value: text,
        isValid: isValid,
        inputId: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  //   console.log('toolBasket is', toolBasket);

  let basketActionRows = null;

  basketActionRows =
    mode === 'book' ? (
      <View>
        <View style={baseStyles.viewRowBasketInput}>
          <View style={baseStyles.viewRowFlex}>
            <View style={baseStyles.viewRowFullWidth}>
              <Input
                ref={input}
                style={baseStyles.viewRowFlex}
                inputStyle={baseStyles.textBasketInputJob}
                value={formState.inputValues.wipNumber}
                onChangeText={inputChangeHandler.bind(this, 'wipNumber')}
                placeholder='Job number/job name'
                required
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='done'
                onSubmitEditing={(text) => console.log(text)}
                errorStyle={{ color: Colors.errorText }}
                errorText='Job number'
              />
            </View>
          </View>
        </View>
        <View style={styles.basketTipRow}>
          <View style={baseStyles.viewRowFlex}>
            <View style={{ ...baseStyles.viewRowFullWidth, paddingBottom: 5 }}>
              {formState.inputValues.wipNumber &&
              formState.inputValues.wipNumber.length > 0 ? (
                <Text>{` `}</Text>
              ) : (
                <Text style={baseStyles.text}>
                  Please record a job number or job name to book to.
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={baseStyles.viewRowBasket}>
          <Button
            title='Back'
            type='outline'
            onPress={() => basketBackHandler()}
            titleStyle={baseStyles.buttonTitleWithIconCancel}
            buttonStyle={baseStyles.buttonCancel}
            icon={
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'return-down-back'
                    : 'return-down-back'
                }
                size={20}
                color={Colors.vwgWarmRed}
              />
            }
          />
          <Button
            title='Confirm'
            disabled={formState.formIsValid ? false : true}
            type='solid'
            onPress={() => {
              saveToJobRequestHandler();
              setMode('sending');
              setIsBasketVisible(true);
            }}
            titleStyle={baseStyles.buttonTitleWithIcon}
            buttonStyle={baseStyles.buttonConfirm}
            icon={
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'checkmark-circle-outline'
                    : 'checkmark-circle-outline'
                }
                size={20}
                color={Colors.vwgWhite}
              />
            }
          />
        </View>
      </View>
    ) : mode === 'sending' && isSendingWip ? (
      <View>
        <View style={baseStyles.viewRowBasket}>
          <View style={baseStyles.viewRowFlexLeftPadded}>
            <ActivityIndicator size='small' color={Colors.vwgDeepBlue} />
            <View>
              <Text style={baseStyles.textColoured}>
                {`  ${toolBasket.length} ${
                  toolBasket.length === 1 ? `tool` : `tools`
                } being booked to `}
              </Text>
              <Text style={baseStyles.textColoured}>
                {`  job ${wipNumber}...`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    ) : mode === 'confirm' ? (
      <View>
        <View style={baseStyles.viewRowBasket}>
          <View style={baseStyles.viewNoPadding}>
            <Text style={baseStyles.textConfirmation}>
              {`${toolBasket.length} ${
                toolBasket.length === 1 ? `tool` : `tools`
              } succesfully booked out to you on job '${wipNumber}'.`}
            </Text>
          </View>
        </View>
        <View style={baseStyles.viewRowBasket}>
          <Button
            title='Close'
            type='clear'
            onPress={() => {
              acceptMessageHandler();
            }}
            titleStyle={baseStyles.buttonTitle}
            buttonStyle={baseStyles.buttonClose}
          />
        </View>
      </View>
    ) : mode === 'basket' ? (
      <View>
        <View
          style={
            ({ ...baseStyles.viewRowBasket },
            { alignItems: 'flex-end', marginTop: 10, paddingBottom: 10 })
          }
        >
          <TouchableOpacity
            style={baseStyles.viewRowBasket}
            onPress={() => addBasketItemHandler()}
          >
            <Ionicons
              name={Platform.OS === 'ios' ? 'add-circle' : 'add-circle'}
              size={20}
              color={Colors.vwgLink}
            />
            <Text
              style={{
                ...baseStyles.textLinkLarger,
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
              }}
            >
              {` Add another tool`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={baseStyles.viewRowBasket}>
          <Button
            title='Cancel'
            type='outline'
            onPress={() => removeBasketHandler()}
            titleStyle={baseStyles.buttonTitleWithIconCancel}
            buttonStyle={baseStyles.buttonCancel}
            icon={
              <Ionicons
                name={Platform.OS === 'ios' ? 'close-circle' : 'close-circle'}
                size={20}
                color={Colors.vwgWarmRed}
              />
            }
          />
          <Button
            title={
              toolBasket.length === 1
                ? `Book out this tool`
                : `Book out these tools`
            }
            type='solid'
            onPress={() => bookToolsHandler()}
            titleStyle={baseStyles.buttonTitleWithIcon}
            buttonStyle={baseStyles.buttonConfirm}
            icon={
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'checkmark-circle'
                    : 'checkmark-circle'
                }
                size={20}
                color={Colors.vwgWhite}
              />
            }
          />
        </View>
      </View>
    ) : mode === 'confirm-revised-list' ? (
      <View>
        <View style={baseStyles.viewRowBasket}>
          <View style={baseStyles.viewNoPadding}>
            <Text style={baseStyles.textConfirmation}>
              {`${
                lastWipProcessed.unavailableTools &&
                lastWipProcessed.unavailableTools.length > 1
                  ? `These items have been booked to job`
                  : `This item has been booked to job`
              } '${lastWipProcessed.wipNumber}'.`}
            </Text>
          </View>
        </View>
        <View style={baseStyles.viewRowBasket}>
          <Button
            title='Close'
            type='clear'
            onPress={() => {
              acceptMessageHandler();
            }}
            titleStyle={baseStyles.buttonTitle}
            buttonStyle={baseStyles.buttonClose}
          />
        </View>
      </View>
    ) : mode === 'some-unavailable' ? (
      <View>
        <View style={baseStyles.viewRowBasket}>
          <View style={baseStyles.viewNoPadding}>
            <Text style={baseStyles.textLeftAlignedLarge}>
              {`Someone else has recently booked the item${
                lastWipProcessed.unavailableTools &&
                lastWipProcessed.unavailableTools.length > 1
                  ? `s`
                  : ``
              } marked above. Do you want to keep the other item${
                lastWipProcessed.unavailableTools &&
                lastWipProcessed.unavailableTools.length > 1
                  ? `s`
                  : ``
              } booked out or cancel the whole booking?`}
            </Text>
          </View>
        </View>
        <View style={baseStyles.viewRowBasket}>
          <Button
            title='Cancel booking'
            type='outline'
            onPress={() => deleteWipRequestHandler()}
            titleStyle={baseStyles.buttonTitleWithIconCancel}
            buttonStyle={baseStyles.buttonCancel}
            icon={
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'close-circle-outline'
                    : 'close-circle-outline'
                }
                size={20}
                color={Colors.vwgWarmRed}
              />
            }
          />
          <Button
            title={
              lastWipProcessed.unavailableTools &&
              toolBasket.length > 0 &&
              toolBasket.length - lastWipProcessed.unavailableTools.length > 1
                ? `Keep available`
                : `Keep available`
            }
            type='solid'
            onPress={() => dropUnavailableHandler()}
            titleStyle={baseStyles.buttonTitleWithIcon}
            buttonStyle={baseStyles.buttonConfirm}
            icon={
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'checkmark-circle-outline'
                    : 'checkmark-circle-outline'
                }
                size={20}
                color={Colors.vwgWhite}
              />
            }
          />
        </View>
      </View>
    ) : mode === 'all-unavailable' ? (
      <View>
        <View style={baseStyles.viewRowBasket}>
          <View style={baseStyles.viewNoPadding}>
            <Text style={baseStyles.textLeftAlignedLarge}>
              {`Someone else has recently booked ${
                lastWipProcessed.unavailableTools &&
                lastWipProcessed.unavailableTools.length > 1
                  ? `these items.`
                  : `this item`
              }`}
            </Text>
          </View>
        </View>
        <View style={baseStyles.viewRowBasket}>
          <Button
            title='Close'
            type='clear'
            onPress={() => {
              acceptNotBookedMessageHandler();
            }}
            titleStyle={baseStyles.buttonTitle}
            buttonStyle={baseStyles.buttonClose}
          />
        </View>
      </View>
    ) : null;

  let basketContents = null;

  if (toolBasket && toolBasket.length > 0) {
    basketContents = (
      <View>
        <ScrollView
          style={styles.basketContents}
          showsVerticalScrollIndicator={true}
        >
          <View
            style={{
              ...baseStyles.viewviewRowFlexSpaceBetween,
              paddingTop: 10,
              paddingBottom: 5,
            }}
          >
            <Text style={baseStyles.text}>
              {`${toolBasket.length} ${
                toolBasket.length === 1 ? `tool` : `tools`
              } selected:`}
            </Text>
          </View>

          {toolBasket.map((item, i) => (
            <View key={i}>
              {i > 0 ? (
                <Divider
                  style={{
                    backgroundColor: Colors.vwgDarkGray,
                    marginVertical: 8,
                  }}
                />
              ) : null}
              <View>
                <View
                  style={{
                    ...baseStyles.viewRowFlex,
                    marginBottom: 0,
                    paddingBottom: 5,
                  }}
                >
                  <View style={{ ...baseStyles.viewColumnFlexLeft, width: 70 }}>
                    {item.loanToolNo ? null : (
                      <ScaledImageFinder
                        width={70}
                        item={item}
                        baseImageUrl={
                          item.loanToolNo ? Urls.ltpImage : Urls.toolImage
                        }
                      />
                    )}
                  </View>
                  <View
                    style={{
                      ...baseStyles.basketItemDescCol,
                      width: '72%',
                      paddingLeft: 10,
                    }}
                  >
                    {item.partNumber ? (
                      <Text style={baseStyles.textSmallColoured}>{`${
                        item.partNumber
                      }${
                        item.partNumber &&
                        item.partDescription &&
                        item.partDescription !== item.partNumber
                          ? ` - ${item.partDescription}`
                          : ``
                      }`}</Text>
                    ) : null}
                    {item.toolNumber &&
                    (item.toolType === 'Equipment' ||
                      item.toolType === 'equipment' ||
                      item.toolType === 'Tool' ||
                      item.toolType === 'tool') ? (
                      <Text
                        style={baseStyles.textSmallColoured}
                      >{`Order no: ${item.toolNumber}`}</Text>
                    ) : null}
                    {
                      <Text style={baseStyles.textSmall}>
                        {item.location
                          ? `Location: ${item.location}`
                          : `Location not recorded`}
                      </Text>
                    }
                    {(mode === 'some-unavailable' ||
                      mode === 'all-unavailable') &&
                    item.id &&
                    item.unavailable &&
                    item.unavailable === true ? (
                      <Text
                        style={baseStyles.textSmallError}
                      >{`${getUnavailableToolDetails(
                        item.id,
                        lastWipProcessed.unavailableTools
                      )}`}</Text>
                    ) : null}
                  </View>

                  {mode !== 'sending' &&
                  mode !== 'confirm-revised-list' &&
                  mode !== 'some-unavailable' &&
                  mode !== 'all-unavailable' &&
                  toolBasket.length > 1 ? (
                    <TouchableOpacity
                      style={baseStyles.viewColumnFlexLeft}
                      onPress={() => removeBasketItemHandler(item.id)}
                    >
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'trash' : 'trash'}
                        size={20}
                        color={Colors.vwgWarmRed}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  let drawer = (
    <Modal
      isVisible={isBasketVisible}
      onBackdropPress={() => backdropPressHandler()}
      onSwipeComplete={() => backdropPressHandler()}
      propagateSwipe={true}
      deviceHeight={screenHeight}
      deviceWidth={screenWidth}
      avoidKeyboard={true}
      style={styles.drawerContainer}
      backdropOpacity={0.6}
      animationIn='slideInUp'
      animationOut='slideOutDown'
    >
      <View style={styles.drawerContent}>
        <View>
          {mode === 'basket' ||
          mode === 'confirm-revised-list' ||
          mode === 'some-unavailable' ||
          mode === 'all-unavailable'
            ? basketContents
            : null}
          {basketActionRows}
        </View>
      </View>
    </Modal>
  );

  let backToBasket = (
    <View style={styles.closedBasket}>
      <TouchableOpacity
        onPress={() => {
          toggleBaskethandler(true);
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'basket' : 'basket'}
          size={18}
          color={Colors.vwgWhite}
          iconStyle={{
            marginTop: Platform.OS === 'ios' ? 0 : -4,
          }}
        />
        <Text style={baseStyles.textReopenClosedBasket}>
          {` Back to tool basket`}
          {toolBasket && toolBasket.length > 1
            ? ` (${toolBasket.length} items)`
            : toolBasket && toolBasket.length > 0
            ? ` (${toolBasket.length} item)`
            : null}
        </Text>
      </TouchableOpacity>
    </View>
  );

  //   console.log(
  //     'RENDERING FT screen !!!!!!!!!!!!!!!!!!!m userName',
  //     userName,
  //     itemsToShow.length
  //   );
  //    marginBottom: screenHeight && screenHeight > 1333 ? 140 : 140;

  //   console.log(
  //     'rendering Find Tools screen, userApiFetchParamsObj:',
  //     userApiFetchParamsObj
  //   );

  return (
    <View style={baseStyles.containerFlex}>
      <View
        style={{
          marginBottom:
            mode === 'list' && itemsToShow.length > 0 && toolBasket.length > 0
              ? 170
              : 140,
        }}
      >
        <KeyboardAvoidingView>
          <SearchBarWithRefresh
            dataName={dataNameInPlay}
            someDataExpected={true}
            refreshRequestHandler={refreshRequestHandler}
            searchInputHandler={searchInputHandler}
            searchInput={searchInput}
            isLoading={isLoadingAny}
            dataError={dataErrorAny}
            dataStatusCode={dataStatusCodeAny}
            dataCount={dealerToolsItems.length}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          />

          {mode === 'list' &&
          searchInput.length > minSearchLength &&
          itemsToShow.length === 0 ? (
            <View style={baseStyles.viewPromptRibbonNoneFound}>
              <Text style={baseStyles.textPromptRibbon}>
                Your search found no results.
              </Text>
            </View>
          ) : null}

          {isLoadingAny || dataErrorAny ? null : (
            <View>
              <DealerToolsList
                items={itemsToShow}
                userIntId={
                  (userApiFetchParamsObj && userApiFetchParamsObj.userIntId) ||
                  null
                }
                dealerWipsItems={dealerWipsItems}
                bookedToolsList={bookedToolsList}
                selectItemHandler={selectItemHandler}
                toolBasket={toolBasket}
                toggleBaskethandler={toggleBaskethandler}
                mode={mode}
                searchInput={searchInput}
                showPrompt={
                  mode === 'list' &&
                  toolBasket.length === 0 &&
                  itemsToShow.length > 0
                    ? true
                    : false
                }
              />
            </View>
          )}
          {dataErrorAny ? (
            <ErrorDetails
              errorSummary={dataErrorSummary}
              dataStatusCode={dataStatusCodeAny}
              errorHtml={dataErrorAny}
              dataErrorUrl={dataErrorUrlAny}
            />
          ) : null}
          {isDupPickedAlertVisible ? (
            <AwesomeAlert
              show={isDupPickedAlertVisible}
              showProgress={false}
              title='Duplicate'
              message={`You already have that tool in your basket `}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText='Close'
              confirmButtonColor={Colors.vwgDeepBlue}
              onConfirmPressed={() => {
                cancelDupPickedHandler();
              }}
              titleStyle={{
                ...baseStyles.textCentred,
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
              }}
              confirmButtonTextStyle={{
                ...baseStyles.textCentred,
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
                elevation: Platform.OS === 'ios' ? 0 : 5,
              }}
              confirmButtonStyle={{
                width: 100,
                borderRadius: Platform.OS === 'ios' ? 3 : 2,
                elevation: Platform.OS === 'ios' ? 0 : 5,
              }}
            />
          ) : null}

          {mode !== 'list' && toolBasket.length > 0 ? drawer : null}
        </KeyboardAvoidingView>
      </View>
      {mode === 'list' && itemsToShow.length > 0 && toolBasket.length > 0
        ? backToBasket
        : null}
    </View>
  );
};

const titleString = 'Find Tools';
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
        name={Platform.OS === 'ios' ? 'build' : 'build'}
        size={size}
      />
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: screenHeight && screenHeight > 1333 ? 140 : 140,
  },
  drawerContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
    bottom: 0,
  },
  drawerContent: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginHorizontal: 0,
    padding: 10,
  },
  basketContents: {
    maxHeight: maxModalHeight,
    paddingTop: 0,
    marginBottom: 0,
    paddingHorizontal: 0,
  },
  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  basketTipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
  },
  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closedBasket: {
    position: 'absolute',
    width: '100%',
    height: 30,
    bottom: 0,
    backgroundColor: Colors.vwgLink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
