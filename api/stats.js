import axios from 'axios';

export const getStats = ({ dealerId }) => {
  //   console.log('in getStats api', dealerId && dealerId);
  const url = '?controller=api&action=getMyKeyStats&dealerNumber=' + dealerId;
  //   console.log(url);
  return axios.get(url, {
    params: {
      //   limit: 1000
    }
  });
};
