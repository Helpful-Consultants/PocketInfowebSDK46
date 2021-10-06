import moment from 'moment';

export const checkDisplayStatus = (
  itemDate,
  displayTimestamp,
  unit = 'seconds',
  maxAge = 0
) => {
  //   console.log(
  //     'in check if Unseen, params',
  //     itemDate,
  //     typeof itemDate,
  //     moment(itemDate, 'DD/MM/YYYY HH:mm:ss'),
  //     displayTimestamp,
  //     typeof displayTimestamp,
  //     moment(displayTimestamp)
  //   );
  if (itemDate && itemDate.length > 0) {
    if (displayTimestamp) {
      const lastDisplayed = moment(displayTimestamp);
      const itemDateToCompare = moment(itemDate, 'DD/MM/YYYY HH:mm:ss');
      const timeGap = lastDisplayed.diff(itemDateToCompare, 'days'); // 1
      //   console.log('timeGap', lastDisplayed, itemDateToCompare, timeGap);
      // if (moment(itemDate, 'DD/MM/YYYY HH:mm:ss').isAfter(displayTimestamp)) {
      if (timeGap <= (maxAge || 8)) {
        // whenCreated = moment(itemDate, 'DD/MM/YYYY HH:mm:ss');
        // if (makeDate(itemDate) > new Date(displayTimestamp)) {

        // console.log('in check if Unseen new');
        return true;
      } else {
        // console.log('in check if Unseen old');
        return false;
      }
    } else {
      console.log('in check if Unseen bad displayTimestamp', displayTimestamp);
      return false;
    }
  } else {
    // console.log('in check if Unseen bad itemDate', itemDate);
    return false;
  }
};

export const checkDisplayStatuses = (
  items,
  displayTimestamp,
  unit = 'seconds',
  maxAge = 0
) => {
  console.log('checkDisplayStatuses');
  let displayStatuses = 0;

  if (displayTimestamp && items && items.length > 0) {
    items.map((item) => {
      if (
        checkDisplayStatus(item.dateCreated, displayTimestamp, unit, maxAge)
      ) {
        console.log('TRUE!!!!!');
        ++displayStatuses;
      }
    });
  }
  return displayStatuses;
};
