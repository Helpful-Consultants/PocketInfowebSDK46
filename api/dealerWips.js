import axios from 'axios';
import queryString from 'query-string';

const dummyEmailAddress = 'alan@helpfulconsultants.com';
const dummyDealerId = 'sgroves';
const dummyPin = '808255';
const dummyIntId = 850;
const dummyIntIdString = '850';
const dummyUserName = 'Alan Upstone';
const ztools = [
  {
    id: '5104'
    // toolType: 'Equipment',
    // location: '',
    // lastWIP: '',
    // partNumber: 'ASE44705101000',
    // toolNumber: '6883 /1A',
    // partDescription: 'Torque wrench 5 - 25Nm\r\n'
  }
];

const tools = [
  {
    id: '5536',
    toolType: 'Equipment',
    location: '',
    lastWIP: '',
    toolNumber: '1687',
    toolType: 'Equipment',
    toolCondition: '',
    partDescription: 'Charge air tester',
    partNumber: 'ASE40110101000'
  }
];

const dummyData = [
  {
    wipNumber: 5002,
    createdBy: 'Alan',
    createdDate: '2019-11-18T21:05:02.354Z',
    userIntId: '850',
    tools: [
      {
        id: '4472',
        toolType: 'Tool',
        partNumber: '10 - 222 A /2',
        toolNumber: 'V03839141EH',
        partDescription: 'Supplementary hook',
        location: '',
        toolCondition: '',
        lastWIP: ''
      },
      {
        id: '5893',
        toolType: 'Tool',
        partNumber: '10 - 222 A /3',
        toolNumber: 'V03839111FT',
        partDescription: 'Adapter',
        location: '',
        toolCondition: '',
        lastWIP: ''
      }
    ]
  }
];

const postUrl = '/mandatoryList/?controller=api&action=acceptWIPpostJSON';
// console.log(postUrl);

const deleteUrl =
  '/mandatoryList/?controller=api&action=appDeleteWIP&dealerId=' +
  dummyDealerId;
// console.log(deleteUrl);

export const getDealerWips = ({ dealerId, intId }) => {
  //   console.log('here in getDealerWips dealerId is ', dealerId, intId);
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

export const createDealerWip = newWipObj => {
  //   console.log('in create wip api', newWipObj);

  const strung = JSON.stringify(newWipObj);
  //   console.log('in create wip api, strung is ', strung);

  const wipArr = [newWipObj];

  //   console.log('wipArr', wipArr);

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

  return axios.post(postUrl, wipArr);

  //   return axios.post(postUrl, dummyData, {
  //     headers: {
  //       data: dummyData,
  //       Accept: '*/*',
  //       'Content-Type': 'application/json'
  //       //   //   'Content-Type': 'text/json'
  //       //   'Content-Type': 'text/plain'
  //       //   'Content-Type': 'text/json'
  //     }
  //   });
  // return axios.post(postUrl, dummyData, {
  //     headers: {
  //         data: '',
  //         Accept: '*/*',
  //         'Content-Type': 'application/json'
  //         //   //   'Content-Type': 'text/json'
  //         //   'Content-Type': 'text/plain'
  //         //   'Content-Type': 'text/json'
  //     }
  // });
  //   return axios.post(postUrl, strungArray);
  //   return axios.post(postUrl, dummyData);
  //   return axios.post(postUrl, strungArray, {
  return axios.post(postUrl, wipArr, {
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

export const deleteDealerWip = wipData => {
  const sendData =
    'id=' +
    wipData.id +
    '&wipNumber=' +
    wipData.wipNumber +
    '&contact_id=' +
    wipData.intId +
    '';
  //   console.log(sendData);
  return axios.post(deleteUrl, sendData);
  //   return console.log('will axios a delete dealerWip');
};
