import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Flatlist,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import placeholderImage from '../assets/images/robot-prod.png';
import userWipsDummyData from '../dummyData/userWipsDummyData.js';

export default function DealerToolsList({ ...props }) {
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');
  const limit = 50;
  const allItems = props.items || [];
  const items = allItems.slice(0, limit);
  //   const items = dealerToolsDummyData || [];
  // console.log('start dealerToolsDummyData');
  // console.log(dealerToolsDummyData);
  // console.log('dealerToolsDummyData');

  return (
    <View>
      {items && items.length > 0 ? (
        <ScrollView>
          {items.map((item, i) => (
            <Card
              key={i}
              containerStyle={{
                backgroundColor: '#ededed',
                borderColor: '#666',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 6
              }}
            >
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      textAlign: 'left',
                      marginBottom: 5
                    }}
                  >{`Job ${item.wipNumber}`}</Text>
                </View>
                <View>
                  {item.tools.map((item, i) => (
                    <ListItem
                      containerStyle={{
                        backgroundColor: '#f6f6f6',
                        marginBottom: 5,
                        borderColor: '#2089dc',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderRadius: 6
                      }}
                      titleStyle={{
                        fontSize: 14,
                        color: '#2089dc',
                        textAlign: 'left'
                      }}
                      key={i}
                      title={`${item.partNumber} (${item.toolNumber})`}
                      subtitle={
                        <View>
                          <Text
                            style={{
                              color: '#2089dc',
                              marginBottom: 3
                            }}
                          >{`${item.partDescription}`}</Text>
                          {item.location.length > 0 ? (
                            <Text>{`Last location was ${item.location}`}</Text>
                          ) : null}

                          {item.lastWIP.length > 0 ? (
                            <Text>{`Last booked to job ${item.lastWIP}`}</Text>
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
                          onPress={() => console.log('hello')}
                          size={10}
                        />
                      }
                    />
                  ))}
                </View>
                <View>
                  <Text>{`${item.createdDate} ${item.createdBy}`}</Text>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

_handlePressDocs = url => {
  WebBrowser.openBrowserAsync(url);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#222'
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
