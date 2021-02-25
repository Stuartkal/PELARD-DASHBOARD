import React from "react";
import { useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";
import "./Styles.scss";

const Sidebar = (props) => {

  const user = useSelector((state) => state.user);


  const role = user.role
  const contributor = 'contributor'
  const admin = 'admin'


  const onclickCaseHandler = () => {
    props.history.push("./cases");
  };

  const onclickOverviewHandler = () => {
    props.history.push("./overview");
  };

  const onclickUserHandler = () => {
    props.history.push("./users");
  };


  const onclickRequestsHandler = () => {
    props.history.push("./applications");
  };

  let cases_link = (
    <div onClick={onclickCaseHandler} className="icon-hover">
      <div className="icon-column">
        <i className="material-icons">view_list</i>
        <h4>Cases</h4>
      </div>
    </div>
  )

  let users = (
    <div onClick={onclickUserHandler} className="icon-hover">
      <div className="icon-column">
        <i className="material-icons">groups</i>
        <h4>Users</h4>
      </div>
    </div>
  )

  let applications = (
    <div onClick={onclickRequestsHandler} className="icon-hover">
      <div className="icon-column">
        <i className="material-icons">feed</i>
        <h4>Applications</h4>
      </div>
    </div>
  )

  if (JSON.stringify(role) !== JSON.stringify(contributor) && JSON.stringify(role) !== JSON.stringify(admin)) {
    cases_link = null
  }

  if (JSON.stringify(role) !== JSON.stringify(admin)) {
    users = null
    applications = null
  }

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div onClick={onclickOverviewHandler} className="icon-hover">
          <div className="icon-column">
            <i className="material-icons">dashboard</i>
            <h4>Dashboard</h4>
          </div>
        </div>
        {cases_link}
        {users}
        {applications}
        <div className="icon-hover">
          <div className="icon-column">
            <i className="material-icons">report_problem</i>
            <a href="https://www.report.pelard-n.org/" target="_blank">Report Case</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);