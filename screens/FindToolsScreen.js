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
import { Button, Divider, Icon, Input, Text } from 'react-native-elements';
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
import sortObjectList from '../components/sortObjectList';
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

import searchItems from '../components/searchItems';
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
    if (isLoadingTools || isLoadingWips || isLoadingLtp) {
      setIsLoadingAny(true);
    } else {
      setIsLoadingAny(false);
    }
  }, [isLoadingTools, isLoadingWips, isLoadingLtp]);

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
      ltpItemsFiltered = ltpItemsAll.filter(
        (item) => item[userBrand] === 'Y' || 'y'
      );
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
    console.log(
      'in deleteWipRequestHandler last wip',
      lastWipProcessed && lastWipProcessed
    );

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
    // console.log('searchInputHandler ' + searchInput);
    setSearchInput(searchInput);

    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(combinedItems, searchInput);
      setFilteredItems(newFilteredItems);
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
        <View style={styles.basketInputRow}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '100%' }}>
              <Input
                ref={input}
                style={{ flexDirection: 'row' }}
                inputStyle={styles.inputStyle}
                number
                value={formState.inputValues.wipNumber}
                onChangeText={inputChangeHandler.bind(this, 'wipNumber')}
                style={styles.inputLabelText}
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
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '100%', fontFamily: 'the-sans' }}>
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
        <View style={styles.basketActionRow}>
          <Button
            title='Back'
            type='outline'
            onPress={() => basketBackHandler()}
            titleStyle={styles.buttonCancelTitle}
            buttonStyle={styles.buttonCancel}
            icon={
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-arrow-round-back'
                    : 'md-arrow-round-back'
                }
                type='ionicon'
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
            titleStyle={styles.buttonConfirmTitle}
            buttonStyle={styles.buttonConfirm}
            icon={
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-checkmark-circle-outline'
                    : 'md-checkmark-circle-outline'
                }
                type='ionicon'
                size={20}
                color={Colors.vwgWhite}
              />
            }
          />
        </View>
      </View>
    ) : mode === 'sending' && isSendingWip ? (
      <View>
        <View style={styles.basketActionRow}>
          <View style={styles.checkingNotice}>
            <ActivityIndicator size='small' color={Colors.vwgDeepBlue} />
            <View>
              <Text style={styles.checkingNoticeText}>
                {`  ${toolBasket.length} ${
                  toolBasket.length === 1 ? `tool` : `tools`
                } being booked to `}
              </Text>
              <Text style={styles.checkingNoticeText}>
                {`  job ${wipNumber}...`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    ) : mode === 'confirm' ? (
      <View>
        <View style={styles.basketActionRow}>
          <View style={styles.confirmedPrompt}>
            <Text style={styles.confirmedPromptText}>
              {`${toolBasket.length} ${
                toolBasket.length === 1 ? `tool` : `tools`
              } succesfully booked out to you on job '${wipNumber}'.`}
            </Text>
          </View>
        </View>
        <View style={styles.basketActionRow}>
          <Button
            title='Close'
            type='clear'
            titleStyle={styles.buttonCloseTitle}
            onPress={() => {
              acceptMessageHandler();
            }}
            titleStyle={styles.buttonCloseConfirmationTitle}
            buttonStyle={styles.buttonCloseConfirmation}
          />
        </View>
      </View>
    ) : mode === 'basket' ? (
      <View>
        <View
          style={
            ({ ...styles.basketActionRow },
            { alignItems: 'flex-end', marginTop: 10, paddingBottom: 10 })
          }
        >
          <TouchableOpacity
            style={styles.basketItemRow}
            onPress={() => addBasketItemHandler()}
          >
            <Icon
              name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
              type='ionicon'
              size={20}
              color={Colors.vwgLink}
            />
            <Text style={styles.basketTextLink}>
              {toolBasket.length === 1
                ? ` Add another tool`
                : ` Add another tool`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.basketActionRow}>
          <Button
            title='Cancel'
            type='outline'
            onPress={() => removeBasketHandler()}
            titleStyle={styles.buttonCancelTitle}
            buttonStyle={styles.buttonCancel}
            icon={
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-close-circle-outline'
                    : 'md-close-circle-outline'
                }
                type='ionicon'
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
            titleStyle={styles.buttonBookTitle}
            buttonStyle={styles.buttonBook}
            icon={
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-checkmark-circle-outline'
                    : 'md-checkmark-circle-outline'
                }
                type='ionicon'
                size={20}
                color={Colors.vwgWhite}
              />
            }
          />
        </View>
      </View>
    ) : mode === 'confirm-revised-list' ? (
      <View>
        <View style={styles.basketActionRow}>
          <View style={styles.confirmedPrompt}>
            <Text style={styles.confirmedPromptText}>
              {`${
                lastWipProcessed.unavailableTools &&
                lastWipProcessed.unavailableTools.length > 1
                  ? `These items have been booked to job`
                  : `This item has been booked to job`
              } '${lastWipProcessed.wipNumber}'.`}
            </Text>
          </View>
        </View>
        <View style={styles.basketActionRow}>
          <Button
            title='Close'
            type='clear'
            titleStyle={styles.buttonCloseTitle}
            onPress={() => {
              acceptMessageHandler();
            }}
            titleStyle={styles.buttonCloseConfirmationTitle}
            buttonStyle={styles.buttonCloseConfirmation}
          />
        </View>
      </View>
    ) : mode === 'some-unavailable' ? (
      <View>
        <View style={styles.basketActionRow}>
          <View style={styles.confirmedPrompt}>
            <Text style={styles.unavailableNoticeText}>
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
        <View style={styles.basketActionRow}>
          <Button
            title='Cancel booking'
            type='outline'
            onPress={() => deleteWipRequestHandler()}
            titleStyle={styles.buttonCancelTitle}
            buttonStyle={styles.buttonCancel}
            icon={
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-close-circle-outline'
                    : 'md-close-circle-outline'
                }
                type='ionicon'
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
            titleStyle={styles.buttonBookTitle}
            buttonStyle={styles.buttonBook}
            icon={
              <Icon
                name={
                  Platform.OS === 'ios'
                    ? 'ios-checkmark-circle-outline'
                    : 'md-checkmark-circle-outline'
                }
                type='ionicon'
                size={20}
                color={Colors.vwgWhite}
              />
            }
          />
        </View>
      </View>
    ) : mode === 'all-unavailable' ? (
      <View>
        <View style={styles.basketActionRow}>
          <View style={styles.confirmedPrompt}>
            <Text style={styles.unavailableNoticeText}>
              {`Someone else has recently booked ${
                lastWipProcessed.unavailableTools &&
                lastWipProcessed.unavailableTools.length > 1
                  ? `these items.`
                  : `this item`
              }`}
            </Text>
          </View>
        </View>
        <View style={styles.basketActionRow}>
          <Button
            title='Close'
            type='clear'
            onPress={() => {
              acceptNotBookedMessageHandler();
            }}
            titleStyle={styles.buttonCloseConfirmationTitle}
            buttonStyle={styles.buttonCloseConfirmation}
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
          <View style={styles.basketSizeRow}>
            <Text style={styles.basketText}>
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
                <View style={styles.basketItemRow}>
                  <View style={styles.basketItemImageCol}>
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
                  <View style={styles.basketItemDescCol}>
                    {item.partNumber ? (
                      <Text style={styles.basketItemTextEmph}>{`${
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
                        style={styles.basketItemTextEmph}
                      >{`Order no: ${item.toolNumber}`}</Text>
                    ) : null}
                    {
                      <Text style={styles.basketItemText}>
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
                        style={styles.basketItemUnavailableText}
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
                      style={styles.buttonTrash}
                      onPress={() => removeBasketItemHandler(item.id)}
                    >
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                        type='ionicon'
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
        <Icon
          name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
          type='ionicon'
          size={18}
          color={Colors.vwgWhite}
          iconStyle={{
            marginTop: Platform.OS === 'ios' ? 0 : -4,
          }}
        />
        <Text style={styles.closedBasketPromptText}>
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

  console.log('rendering Find Tools screen', mode);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
            <View style={styles.noneFoundPromptRibbon}>
              <Text style={styles.promptRibbonText}>
                Your search found no results.
              </Text>
            </View>
          ) : null}

          {isLoadingAny || dataErrorAny ? null : (
            <View style={styles.toolsList}>
              <DealerToolsList
                items={itemsToShow}
                userIntId={userApiFetchParamsObj.userIntId}
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
                fontFamily: 'the-sans',
                textAlign: 'center',
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
              }}
              confirmButtonTextStyle={{
                fontFamily: 'the-sans',
                textAlign: 'center',
                elevation: Platform.OS === 'ios' ? 0 : 5,
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
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

    headerStyle: {
      backgroundColor: Colors.vwgHeader,
    },
    tabBarColor: Colors.vwgWhite,
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
        size={size}
      />
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: screenHeight && screenHeight > 1333 ? 140 : 140,
    // backgroundColor: 'red'
  },
  drawerContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    // marginTop: 140,
    // backgroundColor: 'red',
    // backgroundColor: 'white',
    // paddingHorizontal: 10,
    // position: 'absolute',
    // paddingBottom: 5,
    padding: 0,
    bottom: 0,
    // left: 0,
    // right: 0
    // maxHeight: maxModalHeight
  },
  drawerContent: {
    justifyContent: 'flex-end',
    // margin: 0,
    // marginTop: 140,
    // backgroundColor: 'red',
    backgroundColor: 'white',
    marginHorizontal: 0,
    // position: 'absolute',
    padding: 10,
    // bottom: 0
    // left: 0,
    // right: 0
    // maxHeight: maxModalHeight
  },
  toolsList: {
    // marginBottom: 50,
    backgroundColor: 'transparent',
    // backgroundColor: 'red'
    // height: '80%'
  },
  inputStyle: {
    fontFamily: 'the-sans',
    color: Colors.vwgDarkSkyBlue,
    fontSize: RFPercentage(2.4),
  },
  basketContents: {
    color: Colors.vwgDeepBlue,
    // backgroundColor: 'teal',
    // margin: 5,
    maxHeight: maxModalHeight,
    paddingTop: 0,
    marginBottom: 0,
    paddingHorizontal: 0,
    // padding: 5
  },
  basketText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2),
  },
  basketTextLink: {
    fontFamily: 'the-sans',
    color: Colors.vwgLink,
    fontSize: RFPercentage(2.4),
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  basketItem: {
    color: Colors.vwgDarkSkyBlue,
    flexDirection: 'row',
  },
  basketItemText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDarkGray,
    fontSize: RFPercentage(1.8),
  },
  basketItemUnavailableText: {
    fontFamily: 'the-sans',
    color: Colors.vwgWarmRed,
    fontSize: RFPercentage(1.8),
  },
  basketItemTextEmph: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.9),
  },
  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  basketItemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  basketItemLocation: { flexDirection: 'column' },
  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: Colors.vwgSearchBarContainer,
  },
  basketTipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
  },
  basketItemRow: {
    color: Colors.vwgDeepBlue,

    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 5,
  },
  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  basketItemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  basketItemLocation: { flexDirection: 'column' },
  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: Colors.vwgSearchBarContainer,
  },
  basketItemImageCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 70,
  },
  basketItemDescCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '72%',
    paddingLeft: 10,
  },
  basketItemMetaCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '50%',
  },
  basketActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingVertical: 5,
  },
  basketInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  closedBasket: {
    position: 'absolute',
    width: '100%',
    height: 30,
    // bottom: TAB_BAR_HEIGHT,
    bottom: 0,
    // left: 0,
    backgroundColor: Colors.vwgLink,
    // paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closedBasketPromptText: {
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(2.2),
    // textAlign: 'center'
  },
  closeButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  basketSizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5,
  },
  searchBarRowRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vwgSearchBarContainer,
    padding: 10,
  },
  searchBarInputContainer: {
    backgroundColor: Colors.vwgSearchBarInputContainer,
  },
  searchBarContainer: { backgroundColor: Colors.vwgSearchBarContainer },

  searchBarRowSearchInput: { width: '85%' },

  searchFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen,
  },
  searchFoundPromptText: {
    fontFamily: 'the-sans',
    textAlign: 'center',
    color: Colors.vwgWhite,
  },
  checkingNotice: {
    flexDirection: 'row',
    padding: 10,
  },
  confirmedNoticeText: {
    fontFamily: 'the-sans',
    textAlign: 'center',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.4),
  },
  unavailableNoticeText: {
    fontFamily: 'the-sans-bold',
    textAlign: 'left',
    color: Colors.vwgBlack,
    fontSize: RFPercentage(2.2),
  },
  confirmedPrompt: {
    padding: 0,
  },
  confirmedPromptText: {
    fontFamily: 'the-sans-bold',
    textAlign: 'left',
    color: Colors.vwgMintGreen,
    fontSize: RFPercentage(2.4),
  },
  noneFoundPromptRibbon: {
    fontFamily: 'the-sans',
    padding: 10,
    backgroundColor: Colors.vwgWarmRed,
  },
  promptRibbonText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    color: Colors.vwgWhite,
  },
  inputLabelText: {
    marginBottom: 20,
    fontFamily: 'the-sans',
    color: Colors.vwgBlack,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  buttonTrash: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonCancel: {
    borderColor: Colors.vwgWarmRed,
    borderRadius: Platform.OS === 'ios' ? 3 : 0,
  },
  buttonCancelTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.3),
    color: Colors.vwgWarmRed,
    paddingLeft: 5,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  },
  buttonCloseConfirmation: {
    backgroundColor: Colors.vwgDeepBlue,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5,
  },
  buttonCloseConfirmationTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWhite,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  },
  buttonClose: {
    backgroundColor: Colors.vwgLink,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5,
  },
  buttonCloseTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.3),
    color: Colors.vwgLink,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  },
  buttonBook: {
    backgroundColor: Colors.vwgLink,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5,
  },
  buttonBookTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.3),
    paddingLeft: 5,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  },
  buttonConfirm: {
    backgroundColor: Colors.vwgLink,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5,
  },
  buttonConfirmTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.3),
    paddingLeft: 5,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
  },
});
