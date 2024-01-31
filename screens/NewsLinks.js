import React from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { format } from 'date-fns';
import { Base64 } from 'js-base64';
import ScaledImageFinder from '../components/ScaledImageFinder';
import amendLink from '../helpers/amendLink';
import {
  getFriendlyDisplayDate,
  getDateDifference,
  isDateAfter,
} from '../helpers/dates';
import Colors from '../constants/Colors';

const nowDateObj = new Date();
const month = format(nowDateObj, 'MMMM');
const appCode = Base64.encode(month);

// console.log('month is', month, 'appCode is ', appCode);
const notificationLimit = 7;

export default function NewsLinks(props) {
  //   console.log(props.items);
  const windowDim = useWindowDimensions();
  const { items, userIntId } = props;

  //   console.log('windowDim', windowDim && windowDim);
  //   console.log('in newslinks, windowDim:', windowDim);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in newslinks, baseStyles:', baseStyles);
  let intId = (userIntId && userIntId) || '';

  const getFormattedNewsItem = (item, islastOne) => {
    // console.log(item);
    const updatedDate =
      item && item.lastUpdated && item.lastUpdated.length > 0
        ? item.lastUpdated
        : null;

    const createdDate =
      item && item.createdDate && item.createdDate.length > 0
        ? item.createdDate
        : null;

    const isBusinessCritical =
      item &&
      item.businessCritical &&
      item.businessCritical.length > 0 &&
      (item.businessCritical.toLowerCase() === 'y' ||
        item.businessCritical.toLowerCase() === 'yes' ||
        item.businessCritical.toLowerCase() === 'true')
        ? true
        : false;

    // console.log(
    //   item.businessCritical && item.businessCritical,
    //   isBusinessCritical
    // );

    // console.log(
    //   'updatedDate',
    //   item.headline,
    //   updatedDate,
    //   'from',
    //   item.lastUpdated
    // );
    // console.log(
    //   'createdDate',
    //   createdDate,
    //   'from',
    //   item.createdDate
    // );

    const isRevised = isDateAfter(updatedDate, createdDate);
    const daysOld = getDateDifference(
      isRevised ? updatedDate : createdDate,
      nowDateObj
    );

    const displayDate = isRevised
      ? getFriendlyDisplayDate(updatedDate)
      : getFriendlyDisplayDate(createdDate);

    // console.log('displayDate is', displayDate);

    return (
      <View
        style={{
          ...baseStyles.viewItem,
          borderBottomColor: islastOne ? Colors.vwgWhite : Colors.vwgLightGray,
        }}
      >
        <View style={baseStyles.viewItemTopRow}>
          <ScaledImageFinder
            desiredWidth={70}
            uri={`${props.baseImageUrl}${item.imageName}`}
          />
          <View style={baseStyles.viewItemTitle}>
            {isBusinessCritical ? (
              <Text style={baseStyles.textItemTitle}>
                <Text style={baseStyles.textItemTitleHighlighted}>
                  {`IMPORTANT!  `}
                </Text>
                {item.headline}
              </Text>
            ) : (
              <Text style={baseStyles.textItemTitle}>{item.headline}</Text>
            )}
            <Text style={baseStyles.textDate}>
              {daysOld === 0 ? (
                <Text style={baseStyles.textLeftAlignedBoldSmall}>
                  {isRevised ? `UPDATED TODAY!` : `NEW TODAY!`}
                </Text>
              ) : isRevised ? (
                `Updated ${displayDate}`
              ) : (
                displayDate
              )}
            </Text>
          </View>
        </View>
        <View style={baseStyles.itemMainRow}>
          <Text style={baseStyles.textItemMain}>{item.newstext}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {items && items.length > 0 ? (
        <ScrollView>
          {items.map((item, i) => {
            const amendedLink = amendLink(item.linkTo, appCode, intId);
            const islastOne = i === items.length - 1;

            return (
              <Touchable
                onPress={() => props.pressOpenHandler(amendedLink)}
                key={i}
              >
                {getFormattedNewsItem(item, islastOne)}
              </Touchable>
            );
          })}
          <Text />
          <Touchable
            style={baseStyles.viewPromptRibbon}
            onPress={() =>
              props.pressOpenHandler('https://www.toolsinfoweb.co.uk')
            }
          >
            <View>
              <Text style={baseStyles.textPromptRibbon}>
                {`You can view more news at >Tools Infoweb.`}
              </Text>
              <Text />
              <Text />
              <Text />
              <Text />
            </View>
          </Touchable>
        </ScrollView>
      ) : null}
    </View>
  );
}

// console.log('link from endpoint', item && item.linkTo && item.linkTo);
// console.log('amended link', amendedLink);
