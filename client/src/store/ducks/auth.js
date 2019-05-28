import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './user';

export const INITIALIZE = 'INITIALIZE';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const authInitialState = {
  isAuthenticated: false,
  authState: 'signIn',
};

const authReducer = (state = authInitialState, action) => {
  const isAuthenticated = action && action.state && action.state === 'signedIn';
  switch (action.type) {
    case INITIALIZE:
    case LOGOUT_SUCCESS:
      return authInitialState;
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated,
        authState: action.state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authState: 'signedIn',
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated,
        authState: '',
      };
    default:
      return state;
  }
};

export const authSuccess = state => ({ type: AUTH_SUCCESS, state });

export default authReducer;
