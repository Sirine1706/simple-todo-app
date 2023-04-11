/** @format */

import React, {createContext, useCallback, useEffect, useMemo, useReducer} from "react";
import jwtDecode from "jwt-decode";
import axios from "../utils/axios";
import {ActionMapType, AuthProviderProps, AuthStateType, AuthUserType, Decoded, JWTContextType} from "../utils/types";
import localStorageAvailable from "../utils/localStorageAvailable";

const initialAuthState: AuthStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const isValidToken = function (token: string): boolean {
  if (!token) {
    return false;
  }

  const decoded: Decoded = jwtDecode(token);
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
enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const reducer = (state: AuthStateType, action: ActionsType) => {
  switch (action.type) {
    case Types.INITIAL: {
      const {isAuthenticated, user} = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case Types.LOGIN: {
      const {user} = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case Types.LOGOUT: {
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
export const AuthContext = createContext<JWTContextType | null>(null);


export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/account/my-account');

        const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const response = await axios.post('/api/account/register', {
        email,
        password,
        firstName,
        lastName,
      });
      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
