import axios from 'axios';

const eMailAddress = 'alan@helpfulconsultants.com';
const dealerId = 'sgroves';
const pin = '808255';
const intId = '850';

const url =
  '/mandatoryList/?controller=api&action=getWIPsForUserIntId&intId=' +
  intId +
  '&dealerId=' +
  dealerId;
console.log(url);

export const getUserWips = () => {
  console.log('here in getUserWips');
  return axios.get(url, {
    params: {
      //   limit: 1000
    }
  });
};
