import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Divider, Icon, Input, Text } from 'react-native-elements';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import { createFilter } from 'react-native-search-filter';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import BadgedTabBarText from '../components/BadgedTabBarText';
import TabBarIcon from '../components/TabBarIcon';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';
import {
  getDealerWipsRequest,
  createDealerWipSuccess
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
const bottomTabHeight = screenHeight && screenHeight > 1333 ? 100 : 80;
// console.log('bottomTabHeight', bottomTabHeight && bottomTabHeight);

const formReducer = (state, action) => {
  if (action.type === Types.FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  return state;
};

export default FindToolsScreen = props => {
  const dispatch = useDispatch();
  const userBrand = useSelector(state => state.user.userBrand);
  const dealerToolsItems = useSelector(
    state => state.dealerTools.dealerToolsItems
  );
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  //   const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const isLoadingTools = useSelector(state => state.dealerTools.isLoading);
  const dataErrorTools = useSelector(state => state.dealerTools.error);
  const dataErrorUrlTools = useSelector(
    state => state.dealerTools.dataErrorUrl
  );
  const dataStatusCodeTools = useSelector(
    state => state.dealerTools.statusCode
  );
  const isLoadingWips = useSelector(state => state.dealerWips.isLoading);
  const dataErrorWips = useSelector(state => state.dealerWips.error);
  const dataErrorUrlWips = useSelector(state => state.dealerWips.dataErrorUrl);
  const dataStatusCodeWips = useSelector(state => state.dealerWips.statusCode);
  const isLoadingLtp = useSelector(state => state.ltp.isLoading);
  const dataErrorLtp = useSelector(state => state.ltp.error);
  const dataErrorUrlLtp = useSelector(state => state.ltp.dataErrorUrl);
  const dataStatusCodeLtp = useSelector(state => state.ltp.statusCode);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userName = userDataObj && userDataObj.userName;
  const userIntId = userDataObj && userDataObj.intId.toString();

  const [isLoadingAny, setIsLoadingAny] = useState(false);
  const [dataNameInPlay, setDataNameInPlay] = useState('');
  const [dataErrorAny, setDataErrorAny] = useState('');
  const [dataStatusCodeAny, setDataStatusCodeAny] = useState('');
  const [dataErrorUrlAny, setDataErrorUrlAny] = useState('');
  const [dataErrorSummary, setDataErrorSummary] = useState('');
  const [searchInput, setSearchInput] = useState('');
  //   const [searchString, setSearchString] = useState('');
  //   const [adjustedSearchString, setAdjustedSearchString] = useState('');
  //   const [
  //     strippedAdjustedSearchString,
  //     setStrippedAdjustedSearchString
  //   ] = useState('');

  const [uniqueLtpItems, setUniqueLtpItems] = useState([]);
  const [combinedItems, setCombinedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [bookedToolsList, setBookedToolsList] = useState([]);
  //   const [adjustedSearchString, setAdjustedSearchString] = useState();
  const [isBasketVisible, setIsBasketVisible] = useState(true);
  //   const [isDupBookedAlertVisible, setIsDupBookedAlertVisible] = useState(false);
  const [isDupPickedAlertVisible, setIsDupPickedAlertVisible] = useState(false);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const [mode, setMode] = useState('list');
  const [toolBasket, setToolBasket] = useState([]);
  const [wipNumber, setWipNumber] = useState('');
  //   console.log('toolbasket from useState is ', toolBasket.length);

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );
  const input = React.createRef();
  //   const userDataCount =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  const { navigation } = props;
  const insets = useSafeArea();

  let apiFetchParamsObj = {};

  const getWipsItems = useCallback(apiFetchParamsObj => {
    // console.log('in getWipsItems', apiFetchParamsObj);
    dispatch(getDealerWipsRequest(apiFetchParamsObj)), [dealerWipsItems];
  });

  const getWipsItemsAsync = async () => {
    getWipsItems(apiFetchParamsObj);
  };

  const getOtherItems = useCallback(async apiFetchParamsObj => {
    // console.log('in getOtherItems');
    dispatch(getDealerToolsRequest(apiFetchParamsObj));
    // dispatch(getDealerWipsRequest(apiFetchParamsObj));
    if (!ltpItems || ltpItems.length === 0) {
      dispatch(getLtpRequest());
    }
  });

  const getOtherItemsAsync = async () => {
    getOtherItems(apiFetchParamsObj);
  };

  const saveToJob = useCallback(
    payload => dispatch(createDealerWipRequest(payload)),
    [dispatch] // something that doesn't change
  );

  useEffect(() => {
    // runs only once
    console.log(
      'in findtools  useEffect, userDataObj is ',
      userDataObj && userDataObj.dealerId
    );
    if (userDataObj && userDataObj.dealerId && userDataObj.intId) {
      apiFetchParamsObj = {
        dealerId:
          (userDataObj && userDataObj.dealerId && userDataObj.dealerId) || '',
        intId: (userDataObj && userDataObj.intId && userDataObj.intId) || ''
      };
      //   setgetDealerItemsDataObj(apiFetchParamsObj);
      //   getWipsItemsAsync();
      getOtherItemsAsync();
    } else {
      console.log('in findtools  useEffect, user Data Obej not ready');
    }
  }, [userDataObj]);

  useFocusEffect(
    useCallback(() => {
      console.log(
        'find tools - useFocusEffect, apiFetchParamsObj is',
        apiFetchParamsObj
      );
      setSearchInput('');
      if (
        apiFetchParamsObj &&
        apiFetchParamsObj.intId &&
        apiFetchParamsObj.dealerId
      ) {
        getWipsItemsAsync();
      }
    }, [])
  );

  useEffect(() => {
    let bookedToolsList = [];

    dealerWipsItems &&
      dealerWipsItems.forEach(wip => {
        if (wip.tools && wip.tools.length > 0) {
          wip.tools.forEach(tool => bookedToolsList.push(tool.tools_id));
        }
      });

    // console.log(bookedToolsList && bookedToolsList);
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
    isLoadingLtp
  ]);

  useEffect(() => {
    // console.log('getting unique LTP items', ltpItems && ltpItems.length);
    // console.log('userBrand is ', userBrand);
    let ltpItemsAll = (ltpItems && ltpItems.length > 0 && ltpItems) || [];
    let ltpItemsFiltered = [];
    if (userBrand) {
      //   console.log('userBrand is ', userBrand);
      ltpItemsFiltered = ltpItemsAll.filter(
        item => item[userBrand] === 'Y' || 'y'
      );
    } else {
      //   console.log('userBrand isnt : ', userBrand);
      ltpItemsFiltered = ltpItemsAll.filter(
        item =>
          item.au === ('Y' || 'y') ||
          item.cv === ('Y' || 'y') ||
          item.se === ('Y' || 'y') ||
          item.sk === ('Y' || 'y') ||
          item.vw === ('Y' || 'y')
      );
    }
    let ltpItemsSorted =
      ltpItemsFiltered.sort((a, b) => a.loanToolNo > b.loanToolNo) || [];

    let uniqueLtpItems =
      ltpItemsSorted.filter(
        (item, index, self) =>
          index === self.findIndex(t => t.orderPartNo === item.orderPartNo)
      ) || [];
    setUniqueLtpItems(uniqueLtpItems);
    // console.log('filtered items', uniqueLtpItemsTemp);
  }, [ltpItems, userBrand]);

  useEffect(() => {
    let concatItems = dealerToolsItems.concat(uniqueLtpItems);
    setCombinedItems(concatItems);
  }, [dealerToolsItems, uniqueLtpItems]);

  const selectItemHandler = (tool, lastPerson) => {
    // console.log('in selectItemHandler');

    let dup =
      (toolBasket && toolBasket.filter(item => item.id === tool.id)) || [];

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
    setIsBasketVisible(false);
  };

  const basketBackHandler = () => {
    inputChangeHandler('wipNumber', '');
    setMode('basket');
  };

  const removeBasketItemHandler = deadItemId => {
    if (toolBasket && toolBasket.length > 1) {
      const newBasket = toolBasket.filter(item => item.id !== deadItemId);
      setToolBasket(newBasket);
    } else {
      removeBasketHandler();
    }
  };

  const addBasketItemHandler = () => {
    setMode('list');
    setIsBasketVisible(false);
  };

  const toggleBaskethandler = action => {
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

  //   if (this.timeout) {
  //     clearTimeout(this.timeout);
  //   }
  //   this.timeout = setTimeout(() => {
  //     console.log('timeout');
  //   }, 2000);

  const searchInputHandler = searchInput => {
    // console.log('searchInputHandler ' + searchInput);
    setSearchInput(searchInput);

    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(combinedItems, searchInput);
      setFilteredItems(newFilteredItems);
    }
  };

  const refreshRequestHandler = () => {
    // console.log('in refreshRequestHandler', dealerId && dealerId);
    dealerId && getOtherItems(apiFetchParamsObj);
  };

  const saveToJobRequestHandler = () => {
    const removeLastWip = item => {
      const newItem = { ...item };
      delete newItem.lastWIP;
      return newItem;
    };

    if (formState.formIsValid) {
      setWipNumber(formState.inputValues.wipNumber);
      setMode('confirm');
      setIsBasketVisible(true);

      let newToolBasket = toolBasket.map(item => removeLastWip(item));

      const wipObj = {
        wipNumber: formState.inputValues.wipNumber.toString(),
        createdBy: userName,
        createdDate: new Date(),
        userIntId: userIntId.toString(),
        dealerId: dealerId.toString(),
        tools: newToolBasket
      };
      const apiFetchParamsObj = {
        dealerId: dealerId.toString(),
        intId: userIntId.toString()
      };
      const payload = {
        apiFetchParamsObj,
        wipObj
      };

      saveToJob(payload);
      inputChangeHandler('wipNumber', '');
    } else {
      setMode('book');
      setIsBasketVisible(true);
    }
  };

  //   const concatItems = dealerToolsItems.concat(uniqueLtpItems);
  //   const concatItems = dealerToolsItems;
  //   console.log('concatItems.length ', concatItems.length);

  //   let allFilteredItems = combinedItems.filter(
  //     createFilter(searchInput, KEYS_TO_FILTERS)
  //   );
  //   let allFilteredItems = combinedItems;
  //   console.log(
  //     'filteredItems before slice',
  //     filteredItems && filteredItems.length
  //   );
  //   console.log(
  //     'combinedItems before slice',
  //     combinedItems && combinedItems.length
  //   );
  let itemsToShow =
    searchInput && searchInput.length > minSearchLength
      ? filteredItems.slice(0, 100)
      : combinedItems.slice(0, 100);
  //   console.log('filteredItems.length ', filteredItems.length);
  //   if (filteredItems.length && filteredItems.length < 5) {
  //     // console.log('filteredItems', filteredItems);
  //   }

  //   let specificTool =
  //     combinedItems &&
  //     combinedItems.filter(item => item.partNumber === '30 - 100');

  //   if (specificTool && specificTool.length && specificTool.length < 5) {
  //     // console.log('specificTools', specificTool);
  //   }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: { wipNumber: '' },
    inputValidities: {
      wipNumber: false
    },
    formIsValid: false
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
        inputId: inputIdentifier
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
                style={styles.inputLabeText}
                placeholder='Job number/job name'
                required
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='done'
                onSubmitEditing={text => console.log(text)}
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
                <Text style={{ fontFamily: 'the-sans' }}>
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
            titleStyle={styles.cancelButtonTitle}
            buttonStyle={styles.cancelButton}
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
              setMode('confirm');
              setIsBasketVisible(true);
            }}
            titleStyle={styles.confirmButtonTitle}
            buttonStyle={styles.confirmButton}
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
    ) : mode === 'confirm' ? (
      <View>
        <View style={styles.basketActionRow}>
          <View style={styles.confirmedPrompt}>
            <Text style={styles.confirmedPromptText}>
              {`${toolBasket.length} ${
                toolBasket.length === 1 ? `tool` : `tools`
              } booked to job ${wipNumber}.`}
            </Text>
          </View>
        </View>
        <View style={styles.basketActionRow}>
          <Button
            title='Close'
            type='clear'
            titleStyle={styles.closeButtonTitle}
            onPress={() => {
              acceptMessageHandler();
            }}
            titleStyle={styles.closeConfirmationButtonTitle}
            buttonStyle={styles.closeConfirmationButton}
          />
        </View>
      </View>
    ) : mode === 'basket' ? (
      <View>
        <View
          style={
            ({ ...styles.basketActionRow },
            { alignItems: 'flex-end', marginTop: 10 })
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
              iconStyle={styles.addToolButton}
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
            titleStyle={styles.cancelButtonTitle}
            buttonStyle={styles.cancelButton}
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
            titleStyle={styles.bookButtonTitle}
            buttonStyle={styles.bookButton}
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
    ) : null;

  let basketContents = null;

  if (toolBasket && toolBasket.length > 0) {
    basketContents = (
      <View>
        <ScrollView
          style={styles.basketContents}
          showsVerticalScrollIndicator={true}
        >
          {toolBasket.map((item, i) => (
            <View key={i}>
              {i > 0 ? (
                <Divider
                  style={{
                    backgroundColor: Colors.vwgDarkGray,
                    marginVertical: 8
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
                    {item.lastWIP ? (
                      <Text
                        style={styles.basketItemText}
                      >{`Last booked out to ${item.lastPerson}, job ${item.lastWIP}`}</Text>
                    ) : null}
                  </View>
                  {mode !== 'confirm' && toolBasket.length > 1 ? (
                    <TouchableOpacity
                      style={styles.trashButton}
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
      onSwipeComplete={() => setIsBasketVisible(false)}
      propagateSwipe
      avoidKeyboard
      style={styles.drawerBottom}
      backdropOpacity={0.6}
      animationIn='zoomInDown'
      animationOut='zoomOutUp'
    >
      <View style={{ backgroundColor: Colors.vwgWhite }}>
        {mode === 'basket' ? (
          <View style={styles.closeButtonRow}>
            <Text style={styles.basketText}>
              {`${toolBasket.length} ${
                toolBasket.length === 1 ? `tool` : `tools`
              } selected:`}
            </Text>
          </View>
        ) : null}
        <View style={styles.basket}>
          <View style={{ backgroundColor: Colors.vwgWhite }}>
            {mode === 'basket' ? basketContents : null}
            {basketActionRows}
          </View>
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
            marginTop: Platform.OS === 'ios' ? 0 : -4
          }}
        />
        <Text style={styles.closedBasketPromptText}>
          {` Back to tools basket`}
          {toolBasket && toolBasket.length > 1
            ? ` (${toolBasket.length} items)`
            : toolBasket && toolBasket.length > 0
            ? ` (${toolBasket.length} item)`
            : null}
        </Text>
      </TouchableOpacity>
    </View>
  );

  //   const toggleExpandBasketHandler = action => {
  //     console.log('toggling ', isBasketExpanded);
  //     if (action) {
  //       setIsBasketExpanded(action);
  //       //   drawer.toggleDrawerState();
  //     } else {
  //       setIsBasketExpanded(!isBasketExpanded);
  //       //   drawer.toggleDrawerState();
  //     }
  //   };

  //   console.log('FTS about to render');

  //   console.log('RENDERING FT screen !!!!!!!!!!!!!!!!!!!');

  //    marginBottom: screenHeight && screenHeight > 1333 ? 140 : 140;
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          marginBottom:
            mode === 'list' && itemsToShow.length > 0 && toolBasket.length > 0
              ? 170
              : 140
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
            <View style={styles.noneFoundPrompt}>
              <Text style={styles.noneFoundPromptText}>
                Your search found no results.
              </Text>
            </View>
          ) : null}

          {isLoadingAny || dataErrorAny ? null : (
            <View style={styles.toolsList}>
              <DealerToolsList
                items={itemsToShow}
                userIntId={userIntId}
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
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
              }}
              confirmButtonTextStyle={{
                fontFamily: 'the-sans',
                textAlign: 'center',
                elevation: Platform.OS === 'ios' ? 0 : 5,
                textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
              }}
              confirmButtonStyle={{
                width: 100,
                borderRadius: Platform.OS === 'ios' ? 3 : 2,
                elevation: Platform.OS === 'ios' ? 0 : 5
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
const tabBarLabelFunction = ({ focused }) => (
  <BadgedTabBarText
    showBadge={false}
    text={titleString}
    focused={focused}
    value={0}
  />
);
export const screenOptions = navData => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,

    headerStyle: {
      backgroundColor: Colors.vwgHeader
    },
    tabBarColor: Colors.vwgWhite,
    tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
      />
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: screenHeight && screenHeight > 1333 ? 140 : 140
    // backgroundColor: 'red'
  },
  toolsList: {},
  drawerBottom: {
    justifyContent: 'flex-end',
    margin: 0
  },
  toolsList: {
    // marginBottom: 50,
    backgroundColor: 'transparent'
    // height: '80%'
  },
  inputStyle: {
    fontFamily: 'the-sans',
    color: Colors.vwgDarkSkyBlue,
    fontSize: RFPercentage(2.4)
  },
  basket: {
    color: Colors.vwgDeepBlue,
    margin: 5,
    padding: 5
  },
  basketText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2)
  },
  basketTextLink: {
    fontFamily: 'the-sans',
    color: Colors.vwgLink,
    fontSize: RFPercentage(2),
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  basketItem: {
    color: Colors.vwgDarkSkyBlue,
    flexDirection: 'row'
  },
  basketItemText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDarkGray,
    fontSize: RFPercentage(1.8)
  },
  basketItemTextEmph: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(1.9)
  },
  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  basketItemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basketItemLocation: { flexDirection: 'column' },
  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: Colors.vwgSearchBarContainer
  },

  basketTipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10
  },
  basketItemRow: {
    color: Colors.vwgDeepBlue,
    flexDirection: 'row'
  },

  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  basketItemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basketItemLocation: { flexDirection: 'column' },
  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: Colors.vwgSearchBarContainer
  },
  basketItemImageCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 70
  },
  basketItemDescCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '72%',
    paddingLeft: 10
  },
  basketItemMetaCol: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '50%'
  },

  basketActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingVertical: 20
  },
  basketInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5
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
    justifyContent: 'center'
  },
  closedBasketPromptText: {
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(2.2)
    // textAlign: 'center'
  },
  closeButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.vwgWhite
  },

  searchBarRowRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vwgSearchBarContainer,
    padding: 10
  },
  searchBarInputContainer: {
    backgroundColor: Colors.vwgSearchBarInputContainer
  },
  searchBarContainer: { backgroundColor: Colors.vwgSearchBarContainer },

  searchBarRowSearchInput: { width: '85%' },

  searchFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  searchFoundPromptText: {
    fontFamily: 'the-sans',
    textAlign: 'center',

    color: Colors.vwgWhite
  },
  confirmedPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgWhite
  },
  confirmedPromptText: {
    fontFamily: 'the-sans',
    textAlign: 'center',
    color: Colors.vwgMintGreen,
    fontSize: RFPercentage(2.2)
  },
  noneFoundPrompt: {
    fontFamily: 'the-sans',
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    color: Colors.vwgWhite
  },
  inputLabelText: {
    marginBottom: 20,
    fontFamily: 'the-sans',
    color: Colors.vwgBlack,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '60%'
  },
  buttonView: {
    // width: 200,
    fontSize: 12
  },
  trashButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
    // paddingRight: 10
  },
  signInButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.vwgLink
  },

  cancelButton: {
    borderColor: Colors.vwgWarmRed,
    borderRadius: Platform.OS === 'ios' ? 3 : 0

    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  cancelButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWarmRed,
    paddingLeft: 5,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  closeConfirmationButton: {
    backgroundColor: Colors.vwgDeepBlue,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5
  },
  closeConfirmationButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWhite,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
  },
  closeButton: {
    backgroundColor: Colors.vwgLink,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5
  },
  closeButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgLink,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
  },

  bookButton: {
    backgroundColor: Colors.vwgLink,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5
    // color: Colors.vwgWhite,

    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  bookButtonTitle: {
    // color: Colors.vwgWhite,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    paddingLeft: 5,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  confirmButton: {
    backgroundColor: Colors.vwgLink,
    borderRadius: Platform.OS === 'ios' ? 3 : 2,
    elevation: Platform.OS === 'ios' ? 0 : 5
  },
  confirmButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    paddingLeft: 5,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase'
  }
});
