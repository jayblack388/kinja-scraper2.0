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
      </Switch>
    </div>
  );
};

export default Routes;
