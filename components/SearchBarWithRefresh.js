import React from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Icon, SearchBar, Text } from 'react-native-elements';
import Colors from '../constants/Colors';

export default SearchBarWithRefresh = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
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
    searchInputHandler,
  } = props;

  const dataNameToUse = dataName || 'data';
  if (dataError) {
    // console.log('dataError: ', dataError);
  }
  return (
    <View style={baseStyles.viewFlexRow}>
      {isLoading ? (
        <View style={baseStyles.searchBarRowRefreshButton}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : (
        <TouchableOpacity
          style={baseStyles.searchBarRowRefreshButton}
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
        <View style={baseStyles.searchBarRowNoDataTextContainer}>
          <Text style={baseStyles.searchBarRowNoDataText}>
            Updating {`${dataNameToUse}`}...
          </Text>
        </View>
      ) : dataError ? (
        dataStatusCode && dataStatusCode === 408 ? (
          <View style={baseStyles.searchBarRowNoDataTextContainer}>
            <Text style={baseStyles.searchBarRowErrorText}>
              {`You need an internet connection to download the ${dataNameToUse}.`}
            </Text>
          </View>
        ) : (
          <View style={baseStyles.searchBarRowNoDataTextContainer}>
            <Text style={baseStyles.searchBarRowErrorText}>
              {`There was a problem syncing the ${dataNameToUse}. Please refresh.`}
              {dataStatusCode && ` (Error code ${dataStatusCode})`}
            </Text>
          </View>
        )
      ) : someDataExpected && dataCount && dataCount === 0 ? (
        <View style={baseStyles.searchBarRowNoDataTextContainer}>
          <Text style={baseStyles.searchBarRowNoDataText}>
            {`No ${dataNameToUse} downloaded yet. Please refresh. Thanks.`}
          </Text>
        </View>
      ) : (
        <View style={baseStyles.searchBarRowSearchInput}>
          <SearchBar
            onChangeText={searchInputHandler}
            value={searchInput}
            placeholder='Type here...'
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            containerStyle={baseStyles.searchBarContainer}
            inputStyle={baseStyles.searchBarInput}
            inputContainerStyle={baseStyles.searchBarInputContainer}
            autoCapitalize='none'
          />
        </View>
      )}
    </View>
  );
};
