import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

const now = moment();

const getDisplayDate = (rawDate) => {
  return (
    (rawDate && moment(rawDate, 'DD/MM/YYYY hh:mm:ss').format('Do MMM YYYY')) ||
    ''
  );
};

const getItemStatus = (startDate, expiryDate) => {
  let theFromDate = null;
  let theToDate = null;
  let ageOfExpiry = 0;
  let ageOfStart = 0;

  if (expiryDate && expiryDate.length > 0) {
    theToDate = moment(expiryDate, 'DD/MM/YYYY HH:mm:ss');
    ageOfExpiry = (now && now.diff(moment(theToDate), 'days')) || 0;
  }
  //   console.log('ageOfExpiry', ageOfExpiry);

  if (ageOfExpiry >= 1) {
    return false;
  } else {
    if (startDate && startDate.length > 0) {
      theFromDate = moment(startDate, 'DD/MM/YYYY HH:mm:ss');
      ageOfStart = (now && now.diff(moment(theFromDate), 'days')) || 0;
      //   console.log('ageOfStart', ageOfStart);
    }

    if (ageOfStart >= 0) {
      return true;
    }
  }
  return false;
};

export default function LtpLoansList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  //   const items = ltpLoansDummyData;
  const items = props.items || [];
  //   console.log('ltp list props', props);
  //   const items = ltpLoansDummyData;
  //   let now = moment();
  const getFormattedLtpLoan = (item) => {
    let measureIsLive = false;
    if (item && item.dateCreated && item.expiryDate) {
      measureIsLive = getItemStatus(item.dateCreated, item.expiryDate);
    }

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
                marginTop: 3,
              }}
            >
              <Text style={{ ...baseStyles.textLeftAligned, marginTop: 2 }}>
                {item.startDate ? `${getDisplayDate(item.startDate)}` : null}
                {item.endDateDue
                  ? ` to ${getDisplayDate(item.endDateDue)}`
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
  //   console.log(items && items);

  return (
    <View style={baseStyles.viewDataList}>
      {items && items.length > 0
        ? items.map((item, i) => (
            <View
              style={
                i === items.length - 1
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
