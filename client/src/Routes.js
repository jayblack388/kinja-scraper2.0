import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Loader } from './components/common';
import { HomePage, Auth } from './components/pages';
import { useGlobalState } from './store/GlobalState';

const Routes = props => {
  const { onLogout } = props;
  const [{ auth, user }] = useGlobalState();
  const { isAuthenticated, authState } = auth;
  return (
    <div id="App">
      <Loader
        isLoading={authState === 'loading' || (user && user.isLoading)}
        message="Loading authentication..."
      >
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Auth type="login" {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Auth type="signup" {...props} />}
          />
          <Route
            path="*"
            render={() =>
              isAuthenticated ? (
                <>
                  <Header onLogout={onLogout} />
                  <HomePage {...props} />
                </>
              ) : (
                <Auth {...props} />
              )
            }
          />
          {/* <Redirect to="/login" /> not sure why this isn't working */}
        </Switch>
      </Loader>
    </div>
  );
};

export default Routes;
