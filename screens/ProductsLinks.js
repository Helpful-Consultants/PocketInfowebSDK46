import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import moment from 'moment';
import { Base64 } from 'js-base64';
import ScaledImageFinder from '../components/ScaledImageFinder';
import HighlightedDate from '../components/HighlightedDate';
import amendLink from '../components/amendLink';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Colors from '../constants/Colors';

const appCode = Base64.encode(moment().format('MMMM'));
// console.log('appCode is ', appCode);
const notificationLimit = 7;

export default function ProductsLinks(props) {
  // console.log(props.items);
  const windowDim = useWindowDimensions();
  const { items, userIntId } = props;

  //   console.log('windowDim', windowDim && windowDim);
  //   console.log('in products link, windowDim:', windowDim);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in products link, baseStyles:', baseStyles);
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
              <View style={baseStyles.item}>
                <View style={baseStyles.itemTopRow}>
                  <ScaledImageFinder
                    width={70}
                    uri={`${props.baseImageUrl}${item.imageName}`}
                  />
                  <View style={baseStyles.itemTitleContainer}>
                    <Text style={baseStyles.itemTitle}>{item.headline}</Text>
                    <HighlightedDate
                      item={item}
                      now={now}
                      notificationLimit={notificationLimit}
                    />
                  </View>
                </View>
                <View>
                  <Text style={baseStyles.itemMainText}>{item.newstext}</Text>
                </View>
              </View>
            </Touchable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}
