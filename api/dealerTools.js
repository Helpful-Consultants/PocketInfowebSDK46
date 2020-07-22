import axios from 'axios';

const eMailAddress = 'alan@helpfulconsultants.com';
const dummyDealerId = 'sgroves';
const pin = '808255';

const dummyUrl =
  '/mandatoryList/?controller=api&action=listAllTools&dealerId=' +
  dummyDealerId;
// console.log(dummyUrl);

export const getDealerTools = ({ dealerId }) => {
  //   console.log('here in getDealerTools dealerId is ', dealerId);
  const url =
    '/mandatoryList/?controller=api&action=listAllTools&dealerId=' + dealerId;
  //   console.log(url);
  return axios.get(url, {
    params: {
      //   limit: 1000
    },
  });
};
