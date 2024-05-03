import React, { useContext } from "react";
import {
  IdiomaContainer,
  LoginBtn,
  LoginContainer,
  LoginIcon,
  LoginOrRegisterWrapper,
  MoedaContainer,
  NavigationContainer,
  NavItem,
  OptionsContainer,
  PerfilMasterIcon,
  RegisterBtn,
  RegisterIcon,
  SelectedIdioma,
  SelectedMoeda,
  StyledNavDropdown,
  TopbarContainer,
} from "./Topbar.styles";
import Flag from "react-world-flags";
import LoginCtx from "../../Context/LoginContext";
import ModalCtx from "../../Context/ModalContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stringBasedOnAccessType } from "../../generalFunctions";
import { DataCtx } from "../../Pages/Inicio/Inicio";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const Topbar = () => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(LoginCtx);
  const { modalDispatch } = useContext(ModalCtx);
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const loginStateHandler = () => {
    if (state.userLoggedIn) {
      modalDispatch({
        type: "CONFIG_MODAL",
        value: {
          display: true,
          title: "Logout",
          text: `Você está conectado como: ${state.userLoggedIn}. Deseja desconectar?`,
          modalWithBtn: true,
          confirmBtnTxt: "Desconectar",
          cancelBtnTxt: "Cancelar",
          cancelHandler: () => {
            modalDispatch({ type: "SET_DISPLAY", value: false });
          },
          confirmHandler: () => {
            modalDispatch({ type: "SET_DISPLAY", value: false });
            navigate("/", { replace: true });
            dispatch({ type: "LOGOUT" });
            toast.info("Você se desconectou. Agora está como visitante.");
          },
        },
      });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <TopbarContainer>
      <OptionsContainer>
        <IdiomaContainer>
          <span>{globalCtx.idioma ? "Idioma" : "Language"}</span>
          <SelectedIdioma
            onClick={() =>
              globalCtx.idioma
                ? globalCtxDispatch({ type: "setIdiomaEN" })
                : globalCtxDispatch({ type: "setIdiomaBR" })
            }
          >
            {globalCtx.idioma ? (
              <>
                {" "}
                <Flag code="BR" height="16" />
                <span>Português</span>
              </>
            ) : (
              <>
                {" "}
                <Flag code="US" height="12" />
                <span>English</span>
              </>
            )}
          </SelectedIdioma>
        </IdiomaContainer>
        {/* <MoedaContainer>
          <span>{globalCtx.idioma ? "Moeda" : "Currency"}</span>
          <SelectedMoeda>Reais (R$)</SelectedMoeda>
        </MoedaContainer> */}
      </OptionsContainer>

      <NavigationContainer>
        {/* <NavItem> {globalCtx.idioma ? "Comprar" : "Buy"}</NavItem>
        <NavItem> {globalCtx.idioma ? "Vender" : "Sell"}</NavItem>
        <NavItem> {globalCtx.idioma ? "Serviços" : "Services"}</NavItem>
        <NavItem>{globalCtx.idioma ? "Ajuda" : "Help"}</NavItem> */}
        <LoginContainer>
          <NavItem onClick={() => navigate("/", { replace: true })}>
            {" "}
            <span>{globalCtx.idioma ? "Início" : "Home"}</span>
          </NavItem>
          {state?.perfilUsuario === 1 && <PerfilMasterIcon />}
          {state?.userLoggedIn ? (
            <StyledNavDropdown
              title={state.userLoggedIn}
              id="basic-nav-dropdown"
            >
              <StyledNavDropdown.Item
                onClick={() => navigate("/dashboard", { replace: true })}
              >
                Dashboard
              </StyledNavDropdown.Item>
              <StyledNavDropdown.Item onClick={loginStateHandler}>
                Logout
              </StyledNavDropdown.Item>
            </StyledNavDropdown>
          ) : (
            <LoginOrRegisterWrapper>
              <RegisterBtn
                onClick={() => navigate("/cadastro", { replace: true })}
              >
                <RegisterIcon />
                {globalCtx.idioma ? "Criar conta" : "Create Account"}
              </RegisterBtn>
              <LoginBtn onClick={loginStateHandler}>
                <LoginIcon />
                {globalCtx.idioma ? "Entrar" : "Login"}
              </LoginBtn>
            </LoginOrRegisterWrapper>
          )}
        </LoginContainer>
      </NavigationContainer>
    </TopbarContainer>
  );
};

export default Topbar;
