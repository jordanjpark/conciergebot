import React from "react";
import { Switch } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import AppliedRoute from "./components/AppliedRoutes";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Main} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
    </Switch>;
