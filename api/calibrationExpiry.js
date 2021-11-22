import axios from 'axios';

export const getCalibrationExpiry = (fetchParamsObj) => {
  //   console.log('here in getServiceMeasures API ');
  //   console.log('here in getServiceMeasures API ', fetchParamsObj);
  const { dealerId } = fetchParamsObj;
  //   const dealerId = 'helpful';
  const url = `/mandatoryList/?controller=api&action=listCalibrationExpiry&id=${dealerId}`;
  //   console.log(url);
  return axios.get(url, {
    headers: {
      //   'Content-Type': 'text/plain'
      //   Accept: 'text/json',
      //   'Content-Type': 'text/json'
      //   'Content-Type': 'text / text; charset=UTF - 8'
      //   'Content-Type': 'application/json;charset=UTF - 8'
      // 'Content-Type': 'application/json'
    },
  });
};
