import axios from 'axios';

const url = 'https://dummy.restapiexample.com/api/v1/employee/1';

export const getBackgroundData = () => {
  //   console.log('here in getServiceMeasures API ');
  //   console.log('here in getServiceMeasures API ', wipObj);
  //   const { dealerId } = wipObj;
  //   const dealerId = 'helpful';
  //   const url =
  //     '/mandatoryList/?controller=api&action=listCalibrationExpiry&id=' +
  //     dealerId;
  //   console.log(url);
  return axios.get(url, {
    headers: {
      //   'Content-Type': 'text/plain'
      Accept: 'text/json',
      //   'Content-Type': 'text/json'
      //   'Content-Type': 'text / text; charset=UTF - 8'
      //   'Content-Type': 'application/json;charset=UTF - 8'
      // 'Content-Type': 'application/json'
    },
  });
};

// const ACCESSKEY = 'dCbVioCsW5';
// const SECRETKEY = '16Gdangafish3t@';
// const serviceName = 'timeservice';
// const placeId = '187';
// const url =
//   'api.xmltime.com/timeservice?placeid=' +
//   placeId +
//   '&version=3&out=json&prettyprint=1&accesskey=' +
//   ACCESSKEY +
//   '&expires=' +
//   now ;

// const combined = ACCESSKEY + serviceName + now;

// const now = Date.now();
// https: export const getDateAndTime = (wipObj) => {
//   //   console.log('here in getServiceMeasures API ');
//   //   console.log('here in getServiceMeasures API ', wipObj);
//   const { dealerId } = wipObj;
//   //   const dealerId = 'helpful';
//   const url =
//     '/mandatoryList/?controller=api&action=listCalibrationExpiry&id=' +
//     dealerId;
//   //   console.log(url);
//   return axios.get(url, {
//     headers: {
//       //   'Content-Type': 'text/plain'
//       Accept: 'text/json',
//       //   'Content-Type': 'text/json'
//       //   'Content-Type': 'text / text; charset=UTF - 8'
//       //   'Content-Type': 'application/json;charset=UTF - 8'
//       // 'Content-Type': 'application/json'
//     },
//   });
// };
