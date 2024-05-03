import { createContext } from "react";

//O "idioma" é um booleano; TRUE = Português, FALSE = Inglês
const GlobalDataCtx = createContext({
  listaEmpresas: null,
  listaUsuarios: null,
  resultadoPesquisaFiltro: null,
  abreFiltroNaPagInicial: false,
  idioma: true,
});

export default GlobalDataCtx;
