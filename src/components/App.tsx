import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import "./App.css";
import Main from "./Main";
import { MainContext } from "../contexts/main";
import { RoutingContext } from "../contexts/routing";
import React, { useEffect, useState } from "react";
import Admin from "./admin/Admin";
import ForgotPassword from "./auth/ForgotPassword";
import Activate from "./auth/Activate";
import io, { Socket } from "socket.io-client";
import { getData, setUpAPI } from "../handlers/api";
import { useHistory } from "react-router";

function App() {
    const history = useHistory();
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
        setUpAPI(history);
    }, [history]);

    useEffect(() => {
        getData("/users/profile").then((user: any) => {
            setUser(user);
        });
    }, []);

    const updateUser = (user: any) => {
        setUser(user);
        setSocket(io(process.env.REACT_APP_API_HOST + "", {
            auth: {
                token: localStorage.getItem("token"),
            },
        }));
    }

    return (
        <MainContext.Provider
            value={{
                user: user,
                setUser: updateUser,
                reloadNeeded: reloadNeeded,
                setReloadNeeded: setReloadNeeded,
                socket: socket,
                setSocket: setSocket,
            }}
        >
            <RoutingContext.Provider value={{requestedURL: requestedURL, setRequestedURL: setRequestedURL}}>
                <Switch>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/activation/:activationCode"><Activate /></Route>
                    <Route path="/forgot-password">
                        <ForgotPassword />
                    </Route>

                    {user.role === 2 ?
                        <>
                            <Route path="/admin/*">
                                <Admin />
                            </Route>
                            <Route path="*">
                                <Redirect to="/admin/users" />
                            </Route>
                        </> :
                        <Route path="*">
                            <Main />
                        </Route>
                    }
                </Switch>
            </RoutingContext.Provider>
        </MainContext.Provider>
    );
}

export default App;
