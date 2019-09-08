import React from 'react';
// import Landscape from './landscapepage';
import { Switch, Route } from 'react-router-dom'
import AdminLogin from './adminlogin'
import StudentLogin from './studentlogin';
import CompanyLogin from './companylogin';
import CompanyDashboard from './companydashboard';
import StudentDashboard from './studentdashboard'
import AdminDashboard from './admindashboard';

// const uid=localStorage.getItem('currentUserUid');

const Main = () => (
    <Switch>
        <Route exact path="/" component={AdminLogin} />
        <Route path="/adminlogin" component={AdminLogin} />
        <Route path="/adminlogin" component={AdminLogin} />
        <Route path="/companylogin" component={CompanyLogin} />
        <Route path="/studentlogin" component={StudentLogin} />
        <Route path="/companydashboard" component={CompanyDashboard} />
        <Route path="/studentdashboard" component={StudentDashboard} />
        <Route path="/admindashboard" component={AdminDashboard} />
    </Switch>

)

export default Main;