import axios from 'axios';

// const eMailAddress = 'alan&#064;helpfulconsultants.com';
const eMailAddress = 'alan@helpfulconsultants.com';
const pin = '808255';

const dummyUrl =
  '?controller=api&action=checkUserId&eMail=' + eMailAddress + '&pin=' + pin;

export const getUser = ({ email, pin }) => {
  //   console.log('in user api - getUser called', email, pin);
  const url =
    '?controller=api&action=checkUserId&eMail=' +
    email.toLowerCase() +
    '&pin=' +
    pin;
  //   console.log(url);

  return axios.get(url, {
    params: {
      //   limit: 1000
    },
  });
};
