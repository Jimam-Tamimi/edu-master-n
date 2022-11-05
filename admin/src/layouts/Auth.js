import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views
import axios from 'axios'

import {useSelector} from 'react-redux'
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  const history =  useHistory()
  const auth = useSelector(state => state.auth)
  
  useEffect( async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/is-admin/`)
      if(res.status == 200){
        history.push('/admin/')
      }
    } catch(error){
      if(error.response.status != 200){
      }
    }
  }, [auth])
  
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "/static/img/register_bg_2.png",
            }}
          ></div>
          <Switch>
            <Route exact path="/admin/auth/login" component={Login} />
            {/* <Route path="/auth/register" exact component={Register} /> */}
            {/* <Redirect from="/auth" to="/auth/login" /> */}
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
