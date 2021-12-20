import React from "react";
import { useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";
import "./Styles.css";

const Sidebar = (props) => {

  const user = useSelector((state) => state.user);
  const [dashbgColor, setDashBgColor] = React.useState(false)
  const [casebgColor, setCaseBgColor] = React.useState(false)
  const [appbgColor, setAppBgColor] = React.useState(false)
  const [insightbgColor, setInsightBgColor] = React.useState(false)
  const [explorebgColor, setExploreBgColor] = React.useState(false)
  const [userbgColor, setUserBgColor] = React.useState(false)

  const role = user.role
  const contributor = 'contributor'
  const admin = 'admin'


  const onclickCaseHandler = () => {
    props.history.push("./cases");
    setCaseBgColor(true)
  };

  const onclickOverviewHandler = () => {
    props.history.push("./overview");
    setDashBgColor(true)
  };

  const onclickUserHandler = () => {
    props.history.push("./users");
    setUserBgColor(true)
  };


  const onclickRequestsHandler = () => {
    props.history.push("./applications");
    setAppBgColor(true)
  };

  const onclickActivitiesHandler = () => {
    props.history.push("./activities");
    setInsightBgColor(true)
  };

  const onclickSearchsHandler = () => {
    props.history.push("./search");
    setExploreBgColor(true)
  };

  let cases_link = (
    <div onClick={onclickCaseHandler} className={casebgColor ? "icon-bg" : "icon-hover"}>
      <div className="icon-column">
        <i className="material-icons">view_list</i>
        <h4>Case Reports</h4>
      </div>
    </div>
  )

  let users = (
    <div onClick={onclickUserHandler} className={userbgColor ? "icon-bg" : "icon-hover"}>
      <div className="icon-column">
        <i className="material-icons">groups</i>
        <h4>Users</h4>
      </div>
    </div>
  )

  let applications = (
    <div onClick={onclickRequestsHandler} className={appbgColor ? "icon-bg" : "icon-hover"}>
      <div className="icon-column">
        <i className="material-icons">feed</i>
        <h4>Applications</h4>
      </div>
    </div>
  )

  let violations = (
    <div onClick={onclickActivitiesHandler} className={insightbgColor ? "icon-bg" : "icon-hover"}>
      <div className="icon-column">
        <i className="material-icons">highlight</i>
        <h4>Insights </h4>
      </div>
    </div>
  )

  let search = (
    <div onClick={onclickSearchsHandler} className={explorebgColor ? "icon-bg" : "icon-hover"}>
      <div className="icon-column">
        <i className="material-icons">search</i>
        <h4>Case Reports </h4>
      </div>
    </div>
  )

  if (JSON.stringify(role) !== JSON.stringify(contributor) && JSON.stringify(role) !== JSON.stringify(admin)) {
    cases_link = null
    violations = null
  }

  if (JSON.stringify(role) !== JSON.stringify(admin)) {
    users = null
    applications = null
  }

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div onClick={onclickOverviewHandler} className={dashbgColor ? "icon-bg" : "icon-hover"}>
          <div className="icon-column">
            <i className="material-icons">dashboard</i>
            <h4>Dashboard</h4>
          </div>
        </div>
        {/* {cases_link} */}
        {users}
        {applications}
        {violations}
        {search}
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