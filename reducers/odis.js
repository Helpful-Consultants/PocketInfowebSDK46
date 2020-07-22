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

      let auOdisData = {};
      let cvOdisData = {};
      let seOdisData = {};
      let skOdisData = {};
      let vwOdisData = {};
      let auChanged = null;
      let cvChanged = null;
      let seChanged = null;
      let skChanged = null;
      let vwChanged = null;

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

          if (item.brandCode.toLowerCase() === 'au') {
            // console.log('au', item);

            if (state.odisData && state.odisData.au) {
              if (
                (state.odisData.au.productVersion &&
                  state.odisData.au.productVersion !== item.productVersion) ||
                (state.odisData.au.mainFeatureVersion &&
                  state.odisData.au.mainFeatureVersion !==
                    item.mainFeatureVersion) ||
                (state.odisData.au.dataVersion &&
                  state.odisData.au.dataVersion !== item.dataVersion)
              ) {
                auChanged = new Date();
              }
            }

            auOdisData = {
              ...item,
              dateChangedInApp:
                (auChanged && auChanged) ||
                (state.odisData &&
                  state.odisData.au &&
                  state.odisData.au.dateChangedInApp &&
                  state.odisData.au.dateChangedInApp) ||
                null,
              previousProductVersion:
                state.odisData &&
                state.odisData.au &&
                state.odisData.au.productVersion &&
                item.productVersion
                  ? state.odisData.au.productVersion === item.productVersion
                    ? state.odisData.au.previousProductVersion
                    : state.odisData.au.productVersion
                  : null,
              previousMainFeatureVersion:
                state.odisData &&
                state.odisData.au &&
                state.odisData.au.mainFeatureVersion &&
                item.mainFeatureVersion
                  ? state.odisData.au.mainFeatureVersion ===
                    item.mainFeatureVersion
                    ? state.odisData.au.previousMainFeaureVersion
                    : state.odisData.au.mainFeatureVersion
                  : null,
              previousDataVersion:
                state.odisData &&
                state.odisData.au &&
                state.odisData.au.dataVersion &&
                item.dataVersion
                  ? state.odisData.au.dataVersion === item.dataVersion
                    ? state.odisData.au.previousDataVersion
                    : state.odisData.au.dataVersion
                  : null,
            };
          } else if (item.brandCode.toLowerCase() === 'cv') {
            // console.log('cv', item);
            // console.log(
            //   state.odisData &&
            //     state.odisData.cv &&
            //     state.odisData.cv.productVersion &&
            //     state.odisData.cv.productVersion,
            //   item.productVersion
            // );
            // console.log(
            //   state.odisData &&
            //     state.odisData.cv &&
            //     state.odisData.cv.mainFeatureVersion &&
            //     state.odisData.cv.mainFeatureVersion,
            //   item.mainFeatureVersion
            // );
            // console.log(
            //   state.odisData &&
            //     state.odisData.cv &&
            //     state.odisData.cv.dataVersion &&
            //     state.odisData.cv.dataVersion,
            //   item.dataVersion
            // );

            if (state.odisData && state.odisData.cv) {
              if (
                (state.odisData.cv.productVersion &&
                  state.odisData.cv.productVersion !== item.productVersion) ||
                (state.odisData.cv.mainFeatureVersion &&
                  state.odisData.cv.mainFeatureVersion !==
                    item.mainFeatureVersion) ||
                (state.odisData.cv.dataVersion &&
                  state.odisData.cv.dataVersion !== item.dataVersion)
              ) {
                cvChanged = new Date();
              }
            }
            // cvChanged = new Date();
            cvOdisData = {
              ...item,
              //   productVersion: '5.1.5',
              dateChangedInApp:
                (cvChanged && cvChanged) ||
                (state.odisData &&
                  state.odisData.cv &&
                  state.odisData.cv.dateChangedInApp &&
                  state.odisData.cv.dateChangedInApp) ||
                null,
              previousProductVersion:
                state.odisData &&
                state.odisData.cv &&
                state.odisData.cv.productVersion &&
                item.productVersion
                  ? state.odisData.cv.productVersion === item.productVersion
                    ? state.odisData.cv.previousProductVersion
                    : state.odisData.cv.productVersion
                  : null,
              previousMainFeatureVersion:
                state.odisData &&
                state.odisData.cv &&
                state.odisData.cv.mainFeatureVersion &&
                item.mainFeatureVersion
                  ? state.odisData.cv.mainFeatureVersion ===
                    item.mainFeatureVersion
                    ? state.odisData.cv.previousMainFeaureVersion
                    : state.odisData.cv.mainFeatureVersion
                  : null,
              previousDataVersion:
                state.odisData &&
                state.odisData.cv &&
                state.odisData.cv.dataVersion &&
                item.dataVersion
                  ? state.odisData.cv.dataVersion === item.dataVersion
                    ? state.odisData.cv.previousDataVersion
                    : state.odisData.cv.dataVersion
                  : null,
            };
          } else if (item.brandCode.toLowerCase() === 'se') {
            // console.log('se', item);

            if (state.odisData && state.odisData.se) {
              if (
                (state.odisData.se.productVersion &&
                  state.odisData.se.productVersion !== item.productVersion) ||
                (state.odisData.se.mainFeatureVersion &&
                  state.odisData.se.mainFeatureVersion !==
                    item.mainFeatureVersion) ||
                (state.odisData.se.dataVersion &&
                  state.odisData.se.dataVersion !== item.dataVersion)
              ) {
                seChanged = new Date();
              }
            }
            seOdisData = {
              ...item,
              dateChangedInApp:
                (seChanged && seChanged) ||
                (state.odisData &&
                  state.odisData.se &&
                  state.odisData.se.dateChangedInApp &&
                  state.odisData.se.dateChangedInApp) ||
                null,
              previousProductVersion:
                state.odisData &&
                state.odisData.se &&
                state.odisData.se.productVersion &&
                item.productVersion
                  ? state.odisData.se.productVersion === item.productVersion
                    ? state.odisData.se.previousProductVersion
                    : state.odisData.se.productVersion
                  : null,
              previousMainFeatureVersion:
                state.odisData &&
                state.odisData.se &&
                state.odisData.se.mainFeatureVersion &&
                item.mainFeatureVersion
                  ? state.odisData.se.mainFeatureVersion ===
                    item.mainFeatureVersion
                    ? state.odisData.se.previousMainFeaureVersion
                    : state.odisData.se.mainFeatureVersion
                  : null,
              previousDataVersion:
                state.odisData &&
                state.odisData.se &&
                state.odisData.se.dataVersion &&
                item.dataVersion
                  ? state.odisData.se.dataVersion === item.dataVersion
                    ? state.odisData.se.previousDataVersion
                    : state.odisData.se.dataVersion
                  : null,
            };
          } else if (item.brandCode.toLowerCase() === 'sk') {
            // console.log('sk', item);

            if (state.odisData && state.odisData.sk) {
              if (
                (state.odisData.sk.productVersion &&
                  state.odisData.sk.productVersion !== item.productVersion) ||
                (state.odisData.sk.mainFeatureVersion &&
                  state.odisData.sk.mainFeatureVersion !==
                    item.mainFeatureVersion) ||
                (state.odisData.sk.dataVersion &&
                  state.odisData.sk.dataVersion !== item.dataVersion)
              ) {
                skChanged = new Date();
              }
            }
            skOdisData = {
              ...item,
              dateChangedInApp:
                (skChanged && skChanged) ||
                (state.odisData &&
                  state.odisData.sk &&
                  state.odisData.sk.dateChangedInApp &&
                  state.odisData.sk.dateChangedInApp) ||
                null,
              previousProductVersion:
                state.odisData &&
                state.odisData.sk &&
                state.odisData.sk.productVersion &&
                item.productVersion
                  ? state.odisData.sk.productVersion === item.productVersion
                    ? state.odisData.sk.previousProductVersion
                    : state.odisData.sk.productVersion
                  : null,
              previousMainFeatureVersion:
                state.odisData &&
                state.odisData.sk &&
                state.odisData.sk.mainFeatureVersion &&
                item.mainFeatureVersion
                  ? state.odisData.sk.mainFeatureVersion ===
                    item.mainFeatureVersion
                    ? state.odisData.sk.previousMainFeaureVersion
                    : state.odisData.sk.mainFeatureVersion
                  : null,
              previousDataVersion:
                state.odisData &&
                state.odisData.sk &&
                state.odisData.sk.dataVersion &&
                item.dataVersion
                  ? state.odisData.sk.dataVersion === item.dataVersion
                    ? state.odisData.sk.previousDataVersion
                    : state.odisData.sk.dataVersion
                  : null,
            };
          } else if (item.brandCode.toLowerCase() === 'vw') {
            // console.log('vw', item);

            if (state.odisData && state.odisData.vw) {
              if (
                (state.odisData.vw.productVersion &&
                  state.odisData.vw.productVersion !== item.productVersion) ||
                (state.odisData.vw.mainFeatureVersion &&
                  state.odisData.vw.mainFeatureVersion !==
                    item.mainFeatureVersion) ||
                (state.odisData.vw.dataVersion &&
                  state.odisData.vw.dataVersion !== item.dataVersion)
              ) {
                vwChanged = new Date();
              }
            }
            vwOdisData = {
              ...item,
              dateChangedInApp:
                (vwChanged && vwChanged) ||
                (state.odisData &&
                  state.odisData.vw &&
                  state.odisData.vw.dateChangedInApp &&
                  state.odisData.vw.dateChangedInApp) ||
                null,
              previousProductVersion:
                state.odisData &&
                state.odisData.vw &&
                state.odisData.vw.productVersion &&
                item.productVersion
                  ? state.odisData.vw.productVersion === item.productVersion
                    ? state.odisData.vw.previousProductVersion
                    : state.odisData.vw.productVersion
                  : null,
              previousMainFeatureVersion:
                state.odisData &&
                state.odisData.vw &&
                state.odisData.vw.mainFeatureVersion &&
                item.mainFeatureVersion
                  ? state.odisData.vw.mainFeatureVersion ===
                    item.mainFeatureVersion
                    ? state.odisData.vw.previousMainFeaureVersion
                    : state.odisData.vw.mainFeatureVersion
                  : null,
              previousDataVersion:
                state.odisData &&
                state.odisData.vw &&
                state.odisData.vw.dataVersion &&
                item.dataVersion
                  ? state.odisData.vw.dataVersion === item.dataVersion
                    ? state.odisData.vw.previousDataVersion
                    : state.odisData.vw.dataVersion
                  : null,
            };
          }

          //   console.log('!!!!! end');
        });
      }
      //   console.log('skOdisData', skOdisData);
      //   console.log('vwOdisData', vwOdisData);
      return {
        odisData: {
          au: auOdisData,
          cv: cvOdisData,
          se: seOdisData,
          sk: skOdisData,
          vw: vwOdisData,
        },
        // odisData: {},
        viewCount: state.viewCount
          ? auChanged || cvChanged || seChanged || skChanged || vwChanged
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
