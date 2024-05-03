import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FiltroComponent from "../../Components/FiltroComponent/FiltroComponent";
import ListaProdutosSection from "../../Components/ListaProdutosSection/ListaProdutosSection";
import {
  FilterBtn,
  PesquisaContainer,
  ResultContainer,
} from "./Pesquisa.styles";
import Alert from "react-bootstrap/Alert";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import CategoriasSection from "../../Components/CategoriasSection/CategoriasSection";
import ReactTooltip from "react-tooltip";

const Pesquisa = () => {
  let navigate = useNavigate();

  useEffect(() => {
    ReactTooltip.rebuild();
  });
  //state do filtro
  const [filterExpanded, setFilterExpanded] = useState(false);

  //quantia de resultados encontrados
  const [resultQtd, setResultQtd] = useState(0);

  //query string react router v6
  const [searchParams] = useSearchParams();

  //global context
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  //pega o parametro da url
  const pesquisaParam = searchParams.get("resultado");
  const tipoParam = searchParams.get("categoriaId");
  const tipoString = searchParams.get("cat");

  //
  const getQtdHandler = (qtd) => setResultQtd(qtd);

  const onCloseHandler = (close) => setFilterExpanded(close);

  const stringResults = globalCtx.idioma
    ? "Exibindo ofertas e demandas encontradas "
    : "Showing all offers and demands found ";

  const stringPesquisa = globalCtx.idioma
    ? "para a pesquisa "
    : "by searching for ";

  const stringPesquisaByCategoria = globalCtx.idioma
    ? "na categoria "
    : "on category ";

  return (
    <PesquisaContainer>
      {filterExpanded ? (
        <FiltroComponent onClose={onCloseHandler} />
      ) : (
        <FilterBtn
          onClick={() => {
            setFilterExpanded(true);
          }}
        />
      )}

      <ResultContainer>
        {/* <PesquisaTitle>{pesquisaParam}</PesquisaTitle> */}
        <CategoriasSection />
        <Alert variant="success" style={{ marginTop: "1rem" }}>
          <Alert.Heading>
            {globalCtx.resultadoPesquisaFiltro &&
              globalCtx.resultadoPesquisaFiltro.length}{" "}
            {globalCtx.idioma ? "Resultados encontrados" : "Found results"}
          </Alert.Heading>

          <hr />
          {globalCtx.resultadoPesquisaFiltro
            ? globalCtx.idioma
              ? "Exibindo ofertas e demandas encontradas com os critérios do filtro. "
              : "Showing offers found with the filter criteria."
            : stringResults +
              (pesquisaParam
                ? stringPesquisa + `"${pesquisaParam}".`
                : stringPesquisaByCategoria + `"${tipoString}".`)}

          <Alert.Link
            style={{ marginLeft: "5px" }}
            onClick={() => {
              globalCtxDispatch({ type: "setResultadoFiltro", value: null });
              navigate("/", { replace: "true" });
            }}
          >
            Limpar filtro
          </Alert.Link>
        </Alert>
        <ListaProdutosSection
          search={pesquisaParam}
          searchByTipo={tipoParam}
          onGetQtd={getQtdHandler}
        />
      </ResultContainer>
    </PesquisaContainer>
  );
};

export default Pesquisa;
