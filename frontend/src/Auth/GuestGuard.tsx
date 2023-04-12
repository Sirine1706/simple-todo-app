/** @format */

import {Navigate} from "react-router-dom";
import {useAuthContext} from "../context/useAuthContext";
import {AuthProviderProps} from "../utils/types";

export const GuestGuard = ({children}: AuthProviderProps) => {
  const {isAuthenticated, isInitialized} = useAuthContext();
  console.log(isAuthenticated);
  if (isAuthenticated) {
   return  <Navigate to='/my-todo' />;
  }
  // if(!isInitialized){
  //   <Navigate to='/login' />
  // }
  return <>{children}</>;
};
