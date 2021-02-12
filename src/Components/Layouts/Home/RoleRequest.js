import React from 'react'
import Navbar from '../../Navigation/Navbar'
import Sidebar from '../../Navigation/Sidebar'

const RoleRequest = () => {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="role-main">
                <div className="request-modal">
                <h1>Request Role</h1>
                    <select>
                        <option value="contributor">contributor</option>
                        <option value="admin">admin</option>
                    </select>
                    <button>Send Request</button>
                </div>
                <div className="note">
                <h4>Upgrading user role will enable you Access the cases reported on the platform,
                    However this comes after the admin has found that you eligible as a user to be granted Access
                </h4>
                </div>
            </div>
        </div>
    )
}

export default RoleRequest
