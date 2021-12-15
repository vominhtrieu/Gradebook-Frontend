import { createContext } from "react";

export const RoutingContext = createContext({
    requestedURL: "/",
    setRequestedURL: (param: string) => {},
});
