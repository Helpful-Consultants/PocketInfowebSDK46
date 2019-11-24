import React, { useCallback, useEffect, useState } from 'react';
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
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';

const KEYS_TO_FILTERS = ['toolNumber', 'partNumber', 'partDescription'];

export default FindToolsScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const dealerToolsItems = useSelector(
    state => state.dealerTools.dealerToolsItems
  );
  const dealerWipsItems = useSelector(
    state => state.dealerWips.dealerWipsItems
  );
  //   const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;

  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBasketExpanded, setIsBasketExpanded] = useState(true);
  const [toolBasket, setToolBasket] = useState([]);
  const [counter, setCounter] = useState(0);
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
    getToolsData => dispatch(createDealerWipRequest(wipData)),
    [dealerWipsItems]
  );

  if (dealerToolsItems && dealerToolsItems.length > 0) {
    // console.log('in tools screen,toolsItems', dealerToolsItems);
  } else {
    console.log('in tools screen, no toolsItems');
  }

  const selectItemHandler = newItem => {
    setCounter(counter + 1);
    console.log(newItem.id, ' to be added');
    const newBasket = toolBasket;
    const dup = toolBasket.filter(item => item.id === newItem.id);
    console.log('dup, ', dup);
    if (dup.length === 0) {
      newBasket.push(newItem);
      setToolBasket(newBasket);
      console.log('newBasket', newBasket);
      console.log(newItem.id, ' added to... ');
    } else {
      console.log('dup');
    }
    console.log(toolBasket.length);
  };

  const removeBasketItemHandler = deadItemId => {
    console.log(deadItemId, ' to be removed');
    const newBasket = toolBasket.filter(item => item.id !== deadItemId);

    setToolBasket(newBasket);
    console.log('newBasket', newBasket);
    console.log(deadItemId, '  removed from to... ');
    // console.log(toolBasket);
    console.log(toolBasket.length);
    // updateBasketView();
  };

  toggleShowBasketHandler = action => {
    console.log('toggling ', isBasketExpanded);
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
    console.log(searchInput);
    toggleShowBasketHandler(false);
    setSearchInput(searchInput);
  };
  const refreshRequestHandler = () => {
    const getToolsData = {
      dealerId: dealerId
    };
    console.log('in refreshRequestHandler');
    dealerId && getTools(getToolsData);
  };
  // Search function - end

  //   const { dealerToolsItems } = props;
  // const { dealerToolsItems } = this.props;
  const items = dealerToolsItems;
  //   console.log(items);
  const filteredItems = items.filter(
    createFilter(searchInput, KEYS_TO_FILTERS)
  );

  let basketView =
    toolBasket && toolBasket.length > 0 ? (
      <View style={styles.basket}>
        <View style={styles.basketHeader}>
          <Text style={styles.basketText}>
            {`${toolBasket.length} ${
              toolBasket.length > 1 ? `tools` : `tool`
            } in basket.`}
          </Text>
          <Text style={styles.basketText}>{`Book to job`}</Text>
          <TouchableOpacity onPress={() => toggleShowBasketHandler()}>
            <Text>{isBasketExpanded ? `-` : `+`}</Text>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
              type='ionicon'
              size={15}
              color='red'
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
                          borderColor: 'gray',
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
                            >{`Booked out by Bob, job ${item.lastWip}`}</Text>
                          ) : null}
                        </View>
                        <TouchableOpacity
                          onPress={() => removeBasketItemHandler(item.id)}
                        >
                          <Icon
                            name={
                              Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'
                            }
                            type='ionicon'
                            size={20}
                            color={Colors.vwgWarmRed}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                }
              ></ListItem>
            ))}
          </View>
        ) : null}
      </View>
    ) : null;

  console.log(basketView);
  //   let basketView = null;
  //   useEffect(() => {
  //     console.log('toolBasket is ', toolBasket && toolBasket);
  //     basketView =
  //       toolBasket && toolBasket.length === 0 ? (
  //         <View style={styles.searchFoundPrompt}>
  //           <Text
  //             style={styles.searchFoundPromptText}
  //           >{`${toolBasket.length} tools in basket`}</Text>
  //         </View>
  //       ) : (
  //         <View style={styles.searchFoundPrompt}>
  //           <Text
  //             style={styles.searchFoundPromptText}
  //           >{`${toolBasket.length} tools in basket`}</Text>
  //         </View>
  //       );
  //     console.log(basketView);
  //   }, [toolBasket]);
  //   console.log(filteredItems);
  //   const items = dealerToolsDummyData;

  // const { search } = this.state;
  console.log(searchInput.length, filteredItems.length);

  return (
    // const { dealerToolsItems } = this.props;
    // console.log('in DealerToolsScreen, dealerTools ', this.props.dealerToolsItems);
    // console.log('Find Tools screen');
    // console.log(dealerToolsItems);
    // console.log('Find Tools screen end');
    // const items = dealerToolsItems || [];

    // console.log('items');
    // console.log(items);
    // console.log('items end');
    // console.log('in DealerToolsScreen, dealerTools ', dealerTools && dealerTools.items);
    // console.log('in DealerToolsScreen, dealerTools ', dealerTools && dealerTools);
    // console.log('in DealerToolsScreen, dealerTools', dealerTools && dealerTools);

    <View>
      <Overlay isVisible={isModalVisible} animationType={'fade'}>
        <View>
          <Text>Book tool XXXXXX to job 9999, job 222, 3333 </Text>
          <Text>{selectedItem}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <Button
                title=' Confirm'
                onPress={() => {
                  setIsModalVisible(false);
                }}
                titleStyle={{ fontSize: 10 }}
                buttonStyle={{
                  height: 30,
                  marginBottom: 2,
                  marginTop: 2,
                  marginLeft: 15,
                  marginRight: 15,
                  borderRadius: 20,
                  backgroundColor: Colors.vwgDeepBlue
                }}
                icon={
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-checkmark-circle-outline'
                        : 'md-checkmark-circle-outline'
                    }
                    type='ionicon'
                    size={15}
                    color='white'
                  />
                }
              />
            </View>

            <View style={styles.buttonView}>
              <Button
                title=' Create new job'
                onPress={() => {}}
                titleStyle={{ fontSize: 10 }}
                buttonStyle={{
                  height: 30,
                  marginBottom: 2,
                  marginTop: 2,
                  marginLeft: 15,
                  marginRight: 15,
                  borderRadius: 20,
                  backgroundColor: Colors.vwgDeepBlue
                }}
                icon={
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-checkmark-circle-outline'
                        : 'md-checkmark-circle-outline'
                    }
                    type='ionicon'
                    size={15}
                    color='white'
                  />
                }
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title=' Close'
                onPress={() => {
                  setIsModalVisible(false);
                }}
                titleStyle={{ fontSize: 10 }}
                buttonStyle={{
                  height: 30,
                  marginBottom: 2,
                  marginTop: 2,
                  marginLeft: 15,
                  marginRight: 15,
                  borderRadius: 20,
                  backgroundColor: Colors.vwgBlack
                }}
                icon={
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    type='ionicon'
                    size={15}
                    color='white'
                  />
                }
              />
            </View>
          </View>
        </View>
      </Overlay>
      <KeyboardAvoidingView>
        {toolBasket.length !== 0 ? basketView : null}
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
        {searchInput.length > 0 && filteredItems.length === 0 ? (
          <View style={styles.noneFoundPrompt}>
            <Text style={styles.noneFoundPromptText}>
              Your search found no results.
            </Text>
          </View>
        ) : null}
        {toolBasket.length === 0 && filteredItems.length > 0 ? (
          <View style={styles.searchFoundPrompt}>
            <Text style={styles.searchFoundPromptText}>
              {`Press on a tool to add it to your job.`}
            </Text>
          </View>
        ) : null}
        <DealerToolsList
          items={filteredItems}
          onSelectItem={selectItemHandler}
        />
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
    color: Colors.wgDarkSkyBlue
  },
  basketItemNumbers: { flexDirection: 'column', width: '40%' },
  basketItemDesc: { flexDirection: 'column', width: '30%' },
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
  buttonContainer: {
    flexDirection: 'column',
    width: '60%'
  },
  buttonView: {
    // width: 200,
    fontSize: 12
  }
});
