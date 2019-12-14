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
  let { dataName } = props;
  dataName = dataName || 'data';
  return (
    <View style={styles.searchBarRow}>
      {props.isLoading ? (
        <View style={styles.searchBarRowRefreshButton}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.searchBarRowRefreshButton}
          onPress={() => {
            props.refreshRequestHandler();
          }}
        >
          <Icon
            name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
            type='ionicon'
            size={25}
            color={Colors.vwgIosLink}
          />
        </TouchableOpacity>
      )}
      {props.isLoading ? (
        <View style={styles.searchBarRowNoDataTextContainer}>
          <Text style={styles.searchBarRowNoDataText}>
            Updating {`${dataName}`}.
          </Text>
        </View>
      ) : props.dataError ? (
        <View style={styles.searchBarRowNoDataTextContainer}>
          <Text style={styles.searchBarRowErrorText}>
            {`There was a problem downloading the ${dataName}. Please refresh.`}
          </Text>
        </View>
      ) : props.dataCount && props.dataCount > 0 ? (
        <View style={styles.searchBarRowSearchInput}>
          <SearchBar
            onChangeText={props.searchInputHandler}
            value={props.searchInput}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            autoCapitalize='none'
          />
        </View>
      ) : (
        <View style={styles.searchBarRowNoDataTextContainer}>
          <Text style={styles.searchBarRowNoDataText}>
            {`No ${dataName} downloaded yet. Please refresh. Thanks.`}
          </Text>
        </View>
      )}
      {props.searchInput.length > 0 && props.dataCount === 0 ? (
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
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  warningContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 70,
    backgroundColor: '#fff'
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
    backgroundColor: Colors.vwgSearchBarContainer
  },
  searchBarRowErrorText: {
    color: Colors.vwgWarmRed
  },
  searchBarRowNoDataText: {
    color: Colors.vwgDarkSkyBlue
  },
  searchBarRowRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.vwgSearchBarContainer,
    padding: 10
  },
  searchBarInputContainer: {
    // backgroundColor: Colors.vwgSearchBarInputContainer,
    borderColor: Colors.vwgSearchBarInputContainer,
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
  lookupPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  lookupPromptText: {
    textAlign: 'center',
    color: Colors.vwgWhite,
    fontSize: RFPercentage(1.9)
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
