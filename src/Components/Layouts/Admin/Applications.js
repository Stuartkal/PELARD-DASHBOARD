import React from "react";
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import MyApplications from "../Applications/Applications";
import "./Styles.scss";

const Applications = () => {
  return (
    <div>
      <Navbar />
      <div className="user-main">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <MyApplications />
        </div>
      </div>
    </div>
  );
};

export default Applications;
