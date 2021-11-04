import React from "react";

export const MainContext = React.createContext({
    reloadNeeded: true,
    setReloadNeeded: (param: any) => {
    },
});