import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";

export default () =>
  <Switch>
    <Route path="/" exact component={Main} />
  </Switch>;
