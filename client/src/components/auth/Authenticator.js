import React, { useEffect } from 'react';
import Amplify from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

import { useGlobalState } from '../../store/GlobalState';
import { useLocalStorage } from '../../utils/customHooks';
import { configureAuth } from '../../store/ducks/config';
import { authSuccess } from '../../store/ducks/auth';
import { login, logout, refreshLogin, signUp } from '../../store/ducks/user';
import { Loader } from '../common';

const CustomAuthenticator = props => {
  const { children } = props;

  const [store, dispatch] = useGlobalState();
  const {
    config,
    user: { user },
  } = store;
  const {
    details: { email },
    tokens: { refreshToken },
  } = user;
  const [lclEmail] = useLocalStorage('email', email);
  const [lclRefTok] = useLocalStorage('refreshToken', refreshToken);
  const {
    isLoading: configIsLoading,
    config: { userPoolId, userPoolWebClientId },
  } = config;
  // const getErrorMessage = err => (typeof err === 'string' ? err : err.message);

  const setIsAuthenticated = state => {
    return dispatch(authSuccess(state));
  };

  const onLogin = body => {
    login(dispatch, body);
  };

  const onSignUp = body => {
    signUp(dispatch, body);
  };

  const onLogout = () => {
    logout(dispatch, { email });
  };

  useEffect(() => {
    if (!email && lclEmail) {
      refreshLogin(dispatch, { email: lclEmail, refreshToken: lclRefTok });
    }
  }, [lclEmail, lclRefTok]);

  useEffect(() => {
    if (config && !(userPoolId && userPoolWebClientId)) {
      configureAuth(dispatch);
    }
  }, []);
  !configIsLoading &&
    Amplify.configure({
      Auth: {
        region: 'us-east-1',
        userPoolId,
        userPoolWebClientId,
        mandatorySignIn: false,
        authenticationFlowType: 'USER_SRP_AUTH',
      },
    });
  return (
    <Loader isLoading={configIsLoading}>
      <Authenticator
        onStateChange={state => {
          console.log('authState change ::: ', state);
          if (state === 'signedIn') {
            setIsAuthenticated(state);
          }
        }}
        hideDefault
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            onLogin,
            onSignUp,
            onLogout,
          });
        })}
      </Authenticator>
    </Loader>
  );
};

export default CustomAuthenticator;
