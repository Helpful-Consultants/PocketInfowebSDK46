import axios from 'axios';
import queryString from 'query-string';

const dummyEmailAddress = 'alan@helpfulconsultants.com';
const dummyDealerId = 'sgroves';
const dummyPin = '808255';
const dummyIntId = 850;
const dummyIntIdString = '850';
const dummyUserName = 'Alan Upstone';

export const getDealerWips = wipObj => {
  //   console.log('here in getDealerWips API ', wipObj);
  const { dealerId, intId } = wipObj;
  const url =
    '/mandatoryList/?controller=api&action=getWIPsForUserIntId&intId=' +
    intId +
    '&dealerId=' +
    dealerId;
  //   console.log(url);
  return axios.get(url, {
    headers: {
      //   'Content-Type': 'text/plain'
      Accept: 'text/json'
      //   'Content-Type': 'text/json'
      //   'Content-Type': 'text / text; charset=UTF - 8'
      //   'Content-Type': 'application/json;charset=UTF - 8'
      // 'Content-Type': 'application/json'
    }
  });
};

export const createDealerWip = wipObj => {
  //   console.log('!!!!!!!!!!!! in create wip api', wipObj);

  const url = '/mandatoryList/?controller=api&action=acceptWIPpostJSON';

  const strung = JSON.stringify(wipObj);
  //   console.log('in create wip api, strung is ', strung);

  const wipArr = [wipObj];

  //   console.log('!!!!!!!!wipArr', wipArr);

  //   const strung = queryString.stringify(stuff);
  //   const strung = stuff.toString();
  const strungArray = '[' + strung + ']';
  //   console.log(postUrl);
  //   console.log(stuff);
  //   console.log('in create wip api, strungArray is ', strungArray);
  //   console.log(strungArray);
  //   return fetch(postUrl, {
  //     method: 'POST',
  //     headers: {
  //       //   Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: dummyData
  //   });

  //   return axios.post(url, wipArr);

  return axios.post(url, strungArray, {
    headers: {
      //   'Content-Type': 'text/plain'
      Accept: '*/*',
      //   'Content-Type': 'text/json'
      //   'Content-Type': 'text / text; charset=UTF - 8'
      'Content-Type': 'application/json;charset=UTF - 8'
      // 'Content-Type': 'application/json'
    }
  });
  //   return axios.post(postUrl, strungArray);
};

// export const deleteDealerWip = ({ dealerWipId, wipNumber, intId }) => {
//   return axios.delete(`/dealerWips/${(dealerWipId, wipNumber, intId)}`);
// };

// export const deleteDealerWip = ({ dealerId, wipObj }) => {

export const deleteDealerWipTool = payload => {
  //   console.log('in delete dealer wip tool api', payload);

  const wipId = payload.wipObj.id;
  const wipToolLineId = payload.wipToolLineId;

  const url =
    '/mandatoryList/?controller=api&action=appDeleteToolFromWIP&wipId=' +
    wipId +
    '&wipLineId=' +
    wipToolLineId;
  //   console.log(url);
  return axios.post(url);
};

export const deleteDealerWip = payload => {
  //   console.log('in delete dealer wip api', payload);

  const dealerId = payload.dealerId;
  const wipObj = payload.wipObj;
  const sendData =
    'id=' +
    wipObj.id +
    '&wipNumber=' +
    wipObj.wipNumber +
    '&contact_id=' +
    wipObj.userIntId +
    '';
  //   console.log(sendData);
  const url =
    '/mandatoryList/?controller=api&action=appDeleteWIP&dealerId=' + dealerId;
  //   console.log(url);
  return axios.post(url, sendData, {
    headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  //   return console.log('will axios a delete dealerWip');
};
