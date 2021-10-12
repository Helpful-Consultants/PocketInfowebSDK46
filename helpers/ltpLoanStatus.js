import { parse } from 'date-fns';
import { getDisplayDateFromDate, getDateDifference } from '../helpers/dates';
const getLtpLoanStatus = (nowDateObj, item) => {
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

  console.log(item.loanToolNo, 'endDueDate', item.endDateDue);

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

  console.log(
    item.loanToolNo,
    'parsedStartDate',
    parsedStartDate,
    'parsedDueDate',
    parsedDueDate,
    nowDateObj
  );
  daysFromStart = getDateDifference(nowDateObj, parsedStartDate);
  daysFromExpiry = getDateDifference(nowDateObj, parsedDueDate);

  console.log('daysFromStart', daysFromStart);
  console.log('daysFromExpiry', daysFromExpiry);

  if (daysFromStart > 0 && daysFromStart <= 2) {
    return true;
  } else {
    if (daysFromExpiry >= -3) {
      return true;
    }
  }
  return false;
};

const getOpenLtpLoansItems = (ltpLoansItems) => {
  console.log(
    'in getOpenLtpLoansItems ltpLoansItems',
    ltpLoansItems && ltpLoansItems.length
  );
  let openLtpLoansItems = [];
  if (ltpLoansItems && ltpLoansItems.length > 0) {
    openLtpLoansItems = ltpLoansItems.filter(
      (item) => item.startDate && item.endDateDue && getItemStatus(item)
    );
  }
  // console.log('LtpLoansItemsFiltered', openLtpLoansItems);
  return openLtpLoansItems;
};

export default getLtpLoanStatus;
