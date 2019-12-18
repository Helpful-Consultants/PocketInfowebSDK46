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
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon, colors } from 'react-native-elements';
import moment from 'moment';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ScaledImageFinder from '../components/ScaledImageFinder';
import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

import Colors from '../constants/Colors';
import FriendlyDate from '../components/FriendlyDate';

export default function DealerToolsList(props) {
  console.log('props');
  const {
    items,
    baseImageUrl,
    returnToolHandler,
    deleteDealerWipRequest
  } = props;
  let { userIntId } = props;

  userIntId = userIntId.toString() || '';
  //   console.log(props);
  //   console.log('props end');
  const limit = 0;
  //   console.log('userIntId ', userIntId);
  //   const allItems = (props.items && props.items) || [];

  //   const allItems = props.items || [];
  //   const items = allItems.slice(0, limit);
  //   const items = dealerToolsDummyData || [];
  // console.log('start dealerToolsDummyData');
  // console.log(dealerToolsDummyData);
  // console.log('dealerToolsDummyData');

  //   console.log('in dealer list - items', items.length);

  const ToolList = ({ job }) => {
    // const { job } = props;
    // console.log(job);
    return (
      <View>
        {job.tools ? ( // crashes without this if no tools in job
          job.tools.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => returnToolHandler({ job: job, tool: item })}
            >
              <ListItem
                containerStyle={{
                  backgroundColor: '#fff',
                  marginBottom: 3,
                  borderColor: Colors.vwgLightGray,
                  borderStyle: 'solid',
                  borderWidth: 1
                }}
                titleStyle={{
                  fontSize: RFPercentage(2.2),
                  color: Colors.vwgDeepBlue,
                  textAlign: 'left',
                  fontWeight: '600'
                }}
                key={i}
                title={`${item.partNumber} (${item.toolNumber})`}
                subtitle={
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
                      <Text
                        style={{
                          color: Colors.vwgVeryDarkGray,
                          marginBottom: 3,
                          paddingLeft: 10,
                          fontSize: RFPercentage(2.1)
                        }}
                      >{`${item.partDescription}`}</Text>
                    </View>
                    {item.location.length > 0 ? (
                      <Text
                        style={{
                          color: Colors.vwgVeryDarkGray,
                          marginBottom: 3,
                          paddingLeft: 0,
                          fontSize: RFPercentage(2.1)
                        }}
                      >{`Storage Location: ${item.location}`}</Text>
                    ) : null}
                    {item.lastWIP.length > 0 ? (
                      <Text
                        style={{
                          color: Colors.vwgVeryDarkGray,
                          marginBottom: 3,
                          paddingLeft: 0,
                          fontSize: RFPercentage(2.1)
                        }}
                      >{`Last booked out by: ${job.createdBy}, job ${item.lastWIP}`}</Text>
                    ) : null}
                  </View>
                }
                topDivider={i > 0 ? true : false}
                rightIcon={
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-return-left'
                        : 'md-return-left'
                    }
                    type='ionicon'
                    color='#2089dc'
                    reverse
                    size={10}
                  />
                }
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              fontSize: RFPercentage(2),
              color: Colors.vwgWarmRed
            }}
          >
            No tools booked to this job
          </Text>
        )}
      </View>
    );
  };

  if (items)
    return (
      <View>
        <ScrollView>
          {!items || items.length === 0
            ? null
            : items.map((item, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor:
                      item.userIntId.toString() == userIntId.toString()
                        ? Colors.vwgWhite
                        : '#ededed',

                    marginHorizontal: 10,
                    paddingTop: 10,
                    paddingBottom: 10
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: RFPercentage(2.2),
                        fontWeight: '600',
                        textAlign: 'left',
                        marginBottom: 5
                      }}
                    >
                      {item.userIntId.toString() == userIntId.toString()
                        ? `Job ${item.wipNumber}`
                        : `${item.createdBy}'s job ${item.wipNumber}`}
                    </Text>
                    {item.userIntId.toString() !== userIntId.toString() ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Button
                          title=' Add tools'
                          type='clear'
                          onPress={() =>
                            alert(`pressed add tools to job ${item.wipNumber}`)
                          }
                          buttonStyle={{
                            backgroundColor: 'transparent'
                          }}
                          titleStyle={{
                            fontSize: 14,
                            color: '#000',
                            backgroundColor: 'transparent'
                          }}
                          icon={
                            <Icon
                              name={
                                Platform.OS === 'ios'
                                  ? 'ios-add-circle-outline'
                                  : 'md-add-circle-outline'
                              }
                              type='ionicon'
                              size={16}
                              iconStyle={{
                                color: 'black',
                                backgroundColor: 'transparent'
                              }}
                            />
                          }
                        />
                        <Button
                          title=' Finished'
                          type='clear'
                          onPress={() => {
                            {
                              /* alert(`pressed finished ${item.wipNumber}`); */
                            }
                            deleteDealerWipRequest({
                              id: item.id,
                              wipNumber: item.wipNumber,
                              intId: item.userIntId.toString()
                            });
                          }}
                          buttonStyle={{
                            backgroundColor: 'transparent'
                          }}
                          titleStyle={{
                            fontSize: 14,
                            color: '#000',
                            backgroundColor: 'transparent'
                          }}
                          icon={
                            <Icon
                              name={
                                Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'
                              }
                              type='ionicon'
                              size={16}
                              iconStyle={{
                                color: 'black',
                                backgroundColor: 'transparent'
                              }}
                            />
                          }
                        />
                      </View>
                    ) : null}
                    <View>
                      <FriendlyDate date={item.createdDate} />
                    </View>
                    <ToolList job={item} />
                  </View>
                </View>
              ))}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#222'
  },
  noItems: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  },
  tipText: {
    fontSize: 12,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 20
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000'
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20
  }
});
