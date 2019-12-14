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
import { Divider } from 'react-native-elements';
import moment from 'moment';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ScaledImageFinder from '../components/ScaledImageFinder';
import dealerWipsDummyData from '../dummyData/dealerWipsDummyData.js';

import Colors from '../constants/Colors';
import FriendlyDate from '../components/FriendlyDate';

export default function BookedOutToolsList(props) {
  console.log('BookedOutToolsList props');
  console.log(props);
  console.log('BookedOutToolsList props end');
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

  return (
    <View>
      <ScrollView>
        <View style={styles.searchPrompt}>
          <Text style={styles.searchPromptText}>
            {`You have ${items.length ? items.length : `no`} booked out tools.`}
          </Text>
        </View>
        {!items || items.length === 0 ? null : (
          <View style={{ marginHorizontal: 10 }}>
            {items.map((item, i) => (
              <View key={i}>
                {i > 0 ? (
                  <Divider
                    style={{
                      backgroundColor: Colors.vwgDarkGray,
                      marginVertical: 8
                    }}
                  />
                ) : null}
                <Text
                  style={{
                    fontSize: RFPercentage(2.2),
                    color: '#2089dc',
                    textAlign: 'left'
                  }}
                >{`${item.partNumber} (${item.toolNumber})`}</Text>
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
                          color: Colors.vwgVeryDarkGray,
                          marginBottom: 3,
                          fontSize: RFPercentage(2.1)
                        }}
                      >{`${item.partDescription}`}</Text>
                      {item.location.length > 0 ? (
                        <Text
                          style={{
                            color: Colors.vwgVeryDarkGray,
                            marginBottom: 3,
                            fontSize: RFPercentage(2.1)
                          }}
                        >{`Storage Location: ${item.location}`}</Text>
                      ) : null}
                      {item.wipNumber.length > 0 ? (
                        <Text
                          style={{
                            color: Colors.vwgVeryDarkGray,
                            marginBottom: 3,
                            fontSize: RFPercentage(2.1)
                          }}
                        >{`Booked out to job ${item.wipNumber}`}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
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
