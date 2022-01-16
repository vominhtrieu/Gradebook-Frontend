import { createContext } from "react";

import io from "socket.io-client";

export const MainContext = createContext({
    reloadNeeded: true,
    setReloadNeeded: (param: any) => {
    },
    userStudentId: "",
    socket: io(process.env.REACT_APP_API_HOST + ""),
    setSocket: (socket: any) => {
    }
});
