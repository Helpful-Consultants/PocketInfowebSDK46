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
console.log(postUrl);

const deleteUrl =
  '/mandatoryList/?controller=api&action=appDeleteWIP&dealerId=' +
  dummyDealerId;
console.log(deleteUrl);

export const getDealerWips = ({ dealerId, intId }) => {
  console.log('here in getDealerWips dealerId is ', dealerId, intId);
  const url =
    '/mandatoryList/?controller=api&action=getWIPsForUserIntId&intId=' +
    intId +
    '&dealerId=' +
    dealerId;
  console.log(url);
  return axios.get(url, {
    params: {
      //   limit: 1000
    }
  });
};

export const createDealerWip = newWipNr => {
  const stuff = {
    wipNumber: 1802,
    createdBy: userName,
    createdDate: new Date(),
    userIntId: intIdString,
    tools: tools
  };
  const strung = JSON.stringify(stuff);

  //   const strung = queryString.stringify(stuff);
  //   const strung = stuff.toString();
  const strungArray = '[' + strung + ']';
  //   console.log(postUrl);
  //   console.log(stuff);
  console.log(strungArray);
  //   console.log(strungArray);
  //   return fetch(postUrl, {
  //     method: 'POST',
  //     headers: {
  //       //   Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: dummyData
  //   });

  //   return axios.post(postUrl, strungArray);

  return axios.post(postUrl, dummyData, {
    headers: {
      data: dummyData,
      Accept: '*/*',
      'Content-Type': 'application/json'
      //   //   'Content-Type': 'text/json'
      //   'Content-Type': 'text/plain'
      //   'Content-Type': 'text/json'
    }
  });
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
  //   return axios.post(postUrl, dummyData, {
  //     headers: {
  //       //   'Content-Type': 'text/plain'
  //       //   'Content-Type': 'text/json'
  //       // 'Content-Type': 'text / text; charset=UTF - 8'
  //       'Content-Type': 'application/json'
  //     }
  //   });
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
