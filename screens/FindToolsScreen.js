import React, { useCallback, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  ListItem,
  Overlay,
  SearchBar,
  Text
} from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Image from 'react-native-scalable-image';
import { createFilter } from 'react-native-search-filter';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getDealerToolsRequest } from '../actions/dealerTools';
import { createDealerWipRequest } from '../actions/dealerWips';
import Colors from '../constants/Colors';
// import ToolPic from '../assets/images/icon.png';

import DealerToolsList from './DealerToolsList';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const KEYS_TO_FILTERS = ['toolNumber', 'partNumber', 'partDescription'];

import Types from '../constants/Types';

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
  const userDataObj = useSelector(state => state.user.userData[0]);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userName = userDataObj && userDataObj.userName;
  const userIntId = userDataObj && userDataObj.intId.toString();

  const [searchInput, setSearchInput] = useState('');
  const [isBasketExpanded, setIsBasketExpanded] = useState(false);
  const [mode, setMode] = useState('list');
  const [toolBasket, setToolBasket] = useState([]);

  const [wipNumber, setWipNumber] = useState('');
  //   console.log('toolbasket from useState is ', toolBasket.length);

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );

  const getTools = useCallback(
    getToolsData => dispatch(getDealerToolsRequest(getToolsData)),
    [dealerToolsItems]
  );
  const saveToJob = useCallback(
    newWipPkgObj => dispatch(createDealerWipRequest(newWipPkgObj)),
    [dealerWipsItems]
  );

  if (dealerToolsItems && dealerToolsItems.length > 0) {
    console.log('in tools screen,toolsItems', dealerToolsItems.length);
  } else {
    console.log('in tools screen, no toolsItems');
  }

  const selectItemHandler = newItem => {
    // console.log(newItem.id, ' to be added');
    const newBasket = toolBasket;
    const dup = toolBasket.filter(item => item.id === newItem.id);
    // console.log('dup, ');
    if (dup.length === 0) {
      newBasket.push(newItem);
      setToolBasket(newBasket);
      //   console.log('newBasket', newBasket);
      //   console.log(newItem.id, ' added to... ');
    } else {
      console.log('dup');
    }
    // console.log(toolBasket.length);
  };

  const removeBasketHandler = () => {
    console.log('basket', ' to be removed');

    setToolBasket([]);

    console.log(toolBasket.length);
    // updateBasketView();
  };

  const removeBasketItemHandler = deadItemId => {
    // console.log(deadItemId, ' to be removed');
    const newBasket = toolBasket.filter(item => item.id !== deadItemId);

    setToolBasket(newBasket);
    // console.log('newBasket', newBasket);
    // console.log(deadItemId, '  removed from to... ');
    // console.log(toolBasket);
    // console.log(toolBasket.length);
    // updateBasketView();
  };

  const acceptMessageHandler = () => {
    console.log('basket', ' to be removed');

    setToolBasket([]);
    removeBasketHandler();
    setMode('list');
    // inputChangeHandler('wipNumber', '');

    // console.log(toolBasket.length);
    // updateBasketView();
  };

  toggleShowBasketHandler = action => {
    // console.log('toggling ', isBasketExpanded);
    if (action) {
      setIsBasketExpanded(action);
    } else if (isBasketExpanded === true) {
      setIsBasketExpanded(false);
    } else {
      setIsBasketExpanded(true);
    }
  };
  // Search function
  const searchInputHandler = searchInput => {
    // console.log(searchInput);
    toggleShowBasketHandler(false);
    setSearchInput(searchInput);
  };
  const refreshRequestHandler = () => {
    const getToolsData = {
      dealerId: dealerId
    };
    // console.log('in refreshRequestHandler');
    dealerId && getTools(getToolsData);
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
    } else {
      setMode('book');
      //   console.log('formIs NOT Valid', formState.inputValues.wipNumber);
    }
  };
  // Search function - end

  //   const { dealerToolsItems } = props;
  // const { dealerToolsItems } = this.props;
  const items = dealerToolsItems;
  //   console.log(items);
  const filteredItems = items.filter(
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

  let basketView =
    toolBasket && toolBasket.length > 0 ? (
      <View style={styles.basket}>
        <View style={styles.basketHeader}>
          <TouchableOpacity
            onPress={() => toggleShowBasketHandler()}
            style={{ flexDirection: 'row' }}
          >
            <View>
              <Text style={styles.basketText}>
                {`${toolBasket.length} ${
                  toolBasket.length > 1 ? `tools` : `tool`
                } in job basket.`}
              </Text>

              {isBasketExpanded ? (
                <View style={styles.bookButton}>
                  <Icon
                    name={
                      Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-up'
                    }
                    type='ionicon'
                    size={15}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text style={styles.basketText}>{` Hide job tools`}</Text>
                </View>
              ) : (
                <View style={styles.bookButton}>
                  <Icon
                    name={
                      Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'
                    }
                    type='ionicon'
                    size={15}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text style={styles.basketText}>{` Show job tools`}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          {mode === 'list' ? (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => setMode('book')}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
                type='ionicon'
                size={15}
                color={Colors.vwgDeepBlue}
              />
              <Text style={styles.basketText}>{` Book to job`}</Text>
            </TouchableOpacity>
          ) : null}
          {mode === 'confirm' ? (
            <Text style={styles.basketText}>{`Saved to ${wipNumber}`}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => removeBasketHandler()}
          >
            <Text style={styles.basketText}>{`Clear `}</Text>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
              type='ionicon'
              size={15}
              color={Colors.vwgDeepBlue}
            />
          </TouchableOpacity>
        </View>

        {isBasketExpanded ? (
          <View style={styles.basketContents}>
            {toolBasket.map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                subtitle={
                  <View>
                    <View style={styles.basketItem}>
                      <View style={styles.basketItemNumbers}>
                        <Text
                          style={styles.basketItemText}
                        >{`Part ${item.partNumber}`}</Text>
                        <Text
                          style={styles.basketItemText}
                        >{`Tool ${item.toolNumber}`}</Text>
                      </View>
                      <View style={styles.basketItemDesc}>
                        <Text
                          style={styles.basketItemText}
                        >{`${item.partDescription}`}</Text>
                      </View>
                      <View
                        style={{
                          height: 40,
                          width: 80,
                          borderColor: 'white',
                          borderType: 'solid',
                          borderWidth: 1
                        }}
                      >
                        <Image
                          source={{ uri: '../assets/images/icon.png' }}
                          size={{ height: 40, width: 40 }}
                          height={40}
                          width={40}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.basketItemFooterRow}>
                        <View style={styles.basketItemLocation}>
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
                        <TouchableOpacity
                          style={styles.bookButton}
                          onPress={() => removeBasketItemHandler(item.id)}
                        >
                          <Text style={styles.basketText}>{`Clear tool `}</Text>
                          <Icon
                            name={
                              Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'
                            }
                            type='ionicon'
                            size={20}
                            color={Colors.vwgDeepBlue}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                }
              ></ListItem>
            ))}
            <Text
              style={{ ...styles.basketText, textAlign: 'right' }}
            >{`Tool pictures coming soon.`}</Text>
          </View>
        ) : null}
      </View>
    ) : null;

  //   console.log(basketView);

  //   console.log(searchInput.length, filteredItems.length);

  return (
    <View>
      {mode === 'book' ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '90%' }}>
            <Input
              style={{ flexDirection: 'row' }}
              number
              value={formState.inputValues.wipNumber}
              onChangeText={inputChangeHandler.bind(this, 'wipNumber')}
              style={styles.inputLabeText}
              placeholder='Job number'
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
          {formState.formIsValid ? (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                saveToJobRequestHandler();
                setMode('confirm');
              }}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-checkbox' : 'md-chekbox'}
                type='ionicon'
                size={25}
                color={Colors.vwgMintGreen}
              />
              <Text style={{ color: Colors.vwgMintGreen }}>Save</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
      <KeyboardAvoidingView>
        {toolBasket.length !== 0 ? basketView : null}
        {mode === 'list' ? (
          <View style={styles.searchBarRow}>
            <TouchableOpacity
              style={styles.searchBarRowRefreshButton}
              onPress={() => {
                refreshRequestHandler();
              }}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
                type='ionicon'
                size={25}
                color='black'
              />
            </TouchableOpacity>
            <View style={styles.searchBarRowSearchInput}>
              <SearchBar
                onChangeText={searchInputHandler}
                value={searchInput}
                platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
              />
            </View>
          </View>
        ) : null}
        {mode === 'confirm' ? (
          <TouchableOpacity
            onPress={() => {
              acceptMessageHandler();
            }}
          >
            <View style={styles.searchFoundPrompt}>
              <Text style={styles.searchFoundPromptText}>
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
        filteredItems.length > 0 ? (
          <View style={styles.searchFoundPrompt}>
            <Text style={styles.searchFoundPromptText}>
              {`Press on a tool to add it to your job.`}
            </Text>
          </View>
        ) : null}
        {mode === 'list' ? (
          <DealerToolsList
            items={filteredItems}
            onSelectItem={selectItemHandler}
          />
        ) : null}
      </KeyboardAvoidingView>
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
  basket: {
    color: Colors.vwgDeepBlue,
    borderColor: Colors.vwgMintGreen,
    backgroundColor: Colors.vwgWhite,
    borderColor: Colors.vwgDarkSkyBlue,
    borderType: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  basketText: {
    color: Colors.vwgDeepBlue
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basketItem: {
    color: Colors.wgDarkSkyBlue,
    flexDirection: 'row'
  },
  basketItemText: {
    color: Colors.vwgDeepBlue
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
  bookButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  searchBarRowRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
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
