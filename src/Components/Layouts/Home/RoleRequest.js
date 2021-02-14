import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'
import {ActionCreators} from "../../../Store/ActionCreators"

import './Styles.scss'
const RoleRequest = () => {

    const [role, setRole] = useState('')

    const user = useSelector((state) => state.user);
    const success = useSelector((state) => state.success);

    const dispatch = useDispatch()

    const updaterolehandler = (e) => {
        e.preventDefault()

        dispatch(ActionCreators.updatingRole(user._id, role))
    }
    
    return (
        <div>
            <Navbar/>
            <div className="role-main">
                <div className="left-column">
                    <Sidebar/>
                </div>
                <div className="right-column">
                    <div className="request-modal">
                    <h1>Request Role</h1>
                        <select value={role} onChange={(e)=> setRole(e.target.value)}>
                            <option value=" ">select role</option>
                            <option value="contributor">contributor</option>
                            <option value="admin">admin</option>
                        </select>
                        <button onClick={updaterolehandler}>Apply</button>
                    </div>
                    <div className="note">
                        <h5>{success}, Please wait for confirmation from admin!</h5>
                    <h4>Upgrading user role will enable you Access the cases reported on the platform,
                        However this comes after the admin has found that you eligible as a user to be granted Access
                    </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleRequest
