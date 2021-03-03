import React from 'react'
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";

import "./Styles.scss";
const Applicant = (props) => {

    const applicant = props.location.state.res
    console.log(applicant, 'll')
    return (
        <div>
            <Navbar />
            <div className="user-main">
                <div className="left-column">
                    <Sidebar />
                </div>
                <div className="right-column">
                    <h1>Applicant</h1>

                </div>
            </div>
        </div>
    )
}

export default Applicant
