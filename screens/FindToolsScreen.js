import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Divider, Icon, Input, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import { createFilter } from 'react-native-search-filter';
import SearchBarWithRefresh from '../components/SearchBarWithRefresh';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';
import { createDealerWipRequest } from '../actions/dealerWips';
import Urls from '../constants/Urls';
import Colors from '../constants/Colors';
import Types from '../constants/Types';
import DealerToolsList from './DealerToolsList';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const KEYS_TO_FILTERS = ['toolNumber', 'partNumber', 'partDescription'];

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
  //   const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const isLoading = useSelector(state => state.dealerTools.isLoading);
  const dataError = useSelector(state => state.dealerTools.error);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userName = userDataObj && userDataObj.userName;
  const userIntId = userDataObj && userDataObj.intId.toString();

  const [searchInput, setSearchInput] = useState('');
  const [isBasketVisible, setIsBasketVisible] = useState(true);
  const [mode, setMode] = useState('list');
  const [toolBasket, setToolBasket] = useState([]);

  const [wipNumber, setWipNumber] = useState('');
  //   console.log('toolbasket from useState is ', toolBasket.length);

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );
  const input = React.createRef();
  const userDataCount =
    (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  const getDealerToolsDataObj = {
    dealerId: dealerId
  };

  const getItems = useCallback(getDealerToolsDataObj => {
    // console.log('in getItems', getDealerToolsDataObj);
    dispatch(getDealerToolsRequest(getDealerToolsDataObj)), [dealerToolsItems];
  });

  const saveToJob = useCallback(
    newWipPkgObj => dispatch(createDealerWipRequest(newWipPkgObj)),
    [dealerWipsItems]
  );

  useEffect(() => {
    // runs only once
    // console.log('in tools use effect');
    const getItemsAsync = async () => {
      getItems(getDealerToolsDataObj);
    };
    getItemsAsync();
  }, [dispatch]);

  if (!userIsSignedIn) {
    navigation.navigate('SignIn');
  }

  //   if (dealerToolsItems && dealerToolsItems.length > 0) {
  //     console.log('in tools screen,toolsItems', dealerToolsItems.length);
  //   } else {
  //     console.log('in tools screen, no toolsItems');
  //   }

  const selectItemHandler = newItem => {
    // console.log(newItem.id, ' to be added');
    let newBasket = toolBasket;
    let dup = toolBasket.filter(item => item.id === newItem.id);
    // console.log('dup, ');
    if (dup.length === 0) {
      // newItem.key = newItem.id
      newBasket.push(newItem);
      setToolBasket(newBasket);
      //   toggleExpandBasketHandler(true);
      setMode('basket');
      setIsBasketVisible(true);
      //   console.log('newBasket', newBasket);
      //   console.log(newItem.id, ' added to... ');
    } else {
      //   console.log('dup');
      setMode('basket');
      setIsBasketVisible(true);
    }
    // console.log('toolBasket update', toolBasket);
    // console.log(toolBasket.length);
  };

  const removeBasketHandler = () => {
    console.log('basket', ' to be removed');

    setToolBasket([]);
    setMode('list');
    setIsBasketVisible(false);

    console.log(toolBasket.length);
    // updateBasketView();
  };

  const bookToolsHandler = () => {
    console.log('in book Tools handler');
    setMode('book');
    setWipNumber('');
    // input.current.clear();
    // input.current.isFocused();
    setIsBasketVisible(true);
  };

  const backdropPressHandler = () => {
    console.log('background pressed');
    setMode('list');
    setIsBasketVisible(false);
    // updateBasketView();
  };

  const removeBasketItemHandler = deadItemId => {
    // console.log(deadItemId, ' to be removed');
    if (toolBasket && toolBasket.length > 1) {
      const newBasket = toolBasket.filter(item => item.id !== deadItemId);
      setToolBasket(newBasket);
    } else {
      removeBasketHandler();
    }
  };
  const addBasketItemHandler = () => {
    // console.log(deadItemId, ' to be removed');
    setMode('list');
    setIsBasketVisible(false);
  };
  const toggleBaskethandler = action => {
    // console.log(deadItemId, ' to be removed');
    if (action) {
      setIsBasketVisible(action);
      setMode('basket');
    } else {
      setMode('basket');
      setIsBasketVisible(!isBasketVisible);
    }
  };

  const acceptMessageHandler = () => {
    console.log('basket all done and closed');
    removeBasketHandler();
    setMode('list');
    setIsBasketVisible(false);
    inputChangeHandler('wipNumber', '');

    // console.log(toolBasket.length);
    // updateBasketView();
  };

  // Search function
  const searchInputHandler = searchInput => {
    // console.log(searchInput);
    // toggleShowBasketHandler(false);
    setSearchInput(searchInput);
  };
  const refreshRequestHandler = () => {
    console.log('in tools refreshRequestHandler');
    // const getItemsData = {
    //   dealerId: dealerId
    // };
    // console.log('in refreshRequestHandler');
    dealerId && getItems(getDealerToolsDataObj);
  };

  const saveToJobRequestHandler = () => {
    // console.log(userDataObj);
    if (formState.formIsValid) {
      //   console.log(
      //     'formState.inputValues.wipNumber ',
      //     formState.inputValues.wipNumber
      //   );
      //   console.log('formIsValid', formState.inputValues.wipNumber);
      setWipNumber(formState.inputValues.wipNumber);
      setMode('confirm');
      setIsBasketVisible(true);
      const newWipObj = {
        wipNumber: formState.inputValues.wipNumber.toString(),
        createdBy: userName,
        createdDate: new Date(),
        userIntId: userIntId.toString(),
        dealerId: dealerId.toString(),
        tools: toolBasket
      };
      const getWipsDataObj = {
        dealerId: dealerId.toString(),
        intId: userIntId.toString()
      };
      const newWipPkgObj = {
        getWipsDataObj,
        newWipObj
      };
      //   console.log('in saveToJobRequestHandler', newWipPkgObj);
      saveToJob(newWipPkgObj);
      inputChangeHandler('wipNumber', '');
    } else {
      setMode('book');
      setIsBasketVisible(true);
      //   console.log('formIs NOT Valid', formState.inputValues.wipNumber);
    }
  };
  // Search function - end

  //   const { dealerToolsItems } = props;
  // const { dealerToolsItems } = this.props;

  //   console.log(items);
  let filteredItems = dealerToolsItems.filter(
    createFilter(searchInput, KEYS_TO_FILTERS)
  );

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
        if (text[0] != 0) {
          isValid = true;
        }
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

  let showPrompt =
    mode === 'list' &&
    toolBasket.length === 0 &&
    filteredItems.length > 0 &&
    searchInput.length === 0
      ? true
      : false;

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
                number
                value={formState.inputValues.wipNumber}
                onChangeText={inputChangeHandler.bind(this, 'wipNumber')}
                style={styles.inputLabeText}
                placeholder='Job number/name'
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
            <View style={{ width: '100%' }}>
              {formState.inputValues.wipNumber &&
              formState.inputValues.wipNumber.length > 0 ? (
                <Text>{` `}</Text>
              ) : (
                <Text>Please record a job number or job name</Text>
              )}
            </View>
          </View>
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
            titleStyle={Colors.vwgMintGreen}
            onPress={() => {
              acceptMessageHandler();
            }}
            buttonStyle={styles.closeButton}
          />
        </View>
      </View>
    ) : mode === 'basket' ? (
      <View>
        <View style={styles.basketActionRow}>
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
      <View style={styles.basketContents}>
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
                  <ScaledImageFinder
                    width={70}
                    item={item}
                    baseImageUrl={Urls.toolImage}
                  />
                </View>
                <View style={styles.basketItemDescCol}>
                  <Text
                    style={styles.basketItemTextEmph}
                  >{`Part: ${item.partNumber} - ${item.partDescription}`}</Text>

                  <Text
                    style={styles.basketItemTextEmph}
                  >{`Tool: ${item.toolNumber}`}</Text>
                  <Text style={styles.basketItemText}>
                    {item.location
                      ? `Location: ${item.location}`
                      : `Location not recorded`}
                  </Text>
                  {item.lastWIP ? (
                    <Text
                      style={styles.basketItemText}
                    >{`Also booked to job ${item.lastWIP}`}</Text>
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
      </View>
    );
  }

  let drawer = (
    <Modal
      isVisible={isBasketVisible}
      onBackdropPress={() => backdropPressHandler()}
      onSwipeComplete={() => setIsBasketVisible(false)}
      swipeDirection='down'
      style={styles.drawer}
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
            {basketContents}
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

  console.log('aboutto render');
  return (
    <View>
      <View style={styles.arse}>
        <KeyboardAvoidingView>
          <SearchBarWithRefresh
            refreshRequestHandler={refreshRequestHandler}
            searchInputHandler={searchInputHandler}
            searchInput={searchInput}
            isLoading={isLoading}
            dataError={dataError}
            dataCount={dealerToolsItems.length}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          />

          {mode === 'confirm' ? (
            <TouchableOpacity
              onPress={() => {
                acceptMessageHandler();
              }}
            >
              <View style={styles.confirmedPrompt}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-checkmark-circle-outline'
                      : 'md-checkmark-circle-outline'
                  }
                  type='ionicon'
                  size={20}
                  color={Colors.vwgMintGreen}
                />
                <Text style={styles.confirmedPromptText}>
                  {`Tools booked to job ${wipNumber}. Hit this to find tools for another job.`}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {mode === 'list' &&
          searchInput.length > 0 &&
          filteredItems.length === 0 ? (
            <View style={styles.noneFoundPrompt}>
              <Text style={styles.noneFoundPromptText}>
                Your search found no results.
              </Text>
            </View>
          ) : null}
          {mode === 'list' &&
          toolBasket.length === 0 &&
          filteredItems.length > 0 &&
          searchInput.length > 0 ? (
            <View style={styles.searchFoundPrompt}>
              <Text style={styles.searchFoundPromptText}>
                {`Press on the tool to add it to your job.`}
              </Text>
            </View>
          ) : null}
          {isLoading ? null : (
            <View style={styles.toolsList}>
              <DealerToolsList
                items={filteredItems}
                onSelectItem={selectItemHandler}
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
        </KeyboardAvoidingView>
        {mode !== 'list' && toolBasket.length > 0 ? drawer : null}
      </View>
      {mode === 'list' && toolBasket.length > 0 ? (
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
          console.log('pressed homescreen icon');
          navigation.navigate('HomeScreen');
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
          console.log('pressed menu icon');
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
  confirmButton: { width: '10%' },
  drawer: {
    justifyContent: 'flex-end',
    margin: 0
  },
  toolsList: {
    // marginBottom: 50,
    backgroundColor: 'transparent'
    // height: '80%'
  },
  basket: {
    color: Colors.vwgDeepBlue,
    borderColor: Colors.vwgMintGreen,
    backgroundColor: Colors.vwgWhite,
    borderColor: Colors.vwgDarkSkyBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  basketText: {
    color: Colors.vwgDeepBlue
  },
  basketTextLink: {
    color: Colors.vwgIosLink
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basketItem: {
    color: Colors.vwgDarkSkyBlue,
    flexDirection: 'row'
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
  basketItemText: {
    color: Colors.vwgDarkGray,
    fontSize: RFPercentage(1.8)
  },
  basketItemTextEmph: {
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
    textAlign: 'center',

    color: Colors.vwgWhite
  },
  confirmedPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgWhite
  },
  confirmedPromptText: {
    textAlign: 'center',
    color: Colors.vwgMintGreen,
    fontSize: RFPercentage(2.2)
  },
  noneFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    textAlign: 'center',
    color: Colors.vwgWhite
  },
  inputLabelText: {
    marginBottom: 20,
    color: 'black',
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
  confirmButton: { width: '10%' },
  basket: {
    color: Colors.vwgDeepBlue,
    borderColor: Colors.vwgMintGreen,
    backgroundColor: Colors.vwgWhite,
    // borderColor: Colors.vwgDarkSkyBlue,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderRadius: 5,
    margin: 5,
    padding: 5
  },
  basketText: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2)
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  cancelButton: {
    borderColor: Colors.vwgWarmRed

    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  cancelButtonTitle: {
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWarmRed,
    paddingLeft: 5
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
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
    fontSize: RFPercentage(1.9),
    paddingLeft: 5
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  confirmButton: {
    backgroundColor: Colors.vwgIosLink
    // color: Colors.vwgWhite,

    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
  },
  confirmButtonTitle: {
    // color: Colors.vwgWhite,
    fontSize: RFPercentage(1.9),
    paddingLeft: 5
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // width: '10%'
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
    textAlign: 'center',

    color: Colors.vwgWhite
  },
  noneFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    textAlign: 'center',
    color: Colors.vwgWhite
  },
  inputLabelText: {
    marginBottom: 20,
    color: 'black',
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
  }
});
