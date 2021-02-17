import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { ActionCreators } from '../../Store/ActionCreators'

import './Styles.scss'
const Navbar = (props) => {

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(ActionCreators.removeUser())
        storage.removeItem('persist:root')
        props.history.push('/')
    }

    const role = user.role
    const contributor = 'contributor'
    const admin = 'admin'
    const UpgradeHandler = () => {
        props.history.push("./role");
    };

    let upgrade_button;

    if (JSON.stringify(role) !== JSON.stringify(contributor) && JSON.stringify(role) !== JSON.stringify(admin)) {
        upgrade_button = <button onClick={UpgradeHandler}>Upgrade Role</button>
    }

    return (
        <div className="nav-bar">
            <div className="nav-container">
                <h3>PELARD-N</h3>
                <div className="profile">
                    <h3> Your Welcome</h3>
                    <h3>{user.userName}</h3>
                    {upgrade_button}
                    <div className="logout">
                        <h4 onClick={logoutHandler}>Logout</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
