import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../constants/Colors';
export default DataAlertBarWithRefresh = props => {
  //   console.log('DataAlertWithRefresh props', props);

  let {
    dataName,
    isLoading,
    someDataExpected,
    dataCount,
    dataError,
    dataStatusCode,
    refreshRequestHandler
  } = props;
  dataName = dataName || 'data';

  const dataNameToUse = dataName || 'data';

  return dataCount && dataCount > 0 ? null : (
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
            color={Colors.vwgIosLink}
          />
        </TouchableOpacity>
      )}
      {isLoading ? (
        <View style={styles.searchBarRowNoDataTextContainer}>
          <Text style={styles.searchBarRowNoDataText}>
            Updating {`${dataName}`}.
          </Text>
        </View>
      ) : dataError ? (
        dataStatusCode && dataStatusCode === '999' ? (
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
            {`No ${dataName} downloaded yet. Please refresh. Thanks.`}
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
  warningContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 70
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
  searchBarRowNoDataText: {
    color: Colors.vwgDarkSkyBlue,
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
  searchBarRowErrorText: {
    color: Colors.vwgWarmRed
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
