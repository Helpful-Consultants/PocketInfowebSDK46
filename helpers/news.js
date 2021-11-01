import { parse } from 'date-fns';
import { getDateDifference } from './dates';
import Periods from '../constants/Periods';
import { isDateAfter } from '../helpers/dates';

export const getDateOfLatestCriticalNewsItem = (newsItems) => {
  const nowDate = Date.now();
  let latestDate = null;

  if (newsItems && newsItems.length > 0) {
    newsItems.map((item) => {
      if (
        item.businessCritical &&
        item.businessCritical.length > 0 &&
        (item.businessCritical.toLowerCase() === 'y' ||
          item.businessCritical.toLowerCase() === 'yes' ||
          item.businessCritical.toLowerCase() === 'true')
      ) {
        if (item.lastUpdated && item.lastUpdated.length > 0) {
          //   console.log(
          //     'news updated',
          //     item.headline,
          //     item.businessCritical,
          //     item.lastUpdated
          //   );
          if (latestDate && latestDate.length > 0) {
            if (isDateAfter(item.lastUpdated, latestDate)) {
              latestDate = item.lastUpdated;
            }
          } else {
            latestDate = item.lastUpdated;
          }
        } else if (item.createdDate && item.createdDate.length > 0) {
          //   console.log(
          //     'news created',
          //     item.headline,
          //     item.businessCritical,
          //     item.createdDate
          //   );
          if (latestDate && latestDate.length > 0) {
            if (isDateAfter(item.createdDate, latestDate)) {
              latestDate = item.createdDate;
            }
          } else {
            latestDate = item.createdDate;
          }
        }
      }
    });
  }
  return latestDate;
};
