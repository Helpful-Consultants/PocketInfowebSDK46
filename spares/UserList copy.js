import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Divider, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'Tools & Equipment: Back Orders Aug 19',
    imageUrl:
      'https://toolsinfoweb.co.uk/content/images/headlines/deliveryTruckTimings.png',
    url: 'https://toolsinfoweb.co.uk/?controller=stories&action=view&id=38',
    summary:
      'The Tools and Equipment department in AG are seeing an ever-increasing demand for key inventory items, mainly diagnostic equipment. This increase in demand is having significant impact on all markets and their ability to fulfil current demand.',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The miGHty Blues',
    icon: 'av-timer',
    url: 'http://chelseafc.com',
  },
  {
    title: 'The Beebo',
    icon: 'flight-takeoff',
    url: 'http://bbc.co.uk',
  },
];

export default class NewsLinks extends React.Component {
  render() {
    return (
      <View>
        <ScrollView>
          <Text style={styles.tipText}>
            You can scroll through these news items and touch one to open up the
            story on Tools Infoweb.
          </Text>
          {list.map((item, i) => (
            <Touchable
              style={styles.option}
              background={Touchable.Ripple('#ccc', false)}
              onPress={() => this._handlePressDocs(item.url)}
              key={i}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                  <Image
                    source={require('../assets/images/icon.png')}
                    resizeMode='contain'
                    fadeDuration={0}
                    style={{ width: 20, height: 20, marginTop: 1 }}
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>{item.title}</Text>
                  <Text style={styles.summaryText}>{item.summary}</Text>
                </View>
              </View>
            </Touchable>
          ))}
        </ScrollView>
      </View>
    );
  }

  _handlePressDocs = (url) => {
    WebBrowser.openBrowserAsync(url);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#222',
  },
  tipText: {
    fontSize: 12,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 20,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20,
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000',
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20,
  },
});
