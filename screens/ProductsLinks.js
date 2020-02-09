import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import moment from 'moment';
import { Base64 } from 'js-base64';
import ScaledImage from '../components/ScaledImage';
import HighlightedDate from '../components/HighlightedDate';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

const appCode = Base64.encode(moment().format('MMMM'));
// console.log('appCode is ', appCode);
const notificationLimit = 7;

export default function ProductsLinks(props) {
  // console.log(props.items);
  const { items, userIntId } = props;
  let now = moment();

  const amendLink = rawLink => {
    //   console.log('rawLink', rawLink);
    let newLink = '';
    let intId = (userIntId && userIntId) || '';

    if (rawLink.indexOf('controller=desktopBulletins&action=list') > 0) {
      newLink =
        '?appCode=' +
        appCode +
        '&controller=api&action=showToUser&userId=' +
        '850' +
        '&shadowController=desktopBulletins&shadowAction=list';

      return newLink;
    } else if (
      rawLink.indexOf('controller=') &&
      rawLink.indexOf('action=') > 0
    ) {
      let newLink = rawLink;

      newLink = newLink
        .replace('?controller=stories', 'controller=api')
        .replace(
          '&id=',
          '&shadowController=stories&shadowAction=view&shadowId='
        )
        .replace('&action=view', '&action=showToUser');

      newLink = '?appCode=' + appCode + '&userId=' + '850' + '&' + newLink;

      return newLink;
    } else {
      return rawLink;
    }
  };

  return (
    <View>
      {items && items.length > 0 ? (
        <ScrollView>
          {items.map((item, i) => (
            <Touchable
              onPress={() => props.pressOpenHandler(amendLink(item.linkTo))}
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
    color: Colors.vwgLinkColor
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
