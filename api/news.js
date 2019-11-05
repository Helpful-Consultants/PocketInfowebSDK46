import axios from 'axios';

export const getNews = () => {
  console.log('here');
  return axios.get('?controller=api&action=listLatestNews', {
    params: {
      //   limit: 1000
    }
  });
};
