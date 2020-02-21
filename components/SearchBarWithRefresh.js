import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, SearchBar, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

export default SearchBarWithRefresh = props => {
  //   console.log('SearchBarWithRefresh props', props);
  const {
    dataName,
    someDataExpected,
    dataCount,
    isLoading,
    dataError,
    dataStatusCode,
    refreshRequestHandler,
    searchInput,
    searchInputHandler
  } = props;

  const dataNameToUse = dataName || 'data';
  if (dataError) {
    // console.log('dataError: ', dataError);
  }
  return (
    <View style={styles.searchBarRow}>
      {isLoading ? (
        <View style={styles.searchBarRowRefreshButton}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : (
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
            color={Colors.vwgLink}
          />
        </TouchableOpacity>
      )}
      {isLoading ? (
        <View style={styles.searchBarRowNoDataTextContainer}>
          <Text style={styles.searchBarRowNoDataText}>
            Updating {`${dataNameToUse}`}.
          </Text>
        </View>
      ) : dataError ? (
        dataStatusCode && dataStatusCode === 408 ? (
          <View style={styles.searchBarRowNoDataTextContainer}>
            <Text style={styles.searchBarRowErrorText}>
              {`You need an internet connection to download the ${dataNameToUse}.`}
            </Text>
          </View>
        ) : (
          <View style={styles.searchBarRowNoDataTextContainer}>
            <Text style={styles.searchBarRowErrorText}>
              {`There was a problem syncing the ${dataNameToUse}. Please refresh.`}
              {dataStatusCode && ` (Error code ${dataStatusCode})`}
            </Text>
          </View>
        )
      ) : someDataExpected && dataCount && dataCount === 0 ? (
        <View style={styles.searchBarRowNoDataTextContainer}>
          <Text style={styles.searchBarRowNoDataText}>
            {`No ${dataNameToUse} downloaded yet. Please refresh. Thanks.`}
          </Text>
        </View>
      ) : (
        <View style={styles.searchBarRowSearchInput}>
          <SearchBar
            onChangeText={searchInputHandler}
            value={searchInput}
            placeholder='Type here...'
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.searchBarInputContainer}
            autoCapitalize='none'
          />
        </View>
      )}
      {searchInput.length > 0 && dataCount === 0 ? (
        <View style={styles.noneFoundPrompt}>
          <Text style={styles.noneFoundPromptText}>
            Your search found no results.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: Colors.vwgSearchBarContainer
  },
  searchBarRowNoData: {
    flexDirection: 'row'
  },
  searchBarRowNoDataTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 10,
    backgroundColor: Colors.vwgSearchBarContainer
  },
  searchBarRowErrorText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWarmRed
  },
  searchBarRowNoDataText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgDarkSkyBlue
  },
  searchBarInput: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9)
  },
  searchBarRowRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vwgSearchBarContainer,
    padding: 10
  },
  searchBarInputContainer: {
    backgroundColor: Colors.vwgVeryLightGray,
    borderColor: Colors.vwgSearchBarInputContainer,
    borderRadius: Platform.OS === 'ios' ? 10 : 20,
    height: 30
  },
  searchBarContainer: {
    backgroundColor: Colors.vwgSearchBarContainer,
    height: 45
    // height: 30
  },
  searchBarRowSearchInput: { width: '85%' },
  searchFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },

  noneFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    textAlign: 'center',
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    color: Colors.vwgWhite
  }
});
