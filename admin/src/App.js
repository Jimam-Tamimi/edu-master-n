import React, { useEffect } from 'react'

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import store from "redux/store";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios'
import { refreshToken } from 'redux/auth/actions';
import {useDispatch} from 'react-redux'
import { ToastProvider } from 'react-toast-notifications';

export default function App() {
  const dispatch = useDispatch()
  
  axios.interceptors.request.use(
    function (config) {
      if (JSON.parse(localStorage.getItem("auth"))?.isAuthenticated) {
        config.headers.authorization = `JWT ${
          JSON.parse(localStorage.getItem("auth"))?.access
        }`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error.response);
        if (error?.response?.status === 401) {
          dispatch(refreshToken());
        }
        return Promise.reject(error);
      }
    );
  }, []);
  
  return (
    <>

        {/* add routes with layouts */}
      <Route path="/admin"  component={Admin} />
      <Route path="/admin/auth/login"  component={Auth} />
      {/* add routes without layouts */}
      {/* <Route path="/landing" exact component={Landing} /> */}
      {/* <Route path="/profile" exact component={Profile} /> */}
      {/* <Route path="/" exact component={Index} /> */}
      {/* add redirect for first page */}
      {/* <Redirect from="*" to="/" /> */}
    </>
  )
}
