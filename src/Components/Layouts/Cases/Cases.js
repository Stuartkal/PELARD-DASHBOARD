import React from "react";
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import NewCases from "../NewCases/NewCases";
import "./Styles.scss";

const Cases = (props) => {
  return (
    <div>
      <Navbar />
      <div className="case-main">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <NewCases />
        </div>
      </div>
    </div>
  );
};

export default Cases;
