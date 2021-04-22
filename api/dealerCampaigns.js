import axios from 'axios';
import queryString from 'query-string';

const dummyEmailAddress = 'alan@helpfulconsultants.com';
const dummyDealerId = 'sgroves';
const dummyPin = '808255';
const dummyIntId = 850;
const dummyIntIdString = '850';
const dummyUserName = 'Alan Upstone';

export const getDealerCampaigns = (wipObj) => {
  //   console.log('here in getDealerCampaigns API ');
  //   console.log('here in getDealerCampaigns API ', wipObj);
  const { dealerId } = wipObj;
  const url =
    '/default.asp?controller=api&action=listActiveRetailerCampaignsAsJSON&dealerId=' +
    dealerId;
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
