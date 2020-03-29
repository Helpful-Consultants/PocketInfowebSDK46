import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Divider, Icon } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ScaledImageFinder from '../components/ScaledImageFinder';

import Colors from '../constants/Colors';

const minSearchLength = 1;

export default function BookedOutToolsList(props) {
  //   console.log('BookedOutToolsList props');
  //   console.log(props);
  //   console.log('BookedOutToolsList props end');
  const {
    isLoading,
    dataCount,
    items,
    baseImageUrl,
    returnToolHandler,
    searchInput
  } = props;
  let { userIntId } = props;

  userIntId = (userIntId && userIntId.toString()) || '';
  //   console.log(props);
  //   console.log('props end');
  //   const limit = 0;
  //   console.log('userIntId ', userIntId);
  //   const allItems = (props.items && props.items) || [];

  //   const allItems = props.items || [];
  //   const items = allItems.slice(0, limit);
  //   const items = dealerToolsDummyData || [];
  // console.log('start dealerToolsDummyData');
  // console.log(dealerToolsDummyData);
  // console.log('dealerToolsDummyData');

  //   console.log('in dealer list - items', items.length);

  return (
    <View style={styles.container}>
      <ScrollView>
        {!isLoading ? (
          searchInput &&
          searchInput.length >= minSearchLength &&
          items &&
          items.length > 0 ? null : (
            <View style={styles.searchPrompt}>
              <Text style={styles.searchPromptText}>
                {`You have ${
                  dataCount && dataCount > 0 ? dataCount : `no`
                } tool${dataCount && dataCount === 1 ? '' : 's'} booked out.`}
              </Text>
            </View>
          )
        ) : null}
        {!items || (items && items.length === 0) ? null : (
          <View style={{ marginHorizontal: 10 }}>
            {items.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  returnToolHandler(item);
                }}
              >
                {i > 0 ? (
                  <Divider
                    style={{
                      backgroundColor: Colors.vwgDarkGray,
                      marginVertical: 8
                    }}
                  />
                ) : null}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: 0,
                      margin: 0
                    }}
                  >
                    <View
                      style={{
                        width: i === 0 ? '70%' : '90%'
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'the-sans-bold',
                          fontSize: RFPercentage(2.2),
                          color: Colors.vwgLink,
                          textAlign: 'left',
                          paddingTop: 8
                        }}
                      >{`${item.partNumber} (${item.toolNumber})`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end'
                      }}
                    >
                      {i === 0 ? (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'the-sans',
                              fontSize: RFPercentage(2.2),
                              color: Colors.vwgLink,
                              textAlign: 'right',
                              paddingTop: 9
                            }}
                          >
                            Return
                          </Text>
                        </View>
                      ) : null}
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon
                          name={
                            Platform.OS === 'ios'
                              ? 'ios-return-left'
                              : 'md-return-left'
                          }
                          iconStyle={{ margin: 0, padding: 0 }}
                          type='ionicon'
                          color={Colors.vwgLink}
                          reverse
                          size={10}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10
                    }}
                  >
                    <ScaledImageFinder
                      width={70}
                      item={item}
                      baseImageUrl={baseImageUrl}
                    />
                    <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: 'the-sans',
                          color: Colors.vwgVeryDarkGray,
                          marginBottom: 3,
                          fontSize: RFPercentage(2.1)
                        }}
                      >{`${item.partDescription}`}</Text>
                      {item.location.length > 0 ? (
                        <Text
                          style={{
                            fontFamily: 'the-sans',
                            color: Colors.vwgVeryDarkGray,
                            marginBottom: 3,
                            fontSize: RFPercentage(2.1)
                          }}
                        >{`Storage Location: ${item.location}`}</Text>
                      ) : null}
                      {item.wipNumber.length > 0 ? (
                        <Text
                          style={{
                            fontFamily: 'the-sans',
                            color: Colors.vwgVeryDarkGray,
                            marginBottom: 3,
                            fontSize: RFPercentage(2.1)
                          }}
                        >{`Booked out to job '${item.wipNumber}'`}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgDarkSkyBlue,
    marginBottom: 5
  },
  searchPromptText: {
    textAlign: 'center',
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8),
    color: Colors.vwgWhite
  }
});
