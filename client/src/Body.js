import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Forgot from "./pages/forgotPassword";
import Reset from "./pages/resetPassword";
import NotFound from "./components/NotFound";
import Alert from "./components/alert/Alert";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <Router>
      <Alert />
      <section>
        <Switch>
          {/* <Route exact path="/" component={auth.token ? Home : Login} />

          <Route
            path="/register"
            component={isLogged ? NotFound : Register}
            exact
          />

          <Route
            path="/forgot_password"
            component={isLogged ? NotFound : Forgot}
            exact
          /> */}
          <Route
            path="/reset/:token"
            component={isLogged ? NotFound : Reset}
            exact
          />
        </Switch>
      </section>
    </Router>
  );
}

export default Body;
