import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from '@rneui/themed';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InlineIcon from '../components/InlineIcon';
import Colors from '../constants/Colors';
import { getDateDifference, getFriendlyDisplayDate } from '../helpers/dates';
import { InfoTypesAlertAges } from '../constants/InfoTypes';

export default function ServiceMeasuresList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const { showFullDetails, items, displayTimestamp } = props;
  const serviceMeasures = items || [];
  const nowDate = Date.now();

  const getFormattedServiceMeasure = (item) => {
    // console.log('nowDate', nowDate);
    // console.log('item', item);

    let measureIsLive = true;
    const rawExpiryDate = (item.expiryDate && item.expiryDate) || null;
    const rawDateCreated = (item.dateCreated && item.dateCreated) || null;

    // console.log(
    //   'rawDateCreated',
    //   rawDateCreated,
    //   'from',
    //   item.dateCreated
    // );
    const daysLeft = getDateDifference(nowDate, rawExpiryDate) + 1;
    // console.log('ddddddaysLeft', daysLeft);
    const daysOld = getDateDifference(rawDateCreated, nowDate);
    // console.log('ddddddaysOld', daysOld);

    // console.log('in getFormattedServiceMeasure, insUnseen:', itemIsNew);
    // if (item && item.dateCreated && item.expiryDate) {
    //   measureIsLive = getItemStatus(rawStartDate, rawExpiryDate);
    // }
    // console.log(
    //   'dateCreated sliced',
    //   item && item.dateCreated && item.dateCreated.slice(0, 10)
    // );

    return (
      <View style={baseStyles.containerNoMargin}>
        <View>
          <Text
            style={baseStyles.textLeftAlignedBoldLarge}
          >{`${item.menuText}`}</Text>
        </View>
        {showFullDetails && showFullDetails === true ? (
          <View
            style={{
              ...baseStyles.viewRowFlexCentreAligned,
              marginTop: 5,
            }}
          >
            <InlineIcon
              itemType='font-awesome'
              iconName={measureIsLive ? 'calendar-check' : 'calendar-times'}
              iconSize={RFPercentage(2.4)}
              iconColor={
                //item.status && item.status.toLowerCase() === 'c'
                measureIsLive
                  ? Colors.vwgBadgeOKColor
                  : Colors.vwgBadgeSevereAlertColor
              }
            />
            <Text
              style={{ ...baseStyles.textLeftAligned, paddingLeft: 7 }}
            >{`Service measure ${
              //item.status && item.status.toLowerCase() === 'c'
              measureIsLive ? 'still open' : 'closed'
            }`}</Text>

            {item.dateCreated && daysOld === 0 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBoldLarge,
                  color: Colors.vwgWarmLightBlue,
                }}
              >{`  NEW TODAY!`}</Text>
            ) : null}
          </View>
        ) : null}
        <View style={baseStyles.viewRowFlexCentreAligned}>
          <InlineIcon
            itemType='font-awesome'
            iconName={item.retailerStatus ? 'praying-hands' : 'hands'}
            iconSize={RFPercentage(2)}
            iconColor={
              item.retailerStatus
                ? Colors.vwgBadgeOKColor
                : Colors.vwgBadgeSevereAlertColor
            }
          />
          <Text
            style={{ ...baseStyles.textLeftAligned, paddingLeft: 5 }}
          >{`Retailer actions ${
            item.retailerStatus ? 'completed' : 'not completed'
          }`}</Text>
        </View>
        {showFullDetails && showFullDetails === true ? (
          <Text
            style={{
              ...baseStyles.textLeftAligned,
              ...baseStyles.textBold,
              marginTop: 5,
              color: Colors.vwgDarkSkyBlue,
            }}
          >
            {item.toolsAffected}
          </Text>
        ) : null}
        {item.retailerStatus &&
        item.retailerStatus.toLowerCase() === 'c' ? null : (
          <Text
            style={
              showFullDetails && showFullDetails === true
                ? { ...baseStyles.textLeftAlignedBold, marginTop: 5 }
                : { ...baseStyles.textLeftAligned }
            }
          >{`You haven't responded yet`}</Text>
        )}
        {showFullDetails && showFullDetails === true ? (
          item.retailerStatus ? null : (
            <Text style={{ ...baseStyles.textLeftAligned, marginTop: 5 }}>
              {`Start date: ${getFriendlyDisplayDate(item.startDate)}`}{' '}
            </Text>
          )
        ) : null}
        {item.retailerStatus ? null : (
          <Text style={baseStyles.textLeftAligned}>
            {`To be completed by: ${getFriendlyDisplayDate(item.expiryDate)}`}
            {daysLeft === 1 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgBadgeSevereAlertColor,
                }}
              >
                {` LAST DAY!`}
              </Text>
            ) : daysLeft <= InfoTypesAlertAges.SERVICE_MEASURES_AMBER_PERIOD ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color:
                    daysLeft <= InfoTypesAlertAges.SERVICE_MEASURES_RED_PERIOD
                      ? Colors.vwgBadgeSevereAlertColor
                      : Colors.vwgBadgeAlertColor,
                }}
              >
                {`   ${daysLeft} ${daysLeft === 1 ? `day` : `days`} left!`}
              </Text>
            ) : null}
          </Text>
        )}
      </View>
    );
  };

  //   console.log(serviceMeasures && serviceMeasures);
  //   console.log('displayDate', displayDate);

  return (
    <View style={baseStyles.viewDataList}>
      {serviceMeasures && serviceMeasures.length > 0
        ? serviceMeasures.map((item, i) => (
            //  item.retailerStatus &&
            //  item.retailerStatus.toLowerCase() === 'c' ? null : (
            <View
              style={
                i === serviceMeasures.length - 1
                  ? baseStyles.viewDataListItemNoBorder
                  : baseStyles.viewDataListItemWithBorder
              }
              key={i}
            >
              {getFormattedServiceMeasure(item)}
            </View>
          ))
        : //   )
          null}
    </View>
  );
}
