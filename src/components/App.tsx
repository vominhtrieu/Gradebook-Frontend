import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import "./App.css";
import Main from "./Main";
import {RoutingContext} from "../contexts/routing";
import React from "react";

function App() {
    const [requestedURL, setRequestedURL] = React.useState("/");

    return (
        <RoutingContext.Provider value={{requestedURL: requestedURL, setRequestedURL: setRequestedURL}}>
            <Router>
                <Switch>
                    <Route path="/signin">
                        <SignIn/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="*">
                        <Main/>
                    </Route>
                </Switch>
            </Router>
        </RoutingContext.Provider>
    );
}

export default App;
