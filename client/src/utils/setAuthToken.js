import streams from '../apis/streams';

const setAuthToken = token => {
  if(token) {
    //Apply to every request
    streams.defaults.headers.common['Authorization'] = token;
  } else {
    //Delete auth header
    delete streams.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
