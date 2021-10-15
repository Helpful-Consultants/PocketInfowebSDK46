// import { Types } from '../actions/serviceMeasures';
import { differenceInCalendarDays, parse } from 'date-fns';
import Types from '../constants/Types';
import { getServiceMeasuresCountsObj } from '../helpers/serviceMeasures';

const INITIAL_STATE = {
  serviceMeasuresItems: [],
  serviceMeasuresCounts: null,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  displayTimestamp: null,
};

const getTimeToExpiry = (nowDateObj, expiryDate) => {
  let theToDate = expiryDate && parse(expiryDate, 'dd/MM/yyyy', new Date());
  let timeToExpiry = 0;

  //   console.log(
  //     '***************in getTimeToExpiry reducer nowDateObj',
  //     nowDateObj,
  //     'to',
  //     theToDate
  //   );

  if (expiryDate) {
    timeToExpiry = differenceInCalendarDays(theToDate, nowDateObj);
  }
  //   console.log('expiryDate', expiryDate);
  //   console.log('££££££££ reducertimeToExpiry', timeToExpiry);

  return timeToExpiry;
};

const filterExpiredItems = (serviceMeasures) => {
  const nowDateObj = new Date();
  let filteredServiceMeasuresArr = [];

  //   console.log('nowDateObj', nowDateObj);
  if (serviceMeasures && serviceMeasures.length > 0) {
    serviceMeasures.map((serviceMeasure) => {
      //   console.log(
      //     'in filterExpiredItems',
      //     serviceMeasure.menuText,
      //     serviceMeasure.expiryDate,
      //     getTimeToExpiry(fromDate, serviceMeasure.expiryDate)
      //   );
      if (
        !serviceMeasure.retailerStatus ||
        serviceMeasure.retailerStatus !== 'c'
      ) {
        if (
          serviceMeasure.expiryDate &&
          getTimeToExpiry(nowDateObj, serviceMeasure.expiryDate) >= 0
        ) {
          filteredServiceMeasuresArr.push(serviceMeasure);
        }
      }
    });
  }
  //   console.log(
  //     'reducertime;filterExpiredItems',
  //     serviceMeasures.length,
  //     'down to',
  //     filteredServiceMeasuresArr.length
  //   );
  return filteredServiceMeasuresArr;
};

export default function serviceMeasures(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_SERVICE_MEASURES_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SET_SERVICE_MEASURES_DISPLAY_TIMESTAMP: {
      //   console.log('date in state is', state.displayTimestamp);
      return {
        ...state,
        displayTimestamp: new Date(),
      };
    }
    case Types.GET_SERVICE_MEASURES_SUCCESS: {
      //   console.log('action.type is:', action.type);
      //   console.log(action.payload.items && action.payload.items);
      //   console.log('STATE', state);
      const filteredServiceMeasuresArr =
        (action.payload.items && filterExpiredItems(action.payload.items)) ||
        [];

      return {
        ...state,
        // newsItems: [],
        serviceMeasuresItems: filteredServiceMeasuresArr,
        serviceMeasuresCounts: getServiceMeasuresCountsObj(
          filteredServiceMeasuresArr
        ),
        // serviceMeasuresItems: filterExpiredItems(serviceMeasuresDummyData),
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.EMPTY_SERVICE_MEASURES_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        serviceMeasuresItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SERVICE_MEASURES_ERROR: {
      console.log('action.type is:', action.type);
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        isLoading: false,
        isSending: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
