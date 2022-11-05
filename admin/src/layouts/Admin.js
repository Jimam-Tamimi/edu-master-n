import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Tutors from "views/Tutors";
import TutorRequests from "views/TutorRequests";
import Messages from "views/Messages";
import Lessons from "views/Lessons";
import axios from 'axios'

import {useSelector} from 'react-redux'
import TutorProfile from "views/TutorProfile";
import Subjects from "views/Subjects";
import Curriculums from "views/Curriculums";


export default function Admin() {

  const history =  useHistory()
  const auth = useSelector(state => state.auth)
  
  useEffect( async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/admin/is-admin/`)
      if(res.status == 200){
      }
    } catch(error){
      if(error.response.status != 200){
        history.push('/admin/auth/login')
      }
    }
  }, [auth])
 
  
  
  return (
    auth.isAuthenticated?
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {
          window.innerWidth > 767 ? 
        <AdminNavbar /> : ''
        }
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/tutors" exact component={Tutors} />
            <Route path="/admin/tutor-requests/" exact component={TutorRequests} />
            <Route path="/admin/tutors/:id/" component={TutorProfile} />
            <Route path="/admin/messages/" exact component={Messages} />
            <Route path="/admin/subjects/" exact component={Subjects} />
            <Route path="/admin/curriculums/" exact component={Curriculums} />
            <Route path="/admin/lessons/" exact component={Lessons} />
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>:''
  );
}
