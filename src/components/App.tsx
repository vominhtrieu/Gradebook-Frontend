import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import "./App.css";
import Main from "./Main";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="*">
                    <Main />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
