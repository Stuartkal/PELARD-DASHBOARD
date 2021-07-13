import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import MyApplications from "../Applications/Applications";
import { ActionCreators } from "../../../Store/ActionCreators"

import "./Styles.css";
const Applications = () => {

  const [open, setopen] = useState(false)

  const application = useSelector(state => state.application)
  const user = useSelector(state => state.user)
  console.log(application)
  const dispatch = useDispatch()

  const handleUpdateRole = () => {
    dispatch(ActionCreators.updatingUserRole(user._id, application.userId, application._id, (res) => {
      console.log(res)
    }))
  }


  const date = moment(application.applicationDateAndTime, "YYYYMMDD").fromNow();

  return (
    <div>
      <Navbar />
      <div className="user-main">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column" >
          <h1>Applications</h1>
          <MyApplications open={() => setopen(true)} />
          {open ? <div className="applicant-card">
            <div className="application-header">
              <i onClick={() => setopen(false)} className="material-icons">close</i>
            </div>
            <div className="applicant-main-row">
              <div className="applicant-row">
                <h5>Role: </h5>
                <h3>{application.role}</h3>
              </div>
              <div className="applicant-row">
                <h5>Status: </h5>
                <h3>{application.status}</h3>
              </div>
              <div className="applicant-row">
                <h5>Sent: </h5>
                <h3>{date}</h3>
              </div>
              <button onClick={() => alert('In Development, Please Wait!')}>Update Role</button>
            </div>
          </div> : null}
        </div>
      </div>
    </div>
  );
};

export default Applications;
