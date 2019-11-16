import axios from 'axios';

export const getStats = () => {
  //   console.log('here');
  return axios.get(
    '?controller=api&action=getMyKeyStats&dealerNumber=sgroves',
    {
      params: {
        //   limit: 1000
      }
    }
  );
};
