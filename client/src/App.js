import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { GlobalStateProvider } from './store/GlobalState';
import Routes from './Routes';
import Authenticator from './components/auth/Authenticator';
import theme from './utils/styles/theme';
import 'react-toastify/dist/ReactToastify.css';

const App = props => {
  const { history } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <Router history={history}>
          <Authenticator>
            <Routes />
          </Authenticator>
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          draggable
          pauseOnHover
        />
      </GlobalStateProvider>
    </ThemeProvider>
  );
};

export default App;
