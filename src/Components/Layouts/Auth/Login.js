import React, { useEffect, useState } from "react";
import { connect, useStore } from "react-redux";
import { withRouter } from "react-router";
import { ActionCreators } from "../../../Store/ActionCreators";
import "./Styles.scss";

const mapState = ({ loggedIn, loading }) => ({ loggedIn, loading });
const mapDispatch = (dispatch) => ({
  logIn: (userName, password) =>
    dispatch(ActionCreators.logIn({ userName, password })),
});

const connector = connect(mapState, mapDispatch);

const selectLoggedIn = ({ loggedIn }) => loggedIn;

const Login = ({ loading, logIn, history }) => {
  const [userName, setUserName] = useState("eddy");
  const [password, setPassword] = useState("pass0123");
  const store = useStore();

  const loginHandler = (e) => {
    e.preventDefault();
    logIn(userName, password);
  };

  useEffect(() => {
    const handler = () => {
      const state = store.getState();
      console.log(state, selectLoggedIn(state));
      if (selectLoggedIn(store.getState())) {
        history.push("./overview");
      }
    };

    const unsubscribe = store.subscribe(handler);

    return () => {
      unsubscribe();
    };
  }, [history, store]);

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
        <a href="#">Forgot password? </a>
      </div>
    </div>
  );
};

export default withRouter(connector(Login));
