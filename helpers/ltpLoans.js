import { parse } from 'date-fns';
import { getDateDifference } from './dates';
import Periods from '../constants/Periods';

export const getLtpLoansCountsObj = (ltpLoansItems) => {
  let redCount = 0;
  let amberCount = 0;
  let greenCount = 0;

  const nowDate = Date.now();

  if (ltpLoansItems && ltpLoansItems.length > 0) {
    ltpLoansItems.map((item) => {
      const timeToEnd = item.endDateDue
        ? item.endDateDue && getDateDifference(nowDate, item.endDateDue)
        : null;
      //   console.log(
      //     'in getLtpLoansCountsObj; ',
      //     'item.endDate',
      //     item.endDate,
      //     'timeToEnd',
      //     timeToEnd
      //   );
      if (timeToEnd !== null) {
        if (timeToEnd <= Periods.LTP_LOANS_RED_PERIOD) {
          redCount++;
        } else if (timeToEnd <= Periods.LTP_LOANS_AMBER_PERIOD) {
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

export const getLtpLoanStatus = (nowDateObj, item) => {
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
    (item &&
      item.startDate &&
      item.startDate.length > 0 &&
      parse(item.startDate, 'dd/MM/yyyy', new Date())) ||
    null;
  const parsedDueDate =
    (item &&
      item.endDateDue &&
      item.endDateDue.length > 0 &&
      parse(item.endDateDue, 'dd/MM/yyyy', new Date())) ||
    null;

  //   console.log(
  //     item.loanToolNo,
  //     'parsedStartDate',
  //     parsedStartDate,
  //     'parsedDueDate',
  //     parsedDueDate,
  //     nowDateObj
  //   );
  daysFromStart = getDateDifference(nowDateObj, parsedStartDate);
  daysFromExpiry = getDateDifference(nowDateObj, parsedDueDate);

  //   console.log('daysFromStart', daysFromStart);
  //   console.log('daysFromExpiry', daysFromExpiry);

  return true; //@!@!!!!!!!!!!!!!! TODO
};

export const getOpenLtpLoansItems = (nowDateObj, ltpLoansItems) => {
  //   console.log(
  //     'in getOpenLtpLoansItems ltpLoansItems',
  //     ltpLoansItems && ltpLoansItems.length
  //   );
  let openLtpLoansItems = [];
  if (ltpLoansItems && ltpLoansItems.length > 0) {
    openLtpLoansItems = ltpLoansItems.filter(
      (item) =>
        item.startDate && item.endDateDue && getLtpLoanStatus(nowDateObj, item)
    );
  }
  // console.log('LtpLoansItemsFiltered', openLtpLoansItems);
  return openLtpLoansItems;
};
