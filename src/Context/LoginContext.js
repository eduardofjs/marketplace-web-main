import { createContext } from "react";

const LoginCtx = createContext({
  userLoggedIn: null,
  userId: null,
  perfilUsuario: null,
  loginAttemptSuccess: null,
  empresaId: null,
});

export default LoginCtx;
