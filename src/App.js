import { useEffect, useContext } from "react";

import { useLocation } from "react-router";
import GlobalStyle from "./globalStyle";

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css'

import Rotas from "./Rotas";
import ReactTooltip from "react-tooltip";
import LoginProvider from "./Context/LoginProvider";
import ModalProvider from "./Context/ModalProvider";
import { StyledToastContainer } from "./globalStyle";
import GlobalDataContextProvider from "./Context/GlobalDataContextProvider";
import ModalCtx from "./Context/ModalContext";

const App = () => {
  const { modalState } = useContext(ModalCtx);

  //scrolla pro topo sempre que usuario mudar pagina
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <GlobalStyle />

      <StyledToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <GlobalDataContextProvider>
        {" "}
        <ModalProvider>
          {" "}
          <LoginProvider>
            {" "}
            <ReactTooltip backgroundColor="#115934" />
            <Rotas />
          </LoginProvider>
        </ModalProvider>
      </GlobalDataContextProvider>
    </>
  );
};

export default App;
