import axios from 'axios';
import { Auth } from 'aws-amplify';

export const getAuthToken = async () => {
  const response = await Auth.currentSession()
    .then(data => {
      const token = (data.accessToken && data.accessToken.jwtToken) || '';
      return token;
    })
    .catch(err => console.log(err));
  return response;
};
// Gets cognito config
export const getConfig = () => {
  return axios.get('/auth/config');
};
// Register User
export const registerUser = body => {
  return axios.post('/auth/register', body);
};
// Login User
export const loginUser = body => {
  return axios.post('/auth/login', body);
};

export const getUserData = async email => {
  const accesstoken = await getAuthToken();
  return axios({
    url: `/api/data/${email}`,
    headers: {
      'Content-Type': 'application/json',
      accesstoken
    },
    method: 'get'
  });
};
