// import { Types } from '../actions/odis';
import Types from '../constants/Types';

const INITIAL_STATE = {
  odisData: {},
  viewCount: 0,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
};

export default function odis(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
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
    case Types.INCREMENT_ODIS_VIEW_COUNT: {
      //   console.log('in odis reducer increment view couunt ');
      let oldViewCount = (state && state.viewCount) || 0;

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
      //   console.log('from API', action.payload.items && action.payload.items);

      let odisDataObj = {
        au: {},
        cv: {},
        se: {},
        sk: {},
        vw: {},
      };
      let endPointChangedObj = {
        au: null,
        cv: null,
        se: null,
        sk: null,
        vw: null,
      };

      if (action.payload && action.payload.items) {
        let newDataObj = action.payload.items;
        let newDataObjArr = [];

        // newDataObj[1].productVersion = '5.1.7';

        newDataObj.map((item) => newDataObjArr.push(item));
        // console.log('newDataObjArr', newDataObjArr);

        // console.log('newDataObjArr[3]', newDataObjArr[3]);

        newDataObjArr.map((item) => {
          //   console.log('item.brandCode is ' + item.brandCode);
          //   console.log('!!!!! item.brandCode', item.brandCode);
          //   console.log('!!!!! start');
          let brandCode = item.brandCode.toLowerCase();

          console.log('item', item);
          console.log('odisData', state.odisData[brandCode]);

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
              endPointChangedObj[brandCode] = new Date();
            }
          }
          /// remove after testing!!!!
          endPointChangedObj[brandCode] = new Date();

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

          //   console.log('!!!!! end');
        });
      }
      //   console.log('skOdisData', skOdisData);
      console.log('odisDataObj', odisDataObj);
      console.log('endPointChangedObj', endPointChangedObj);
      return {
        odisData: odisDataObj,
        // odisData: {},
        viewCount: state.viewCount
          ? endPointChangedObj.au ||
            endPointChangedObj.cv ||
            endPointChangedObj.se ||
            endPointChangedObj.sk ||
            endPointChangedObj.vw
            ? 0
            : state.viewCount
          : 0,
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
