import React, { useState } from "react";
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import NewUsers from "../NewUsers/NewUsers";

import "./Styles.scss";
const Users = () => {

    return (
        <div>
            <Navbar />
            <div className="user-main">
                <div className="left-column">
                    <Sidebar />
                </div>
                <div className="right-column">
                    <h1>Users</h1>
                    <NewUsers />
                </div>

            </div>
        </div>
    );
};

export default Users;
