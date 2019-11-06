import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import placeholderImage from '../assets/images/robot-prod.png';

export default function ProductsLinks({ ...props }) {
  // console.log(props.items);
  const items = props.items || [];
  // console.log('start newsDummyData');
  // console.log(newsDummyData);
  // console.log('newsDummyData');
  imageSource =
    'https://react-native-elements.github.io/react-native-elements/img/card.png';
  return (
    <View>
      {items && items.length > 0 ? (
        <ScrollView>
          <Text style={styles.tipText}>
            You can scroll through these products and touch one to open up the
            story on Tools Infoweb.
          </Text>
          {items.map((item, i) => (
            <Touchable onPress={() => _handlePressDocs(item.linkTo)} key={i}>
              {/* <Card title={item.headline} image={placeholderImage}> */}
              <Card title={item.headline}>
                <Image style={styles.image} source={{ imageSource }} />
                <Text style={{ marginBottom: 10 }}>{item.newstext}</Text>
              </Card>
            </Touchable>
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
