import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import ScaledImageFinder from '../components/ScaledImageFinder';
import Colors from '../constants/Colors';

const minSearchLength = 1;

export default function BookedOutToolsList(props) {
  //   console.log('BookedOutToolsList props');
  //   console.log(props);
  //   console.log('BookedOutToolsList props end');
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const {
    isLoading,
    dataCount,
    items,
    baseImageUrl,
    returnToolHandler,
    searchInput,
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
    <View style={baseStyles.containerFlex}>
      <ScrollView>
        {!isLoading ? (
          searchInput &&
          searchInput.length >= minSearchLength &&
          items &&
          items.length > 0 ? null : (
            <View style={baseStyles.promptRibbon}>
              <Text style={baseStyles.promptRibbonText}>
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
                      marginVertical: 8,
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
                      margin: 0,
                    }}
                  >
                    <View
                      style={{
                        width: i === 0 ? '70%' : '90%',
                      }}
                    >
                      <Text
                        style={{
                          ...baseStyles.toolNumber,
                          paddingTop: 8,
                        }}
                      >{`${item.partNumber} (${item.toolNumber})`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {i === 0 ? (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            style={{
                              ...baseStyles.linkText,
                              textAlign: 'right',
                              paddingTop: 9,
                            }}
                          >
                            Return
                          </Text>
                        </View>
                      ) : null}
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
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
                      marginTop: 10,
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
                          ...baseStyles.text,
                          marginBottom: 3,
                        }}
                      >{`${item.partDescription}`}</Text>
                      {item.location.length > 0 ? (
                        <Text
                          style={{
                            ...baseStyles.text,
                            marginBottom: 3,
                          }}
                        >{`Storage Location: ${item.location}`}</Text>
                      ) : null}
                      {item.wipNumber.length > 0 ? (
                        <Text
                          style={{
                            ...baseStyles.text,
                            marginBottom: 3,
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
