import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import moment from 'moment';
import { Base64 } from 'js-base64';
import ScaledImageFinder from '../components/ScaledImageFinder';
import HighlightedDate from '../components/HighlightedDate';
import amendLink from '../components/amendLink';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

const appCode = Base64.encode(moment().format('MMMM'));
// console.log('appCode is ', appCode);
const notificationLimit = 7;

export default function ProductsLinks(props) {
  // console.log(props.items);
  const { items, userIntId } = props;
  let now = moment();
  let intId = (userIntId && userIntId) || '';

  return (
    <View>
      {items && items.length > 0 ? (
        <ScrollView>
          {items.map((item, i) => (
            <Touchable
              onPress={() =>
                props.pressOpenHandler(amendLink(item.linkTo, appCode, intId))
              }
              key={i}
            >
              <View style={styles.item}>
                <View style={styles.itemTopRow}>
                  <ScaledImageFinder
                    width={70}
                    uri={`${props.baseImageUrl}${item.imageName}`}
                  />
                  <View style={styles.itemTitleContainer}>
                    <Text style={styles.itemTitle}>{item.headline}</Text>
                    <HighlightedDate
                      item={item}
                      now={now}
                      notificationLimit={notificationLimit}
                    />
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
    marginHorizontal: 0,
    marginBottom: 10
  },
  itemTitleContainer: {
    width: '70%',
    paddingLeft: 15,
    paddingRight: 25
  },
  itemTitle: {
    flexWrap: 'wrap',
    fontFamily: 'the-sans-bold',
    color: Colors.vwgLink
  },

  itemMainRow: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8)
  },
  itemMainText: {
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.9),
    textAlign: 'justify',
    color: Colors.vwgVeryDarkGray
  }
});
