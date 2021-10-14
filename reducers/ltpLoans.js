// import { Types } from '../actions/ltpLoans';
import Types from '../constants/Types';
const INITIAL_STATE = {
  ltpLoansItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  displayTimestamp: null,
};

const filterReturnedItems = (items) => {
  const nowDateObj = new Date();
  let filteredLtpLoansArr = [];
  //   console.log('nowDateObj', nowDateObj);

  if (items && items.length > 0) {
    items.map((item) => {
      //   console.log(
      //     'in filterExpiredItems',
      //     item.menuText,
      //     item.expiryDate,
      //     getTimeToExpiry(fromDate, item.expiryDate)
      //   );
      if (
        !(item.collectedDate && item.collectedDate.length > 0) &&
        !(item.collectionNumber && item.collectionNumber.length > 0)
      ) {
        filteredLtpLoansArr.push(item);
      }
    });
  }

  //   console.log(
  //     'reducertime;filterExpiredItems',
  //     items.length,
  //     'down to',
  //     filteredLtpLoansArr.length
  //   );
  return filteredLtpLoansArr;
};

export default function ltpLoans(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_LTP_LOANS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SET_LTP_LOANS_DISPLAY_TIMESTAMP: {
      //   console.log('date in state is', state.displayTimestamp);
      return {
        ...state,
        displayTimestamp: new Date(),
      };
    }
    case Types.GET_LTP_LOANS_SUCCESS: {
      //   console.log('action.type is:', action.type);
      //   console.log(action.payload.items && action.payload.items);

      return {
        ...state,
        // newsItems: [],
        ltpLoansItems:
          (action.payload.items && filterReturnedItems(action.payload.items)) ||
          [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.EMPTY_LTP_LOANS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        ltpLoansItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.LTP_LOANS_ERROR: {
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
