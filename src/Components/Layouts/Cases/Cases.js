import React from "react";
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import NewCases from "../NewCases/NewCases";
import "./Styles.scss";

const Cases = (props) => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="case-main">
        <NewCases />
      </div>
    </div>
  );
};

export default Cases;
