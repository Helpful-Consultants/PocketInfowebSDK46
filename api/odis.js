import axios from 'axios';

export const getOdis = () => {
  //   console.log('here');
  const url = '?controller=api&action=listSoftwareVersionsAsJSON&appName=ODIS';
  //   console.log('in get Odis, url', url);
  return axios.get(url, {
    params: {
      //   limit: 1000
    }
  });
};
