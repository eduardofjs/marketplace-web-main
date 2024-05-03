import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Footer from "../../Components/Footer/Footer";
import Searchbar from "../../Components/Searchbar/Searchbar";
import Topbar from "../../Components/Topbar/Topbar";
import { StyledOutlet, PageContainer } from "./Inicio.styles";
import Modal from "../../Components/Modal/Modal";
import ModalCtx from "../../Context/ModalContext";
import LoginCtx from "../../Context/LoginContext";

import MobileSidebar from "../../Components/MobileSidebar/MobileSidebar";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import GlobalDataContextProvider from "../../Context/GlobalDataContextProvider";

export const DataCtx = React.createContext({});
const Inicio = () => {
  //modal context
  const { modalState } = useContext(ModalCtx);

  //login context
  const { state, dispatch } = useContext(LoginCtx);

  //idioma do app
  const [appLang, setAppLang] = useState(window.navigator.language);

  useEffect(() => {
    dispatch({ type: "CHECK_SESSION" });
    //buscando na base de dados o id da empresa do usuario logado
  }, []);

  useEffect(() => {
    if (localStorage.getItem("DIRECTTO_LANG")) {
      setAppLang(JSON.parse(localStorage.getItem("DIRECTTO_LANG")));
    } else {
      setAppLang("pt-BR");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("DIRECTTO_LANG", JSON.stringify(appLang));
  }, [appLang]);

  return (
    <>
      {modalState?.display &&
        ReactDOM.createPortal(
          <Modal
            title={modalState.title}
            headline={modalState.headline}
            text={modalState.text}
            icon={modalState.icon}
            modalWithBtn={modalState.modalWithBtn}
            confirmBtnTxt={modalState.confirmBtnTxt}
            cancelBtnTxt={modalState.cancelBtnTxt}
            onCancel={modalState.cancelHandler}
            onConfirm={modalState.confirmHandler}
          />,
          document.getElementById("overlay-root")
        )}

      <Topbar />
      <Searchbar />
      <MobileSidebar />
      <PageContainer>
        <StyledOutlet />
      </PageContainer>
      <Footer />
    </>
  );
};

export default Inicio;
