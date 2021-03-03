import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { ActionCreators } from "../../../Store/ActionCreators";
import "./Styles.scss";

const mapState = ({ loggedIn, loading }) => ({ loggedIn, loading });
const mapDispatch = (dispatch) => ({
  logIn: (userName, password, callback) =>
    dispatch(ActionCreators.logIn({ userName, password, callback })),
});

const connector = connect(mapState, mapDispatch);



const Login = ({ logIn, history }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const error = useSelector(state => state.error)


  const loginHandler = (e) => {
    e.preventDefault();
    logIn(userName, password, (res) => {
      if (res.success === true) {
        history.push('/overview')
      }
    });
  };

  const resetPasswordNavigation = () => {
    history.push('/password-reset')
  }

  return (
    <div className="auth-main">
      <div className="auth-container">
        <h2>PELARD-N</h2>
        <h4>Login</h4>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={loginHandler}>Login</button>
        <a onClick={resetPasswordNavigation}>Forgot password? </a>
        {/* <p style={{ color: 'red', fontWeight: 'bold' }}>{error.message}</p> */}
      </div>
    </div>
  );
};

export default withRouter(connector(Login));
