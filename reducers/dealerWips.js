import { createSelector } from 'reselect';
// import {
//   getSortedBookedOutToolsForUser,
//   getSortedDealerWipsItemsForUser,
// } from '../helpers/dealerWips';

import Types from '../constants/Types';
const INITIAL_STATE = {
  dealerWipsItems: [],
  userIntId: null,
  isLoading: false,
  isSending: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  lastWipProcessed: null,
  unavailableTools: false,
  fetchTime: null,
};

// export const selectDealerWipsForUser = createSelector(
//   (state) => state.dealerWips.dealerWipsItems,
//   (state) => state.dealerWips.userIntId,

//   (dealerWipsItems, userIntId) => {
//     let retArr = getSortedDealerWipsItemsForUser(dealerWipsItems, userIntId);
//     // console.log(
//     //   '************** in selectWipsForUser',
//     //   'userIntId',
//     //   userIntId,
//     //   'dealerWipsItems',
//     //   dealerWipsItems.length,
//     //   'retArr',
//     //   retArr.length
//     // );
//     return retArr;
//   }
// );

export const selectDealerWipsForUser = createSelector(
  (state) => state.dealerWips.dealerWipsItems,
  (state) => state.dealerWips.userIntId,

  (dealerWipsItems, userIntId) => {
    let retArr = [];
    if (userIntId && dealerWipsItems && dealerWipsItems.length > 0) {
      retArr = dealerWipsItems.filter(
        (wip) =>
          wip.tools &&
          wip.tools.length > 0 &&
          wip.userIntId &&
          wip.userIntId.toString() == userIntId
      );
    }
    // console.log(
    //   '************** in selectWipsForUser',
    //   'userIntId',
    //   userIntId,
    //   'dealerWipsItems',
    //   dealerWipsItems.length,
    //   'retArr',
    //   retArr.length
    // );
    return retArr;
  }
);

// export const selectBookedOutToolsForUser = createSelector(
//   (state) => state.dealerWips.dealerWipsItems,
//   (state) => state.dealerWips.userIntId,

//   (dealerWipsItems, userIntId) => {
//     let retArr = getSortedBookedOutToolsForUser(dealerWipsItems, userIntId);
//     // console.log(
//     //   '************** in selectBookedOutToolsForUser',

//     //   'dealerWipsItems',
//     //   dealerWipsItems.length,
//     //   'retArr',
//     //   retArr
//     // );
//     return retArr;
//   }
// );

export const selectBookedOutToolsForUser = createSelector(
  (state) => state.dealerWips.dealerWipsItems,
  (state) => state.dealerWips.userIntId,

  (dealerWipsItems, userIntId) => {
    const keyName = 'partNumber';
    let allToolsArr = [];
    userIntId &&
      dealerWipsItems.forEach((wip) => {
        if (
          wip.tools &&
          wip.tools.length > 0 &&
          wip.userIntId &&
          wip.userIntId.toString() == userIntId
        ) {
          let wipToolsArr = wip.tools.map((tool) => ({
            ...tool,
            wipNumber: wip.wipNumber,
            wipId: wip.id.toString(),
            wipCreatedDate: wip.createdDate,
          }));
          allToolsArr.push(...wipToolsArr);
        }
      });

    let retArr = allToolsArr.sort(function (a, b) {
      if (!a.hasOwnProperty(keyName) || !b.hasOwnProperty(keyName)) return 0;
      let comparison = a[keyName].localeCompare(b[keyName]);
      return comparison;
    });
    // console.log(
    //   '************** in selectBookedOutToolsForUser',

    //   'dealerWipsItems',
    //   dealerWipsItems.length,
    //   'retArr',
    //   retArr
    // );
    return retArr;
  }
);

// export const selectLastWipProcessedInfo = createSelector(
//   (state) => state.dealerWips.lastWipProcessed,

//   (lastWipProcessed) => lastWipProcessed
// );

export const selectLastWipProcessedObj = createSelector(
  (state) => state.dealerWips.lastWipProcessed,

  (lastWipProcessed) => {
    // console.log('lastWipProcessed', lastWipProcessed && lastWipProcessed);
    return lastWipProcessed && lastWipProcessed.wipObj
      ? lastWipProcessed.wipObj
      : null;
  }
);

export const selectLastWipProcessedId = createSelector(
  (state) => state.dealerWips.lastWipProcessed,

  (lastWipProcessed) => {
    return lastWipProcessed &&
      lastWipProcessed.wipObj &&
      lastWipProcessed.wipObj.wipId
      ? lastWipProcessed.wipObj.wipId
      : null;
  }
);

export default function dealerWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_WIPS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.GET_DEALER_WIPS_SUCCESS: {
      //   console.log(
      //     'GET_DEALER_WIPS_SUCCESS action.payload.statusCode',
      //     action.payload.statusCode & action.payload.statusCode
      //   );
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: action.payload.items,
        userIntId: action.payload.userIntId || null,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        fetchTime:
          (action.payload.fetchTime && action.payload.fetchTime) || null,
      };
    }
    case Types.CREATE_DEALER_WIP_START: {
      return {
        ...state,
        isSending: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.CREATE_DEALER_WIP_SUCCESS: {
      //   console.log(
      //     'CREATE_DEALER_WIP_SUCCESS action.payload.statusCode',
      //     action.payload.statusCode & action.payload.statusCode
      //   );
      //   console.log(
      //     'reducer CREATE_DEALER_WIP_SUCCESS action.payload is',
      //     action.payload
      //   );
      return {
        ...state,
        lastWipProcessed: {
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
          wipObj: (action.payload.wipObj && action.payload.wipObj) || null,
        },
        isLoading: false,
        isSending: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.DEALER_WIP_UNAVAILABLE_TOOLS: {
      //   console.log(
      //     'reducer DEALER_WIP_UNAVAILABLE_TOOLS action.payload.statusCode',
      //     action.payload.statusCode & action.payload.statusCode
      //   );
      //   console.log(
      //     'reducer DEALER_WIP_UNAVAILABLE_TOOLS action.payload',
      //     action.payload
      //   );
      return {
        ...state,
        lastWipProcessed: {
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
          wipObj: (action.payload.wipObj && action.payload.wipObj) || null,
        },
        isLoading: false,
        isSending: false,
        unavailableTools: true,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.DELETE_DEALER_WIP_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      //   console.log(
      //     'reducer DELETE_DEALER_WIP_SUCCESS action.payload.statusCode',
      //     action.payload.statusCode & action.payload.statusCode
      //   );
      //   console.log(
      //     'reducer DELETE_DEALER_WIP_SUCCESS action.payload',
      //     action.payload
      //   );
      return {
        ...state,
        lastWipProcessed: {
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
          wipObj: (action.payload.wipObj && action.payload.wipObj) || null,
        },
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.DELETE_DEALER_WIP_TOOL_SUCCESS: {
      //   console.log(
      //     'reducer DELETE_DEALER_WIP_TOOL_SUCCESS action.payload.statusCode',
      //     action.payload.statusCode & action.payload.statusCode
      //   );
      //   console.log(
      //     'reducer DELETE_DEALER_WIP_TOOL_SUCCESS action.payload',
      //     action.payload & action.payload
      //   );
      return {
        ...state,
        lastWipProcessed: {
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
          wipObj: (action.payload.wipObj && action.payload.wipObj) || null,
        },
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    case Types.EMPTY_DEALER_WIPS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.DEALER_WIPS_ERROR: {
      console.log('action.type is:', action.type);
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        lastWipProcessed: {},
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
