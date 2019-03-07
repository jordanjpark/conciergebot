import React from "react";
import { Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import AppliedRoute from "./components/AppliedRoutes";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/" exact component={Main} props={childProps} />
    </Switch>;
