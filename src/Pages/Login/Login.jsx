import React, { useContext, useState, useEffect } from "react";
import {
  CloseLoginPage,
  CriarEsquecerContaDiv,
  DirecttoLogo,
  ErrorMsg,
  EsqueceuSenhaSpan,
  Input,
  InputDesc,
  InputDiv,
  LinkSpan,
  LoginBtn,
  LoginContainer,
  LoginFooter,
  LoginModal,
  LoginTitle,
  SwitchLang,
  Version,
} from "./Login.styles";
import logo from "../../Assets/directto_logo.png";
import LoginCtx from "../../Context/LoginContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { REQ_BODY } from "../../data";
import { AUTH_HEADER } from "../../data";
import ReactLoading from "react-loading";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import Flag from "react-world-flags";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const Login = () => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(LoginCtx);

  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const invalidLoginString = globalCtx.idioma
    ? "Credenciais inválidas!"
    : "Invalid credentials!";
  const validLoginString = globalCtx.idioma
    ? "Login bem sucedido!"
    : "Successfully logged in.";

  //verifica se usuário está logado
  useEffect(() => {
    dispatch({ type: "CHECK_SESSION" });
  }, []);

  const [usernameInput, setUsernameInput] = useState();

  const [pwdInput, setPwdInput] = useState();

  const [showError, setShowError] = useState();

  const [loadingLogin, setLoadingLogin] = useState(false);

  const loginHandler = () => {

    if (loadingLogin) {

    } else {
      setLoadingLogin(true);
      const loginValidationEndpoint = `${getMarketplaceApiEndpoint()}/api/Usuario/Login?email=${usernameInput}&senha=${pwdInput}`;

      // buscar lista de empresas apos login
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/Empresa/GetAllEmpresa?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=EMP_Id`,
          {},
          AUTH_HEADER
        )
        .then((res) => {
          globalCtxDispatch({ type: "setListaEmpresas", value: res.data });
        });

      // verificar login e perfil
      axios.put(loginValidationEndpoint, REQ_BODY, AUTH_HEADER)
        .then((loginRes) => {
          if (loginRes.status === 200) {
            //o login foi validado, agora está verificando o perfil
            axios
              .post(
                `${getMarketplaceApiEndpoint()}/api/PerfilxUsuario/GetAllPerfilxUsuarioByValorExato?strValorExato=${loginRes.data.USR_Id}&ColunaParaValorExato=USR_Id&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=PXU_Id`,
                {},
                AUTH_HEADER
              )
              .then((perfilRes) => {
                if (perfilRes.status === 200) {
                  //Aqui o login está validado, MAS é feito uma verificação para ver se o usuário tem uma empresa cadastrada
                  setLoadingLogin(false);
                  navigate("/", { replace: true });
                  toast.success(validLoginString);
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    value: {
                      userInput: loginRes.data.USR_Email,
                      perfil: perfilRes.data[0].Perfil.PRF_Id,
                      id: perfilRes.data[0].Usuario.USR_Id,
                      empresaId: loginRes.data.Empresa.EMP_Id,
                    },
                  });
                } else {
                  setShowError(true);
                  toast.error("ERRO AO VALIDAR PERFIL.");

                  setLoadingLogin(false);
                }
              });
          }
        })
        .catch((err) => {
          setShowError(true);
          toast.error(invalidLoginString);

          setLoadingLogin(false);
        });
    }
  };

  useEffect(() => {
    if (state?.loginAttemptSuccess === "failed") {
      setShowError(true);
      toast.error(invalidLoginString);
    } else if (state?.loginAttemptSuccess === "success") {
    } else {
      setShowError(false);
    }
  }, [state]);

  return (
    <LoginContainer>
      <CloseLoginPage onClick={() => navigate("/", { replace: true })} />
      <LoginModal>
        <DirecttoLogo src={logo} />
        <LoginTitle>Login</LoginTitle>
        <form autoComplete="off">
          {" "}
          <InputDiv>
            <InputDesc error={showError}>
              {globalCtx.idioma ? "E-mail" : "E-mail"}
            </InputDesc>
            <Input
              error={showError}
              autoComplete="off"
              placeholder={
                globalCtx.idioma ? "E-mail cadastrado" : "Registered E-mail"
              }
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
            />
          </InputDiv>
          <InputDiv>
            <InputDesc error={showError}>
              {globalCtx.idioma ? "Senha" : "Password"}
            </InputDesc>
            <Input
              error={showError}
              autoComplete="off"
              placeholder={globalCtx.idioma ? "Digite sua senha" : "Password"}
              type="password"
              onChange={(e) => {
                setPwdInput(e.target.value);
              }}
            ></Input>
          </InputDiv>
        </form>
        <LoginBtn onClick={loginHandler}>
          {loadingLogin ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <ReactLoading
                type={"spin"}
                color={"white"}
                height={20}
                width={20}
              />
            </div>
          ) : (
            "Login"
          )}
        </LoginBtn>
        <CriarEsquecerContaDiv>
          {" "}
          <LinkSpan
            onClick={() => {
              navigate("/cadastro", { replace: true });
            }}
          >
            {globalCtx.idioma ? "Criar conta" : "Registration"}
          </LinkSpan>
          <LinkSpan
            onClick={() => {
              navigate("/esqueceu-senha", { replace: true });
            }}
          >
            {globalCtx.idioma ? "Esqueceu a senha?" : "Forgotten password?"}
          </LinkSpan>
        </CriarEsquecerContaDiv>
        <LoginFooter>
          <Version>Directto - {process.env.REACT_APP_VERSION}</Version>{" "}
          <SwitchLang
            onClick={() =>
              globalCtx.idioma
                ? globalCtxDispatch({ type: "setIdiomaEN" })
                : globalCtxDispatch({ type: "setIdiomaBR" })
            }
          >
            {" "}
            <Flag code={globalCtx.idioma ? "BR" : "US"} height="16" />
            {globalCtx.idioma ? " PT-BR" : " EN-US"}
          </SwitchLang>
        </LoginFooter>
      </LoginModal>
    </LoginContainer>
  );
};

export default Login;
