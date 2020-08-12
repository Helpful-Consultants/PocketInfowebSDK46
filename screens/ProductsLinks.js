import React from 'react';
import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import StyledText from '../components/StyledText';
import Touchable from 'react-native-platform-touchable';
import moment from 'moment';
import { Base64 } from 'js-base64';
import ScaledImageFinder from '../components/ScaledImageFinder';
import HighlightedDate from '../components/HighlightedDate';
import amendLink from '../components/amendLink';

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
              <View style={baseStyles.viewItem}>
                <View style={baseStyles.viewItemTopRow}>
                  <ScaledImageFinder
                    width={70}
                    uri={`${props.baseImageUrl}${item.imageName}`}
                  />
                  <View style={baseStyles.viewItemTitle}>
                    <Text style={baseStyles.textItemTitle}>
                      {item.headline}
                    </Text>
                    <HighlightedDate
                      item={item}
                      now={now}
                      notificationLimit={notificationLimit}
                    />
                  </View>
                </View>
                <View>
                  <Text style={baseStyles.textItemMain}>{item.newstext}</Text>
                </View>
              </View>
            </Touchable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}
