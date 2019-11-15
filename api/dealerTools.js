import axios from 'axios';

export const getProducts = () => {
  //   console.log('here');
  return axios.get('?controller=api&action=listAllTools&dealerId=sgroves', {
    params: {
      //   limit: 1000
    }
  });
};
