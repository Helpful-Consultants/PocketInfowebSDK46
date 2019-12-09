import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import moment from 'moment';
import ScaledImage from '../components/ScaledImage';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

export default function NewsLinks(props) {
  // console.log(props.items);
  const items = props.items || [];
  //   const items = newsDummyData || [];
  // console.log('start newsDummyData');
  // console.log(newsDummyData);
  //   console.log('in NewsLinks ', props.baseImageUrl);

  return (
    <View>
      {items && items.length > 0 ? (
        <ScrollView>
          {items.map((item, i) => (
            <Touchable
              onPress={() => props.pressOpenHandler(item.linkTo)}
              key={i}
            >
              <View style={styles.item}>
                <View style={styles.itemTopRow}>
                  <ScaledImage
                    width={120}
                    uri={`${props.baseImageUrl}${item.imageName}`}
                  />
                  <View style={styles.itemTitleContainer}>
                    <Text style={styles.itemTitle}>{item.headline}</Text>
                    <Text style={styles.itemLastUpdated}>
                      {`${moment(
                        item.lastUpdated,
                        'YYYY-MM-DD hh:mm:ss'
                      ).format('h:MMa Do MMM ') || null}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemMainRow}>
                  <Text style={styles.itemMainText}>{item.newstext}</Text>
                </View>
              </View>
            </Touchable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    color: 'red',
    marginHorizontal: 10,
    paddingBottom: 10,
    borderBottomColor: Colors.vwgLightGray,
    borderTopColor: Colors.vwgWhite,
    borderLeftColor: Colors.vwgWhite,
    borderRightColor: Colors.vwgWhite,
    borderWidth: 1
  },
  itemTopRow: {
    flexDirection: 'row',
    // minHeight: 200,
    marginHorizontal: 0,
    marginBottom: 10
    // borderColor: 'teal',
    // borderWidth: 1
  },
  itemTitleContainer: {
    width: '70%',
    paddingLeft: 15,
    paddingRight: 25
  },
  itemTitle: {
    flexWrap: 'wrap',
    fontSize: RFPercentage(2.2),
    fontWeight: '600',
    color: Colors.vwgIosLink

    // borderColor: 'orange',
    // borderWidth: 1
  },
  itemLastUpdated: {
    fontSize: RFPercentage(1.6),
    color: Colors.vwgDarkGray,
    paddingTop: 5
    // marginRight: 20,
    // borderColor: 'orange',
    // borderWidth: 1
  },
  itemMainRow: {
    fontSize: RFPercentage(1.8)
    // borderColor: 'yellow',
    // borderWidth: 1
  },
  itemMainText: {
    fontSize: RFPercentage(1.9),
    textAlign: 'justify'
    // borderColor: 'yellow',
    // borderWidth: 1
  }
});
