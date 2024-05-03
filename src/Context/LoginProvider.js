import axios from "axios";
import React, { useReducer } from "react";
import LoginCtx from "./LoginContext";

const loginInitialState = {
  userLoggedIn: null,
  accessType: null,
  loginAttemptSuccess: null,
};

const loginReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "LOGIN_SUCCESS":
      newState = {
        userLoggedIn: action.value.userInput,
        loginAttemptSuccess: "success",
        perfilUsuario: action.value.perfil,
        userId: action.value.id,
        empresaId: action.value.empresaId,
      };
      localStorage.setItem("DIRECTTO_SESSION", JSON.stringify(newState));

      break;
    case "LOGOUT":
      localStorage.removeItem("DIRECTTO_SESSION");
      return loginInitialState;

    case "CHECK_SESSION":
      if (localStorage.getItem("DIRECTTO_SESSION")) {
        newState = JSON.parse(localStorage.getItem("DIRECTTO_SESSION"));
      } else return state;
      break;

    default:
      throw new Error();
  }
  return newState;
};

const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);
  return (
    <LoginCtx.Provider value={{ state, dispatch }}>
      {children}
    </LoginCtx.Provider>
  );
};

export default LoginProvider;
