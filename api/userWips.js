import axios from 'axios';

const eMailAddress = 'alan@helpfulconsultants.com';
const dealerId = 'sgroves';
const pin = '808255';
const intId = '850';

const getUrl =
  '/mandatoryList/?controller=api&action=getWIPsForUserIntId&intId=' +
  intId +
  '&dealerId=' +
  dealerId;
console.log(getUrl);

const postUrl = '/mandatoryList/?controller=api&action=acceptWIPpostJSON';
console.log(postUrl);

const deleteUrl =
  '/mandatoryList/?controller=api&action=appDeleteWIP&dealerId=' + dealerId;
console.log(deleteUrl);

export const getUserWips = () => {
  console.log('here in getUserWips');
  return axios.get(getUrl, {
    params: {
      //   limit: 1000
    }
  });
};

export const createUserWip = ({
  wipNumber,
  createdBy,
  createdDate,
  userIntId,
  tools
}) => {
  return axios.post(postUrl, {
    wipNumber,
    createdBy,
    createdDate,
    userIntId,
    tools
  });
};

// export const deleteUserWip = ({ userWipId, wipNumber, intId }) => {
//   return axios.delete(`/userWips/${(userWipId, wipNumber, intId)}`);
// };

export const deleteUserWip = wipData => {
  const sendData =
    'id=' +
    wipData.id +
    '&wipNumber=' +
    wipData.wipNumber +
    '&contact_id=' +
    wipData.intId +
    '';
  //   console.log(sendData);
  return axios.post(deleteUrl, sendData);
  //   return console.log('will axios a delete userWip');
};
