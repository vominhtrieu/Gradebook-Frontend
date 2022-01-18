import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import "./App.css";
import Main from "./Main";
import { RoutingContext } from "../contexts/routing";
import React from "react";
import Admin from "./admin/Admin";
import ForgotPassword from "./auth/ForgotPassword";
import Activate from "./auth/Activate";

function App() {
    const [requestedURL, setRequestedURL] = React.useState("/");

    return (
        <RoutingContext.Provider value={{requestedURL: requestedURL, setRequestedURL: setRequestedURL}}>
            <Router>
                <Switch>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route path="/activation/:activationCode" component={Activate}>
                    </Route>
                    <Route path="/admin/">
                        <Admin />
                    </Route>
                    <Route path="/admin/*">
                        <Admin />
                    </Route>
                    <Route path="*">
                        <Main />
                    </Route>
                </Switch>
            </Router>
        </RoutingContext.Provider>
    );
}

export default App;
