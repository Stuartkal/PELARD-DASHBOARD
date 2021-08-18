import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { ActionCreators } from '../../Store/ActionCreators'

import './Styles.css'
const Navbar = (props) => {

    const [toggleHumbuger, setToggleHumbuger] = useState(false)

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

    const onclickCaseHandler = () => {
        props.history.push("./cases");
    };

    const onclickOverviewHandler = () => {
        props.history.push("./overview");
    };

    const onclickUserHandler = () => {
        props.history.push("./users");
    };


    const onclickRequestsHandler = () => {
        props.history.push("./applications");
    };

    const onclickActivitiesHandler = () => {
        props.history.push("./activities");
    };

    const UpgradeHandler = () => {
        props.history.push("./role");
    };

    let cases_link = (
        <h5 onClick={onclickCaseHandler}>Cases</h5>
    )

    let users = (
        <h5 onClick={onclickUserHandler}>Users</h5>
    )

    let applications = (
        <h5 onClick={onclickRequestsHandler}>Applications</h5>
    )

    let violations = (
        <h5 onClick={onclickActivitiesHandler}>Insights</h5>
    )

    if (JSON.stringify(role) !== JSON.stringify(contributor) && JSON.stringify(role) !== JSON.stringify(admin)) {
        cases_link = null
        violations = null
    }

    if (JSON.stringify(role) !== JSON.stringify(admin)) {
        users = null
        applications = null
    }

    let upgrade_button;

    if (JSON.stringify(role) !== JSON.stringify(contributor) && JSON.stringify(role) !== JSON.stringify(admin)) {
        upgrade_button = <button onClick={UpgradeHandler}>Upgrade Role</button>
    }

    return (
        <div className="nav-bar" >
            <div className="nav-container">
                <h3>PELARD-N</h3>
                <div className="profile">
                    <h3> You are Welcome</h3>
                    <h3>{user.userName}</h3>
                    {upgrade_button}
                    <div className="logout">
                        <h4 onClick={logoutHandler}>Logout</h4>
                    </div>
                    <div onClick={props.open} className="hambuger">
                        <i onClick={() => setToggleHumbuger(true)} class="material-icons">dehaze</i>
                    </div>
                </div>
                {toggleHumbuger ?
                    <div className="hambuger-toggle" onClick={() => setToggleHumbuger(false)}>
                        <h5 onClick={onclickOverviewHandler}>Dashboard</h5>
                        <div className="separator" />
                        {cases_link}
                        <div className="separator" />
                        {users}
                        <div className="separator" />
                        {applications}
                        <div className="separator" />
                        {violations}
                        <div className="separator" />
                        <h5>
                            <a href="https://www.report.pelard-n.org/" target="_blank">Report Case</a>
                        </h5>
                        <div className="separator" />
                        <h6 onClick={logoutHandler}>Logout</h6>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default withRouter(Navbar)
