import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import store from "redux/store";
import App from "App";
import { ToastProvider } from "react-toast-notifications";
import { MantineProvider } from '@mantine/core';

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-center"
    >

      <BrowserRouter>
        <Switch>
        <MantineProvider withGlobalStyles withNormalizeCSS>

          <App />
        </MantineProvider>
        </Switch>
      </BrowserRouter>
    </ToastProvider>

  </Provider>

  ,
  document.getElementById("root")
);
