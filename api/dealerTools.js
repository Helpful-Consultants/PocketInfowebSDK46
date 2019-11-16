import axios from 'axios';

const eMailAddress = 'alan@helpfulconsultants.com';
const dealerId = 'sgroves';
const pin = '808255';

const url =
  '/mandatoryList/?controller=api&action=listAllTools&dealerId=' + dealerId;
console.log(url);

export const getDealerTools = () => {
  console.log('here in getDealerTools');
  return axios.get(url, {
    params: {
      //   limit: 1000
    }
  });
};
