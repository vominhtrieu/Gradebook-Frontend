import { createContext } from "react";

export const MainContext = createContext({
  reloadNeeded: true,
  setReloadNeeded: (param: any) => {},
});
