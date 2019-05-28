import axios from 'axios';
import { INITIALIZE } from './auth';
export const INITIALIZE_CONFIG = 'INITIALIZE_CONFIG';
export const CONFIG_REQUEST = 'CONFIG_REQUEST';
export const CONFIG_SUCCESS = 'CONFIG_SUCCESS';
export const CONFIG_FAILURE = 'CONFIG_FAILURE';

export const configInitialState = {
  isLoading: false,
  err: null,
  config: {
    userPoolId: null,
    userPoolWebClientId: null,
  },
};

const configReducer = (state = configInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_CONFIG:
      return configInitialState;
    case CONFIG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CONFIG_SUCCESS:
      return {
        ...state,
        config: action.config,
        isLoading: false,
      };
    case CONFIG_FAILURE:
      return {
        ...state,
        err: action.err,
        isLoading: false,
      };
    default:
      return state;
  }
};

const configRequest = () => ({
  type: CONFIG_REQUEST,
});

const configSuccess = config => ({
  type: CONFIG_SUCCESS,
  config,
});

const configFailure = err => ({
  type: CONFIG_FAILURE,
  err,
});

export const initConfig = () => ({
  type: INITIALIZE_CONFIG,
});

export const configureAuth = dispatch => {
  const url = `/auth/config`;
  dispatch(configRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
  })
    .then(({ data }) => {
      dispatch(configSuccess(data));
    })
    .catch(e => {
      dispatch(configFailure(e));
    });
};

export default configReducer;
