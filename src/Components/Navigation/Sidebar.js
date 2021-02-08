import React from "react";
import { withRouter } from "react-router-dom";
import "./Styles.scss";

const Sidebar = (props) => {
  const onclickCaseHandler = () => {
    props.history.push("./cases");
  };

  const onclickOverviewHandler = () => {
    props.history.push("./overview");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div onClick={onclickOverviewHandler} className="icon-hover">
          <div className="icon-column">
            <i className="material-icons">dashboard</i>
            <h4>Dashboard</h4>
          </div>
        </div>
        <div onClick={onclickCaseHandler} className="icon-hover">
          <div className="icon-column">
            <i className="material-icons">view_list</i>
            <h4>Cases</h4>
          </div>
        </div>
        <div className="icon-hover">
          <div className="icon-column">
            <i className="material-icons">report_problem</i>
            <h4>Dashboard</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
