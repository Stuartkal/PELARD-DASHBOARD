import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Auth from '../Layouts/Auth/Login'
import Home from '../Layouts/Home/Home'
import Case from '../Layouts/Cases/Cases'
import CaseDetails from '../Layouts/CaseDetails/CaseDetails'
import EditCase from '../Layouts/CaseDetails/EditCase'
import RequestRole from '../Layouts/Home/RoleRequest'

const index = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Auth}/>
                <Route path="/overview" component={Home}/>
                <Route path="/cases" component={Case}/>
                <Route path="/case-details" component={CaseDetails}/>
                <Route path="/edit-details" component={EditCase}/>
                <Route path="/role" component={RequestRole}/>
            </Switch>
        </BrowserRouter>
    )
}

export default index
