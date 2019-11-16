import axios from 'axios';

// const eMailAddress = 'alan&#064;helpfulconsultants.com';
const eMailAddress = 'alan@helpfulconsultants.com';
const pin = '808255';

const url =
  '?controller=api&action=checkUserId&eMail=' + eMailAddress + '&pin=' + pin;

export const getUser = () => {
  console.log('here in get user api');
  console.log(url);
  return axios.get(url, {
    params: {
      //   limit: 1000
    }
  });
};
