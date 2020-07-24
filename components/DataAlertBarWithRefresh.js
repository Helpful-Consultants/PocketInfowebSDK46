import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

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
            Updating {`${dataName}`}...
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
            {`No ${dataName} downloaded yet. Please refresh. Thanks.`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
