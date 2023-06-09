/** @format */

import {Navigate} from "react-router-dom";
import {useAuthContext} from "../context/useAuthContext";
import {AuthProviderProps} from "../utils/types";

export const GuestGuard = ({children}: AuthProviderProps) => {
  const {isAuthenticated} = useAuthContext();
  if (isAuthenticated) {
   return  <Navigate to='/my-todo' />;
  }
  return <>{children}</>;
};
