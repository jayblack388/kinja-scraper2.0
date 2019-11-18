import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import {
  Theme,
  useDarkMode,
  WindowDimensionsProvider,
  GlobalStyles
} from "jdb-components";
import { GlobalStateProvider } from "./store/GlobalState";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";

const App = props => {
  const { history } = props;
  const [_, setValue] = React.useState(false);
  const [darkMode, setDarkMode] = useDarkMode(setValue);
  console.log(darkMode)
  return (
    <WindowDimensionsProvider>
      <ThemeProvider theme={Theme({darkMode})}>
        <GlobalStyles />
        <GlobalStateProvider>
          <Router history={history}>
            <Routes darkMode={darkMode} setDarkMode={setDarkMode} />
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
    </WindowDimensionsProvider>
  );
};

export default App;
