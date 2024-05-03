import axios from "axios";
import React, { useState, useEffect, useReducer, useContext } from "react";
import { toast } from "react-toastify";
import { AUTH_HEADER } from "../data";
import GlobalDataCtx from "./GlobalDataContext";
import LoginCtx from "./LoginContext";
import { getMarketplaceApiEndpoint } from "../generalFunctions";

const GlobalDataContextProvider = ({ children }) => {
  const initialGlobalCtx = {
    listaEmpresas: null,
    listaUsuarios: null,
    abreFiltroNaPagInicial: false,
    resultadoPesquisaFiltro: null,
    idioma: true,
  };

  //funçao utilizada no board operacional e em outras telas que atualizam as etapas da negociação
  const updateEtapas = (ofnId, donoEtapa, etapaValue, updateFn) => {
    const updateEtapaEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/UpdateEtapaNegociacao${donoEtapa}?OFN_Id=${ofnId}&OFN_EtapaNegociacao${donoEtapa}=${etapaValue}`;
    axios
      .put(updateEtapaEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          if (updateFn) {
            updateFn();
          }
        }
      })
      .catch((err) => {
        toast.error("Erro ao atualizar etapa.");
      });
  };

  //funçao utilizada no board operacional e em outras telas que atualizam as datas das notificaçoes
  const updateDataNotificacao = (ofnId, campoData) => {
    const updateDataEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/UpdateEtapaNegociacaoDatas?OFN_Id=${ofnId}&CampoData=${campoData}`;
    axios
      .put(updateDataEndpoint, {}, AUTH_HEADER)
      .then((res) => {})
      .catch((err) => {
        toast.error("Erro ao atualizar campo.");
      });
  };

  const globalCtxReducer = (state, action) => {
    switch (action.type) {
      case "setListaEmpresas":
        return { ...state, listaEmpresas: action.value };

      case "setListaUsuarios":
        return { ...state, listaUsuarios: action.value };

      case "setIdiomaBR":
        return { ...state, idioma: true };
      case "setIdiomaEN":
        return { ...state, idioma: false };
      case "setResultadoFiltro":
        return { ...state, resultadoPesquisaFiltro: action.value };
      case "abreFiltroNaPagInicial":
        return { ...state, abreFiltroNaPagInicial: action.value };

      default:
        break;
    }
  };

  const { state } = useContext(LoginCtx);

  //busca lista de empresa e usuarios apenas apos login
  useEffect(() => {
    if (localStorage.getItem("DIRECTTO_SESSION")) {
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/Empresa/GetAllEmpresa?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=EMP_Id`,
          {},
          AUTH_HEADER
        )
        .then((res) => {
          globalCtxDispatch({ type: "setListaEmpresas", value: res.data });
        });
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/Usuario/GetAllUsuario?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=99999&order_by=USR_Id`,
          {},
          AUTH_HEADER
        )
        .then((res) => {
          globalCtxDispatch({ type: "setListaUsuarios", value: res.data });
        });
    }
  }, [localStorage]);

  const [globalCtx, globalCtxDispatch] = useReducer(
    globalCtxReducer,
    initialGlobalCtx
  );

  return (
    <GlobalDataCtx.Provider
      value={{
        globalCtx,
        globalCtxDispatch,
        updateEtapas,
        updateDataNotificacao,
      }}
    >
      {children}
    </GlobalDataCtx.Provider>
  );
};

export default GlobalDataContextProvider;
