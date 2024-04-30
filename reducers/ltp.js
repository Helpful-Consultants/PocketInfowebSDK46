import Types from '../constants/Types';
import {
  getSortedLtpItemsForUserBrand,
  getSortedUniqueLtpItems,
} from '../helpers/ltp';
import { createSelector } from 'reselect';
const INITIAL_STATE = {
  ltpItems: [],
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  fetchTime: null,
};

export const selectSortedUniqueLtpTools = createSelector(
  (state) => state.ltp.ltpItems || [],

  (ltpItems) => {
    // Integrate the logic from getSortedUniqueLtpItems here
    const keyName = 'orderPartNo';
    let uniqueLtpItems = ltpItems.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.orderPartNo === item.orderPartNo)
    );
    let ltpItemsSorted = uniqueLtpItems.sort(function (a, b) {
      if (!a.hasOwnProperty(keyName) || !b.hasOwnProperty(keyName)) return 0;
      let comparison = a[keyName].localeCompare(b[keyName]);
      return comparison;
    });

    console.log(
      'in selectSortedUniqueLtpTools ',
      ltpItems.length,
      uniqueLtpItems.length
    );
    return ltpItemsSorted;
  }
);

export default function ltp(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_LTP_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        statusCode: null,
        dataErrorUrl: null,
      };
    }
    case Types.GET_LTP_SUCCESS: {
      //   console.log(
      //     'ltp action items length ',
      //     action.payload && action.payload.items && action.payload.items.length
      //   );

      //   console.log(
      //     'in ltp get success reducer',
      //     action.payload.items && action.payload.items.length,
      //     action.payload.userBrand && action.payload.userBrand
      //   );
      let filteredItems = getSortedLtpItemsForUserBrand(
        action.payload.items,
        action.payload.userBrand
      );
      //   console.log(
      //     'in ltp reducer filteredItems.length',
      //     filteredItems && filteredItems.length
      //   );
      return {
        ...state,
        ltpItems: filteredItems,
        isLoading: false,
        error: null,
        statusCode: null,
        dataErrorUrl: null,
        fetchTime:
          (action.payload.fetchTime && action.payload.fetchTime) || null,
      };
    }
    case Types.EMPTY_LTP_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        ltpItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.LTP_ERROR: {
      return {
        ...state,
        isLoading: false,
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
