// import odisDummyData from '../dummyData/odisDummyData';
import Types from '../constants/Types';
import { getOdisAlertCount } from '../helpers/odis';

const INITIAL_STATE = {
  odisData: {},
  viewCount: 0,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  fetchTime: null,
  displayTimestamp: null,
  userBrand: null,
};

export default function odis(state = INITIAL_STATE, action) {
  //   console.log(Types);

  switch (action.type) {
    case Types.GET_ODIS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SET_ODIS_DISPLAY_TIMESTAMP: {
      //   console.log('date in state is', state.displayTimestamp);
      const displayTime =
        action.payload && action.payload.displayTime
          ? action.payload.displayTime
          : null;

      //   console.log(
      //     'in odis reducer set display',
      //     action.payload && action.payload
      //   );

      //   console.log(
      //     'in odis reducer set display  called getOdisAlertCount',
      //     // state.odisData,
      //     'userBrand',
      //     state.userBrand,
      //     'changesToHighlight',
      //     changesToHighlight
      //   );
      const changeObj = getOdisAlertCount(
        state.odisData,
        displayTime,
        state.userBrand
      );
      const changesToHighlight = (changeObj && changeObj.alertsNeeded) || 0;

      return {
        ...state,
        changesToHighlight:
          changesToHighlight && changesToHighlight > 0 ? 1 : 0,
        displayTimestamp: displayTime,
      };
    }
    case Types.INCREMENT_ODIS_VIEW_COUNT: {
      let oldViewCount = (state && state.viewCount) || 0;
      //   console.log(
      //     'in odis reducer, INCREMENT_ODIS_VIEW_COUNT, oldViewCount is ',
      //     oldViewCount
      //   );

      return {
        ...state,
        viewCount: oldViewCount + 1,
      };
    }
    case Types.RESET_ODIS_VIEW_COUNT: {
      return {
        ...state,
        viewCount: 0,
      };
    }
    case Types.GET_ODIS_SUCCESS: {
      //   console.log('state', state && state);

      //   console.log(
      //     'TTTT^^^^^^^^^^^^^^^^^^^ in reducer letUserBrand',
      //     userBrand,
      //     action.payload && action.payload
      //   );
      //   console.log('action is:', action);
      let userBrand =
        action.payload && action.payload.userBrand
          ? action.payload.userBrand
          : null;

      const fetchTime =
        action.payload && action.payload.fetchTime
          ? action.payload.fetchTime
          : null;

      //   console.log(
      //     'GET_ODIS_SUCCESS from API payload brand',
      //     action.payload &&
      //       action.payload &&
      //       action.payload.userBrand &&
      //       action.payload.userBrand,
      //     'userBrand variable is ',
      //     userBrand
      //   );

      let odisDataObj = {};
      let endPointChangedObj = {};

      if (action.payload && action.payload.items) {
        let newDataObjArr = action.payload.items;
        // let newDataObjArr = odisDummyData[0].brandVersions;
        // console.log('newDataObjArr', newDataObjArr);
        // let newDataObjArr = [];

        // newDataObj[1].productVersion = '5.1.7';

        // newDataObj.map((item) => newDataObjArr.push(item));
        // console.log('newDataObjArr', newDataObjArr);

        // console.log('newDataObjArr[3]', newDataObjArr[3]);

        newDataObjArr.map((item) => {
          //   console.log('building newDataObjArr', item && item.brandCode);
          let brandCode =
            item && item.brandCode ? item.brandCode.toLowerCase() : null;

          //   let userBrand = userBrand ? userBrand.toLowerCase() : '';
          if (userBrand === null || brandCode === userBrand) {
            //   console.log('item.brandCode is ' + item.brandCode);
            //   console.log('!!!!! item.brandCode', item.brandCode);
            //   console.log('!!!!! start');

            // console.log('in storeOdisDataForBrand', userBrand, state.odisData);

            //   console.log('new odis item', item);
            //   console.log('state odisData', state.odisData[brandCode]);

            if (state.odisData && state.odisData[brandCode]) {
              if (
                (state.odisData[brandCode].productVersion &&
                  state.odisData[brandCode].productVersion !==
                    item.productVersion) ||
                (state.odisData[brandCode].mainFeatureVersion &&
                  state.odisData[brandCode].mainFeatureVersion !==
                    item.mainFeatureVersion) ||
                (state.odisData[brandCode].dataVersion &&
                  state.odisData[brandCode].dataVersion !== item.dataVersion)
              ) {
                //   console.log('odis change for ', brandCode);
                endPointChangedObj[brandCode] = new Date();
              }
            }
            /// remove after testing!!!!
            //   endPointChangedObj[brandCode] = new Date();

            odisDataObj[brandCode] = {
              ...item,
              dateChangedInApp:
                (endPointChangedObj[brandCode] &&
                  endPointChangedObj[brandCode]) ||
                (state.odisData &&
                  state.odisData[brandCode] &&
                  state.odisData[brandCode].dateChangedInApp &&
                  state.odisData[brandCode].dateChangedInApp) ||
                null,
              previousProductVersion:
                state.odisData &&
                state.odisData[brandCode] &&
                state.odisData[brandCode].productVersion &&
                item.productVersion
                  ? state.odisData[brandCode].productVersion ===
                    item.productVersion
                    ? state.odisData[brandCode].previousProductVersion
                    : state.odisData[brandCode].productVersion
                  : null,
              previousMainFeatureVersion:
                state.odisData &&
                state.odisData[brandCode] &&
                state.odisData[brandCode].mainFeatureVersion &&
                item.mainFeatureVersion
                  ? state.odisData[brandCode].mainFeatureVersion ===
                    item.mainFeatureVersion
                    ? state.odisData[brandCode].previousMainFeatureVersion
                    : state.odisData[brandCode].mainFeatureVersion
                  : null,
              previousDataVersion:
                state.odisData &&
                state.odisData[brandCode] &&
                state.odisData[brandCode].dataVersion &&
                item.dataVersion
                  ? state.odisData[brandCode].dataVersion === item.dataVersion
                    ? state.odisData[brandCode].previousDataVersion
                    : state.odisData[brandCode].dataVersion
                  : null,
            };
          }
        });
      }
      //   console.log('skOdisData', skOdisData);
      //   console.log('odisDataObj', odisDataObj);
      //   console.log('endPointChangedObj', endPointChangedObj);
      const newViewCount =
        endPointChangedObj.au ||
        endPointChangedObj.cv ||
        endPointChangedObj.se ||
        endPointChangedObj.sk ||
        endPointChangedObj.vw
          ? 0
          : state.viewCount;

      //   console.log(
      //     'setting whole state, old viewCount ',
      //     state.viewCount,
      //     'new viewCount ',
      //     newViewCount
      //   );

      const changeObj = getOdisAlertCount(odisDataObj, fetchTime, userBrand);
      //   console.log('changeObj', changeObj);
      const changesToHighlight = (changeObj && changeObj.alertsNeeded) || 0;

      const latestChangeDate =
        (changeObj && changeObj.latestChangeDate) || null;
      //   console.log(
      //     'in odis reducer set success called getOdisAlertCount',
      //     // odisDataObj,
      //     'userBrand',
      //     userBrand,
      //     'changesToHighlight',
      //     changesToHighlight
      //   );

      return {
        ...state,
        odisData: odisDataObj,
        userBrand: userBrand,
        // odisData: {},
        viewCount: newViewCount,
        latestChangeDate: latestChangeDate,
        changesToHighlight:
          changesToHighlight && changesToHighlight > 0 ? 1 : 0,
        fetchTime,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.ODIS_ERROR: {
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
