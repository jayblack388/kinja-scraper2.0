import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { INITIALIZE } from './auth';
import { ToastContainer } from '../../components/common';
export const INITIALIZE_USER = 'INITIALIZE_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const userInitialState = {
  confirmed: false,
  isLoading: false,
  err: null,
  user: {
    tokens: {
      accessToken: null,

      idToken: null,

      refreshToken: null,
    },
    details: {
      email: null,
    },
  },
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_USER:
    case LOGOUT_SUCCESS:
      return userInitialState;
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.err,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        confirmed: action.confirmed,
        user: {
          ...state.user,
          details: action.details,
        },
      };
    default:
      return state;
  }
};

export const signUpRequest = () => ({
  type: SIGNUP_REQUEST,
});
export const signUpSuccess = ({ details, confirmed }) => ({
  type: SIGNUP_SUCCESS,
  details,
  confirmed: confirmed,
});
export const signUpFailure = err => ({
  type: SIGNUP_FAILURE,
  err,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});
export const loginFailure = err => ({
  type: LOGIN_FAILURE,
  err,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});
export const logoutSuccess = user => ({
  type: LOGOUT_SUCCESS,
  user,
});
export const logoutFailure = err => ({
  type: LOGOUT_FAILURE,
  err,
});

export const signUp = (dispatch, data) => {
  const url = `/auth/register`;
  dispatch(signUpRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
  })
    .then(resp => {
      const { data } = resp;
      dispatch(signUpSuccess(data));
    })
    .catch(err => {
      dispatch(signUpFailure(err));
      toast(<ToastContainer error message={err.response.data.message} />);
    });
};

export const login = (dispatch, data) => {
  const url = `/auth/login`;
  dispatch(loginRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
  })
    .then(resp => {
      const { data } = resp;
      const { details, tokens } = data;
      const { email } = details;
      const { accessToken, refreshToken, idToken } = tokens;
      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('idToken', idToken);
      dispatch(loginSuccess(data));
    })
    .catch(err => {
      dispatch(loginFailure(err.response.data.message));
      toast(<ToastContainer error message={err.response.data.message} />);
    });
};

export const refreshLogin = (dispatch, data) => {
  const url = `/auth/renew`;
  dispatch(loginRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
  })
    .then(resp => {
      const { data } = resp;
      dispatch(loginSuccess(data));
    })
    .catch(e => {
      dispatch(loginFailure(e));
    });
};

export const logout = (dispatch, data) => {
  const url = `/auth/logout`;
  dispatch(logoutRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
  })
    .then(() => {
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('idToken');
      dispatch(logoutSuccess());
    })
    .catch(e => {
      dispatch(logoutFailure(e));
    });
};

export default userReducer;
