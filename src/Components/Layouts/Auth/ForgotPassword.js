import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../../../Store/ActionCreators"

import "./Styles.scss";
const ForgotPassword = (props) => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const sendPasswordRequestHandler = () => {
        dispatch(ActionCreators.passwordResetting(email))
    }


    const loginNavigation = () => {
        props.history.push('/')
    }

    return (
        <div className="auth-main">
            <div className="auth-container">
                <h2>PELARD-N</h2>
                <h4>Enter Email To Reset Password</h4>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter Email"
                />
                <button onClick={sendPasswordRequestHandler}>Send</button>
                <a onClick={loginNavigation}>Go Back</a>
            </div>
        </div>
    )
}

export default ForgotPassword
