import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Icon, Overlay, SearchBar, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createFilter } from 'react-native-search-filter';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getLtpRequest } from '../actions/ltp';
import Colors from '../constants/Colors';

import LtpList from './LtpList';
import ltpDummyData from '../dummyData/ltpDummyData.js';

const KEYS_TO_FILTERS = ['orderPartNo', 'toolDescription'];
export default LtpScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const ltpItems = useSelector(state => state.ltp.ltpItems);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userData = useSelector(state => state.user.userData[0]);
  const dealerId = userData && userData.dealerId;

  //   const signInToServer = useCallback(
  //     signInData => dispatch(getUserRequest(signInData)),
  //     [userIsSignedIn]
  //   );

  const getTools = useCallback(() => dispatch(getLtpRequest()), [ltpItems]);

  if (ltpItems && ltpItems.length > 0) {
    // console.log('in ltp screen,ltpItems', ltpItems);
  } else {
    console.log('in ltp screen, no ltpItems');
  }

  // Search function
  const [searchInput, setSearchInput] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectItemHandler = item => {
    setSelectedItem(item.partDescription);
    setIsModalVisible(true);
    // return alert(
    //   `the user selected  ${item.partDescription} for job 999? ; OK; change job; cancel`
    // );
  };

  const searchInputHandler = searchInput => {
    console.log(searchInput);
    setSearchInput(searchInput);
  };

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    dealerId && getTools();
  };
  // Search function - end

  //   const { ltpItems } = props;
  // const { ltpItems } = this.props;
  const items = ltpItems;

  const filteredItems = items.filter(
    createFilter(searchInput, KEYS_TO_FILTERS)
  );
  //   const items = ltpDummyData;

  // const { search } = this.state;
  return (
    // const { ltpItems } = this.props;
    // console.log('in LtpScreen, ltp ', this.props.ltpItems);
    // console.log('Find Tools screen');
    // console.log(ltpItems);
    // console.log('Find Tools screen end');
    // const items = ltpItems || [];

    // console.log('items');
    // console.log(items);
    // console.log('items end');
    // console.log('in LtpScreen, ltp ', ltp && ltp.items);
    // console.log('in LtpScreen, ltp ', ltp && ltp);
    // console.log('in LtpScreen, ltp', ltp && ltp);

    <View>
      <Overlay isVisible={isModalVisible} animationType={'fade'}>
        <View>
          <Text>Add tool to LTP basket</Text>
          <Text>{selectedItem}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <Button
                title='Confirm'
                onPress={() => {
                  setIsModalVisible(false);
                }}
                buttonStyle={{
                  borderRadius: 10
                }}
                icon={
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-checkmark-circle-outline'
                        : 'md-checkmark-circle-outline'
                    }
                    type='ionicon'
                    size={30}
                    color='white'
                  />
                }
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title='Close'
                onPress={() => {
                  setIsModalVisible(false);
                }}
                buttonStyle={{
                  borderRadius: 10
                }}
                icon={
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    type='ionicon'
                    size={30}
                    color='white'
                  />
                }
              />
            </View>
          </View>
        </View>
      </Overlay>
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
      {searchInput.length > 0 && filteredItems.length > 0 ? (
        <View style={styles.searchFoundPrompt}>
          <Text style={styles.searchFoundPromptText}>
            Please visit the LTP website to make your booking.
          </Text>
        </View>
      ) : null}
      {searchInput.length > 0 && filteredItems.length === 0 ? (
        <View style={styles.noneFoundPrompt}>
          <Text style={styles.noneFoundPromptText}>
            Your search found no results.
          </Text>
        </View>
      ) : null}

      <LtpList items={filteredItems} onSelectItem={selectItemHandler} />
    </View>
  );
};

LtpScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='LTP' />,
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

// LocatorScreen.navigationOptions = {
//   headerTitle: <TitleWithAppLogo title='Tool Finder' />
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
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
    // backgroundColor: Colors.vwgSearchBarInputContainer,
    borderColor: Colors.vwgSearchBarInputContainer
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
  buttonContainer: {
    flexDirection: 'row',
    width: '60%'
  },
  buttonView: {
    // width: 200,
    fontSize: 12
  }
});
