import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Divider, Icon, Input, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import { createFilter } from 'react-native-search-filter';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';

import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';
import { getDealerWipsRequest } from '../actions/dealerWips';
import { getLtpRequest } from '../actions/ltp';
import { createDealerWipRequest } from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import Types from '../constants/Types';
import DealerToolsList from './DealerToolsList';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const KEYS_TO_FILTERS = [
  'toolNumber',
  'partNumber',
  'partDescription',
  'orderPartNo', // LTP
  'toolDescription', // LTP
  'loanToolNo' //LTP
];

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

export default FindToolsScreen = ({ ...props }) => {
  const dispatch = useDispatch();
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
  const isLoadingWips = useSelector(state => state.dealerWips.isLoading);
  const dataErrorWips = useSelector(state => state.dealerWips.error);
  const isLoadingLtp = useSelector(state => state.ltp.isLoading);
  const dataErrorLtp = useSelector(state => state.ltp.error);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userName = userDataObj && userDataObj.userName;
  const userIntId = userDataObj && userDataObj.intId.toString();

  const [isLoadingAny, setIsLoadingAny] = useState(false);
  const [dataErrorAny, setDataErrorAny] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [uniqueLtpItems, setUniqueLtpItems] = useState([]);
  const [combinedItems, setCombinedItems] = useState([]);
  //   const [adjustedSearchString, setAdjustedSearchString] = useState();
  const [isBasketVisible, setIsBasketVisible] = useState(true);
  const [isDupBookedAlertVisible, setIsDupBookedAlertVisible] = useState(false);
  const [isDupPickedAlertVisible, setIsDupPickedAlertVisible] = useState(false);
  const [mode, setMode] = useState('list');
  const [toolBasket, setToolBasket] = useState([]);
  const [toolBasketIds, setToolBasketIds] = useState([]);

  const [wipNumber, setWipNumber] = useState('');
  //   console.log('toolbasket from useState is ', toolBasket.length);

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );
  const input = React.createRef();
  //   const userDataCount =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  if (!userIsSignedIn) {
    navigation.navigate('SignIn');
  }

  const getDealerItemsDataObj = {
    dealerId: dealerId,
    userId: userIntId
  };
  // const getItems = useCallback(getDealerItemsDataObj => {
  //   // console.log('in getItems', getDealerItemsDataObj);
  //   dispatch(getDealerToolsRequest(getDealerItemsDataObj)), [dealerToolsItems];
  //   dispatch(getDealerWipsRequest(getDealerItemsDataObj)), [dealerWipsItems];
  //   dispatch(getLtpRequest()), [ltpItems];
  // });
  const getItems = useCallback(getDealerItemsDataObj => {
    // console.log('in getItems', getDealerItemsDataObj);
    dispatch(getDealerToolsRequest(getDealerItemsDataObj));
    dispatch(getDealerWipsRequest(getDealerItemsDataObj));
    dispatch(getLtpRequest());
  });

  const saveToJob = useCallback(
    payload => dispatch(createDealerWipRequest(payload)),
    [dealerWipsItems]
  );

  useEffect(() => {
    // runs only once
    // console.log('in tools use effect');
    const getItemsAsync = async () => {
      getItems(getDealerItemsDataObj);
    };
    getItemsAsync();
  }, []);

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
    // console.log('in tools use effect');
    if (dataErrorTools || dataErrorWips || dataErrorLtp) {
      setDataErrorAny(true);
    } else {
      setDataErrorAny(false);
    }
  }, [dataErrorTools, dataErrorWips, dataErrorLtp]);

  useEffect(() => {
    let uniqueLtpItems =
      (ltpItems &&
        ltpItems.length > 0 &&
        ltpItems.filter(
          (item, index, self) =>
            index ===
            self.findIndex(t => t.supplierPartNo === item.supplierPartNo)
        )) ||
      [];
    setUniqueLtpItems(uniqueLtpItems);
  }, [ltpItems]);

  useEffect(() => {
    let concatItems = dealerToolsItems.concat(uniqueLtpItems);
    setCombinedItems(concatItems);
  }, [dealerToolsItems, uniqueLtpItems]);

  const didFocusSubscription = props.navigation.addListener('didFocus', () => {
    didFocusSubscription.remove();
    console.log('FTS in didFocusSubscription');
    if (searchInput && searchInput.length > 0) {
      setSearchInput('');
    }
  });

  const selectItemHandler = (tool, lastPerson) => {
    console.log('in selectItemHandler');
    let dup =
      (toolBasket && toolBasket.filter(item => item.id === tool.id)) || [];

    if (dup.length === 0) {
      const pickedTool = { ...tool, lastPerson };
      setToolBasket([...toolBasket, pickedTool]);
      setToolBasketIds([...toolBasketIds, pickedTool.id]);
      setMode('basket');
      setIsBasketVisible(true);
    } else {
      setMode('basket');
      setIsBasketVisible(false);
      setIsDupPickedAlertVisible(true);
    }
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

  const searchInputHandler = searchInput => {
    let searchStringStart = searchInput.toLowerCase();
    let adjustedSearchInput = '';

    if (
      searchStringStart.substring(0, 3) === 'ase' ||
      searchStringStart.substring(0, 3) === 'vas' ||
      searchStringStart.substring(0, 3) === 'vag'
    ) {
      //   console.log('@@@@@ ', searchInput.substring(0, 3));
      adjustedSearchInput = searchInput.substr(3);
      //   console.log('@@@@@cut' + adjustedSearchInput);
      setSearchInput(searchInput);
      //   setAdjustedSearchString(adjustedSearchInput);
    } else {
      setSearchInput(searchInput);
      //   setAdjustedSearchString(searchInput);
    }
  };
  const refreshRequestHandler = () => {
    dealerId && getItems(getDealerItemsDataObj);
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
      const getWipsDataObj = {
        dealerId: dealerId.toString(),
        intId: userIntId.toString()
      };
      const payload = {
        getWipsDataObj,
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

  let allFilteredItems = combinedItems.filter(
    createFilter(searchInput, KEYS_TO_FILTERS)
  );
  let filteredItems = allFilteredItems.slice(0, 100);
  //   console.log('filteredItems.length ', filteredItems.length);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: { wipNumber: '' },
    inputValidities: {
      wipNumber: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, text) => {
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
                keyboardType='number-pad'
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
            buttonStyle={styles.closeButton}
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
              color={Colors.vwgIosLink}
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
                      <Text
                        style={styles.basketItemTextEmph}
                      >{`Part: ${item.partNumber} - ${item.partDescription}`}</Text>
                    ) : null}
                    {item.loanToolNo ? (
                      <Text
                        style={styles.basketItemTextEmph}
                      >{`Part: ${item.loanToolNo} - ${item.toolDescription}`}</Text>
                    ) : null}
                    {item.loanToolNo ? (
                      <Text style={styles.basketItemText}>Loan tool</Text>
                    ) : null}
                    {item.toolNumber ? (
                      <Text
                        style={styles.basketItemTextEmph}
                      >{`Tool: ${item.toolNumber}`}</Text>
                    ) : null}
                    {item.toolNumber ? (
                      <Text style={styles.basketItemText}>
                        {item.location
                          ? `Location: ${item.location}`
                          : `Location not recorded`}
                      </Text>
                    ) : null}
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

  console.log('RENDERING FT screen !!!!!!!!!!!!!!!!!!!');
  return (
    <View>
      <View style={styles.arse}>
        <KeyboardAvoidingView>
          <SearchBarWithRefresh
            dataName={'tools'}
            someDataExpected={true}
            refreshRequestHandler={refreshRequestHandler}
            searchInputHandler={searchInputHandler}
            searchInput={searchInput}
            isLoading={isLoadingAny}
            dataError={dataErrorAny}
            dataCount={dealerToolsItems.length}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          />

          {mode === 'list' &&
          searchInput.length > 0 &&
          filteredItems.length === 0 ? (
            <View style={styles.noneFoundPrompt}>
              <Text style={styles.noneFoundPromptText}>
                Your search found no results.
              </Text>
            </View>
          ) : null}

          {isLoadingAny ? null : (
            <View style={styles.toolsList}>
              <DealerToolsList
                items={filteredItems}
                userIntId={userIntId}
                dealerWipsItems={dealerWipsItems}
                selectItemHandler={selectItemHandler}
                mode={mode}
                showPrompt={
                  mode === 'list' &&
                  toolBasket.length === 0 &&
                  filteredItems.length > 0 &&
                  searchInput.length === 0
                    ? true
                    : false
                }
              />
            </View>
          )}
          {isDupBookedAlertVisible ? (
            <AwesomeAlert
              show={isDupBookedAlertVisible}
              showProgress={false}
              title='Tool already out'
              message={`You already have that tool booked out`}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText='Cancel'
              confirmText='OK'
              confirmButtonColor={Colors.vwgMintGreen}
              cancelButtonColor={Colors.vwgWarmRed}
              onCancelPressed={() => {
                cancelDupPickedHandler();
              }}
              onConfirmPressed={() => {
                cancelDupPickedHandler();
              }}
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
            />
          ) : null}

          {mode !== 'list' && toolBasket.length > 0 ? drawer : null}
        </KeyboardAvoidingView>
      </View>
      {mode === 'list' && filteredItems.length > 0 && toolBasket.length > 0 ? (
        <View style={styles.closedBasket}>
          <TouchableOpacity
            onPress={() => {
              toggleBaskethandler(true);
            }}
            style={{ flexDirection: 'row' }}
          >
            <Text
              style={styles.closedBasketPromptText}
            >{`Open tools basket   `}</Text>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-up'}
              type='ionicon'
              size={15}
              color={Colors.vwgWhite}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

FindToolsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Find tools' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          {
            /* console.log('pressed homescreen icon'); */
          }
          navigation.navigate('Home');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => {
          {
            /*  console.log('pressed menu icon'); */
          }
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,

    backgroundColor: '#fff'
  },
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
    color: Colors.vwgIosLink,
    fontSize: RFPercentage(2)
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
    height: 40,
    // bottom: TAB_BAR_HEIGHT,
    bottom: 45,
    left: 0,
    backgroundColor: Colors.vwgIosLink,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  closedBasketPromptText: {
    fontFamily: 'the-sans',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(1.9)
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
    backgroundColor: Colors.vwgIosLink
  },

  cancelButton: {
    borderColor: Colors.vwgWarmRed

    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  cancelButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWarmRed,
    paddingLeft: 5
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  closeButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgIosLink
  },
  bookButton: {
    backgroundColor: Colors.vwgIosLink
    // color: Colors.vwgWhite,

    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  bookButtonTitle: {
    // color: Colors.vwgWhite,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    paddingLeft: 5
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  confirmButton: {
    backgroundColor: Colors.vwgIosLink
  },
  confirmButtonTitle: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    paddingLeft: 5
  }
});
