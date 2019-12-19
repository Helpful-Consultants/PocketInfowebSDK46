import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Platform, ScrollView, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Divider, Button, Icon } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ScaledImageFinder from '../components/ScaledImageFinder';
import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

import Colors from '../constants/Colors';
import FriendlyDate from '../components/FriendlyDate';

export default function DealerToolsList(props) {
  //   console.log('props');
  const {
    isLoading,
    dataCount,
    items,
    baseImageUrl,
    returnToolHandler
  } = props;
  let { userIntId } = props;
  userIntId = userIntId.toString() || '';

  const limit = 0;

  console.log('dataCount ', dataCount);

  const ToolList = ({ job }) => {
    // const { job } = props;
    // console.log(job);
    return (
      <View>
        {job.tools ? ( // crashes without this if no tools in job
          job.tools.map((item, i) => (
            <View key={i} style={{ marginRight: 30 }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: RFPercentage(2.2),
                      color: Colors.vwgDeepBlue,
                      textAlign: 'left',
                      marginRight: 10,
                      fontWeight: '600'
                    }}
                  >{`${item.partNumber} (${item.toolNumber})`}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginBottom: 10
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <ScaledImageFinder
                        width={70}
                        item={item}
                        baseImageUrl={baseImageUrl}
                      />
                    </View>
                    <View
                      style={{
                        paddingLeft: 10,
                        marginRight: 10
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.vwgVeryDarkGray,
                          marginBottom: 3,
                          paddingLeft: 0,
                          marginRight: 10,
                          fontSize: RFPercentage(2.1)
                        }}
                      >{`${item.partDescription}`}</Text>
                      {item.location.length > 0 ? (
                        <Text
                          style={{
                            color: Colors.vwgVeryDarkGray,
                            marginBottom: 3,
                            paddingLeft: 0,
                            marginRight: 10,
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
                            marginRight: 10,
                            fontSize: RFPercentage(2.1)
                          }}
                        >{`Last booked out by: ${job.createdBy}, job ${item.lastWIP}`}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Button
                  title='Return tool'
                  type='clear'
                  iconRight
                  onPress={() => {
                    {
                      /* alert(`pressed finished ${item.wipNumber}`); */
                    }
                    console.log('job and tool', job, item);
                    returnToolHandler(job, item);
                  }}
                  buttonStyle={{
                    backgroundColor: 'transparent'
                  }}
                  titleStyle={{
                    fontSize: 14,
                    color: Colors.vwgIosLink,
                    backgroundColor: 'transparent'
                  }}
                  icon={
                    <Icon
                      name={
                        Platform.OS === 'ios'
                          ? 'ios-return-left'
                          : 'md-return-left'
                      }
                      type='ionicon'
                      color={Colors.vwgIosLink}
                      reverse
                      size={10}
                    />
                  }
                />
              </View>
            </View>
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
          {!isLoading ? (
            <View style={styles.searchPrompt}>
              <Text style={styles.searchPromptText}>
                {`You have ${
                  dataCount && dataCount > 0 ? dataCount : `no`
                } open jobs.`}
              </Text>
            </View>
          ) : null}
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
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(2.2),
                          fontWeight: '600',
                          textAlign: 'left',
                          marginBottom: 5,
                          color: Colors.vwgDarkSkyBlue
                        }}
                      >
                        {item.userIntId.toString() == userIntId.toString()
                          ? `Job ${item.wipNumber}`
                          : `${item.createdBy}'s job ${item.wipNumber}`}
                      </Text>
                    </View>

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
  searchPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgDarkSkyBlue,
    marginBottom: 5
  },
  searchPromptText: {
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    color: Colors.vwgWhite
  }
});
