import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import {
  getOpenLtpLoansItems,
  getLtpLoanStatus,
} from '../helpers/ltpLoanStatus';
import { getDisplayDateFromDDMMYYY } from '../helpers/dates';

const nowDateObj = new Date();

export default function LtpLoansList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  //   const ltpLoans = ltpLoansDummyData;

  const { showFullDetails, items } = props;
  const ltpLoans = items || [];
  //   console.log('ltp list props', props);
  //   const ltpLoans = ltpLoansDummyData;
  //   let now = moment();
  const getFormattedLtpLoan = (item) => {
    let measureIsLive = false;
    if (item && item.dateCreated && item.expiryDate) {
      measureIsLive = getLtpLoanStatus(nowDateObj, item);
    }

    return (
      <View style={baseStyles.containerNoMargin}>
        <View>
          <Text
            style={baseStyles.textLeftAlignedBoldLarge}
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
                {item.startDate
                  ? `${getDisplayDateFromDDMMYYY(item.startDate)}`
                  : null}
                {item.endDateDue
                  ? ` to ${getDisplayDateFromDDMMYYY(item.endDateDue)}`
                  : null}
              </Text>
            </View>
          ) : null}
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
