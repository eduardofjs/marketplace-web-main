import React, { useState, useContext } from "react";
import { NavItem, NavWrapper, SidebarBtn, SidebarContainer, SidebarMenu, LoginBtn } from "./MobileSidebar.styles";
import { useNavigate } from "react-router";
import { LoginContainer, LoginIcon } from "../Topbar/Topbar.styles";
import LoginCtx from "../../Context/LoginContext";
import ModalCtx from "../../Context/ModalContext";
import { toast } from "react-toastify";

const MobileSidebar = () => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(LoginCtx);

  const { modalDispatch } = useContext(ModalCtx);

  const loginStateHandler = () => {
    setSidebarIsExpanded(false);
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
            dispatch({ type: "LOGOUT" });
            toast.info("Você se desconectou. Agora está como visitante.");
          },
        },
      });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const [sidebarIsExpanded, setSidebarIsExpanded] = useState(false);
  return (
    <SidebarContainer>
      <SidebarBtn onClick={() => setSidebarIsExpanded(!sidebarIsExpanded)} />
      <SidebarMenu isExpanded={sidebarIsExpanded}>
        <NavWrapper>
          <NavItem
            onClick={() => {
              setSidebarIsExpanded(false);
              navigate("/", { replace: true });
            }}
          >
            Início
          </NavItem>
          <NavItem>Comprar</NavItem>
          <NavItem>Vender</NavItem>
          <NavItem>Serviços</NavItem>
          <NavItem>Ajuda</NavItem>
        </NavWrapper>
        <LoginContainer>
          <LoginBtn onClick={loginStateHandler}>
            <LoginIcon />
            {state?.userLoggedIn ? `${state.userLoggedIn} (Logout)` : "Entrar"}
          </LoginBtn>
        </LoginContainer>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default MobileSidebar;
