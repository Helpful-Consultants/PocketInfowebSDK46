import axios from 'axios';

export const getNews = () => {
  //   console.log('getNews api');
  return axios.get('?controller=api&action=listLatestNews', {
    params: {
      //   limit: 1000
    }
  });
};
