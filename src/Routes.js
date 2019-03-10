import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import AppliedRoute from "./components/AppliedRoutes";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <Redirect from="/login" exact to="/" />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/" exact component={Main} props={childProps} />
        <Redirect from="/" exact to="/login" />
    </Switch>;
