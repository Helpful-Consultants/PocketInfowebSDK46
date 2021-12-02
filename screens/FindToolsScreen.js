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
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { createFilter } from 'react-native-search-filter';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { sortObjectList } from '../helpers/objects';
import { revalidateUserCredentials } from '../actions/user';
import { getDealerToolsRequest } from '../actions/dealerTools';
import {
  getDealerWipsRequest,
  deleteDealerWipRequest,
} from '../actions/dealerWips';
import { getLtpRequest } from '../actions/ltp';
import { selectSortedUniqueLtpTools } from '../reducers/ltp';
import { createDealerWipRequest } from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import Types from '../constants/Types';
import DealerToolsList from './DealerToolsList';

import searchItems from '../helpers/searchItems';
import { selectFetchParamsObj } from '../reducers/user';
import { selectDealerWips } from '../reducers/dealerWips';
import { selectLastWipProcessedInfo } from '../reducers/dealerWips';
import { selectLastWipProcessedObj } from '../reducers/dealerWips';
import { selectLastWipProcessedId } from '../reducers/dealerWips';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const minSearchLength = 1;

const screenHeight = Math.round(Dimensions.get('window').height);
const maxModalHeight = screenHeight - 150;
const screenWidth = Math.round(Dimensions.get('window').width);
const bottomTabHeight = screenHeight && screenHeight > 1333 ? 100 : 80;
// console.log( 'FT ***** bottomTabHeight', bottomTabHeight && bottomTabHeight);

// function debounceLeading(func, timeout = 300) {
//   let timer;
//   return (...args) => {
//     if (!timer) {
//       func.apply(this, args);
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = undefined;
//     }, timeout);
//   };
// }

// function debounce(func, timeout = 300) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }

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
//       // ( 'FT ***** match on', item.tools_id);
//       retValue = index;
//     }
//   });
//   return retValue;
// };

const getUnavailableToolDetails = (toolId, unavailableToolsArr) => {
  let retValue = null;

  unavailableToolsArr.forEach((item, index) => {
    if (item.tools_id && item.tools_id === toolId) {
      // ( 'FT ***** match on', item.tools_id);
      retValue = `Unavailable. Now booked out to ${
        item.updatedBy && item.updatedBy
      }, job ${item.wipNumber && item.wipNumber}`;
    }
  });
  // (
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
  //   ( 'FT ***** dealerWips[0]', dealerWips[0]);
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
      // ( 'FT ***** match on', item.tools_id);
      retValue = item.id.toString();
    }
  });
  // (
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
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  const userName = useSelector((state) => state.user.userName);
  const userBrand = useSelector((state) => state.user.userBrand);
  const dealerToolsItems = useSelector(
    (state) => state.dealerTools.dealerToolsItems
  );
  const dealerToolsFetchTime = useSelector(
    (state) => state.dealerTools.fetchTime
  );
  const dealerWipsFetchTime = useSelector(
    (state) => state.dealerWips.fetchTime
  );
  const ltpFetchTime = useSelector((state) => state.ltp.fetchTime);
  const dealerWipsItems = useSelector(selectDealerWips);
  const uniqueLtpItems = useSelector(selectSortedUniqueLtpTools);
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
  const lastWipProcessedInfo = useSelector(selectLastWipProcessedInfo);
  const lastWipProcessedObj = useSelector(selectLastWipProcessedObj);
  const lastWipProcessedId = useSelector(selectLastWipProcessedId);
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

  const getWipsItems = useCallback(() => {
    // console.log(
    //   'FT ***** ************ Find Tools in getWipsItems, fetchParamsObj is',
    //   fetchParamsObj && fetchParamsObj
    // );
    if (
      typeof fetchParamsObj !== 'undefined' &&
      fetchParamsObj.dealerId &&
      fetchParamsObj.userIntId
    ) {
      dispatch(getDealerWipsRequest(fetchParamsObj));
    }
  }, [dispatch, fetchParamsObj]);

  const getOtherItems = useCallback(() => {
    // console.log( 'FT ***** in getOtherItems');
    // console.log(
    //   'find tools - getOtherItems, fetchParamsObj is',
    //   fetchParamsObj
    // );
    if (
      typeof fetchParamsObj !== 'undefined' &&
      fetchParamsObj.dealerId &&
      fetchParamsObj.userIntId
    ) {
      dispatch(getDealerToolsRequest(fetchParamsObj));
      if (!uniqueLtpItems || uniqueLtpItems.length === 0) {
        dispatch(getLtpRequest(fetchParamsObj));
      }
    }
    // dispatch(getDealerWipsRequest(fetchParamsObj));
  }, [fetchParamsObj, uniqueLtpItems.length]);

  const dispatchNewWip = useCallback(
    (wipObj) => dispatch(createDealerWipRequest({ wipObj, fetchParamsObj })),
    [fetchParamsObj] // something that doesn't change
  );

  const deleteDealerWip = useCallback(
    (payload) => dispatch(deleteDealerWipRequest(payload)),
    [dealerWipsItems]
  );

  const saveToJob = (wipObj) => {
    // console.log('FT ***** saveToJob calling dispatchNewWip', wipObj && wipObj);
    dispatchNewWip(wipObj);
  };

  const selectItemHandler = (tool, lastPerson) => {
    // console.log( 'FT ***** in selectItemHandler');
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
    console.log(
      'FT **** deleteWipRequestHandler',
      lastWipProcessedObj && lastWipProcessedObj
    );
    const wipNumber =
      lastWipProcessedObj && lastWipProcessedObj.wipNumber
        ? lastWipProcessedObj.wipNumber
        : '';
    // console.log(
    //   'in deleteWipRequestHandler last wip',
    //   lastWipProcessedObj && lastWipProcessedObj
    // );

    // const wipId =
    //   (wipNumber && lastWipProcessedObj.wipId) ||
    //   getWipIdByWipNumber(wipNumber, fetchParamsObj.userIntId, dealerWipsItems);

    // const wipObj = {
    //   wipNumber: wipNumber,
    //   id: lastWipProcessedId ? lastWipProcessedId : '',
    //   fetchParamsObj,
    // };

    let payload = {
      wipObj: lastWipProcessedObj,
      fetchParamsObj: fetchParamsObj,
    };

    // console.log('FT ***** in deleteWipRequestHandler', payload);
    setToolBasket([]);
    setMode('list');
    setIsBasketVisible(false);
    inputChangeHandler('wipNumber', '');
    setTimeout(() => deleteDealerWip(payload), 300);
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
      //   console.log(
      //     'inbackdropPressHandler, calling acceptNotBookedMessageHandler'
      //   );
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
    if (
      lastWipProcessedObj.unavailableTools &&
      lastWipProcessedObj.unavailableTools.length > 0
    ) {
      lastWipProcessedObj.unavailableTools.forEach((item) => {
        // console.log(item.tools_id);
        unavailableToolIdsArr.push(item.tools_id);
      });
    }
    // console.log( 'FT ***** lastWipProcessedObj', lastWipProcessedObj);
    // console.log( 'FT ***** unavailableToolIdsArr', unavailableToolIdsArr);
    // console.log( 'FT ***** old toolBasket', toolBasket);
    let newToolBasket = toolBasket.map((item) => {
      return {
        ...item,
        unavailable: unavailableToolIdsArr.includes(item.id) ? true : false,
      };
    });
    // console.log( 'FT ***** newToolBasket', newToolBasket);
    setToolBasket(newToolBasket);
  };

  const addBasketItemHandler = () => {
    // console.log( 'FT ***** in addBasketItemHandler');
    setMode('list');
    setIsBasketVisible(false);
  };

  const toggleBaskethandler = (action) => {
    // console.log( 'FT ***** in toggleBaskethandler');
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
    // console.log( 'FT ***** in dropUnavailableHandler');
    // console.log( 'FT ***** old toolBasket before drop', toolBasket);
    let newToolBasket = toolBasket.filter(
      (item) => !item.unavailable || item.unavailable === false
    );
    // console.log( 'FT ***** newToolBasket after drop', newToolBasket);
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
  //     console.log( 'FT ***** timeout');
  //   }, 2000);

  const searchInputHandler = (searchInput) => {
    // console.log( 'FT ***** searchInputHandler ' + searchInput);
    setSearchInput(searchInput);

    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(combinedItems, searchInput);
      setFilteredItems(newFilteredItems);
      //   console.log( 'FT ***** searchInputHandler ' + newFilteredItems);
    }
  };

  const refreshRequestHandler = () => {
    // console.log( 'FT ***** in refreshRequestHandler');
    getWipsItems();
    getOtherItems();
  };

  const saveToJobRequestHandler = () => {
    // console.log('FT *** in saveToJobRequestHandler');
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
        userIntId: fetchParamsObj.userIntId,
        dealerId: fetchParamsObj.dealerId,
        tools: newToolBasket,
      };
      //   console.log(
      //     'FT *** in saveToJobRequestHandler, saveToJob  wipObj',
      //     wipObj
      //   );
      setTimeout(() => {
        saveToJob(wipObj);
        inputChangeHandler('wipNumber', '');
      }, 300);
    } else {
      setMode('book');
      setIsBasketVisible(true);
    }
  };

  useEffect(() => {
    // console.log(
    //   'FT ***** in findtools, isSendingWip is ',
    //   isSendingWip,
    //   'code is ',
    //   dataStatusCodeWips,
    //   'lastWipProcessedObj',
    //   lastWipProcessedObj,
    //   'mode',
    //   mode
    // );
    if (isSendingWip === false) {
      if (dataStatusCodeWips === 201) {
        // console.log(
        //   'isSendingWip is ',
        //   isSendingWip,
        //   'code is 201',
        //   lastWipProcessedObj && lastWipProcessedObj,
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
        //   lastWipProcessedObj && lastWipProcessedObj,
        //   'mode is ',
        //   mode
        // );
        if (mode === 'sending') {
          //   console.log(
          //     'changing mode to unavailable, fetchParamsObj is ',
          //     fetchParamsObj
          //   );
          //   console.log(
          //     'FT ***** unavailable ',
          //     lastWipProcessedObj && lastWipProcessedObj
          //   );
          if (
            lastWipProcessedObj &&
            lastWipProcessedObj.tools &&
            lastWipProcessedObj.tools.length > 0
          ) {
            // console.log( 'FT ***** some unavailable');
            setMode('some-unavailable');
            markUnavailableBasketItems();
            getWipsItems();
          } else {
            // console.log( 'FT ***** all unavailable');
            setMode('all-unavailable');
            getWipsItems();
          }
        }
      }
    }
  }, [isSendingWip, dataStatusCodeWips, lastWipProcessedId, mode]);

  useEffect(() => {
    // console.log(
    //   'FT ***** in Find Tools useEffect AAAAAA',
    //   fetchParamsObj && fetchParamsObj
    // );
    getWipsItems();
    getOtherItems();
  }, [fetchParamsObj]);

  useEffect(() => {
    let bookedToolsList = [];

    if (isLoadingAny) {
      //   console.log(
      //     'in findtools useffect to create booked tools list NOT  running code'
      //   );
    } else {
      //   console.log(
      //     'in findtools useffect to create booked tools list YES running code'
      //   );
      if (dealerWipsItems && dealerWipsItems.length > 0) {
        dealerWipsItems.forEach((wip) => {
          if (wip.tools && wip.tools.length > 0) {
            wip.tools.forEach((tool) => bookedToolsList.push(tool.tools_id));
          }
        });
      }
      setBookedToolsList(bookedToolsList);
    }
    // console.log(
    //   'FT ***** in findtools useffect to create booked tools list,isLoadingAny ',
    //   isLoadingAny,
    //   'dealerWipsItems;',
    //   dealerWipsItems.length,
    //   'bookedToolsList',
    //   bookedToolsList.length
    // );
  }, [isLoadingAny, dealerWipsItems.length]);

  useEffect(() => {
    if (isLoadingUser || isLoadingTools || isLoadingWips || isLoadingLtp) {
      //   console.log('FT ***** in tools use effect BBBB something is loading');
      setIsLoadingAny(true);
    } else {
      //   console.log('FT ***** in tools use effect BBBB nothing is loading');
      setIsLoadingAny(false);
    }
  }, [isLoadingUser, isLoadingTools, isLoadingWips, isLoadingLtp]);

  useEffect(() => {
    // console.log(
    //   'FT ***** in useEffect CCCCC checking for errors',
    //   dataErrorTools,
    //   dataErrorLtp,
    //   dataErrorWips,
    //   (dealerToolsItems && dealerToolsItems.length) || 0,
    //   (uniqueLtpItems && uniqueLtpItems.length) || 0,
    //   isLoadingTools,
    //   isLoadingLtp,
    //   isLoadingWips
    // );

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
    isLoadingTools,
    isLoadingWips,
    isLoadingLtp,
  ]);

  useEffect(() => {
    if (!isLoadingAny && uniqueLtpItems && uniqueLtpItems.length > 0) {
      //   console.log(
      //     'FT ***** in useEffect EEEEE concatenating items because isLoadingAny',
      //     isLoadingAny,
      //     dealerToolsFetchTime,
      //     dealerWipsFetchTime
      //   );
      let concatItems = dealerToolsItems.concat(uniqueLtpItems);
      setCombinedItems(concatItems);
    } else {
      //   console.log(
      //     'FT ***** in useEffect EEEEE NOT concatenating items because isLoadingAny',
      //     isLoadingAny,
      //     dealerToolsFetchTime,
      //     dealerWipsFetchTime
      //   );
    }
  }, [isLoadingAny]);

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
      //   console.log( 'FT ***** inputChangeHandler', text && text);
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
  //   console.log( 'FT ***** toolBasket is', toolBasket);

  //   useEffect(() => {
  //     console.log('FT *** lastWipProcessedInfo', lastWipProcessedInfo);
  //     console.log('FT *** lastWipProcessedObj', lastWipProcessedObj);
  //     console.log('FT *** lastWipProcessedId', lastWipProcessedId);
  //   }, [lastWipProcessedId]);

  useFocusEffect(
    useCallback(() => {
      console.log('FT ***** useFocusEffect, fetchParamsObj is', fetchParamsObj);
      setSearchInput('');
      getWipsItems();
      console.log(
        'lastWipProcessedObj',
        lastWipProcessedObj && lastWipProcessedObj
      );
      return () => {
        // Do something when the screen is unfocused
        // console.log('FT ***** Find tools Screen was unfocused');
      };
    }, [getWipsItems])
  );

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
                lastWipProcessedObj.unavailableTools &&
                lastWipProcessedObj.unavailableTools.length > 1
                  ? `These items have been booked to job`
                  : `This item has been booked to job`
              } '${lastWipProcessedObj.wipNumber}'.`}
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
                lastWipProcessedObj.unavailableTools &&
                lastWipProcessedObj.unavailableTools.length > 1
                  ? `s`
                  : ``
              } marked above. Do you want to keep the other item${
                lastWipProcessedObj.unavailableTools &&
                lastWipProcessedObj.unavailableTools.length > 1
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
              lastWipProcessedObj.unavailableTools &&
              toolBasket.length > 0 &&
              toolBasket.length - lastWipProcessedObj.unavailableTools.length >
                1
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
                lastWipProcessedObj.unavailableTools &&
                lastWipProcessedObj.unavailableTools.length > 1
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
                        desiredWidth={70}
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
                        lastWipProcessedObj.unavailableTools
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
  //     'FT ***** rendering Find Tools screen, fetchParamsObj:',
  //     fetchParamsObj,
  //     'uniqueLtpItems',
  //     uniqueLtpItems && uniqueLtpItems.length
  //     //   dealerToolsFetchTime,
  //     //   dealerWipsFetchTime,
  //     //   ltpFetchTime
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
                userIntId={(fetchParamsObj && fetchParamsObj.userIntId) || null}
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
