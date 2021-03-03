import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "../Layouts/Auth/Login";
import ForgotPassword from "../Layouts/Auth/ForgotPassword"
import Home from "../Layouts/Home/Home";
import Case from "../Layouts/Cases/Cases";
import CaseDetails from "../Layouts/CaseDetails/CaseDetails";
import EditCase from "../Layouts/CaseDetails/EditCase";
import RequestRole from "../Layouts/Home/RoleRequest";
import Users from "../Layouts/Admin/Users";
import UserDetail from "../Layouts/Admin/UserDetail";
import Applications from "../Layouts/Admin/Applications";
import NewUsers from "../Layouts/NewUsers/NewUsers";
import EditUser from "../Layouts/Admin/EditUser";


const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/password-reset" component={ForgotPassword} />
        <Route path="/overview" component={Home} />
        <Route path="/cases" component={Case} />
        <Route path="/case-details" component={CaseDetails} />
        <Route path="/edit-details" component={EditCase} />
        <Route path="/role" component={RequestRole} />
        <Route path="/users" component={Users} />
        <Route path="/new-users" component={NewUsers} />
        <Route path="/users-details" component={UserDetail} />
        <Route path="/applications" component={Applications} />
        <Route path="/edit-user" component={EditUser} />
      </Switch>
    </BrowserRouter>
  );
};

export default index;
