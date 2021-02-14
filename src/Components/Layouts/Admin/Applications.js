import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import { ActionCreators } from '../../../Store/ActionCreators'

import './Styles.scss'
const Applications = () => {

    const user = useSelector(state => state.user)
    const applications = useSelector(state => state.applications)
    console.log(applications)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ActionCreators.gettingApplications(user._id))
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="request-main">
                <div className="left-column">
                    <Sidebar />
                </div>
                <div className="right-column">
                    <h1>Applications</h1>
                </div>
            </div>
        </div>
    )
}

export default Applications
