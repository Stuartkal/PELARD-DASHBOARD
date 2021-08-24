import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Navbar from "../../Navigation/Navbar";
import Sidebar from "../../Navigation/Sidebar";
import { ActionCreators } from "../../../Store/ActionCreators"

import "./Styles.css";
const EditUser = (props) => {

    const user = props.location.state

    const userID = useSelector(state => state.user)

    const dispatch = useDispatch()

    const date = moment(user.registeredDateAndTime, "YYYYMMDD").fromNow()
    console.log(user)

    const [state, setState] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        userName: user.userName || '',
        userRole: user.role || '',
        message: ''
    })


    const updateUserHandler = (e) => {
        e.preventDefault();
        dispatch(ActionCreators.updatingUser(
            userID._id,
            user._id,
            state.firstName,
            state.lastName,
            state.phoneNumber,
            state.email,
            state.userName,
            state.userRole,
            (res) => {
                if (res.success === true) {
                    setState({
                        message: 'Successfuly Updated'
                    })
                    setTimeout(() => {
                        props.history.push('/users')
                    }, 3000)
                }
            }
        ))
    }

    const deleteUserHandler = (e) => {
        e.preventDefault();
        dispatch(ActionCreators.deletingUser(userID._id, user._id, (res) => {
            if (res.success === true) {
                setState({
                    message: 'Successfuly Deleted'
                })
                setTimeout(() => {
                    props.history.push('/users')
                }, 3000)
            }
        }))
    }

    const goBackRedirect = () => {
        props.history.push('/users')
    }

    return (
        <div>
            <Navbar />
            <div className="user-main">
                <div className="left-column">
                    <Sidebar />
                </div>
                <div className="right-column">
                    <div className="edit-card">
                        <div className="application-header">
                            <i onClick={goBackRedirect} className="material-icons">close</i>
                        </div>
                        <h1>Edit User</h1>
                        <div className="edit-main-row">
                            <input
                                placeholder="First Name"
                                value={state.firstName}
                                onChange={(e) =>
                                    setState({ ...state, firstName: e.target.value })
                                }
                            />
                            <input
                                placeholder="Last Name"
                                value={state.lastName}
                                onChange={(e) =>
                                    setState({ ...state, lastName: e.target.value })
                                }
                            />
                        </div>
                        <div className="edit-main-row">
                            <input
                                placeholder="Username"
                                value={state.userName}
                                onChange={(e) =>
                                    setState({ ...state, userName: e.target.value })
                                }
                            />
                            <input
                                placeholder="Email"
                                value={state.email}
                                onChange={(e) =>
                                    setState({ ...state, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="edit-main-row">
                            <input
                                placeholder="Phone Number"
                                value={state.phoneNumber}
                                onChange={(e) =>
                                    setState({ ...state, phoneNumber: e.target.value })
                                }
                            />
                            <input
                                placeholder="User Role"
                                value={state.userRole}
                                onChange={(e) =>
                                    setState({ ...state, userRole: e.target.value })
                                }
                            />
                        </div>
                        <div className="edit-row">
                            <div className="edit-text-row">
                                <h4>UserRole: </h4>
                                <h3>{user.role}</h3>
                            </div>
                            <div className="edit-text-row">
                                <h4>Registered: </h4>
                                <h3>{date}</h3>
                            </div>
                        </div>
                        <h5>{state.message}</h5>
                        <div className="edit-button-row">
                            <button onClick={updateUserHandler}>Update</button>
                            <button onClick={deleteUserHandler}>Delete</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditUser
