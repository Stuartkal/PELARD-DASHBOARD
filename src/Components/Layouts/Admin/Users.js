import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import { ActionCreators } from '../../../Store/ActionCreators'
import NewUsers from '../NewUsers/NewUsers'

import './Styles.scss'
const Users = () => {


    return (
        <div>
            <Navbar />
            <div className="user-main">
                <div className="left-column">
                    <Sidebar />
                </div>
                <div className="right-column">

                    {/* <NewUsers /> */}
                </div>
            </div>
        </div>
    )
}

export default Users
