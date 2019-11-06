import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import moment from 'moment';
import placeholderImage from '../assets/images/robot-prod.png';

export default class LtpList extends React.Component {
  render() {
    // console.log(this.props.items);
    // const list = ltpDummyData || [];
    const items = this.props.items || [];
    // console.log('start newsDummyData');
    // console.log(newsDummyData);
    // console.log('newsDummyData');

    // console.log(list);
    imageSource =
      'https://react-native-elements.github.io/react-native-elements/img/card.png';
    return (
      <View>
        {items && items.length > 0 ? (
          <ScrollView>
            <Text style={styles.tipText}>LTP Items</Text>
            {items.map((item, i) => (
              <ListItem
                key={i}
                title={item.loanToolNo}
                style={styles.listItem}
                subtitle={
                  <View style={styles.subtitleView}>
                    <View>
                      <Text style={styles.subtitleLine}>
                        {`${item.supplierPartNo} - ${item.toolDescription}`}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.subtitleLine}>
                        {`Order as ${item.orderPartNo}, from ${moment(
                          item.nextAvailableDate,
                          'YYYY-MM-DD'
                        ).format('Do MMM') || null}`}
                      </Text>
                    </View>
                  </View>
                }
                bottomDivider
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.tipText}>Loading...</Text>
        )}
      </View>
    );
  }

  _handlePressDocs = url => {
    WebBrowser.openBrowserAsync(url);
  };
}

const styles = StyleSheet.create({
  tipText: {
    fontSize: 12,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 20
  },
  listItem: {
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5
  },
  subtitleLine: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});
