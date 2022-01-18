import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import "./App.css";
import Main from "./Main";
import { MainContext } from "../contexts/main";
import { RoutingContext } from "../contexts/routing";
import React, { useEffect, useState } from "react";
import Admin from "./admin/Admin";
import io, { Socket } from "socket.io-client";
import { getData } from "../handlers/api";

function App() {
    const [requestedURL, setRequestedURL] = React.useState("/");
    const [reloadNeeded, setReloadNeeded] = useState(true);
    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        studentId: "",
        role: 1,
    });
    const [socket, setSocket] = useState<Socket>(
        io(process.env.REACT_APP_API_HOST + "", {
            auth: {
                token: localStorage.getItem("token"),
            },
        })
    );

    useEffect(() => {
        getData("/users/profile").then((user: any) => {
            setUser(user);
        });
    }, []);

    return (
        <MainContext.Provider
            value={{
                user: user,
                setUser: setUser,
                reloadNeeded: reloadNeeded,
                setReloadNeeded: setReloadNeeded,
                socket: socket,
                setSocket: setSocket,
            }}
        >
            <RoutingContext.Provider value={{requestedURL: requestedURL, setRequestedURL: setRequestedURL}}>
                <Router>
                    <Switch>
                        <Route path="/signin">
                            <SignIn />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
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
        </MainContext.Provider>
    );
}

export default App;
