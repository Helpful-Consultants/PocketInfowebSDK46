import React from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default DataAlertBarWithRefresh = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('DataAlertWithRefresh props', props);

  let {
    dataName,
    isLoading,
    someDataExpected,
    dataCount,
    dataError,
    dataStatusCode,
    refreshRequestHandler,
  } = props;
  dataName = dataName || 'data';

  const dataNameToUse = dataName || 'data';

  return dataCount && dataCount > 0 ? null : (
    <View style={baseStyles.viewRowFlex}>
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
          <Ionicons
            name={Platform.OS === 'ios' ? 'refresh' : 'refresh'}
            size={25}
            color={Colors.vwgLink}
          />
        </TouchableOpacity>
      )}
      {isLoading ? (
        <View style={baseStyles.searchBarRowTextNoDataContainer}>
          <Text style={baseStyles.searchBarRowTextNoData}>
            Updating {`${dataName}`}...
          </Text>
        </View>
      ) : dataError ? (
        dataStatusCode && dataStatusCode === 408 ? (
          <View style={baseStyles.searchBarRowTextNoDataContainer}>
            <Text style={baseStyles.searchBarRowTextError}>
              {`You need an internet connection to download the ${dataNameToUse}.`}
            </Text>
          </View>
        ) : (
          <View style={baseStyles.searchBarRowTextNoDataContainer}>
            <Text style={baseStyles.searchBarRowTextError}>
              {`There was a problem syncing the ${dataNameToUse}. Please refresh.`}
              {dataStatusCode && ` (Error code ${dataStatusCode})`}
            </Text>
          </View>
        )
      ) : someDataExpected && dataCount && dataCount === 0 ? (
        <View style={baseStyles.searchBarRowTextNoDataContainer}>
          <Text style={baseStyles.searchBarRowTextNoData}>
            {`No ${dataName} downloaded yet. Please refresh. Thanks.`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
