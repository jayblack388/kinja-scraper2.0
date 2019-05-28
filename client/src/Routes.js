import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './components/common';
import { HomePage } from './components/pages';

const Routes = props => {
  return (
    <div id="App">
      <Switch>
        <Route
          path="*"
          render={() => (
            <>
              <Header />
              <HomePage {...props} />
            </>
          )}
        />
        {/* <Redirect to="/login" /> not sure why this isn't working */}
      </Switch>
    </div>
  );
};

export default Routes;
