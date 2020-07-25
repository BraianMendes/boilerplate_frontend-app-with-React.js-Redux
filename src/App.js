import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as loginActions from "./redux/actions/login.action";
import { useDispatch, useSelector } from "react-redux";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Profile from "./pages/ProfilePage";
import PasswordForgotPage from './pages/password/PasswordForgotPage';
import PasswordResetPage from './pages/password/PasswordResetPage';


const App = (props) => {
  // const {pathname} = this.props.location;
  useSelector(({ loginReducer }) => loginReducer);
  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition

        loginActions.isLoggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

    return (
      <Router>
        <Switch>
          <div>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/login/:notify?" component={Login} /> */}
            <Route exact path="/password-reset/:token" component={PasswordResetPage} />
            <Route exact path="/password/forgot" component={PasswordForgotPage} />
            <SecuredRoute path="/profile" component={Profile} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Login} />
          </div>
        </Switch>
      </Router>
    );

}

export default App;