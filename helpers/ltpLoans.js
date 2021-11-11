import { InfoTypesAlertAges } from '../constants/InfoTypes';
import { getDateDifference } from '../helpers/dates';

export const getLtpLoansCountsObj = (ltpLoansItems) => {
  let redCount = 0;
  let amberCount = 0;
  let greenCount = 0;

  const nowDate = Date.now();

  if (ltpLoansItems && ltpLoansItems.length > 0) {
    ltpLoansItems.map((item) => {
      const timeToEnd =
        item.endDateDue && item.endDateDue.length > 0
          ? item.endDateDue &&
            getDateDifference(
              nowDate,
              item.endDateDue,
              'getLtpLoansCountsObj'
            ) + 1 // add 1 for today
          : null;
      //   console.log(
      //     'in getLtpLoansCountsObj; ',
      //     'item.endDate',
      //     item.endDateDue,
      //     'nowDate',
      //     nowDate,
      //     'timeToEnd',
      //     timeToEnd
      //   );
      if (timeToEnd !== null) {
        if (timeToEnd <= InfoTypesAlertAges.LTP_LOANS_RED_PERIOD) {
          redCount++;
        } else if (timeToEnd <= InfoTypesAlertAges.LTP_LOANS_AMBER_PERIOD) {
          amberCount++;
        } else {
          greenCount++;
        }
      }
    });
  }

  const ltpLoansCountsObj = {
    redCount,
    amberCount,
    greenCount,
    totalCount: redCount + amberCount + greenCount,
  };
  //   console.log(
  //     '%%%%%% in getLtpLoansCountsObj; ltpLoansItems length',
  //     ltpLoansItems.length,
  //     ltpLoansCountsObj
  //   );

  return ltpLoansCountsObj;
};

export const getLtpLoanStatus = (nowDate, item) => {
  let daysFromStart = 0;
  let daysFromExpiry = 0;

  if (
    item.collectedDate &&
    item.collectedDate.length > 0 &&
    item.collectionNumber &&
    item.collectionNumber.length > 0
  ) {
    //   console.log(item.loanToolNo, 'returned');
    return false;
  }
  // console.log(item.loanToolNo, 'not returned');

  //   console.log(item.loanToolNo, 'endDueDate', item.endDateDue);

  const parsedStartDate =
    (item && item.startDate && item.startDate.length > 0) || null;
  const parsedDueDate =
    (item && item.endDateDue && item.endDateDue.length > 0) || null;

  //   console.log(
  //     item.loanToolNo,
  //     'parsedStartDate',
  //     parsedStartDate,
  //     'parsedDueDate',
  //     parsedDueDate,
  //     nowDate
  //   );
  daysFromStart = getDateDifference(nowDate, parsedStartDate);
  daysFromExpiry = getDateDifference(nowDate, parsedDueDate);

  //   console.log('daysFromStart', daysFromStart);
  //   console.log('daysFromExpiry', daysFromExpiry);

  return true; //@!@!!!!!!!!!!!!!! TODO
};

export const getOpenLtpLoansItems = (nowDate, ltpLoansItems) => {
  //   console.log(
  //     'in getOpenLtpLoansItems ltpLoansItems',
  //     ltpLoansItems && ltpLoansItems.length
  //   );
  let openLtpLoansItems = [];
  if (ltpLoansItems && ltpLoansItems.length > 0) {
    openLtpLoansItems = ltpLoansItems.filter(
      (item) =>
        item.startDate && item.endDateDue && getLtpLoanStatus(nowDate, item)
    );
  }
  // console.log('LtpLoansItemsFiltered', openLtpLoansItems);
  return openLtpLoansItems;
};
