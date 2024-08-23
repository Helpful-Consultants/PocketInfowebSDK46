import React from 'react';
import {
  ProgressBarAndroidBase,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from '@rneui/themed';
import { getLtpLoanStatus } from '../helpers/ltpLoans';
import {
  getDateDifference,
  getFriendlyDisplayLongDate,
} from '../helpers/dates';
import Colors from '../constants/Colors';
import { InfoTypesAlertAges } from '../constants/InfoTypes';

export default function LtpLoansList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const nowDate = Date.now();

  //   const ltpLoans = ltpLoansDummyData;

  const { showFullDetails, items } = props;
  const ltpLoans = items || [];
  //   console.log('ltp list props', props);

  const getFormattedLtpLoan = (item) => {
    let measureIsLive = false;
    if (item && item.dateCreated && item.expiryDate) {
      measureIsLive = getLtpLoanStatus(nowDate, item);
    }
    const parsedEndDueDate = (item.endDateDue && item.endDateDue) || null;

    const daysLeft = getDateDifference(nowDate, parsedEndDueDate) + 1;
    // console.log(item.loanToolNo, 'ddddddaysLeft', daysLeft);

    return (
      <View style={baseStyles.containerNoMargin}>
        <View>
          <Text
            style={baseStyles.textLeftAlignedBold}
          >{`${item.loanToolNo} - ${item.toolDescription}`}</Text>
        </View>
        <View>
          {item.startDate || item.endDateDue ? (
            <View
              style={{
                ...baseStyles.viewRowFlexCentreAligned,
                marginTop: showFullDetails && showFullDetails === true ? 3 : 0,
              }}
            >
              <Text style={{ ...baseStyles.textLeftAligned, marginTop: 2 }}>
                Your loan period {daysLeft >= 0 ? 'is' : 'was'}
                {item.startDate
                  ? ` ${getFriendlyDisplayLongDate(
                      item.startDate,
                      'getFormattedLtpLoan'
                    )}`
                  : null}
                {item.endDateDue
                  ? ` to ${getFriendlyDisplayLongDate(
                      item.endDateDue,
                      'getFormattedLtpLoan'
                    )}`
                  : null}
              </Text>
            </View>
          ) : null}
          <View>
            {daysLeft < 1 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgBadgeSevereAlertColor,
                }}
              >
                {`This loan item is late back and may incur a penalty charge`}
              </Text>
            ) : daysLeft === 1 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgBadgeSevereAlertColor,
                }}
              >
                {`LAST DAY! Please return this today to avoid a late penalty charge.`}
              </Text>
            ) : daysLeft <= InfoTypesAlertAges.LTP_LOANS_RED_PERIOD ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgBadgeSevereAlertColor,
                }}
              >
                {`${
                  daysLeft === 1 ? `1 day` : `${daysLeft} days`
                } left, please repare your loan for return. The return policy can be viewed on the LTP website.`}
              </Text>
            ) : daysLeft <= InfoTypesAlertAges.LTP_LOANS_AMBER_PERIOD ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgWarmOrange,
                }}
              >
                {`There are ${daysLeft} days left of this loan`}
              </Text>
            ) : (
              <Text
                style={{
                  ...baseStyles.textLeftAligned,

                  color: Colors.vwgBlack,
                }}
              >
                {`${daysLeft} ${
                  daysLeft === 1 ? `day` : `days`
                } left of this loan`}
              </Text>
            )}
          </View>
          {item.createdBy ? (
            <Text style={{ ...baseStyles.textLeftAligned, marginTop: 3 }}>
              {item.createdBy.toLowerCase() === 'lyndon evans'
                ? 'Arranged by Tools & Equipment Manager'
                : `Ordered by: ${item.createdBy}`}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };
  //   console.log(ltpLoans && ltpLoans);

  return (
    <View style={baseStyles.viewDataList}>
      {ltpLoans && ltpLoans.length > 0
        ? ltpLoans.map((item, i) => (
            <View
              style={
                i === ltpLoans.length - 1
                  ? baseStyles.viewDataListItemNoBorder
                  : baseStyles.viewDataListItemWithBorder
              }
              key={i}
            >
              {getFormattedLtpLoan(item)}
            </View>
          ))
        : null}
    </View>
  );
}
