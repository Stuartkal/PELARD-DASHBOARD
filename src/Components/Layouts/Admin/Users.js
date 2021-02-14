import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import {ActionCreators} from '../../../Store/ActionCreators'

import './Styles.scss'
const Users = () => {

    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    console.log(users)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(ActionCreators.gettingUsers(user._id))
    },[dispatch])

    return (
        <div>
            <Navbar/>
            <div className="user-main">
                <div className="left-column">
                    <Sidebar/>
                </div>
                <div className="right-column">
                    <h1>User</h1>
                </div>
            </div>
        </div>
    )
}

export default Users
