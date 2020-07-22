import axios from 'axios';

export const getLtp = () => {
  //   console.log('here in ltp api');
  return axios.get('?controller=api&action=listLtpItems', {
    params: {
      //   limit: 1000
    },
  });
};
