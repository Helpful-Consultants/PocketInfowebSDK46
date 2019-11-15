import axios from 'axios';

export const getUserWips = () => {
  //   console.log('here');
  return axios.get(
    '?controller=api&action=getWIPsForUerIntId&intId=thisUserId&dealerId=thisUserId',
    {
      params: {
        //   limit: 1000
      }
    }
  );
};
