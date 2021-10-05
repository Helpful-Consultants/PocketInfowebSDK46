import moment from 'moment';

export const checkDisplayStatus = (itemDate, displayTimestamp) => {
  console.log(
    'in check if Unseen, params',
    itemDate,
    typeof itemDate,
    moment(itemDate, 'DD/MM/YYYY HH:mm:ss'),
    displayTimestamp,
    typeof displayTimestamp,
    moment(displayTimestamp)
  );
  if (itemDate && itemDate.length > 0) {
    if (displayTimestamp) {
      if (moment(itemDate, 'DD/MM/YYYY HH:mm:ss').isAfter(displayTimestamp)) {
        // whenCreated = moment(itemDate, 'DD/MM/YYYY HH:mm:ss');
        // if (makeDate(itemDate) > new Date(displayTimestamp)) {
        console.log('in check if Unseen new');
        return true;
      } else {
        console.log('in check if Unseen old');
        return false;
      }
    } else {
      console.log(
        'in check if Unseen bad displayTimestamp',

        displayTimestamp
      );
      return false;
    }
  } else {
    console.log('in check if Unseen bad itemDate', itemDate);

    return false;
  }
};

export const checkDisplayStatuses = (items, displayTimestamp) => {
  console.log('checkDisplayStatuses items', items);
  let displayStatuses = false;

  if (items && items.length > 0) {
    items.map((item) => {
      if (checkDisplayStatus(item.dateCreated, displayTimestamp)) {
        console.log('TRUE!!!!!');
        displayStatuses = true;
      }
    });
  }
};
