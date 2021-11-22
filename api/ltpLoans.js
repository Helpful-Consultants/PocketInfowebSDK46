import axios from 'axios';
import queryString from 'query-string';

const dummyEmailAddress = 'alan@helpfulconsultants.com';
const dummyDealerId = 'sgroves';
const dummyPin = '808255';
const dummyIntId = '513';
const dummyIntIdString = '513';
const dummyUserName = 'Alan Upstone';

export const getLtpLoans = (fetchParamsObj) => {
  //   console.log('here in getLtpLoans API ');
  //   console.log('here in getLtpLoans API ', fetchParamsObj);
  const { userIntId } = fetchParamsObj;
  const url = `/default.asp?controller=api&action=listActiveLTPBookings&intUserId=${userIntId}`;
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
