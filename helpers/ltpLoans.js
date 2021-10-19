import { parse } from 'date-fns';
import { getDateDifference } from './dates';

export const getLtpLoansCountsObj = (ltpLoansItems) => {
  let redCount = 0;
  let amberCount = 0;
  let greenCount = 0;

  const nowDateObj = new Date();

  const checkTimeToExpiry = (endDate) => {
    const parsedEndDate =
      (endDate && parse(endDate, 'dd/MM/yyyy', new Date())) || null;
    const daysLeft = 1 + getDateDifference(nowDateObj, parsedEndDate);
    // console.log(
    //   '£££ in getLtpLoansCountsObj, checkTimeToExpiry ',
    //   endDate,
    //   'parsedEndDate',
    //   parsedEndDate,
    //   daysLeft
    // );
    return daysLeft;
  };

  //   console.log(
  //     'in getLtpLoansCountsObj; ltpLoansItems length',
  //     ltpLoansItems.length
  //   );

  if (ltpLoansItems && ltpLoansItems.length > 0) {
    ltpLoansItems.map((item) => {
      const timeToEnd = item.endDateDue && checkTimeToExpiry(item.endDateDue);
      //   console.log(
      //     'in getLtpLoansCountsObj; ',
      //     'item.endDate',
      //     item.endDate,
      //     'timeToEnd',
      //     timeToEnd
      //   );
      if (timeToEnd !== null) {
        if (timeToEnd <= 2) {
          redCount++;
        } else if (timeToEnd >= 5) {
          greenCount++;
        } else {
          amberCount++;
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

  if (daysFromExpiry >= -2) {
    return true;
  } else {
    if (daysFromStart >= -3) {
      return true;
    }
  }
  return false;
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
