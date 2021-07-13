import React from 'react'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'

import './Styles.css'
const UserDetail = () => {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="user-detail-main">
                <div className="left-column">
                    <Sidebar/>
                </div>
                <div className="right-column">
                    <h1>User Details</h1>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
