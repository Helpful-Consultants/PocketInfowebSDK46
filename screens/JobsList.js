import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import ScaledImageFinder from '../components/ScaledImageFinder';
// import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';
import Colors from '../constants/Colors';
import FriendlyDate from '../components/FriendlyDate';

const minSearchLength = 1;

export default function DealerToolsList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('p, baseStyles', baseStyles);
  const {
    isLoading,
    dataCount,
    items,
    baseImageUrl,
    returnToolHandler,
    searchInput,
  } = props;
  let { userIntId } = props;
  userIntId = userIntId.toString() || '';

  const limit = 0;

  //   console.log('dataCount ', dataCount);

  const ToolList = ({ job, listOrder }) => {
    // const { job } = props;
    // console.log(job);
    return (
      <View>
        {job.tools ? ( // crashes without this if no tools in job
          job.tools.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                returnToolHandler(job, item);
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    paddingTop: 8,
                  }}
                >
                  <View
                    style={{
                      width: listOrder === 0 && i === 0 ? '70%' : '90%',
                    }}
                  >
                    <Text
                      style={baseStyles.textToolNumber}
                    >{`${item.partNumber} (${item.toolNumber})`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {listOrder === 0 && i === 0 ? (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            ...baseStyles.textLink,
                            textAlign: 'right',
                          }}
                        >
                          Return
                        </Text>
                      </View>
                    ) : null}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.vwgLink,
                        marginLeft: 5,
                        borderRadius: 40,
                      }}
                    >
                      <Ionicons
                        name={
                          Platform.OS === 'ios'
                            ? 'return-down-back'
                            : 'return-down-back'
                        }
                        style={{ margin: 0, paddingHorizontal: 5 }}
                        color={Colors.vwgWhite}
                        reverse={false}
                        size={20}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginRight: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginBottom: 5,
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
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...baseStyles.text,
                          marginRight: 10,
                          marginBottom: 3,
                          paddingLeft: 0,
                        }}
                      >{`${item.partDescription}`}</Text>

                      <Text
                        style={{
                          ...baseStyles.text,
                          marginRight: 10,
                          marginBottom: 3,
                          paddingLeft: 0,
                        }}
                      >
                        {item.location && item.location.length > 0
                          ? `Storage location: ${item.location}`
                          : `Storage location not recorded`}
                      </Text>

                      {/* {item.lastWIP.length > 0 ? (
                        <Text
                          style={{
                            color: Colors.vwgVeryDarkGray,
                            marginBottom: 3,
                            paddingLeft: 0,
                            marginRight: 10,
                            fontFamily: 'the-sans',
                            fontSize: RFPercentage(2.1)
                          }}
                        >{`Last booked out by: ${job.createdBy}, job ${item.lastWIP}`}</Text>
                      ) : null} */}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              ...baseStyles.text,
              color: Colors.vwgWarmRed,
            }}
          >
            No tools booked to this job
          </Text>
        )}
      </View>
    );
  };

  if (items) {
    return (
      <View>
        <ScrollView>
          {!isLoading ? (
            searchInput &&
            searchInput.length >= minSearchLength &&
            items &&
            items.length > 0 ? null : (
              <View style={baseStyles.viewPromptRibbon}>
                <Text style={baseStyles.textPromptRibbon}>
                  {`You have ${
                    dataCount && dataCount > 0 ? dataCount : `no`
                  } open job${dataCount && dataCount === 1 ? '' : 's'}.`}
                </Text>
              </View>
            )
          ) : null}
          {!items || items.length === 0
            ? null
            : items.map((item, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor:
                      item.userIntId &&
                      userIntId &&
                      item.userIntId.toString() == userIntId.toString()
                        ? Colors.vwgWhite
                        : Colors.vwgVeryVeryLightGray,
                    marginHorizontal: 10,
                    paddingTop: 10,
                    paddingBottom: 0,
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
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          ...baseStyles.textJobSummary,
                        }}
                      >
                        {item.userIntId.toString() == userIntId.toString()
                          ? `Job '${item.wipNumber}'${
                              item.tools && item.tools.length > 0
                                ? item.tools && item.tools.length > 1
                                  ? `, ${item.tools.length} tools`
                                  : ', 1 tool'
                                : ''
                            }`
                          : `${item.createdBy}'s job ${item.wipNumber}`}
                      </Text>
                    </View>

                    <View>
                      <FriendlyDate date={item.createdDate} />
                    </View>
                    <ToolList job={item} listOrder={i} />
                  </View>
                </View>
              ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={baseStyles.viewPromptRibbon}>
        <Text style={baseStyles.textPromptRibbon}>
          {`You have ${dataCount && dataCount > 0 ? dataCount : `no`} open job${
            dataCount && dataCount === 1 ? '' : 's'
          }.`}
        </Text>
      </View>
    );
  }
}
