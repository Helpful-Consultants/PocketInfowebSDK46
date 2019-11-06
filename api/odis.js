import axios from 'axios';

export const getOdis = () => {
  //   console.log('here');
  return axios.get(
    '?controller=api&action=listSoftwareVersionsAsJSON&appName=ODIS',
    {
      params: {
        //   limit: 1000
      }
    }
  );
};
