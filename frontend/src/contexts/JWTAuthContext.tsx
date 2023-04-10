/** @format */

import React, {createContext, ReactNode, useEffect, useReducer} from "react";
import jwtDecode from "jwt-decode";
import axios from "../utils/axios";
import { Decoded } from "../utils/types";
import SlashScreen from "../Components/SlashScreen";

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = function(token: string) : boolean {
  if (!token) {
    return false;
  }

  const decoded:Decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      const {isAuthenticated, user} = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const {user} = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return {...state};
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
});
type AuthProviderProps = {
 children: React.ReactNode 
}
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/account/login", {email, password});
    const {token, user} = response.data;

    setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({type: "LOGOUT"});
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const token = window.localStorage.getItem("token");

        if (token && isValidToken(token)) {
          setSession(token);
          // const response = await axios.get('/api/account/me');
          // const { user } = response.data;

          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              // user,
            },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SlashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
