import { createContext } from "react";
import io from "socket.io-client";

export const MainContext = createContext({
    reloadNeeded: true,
    setReloadNeeded: (param: any) => {
    },
    user: {
        id: 0,
        name: "",
        email: "",
        studentId: "",
        role: 1,
    },
    setUser: (param: any) => {
    },
    socket: io(process.env.REACT_APP_API_HOST + ""),
    setSocket: (socket: any) => {
    }
});
