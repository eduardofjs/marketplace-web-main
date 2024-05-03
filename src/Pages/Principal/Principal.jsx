import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import CategoriasSection from "../../Components/CategoriasSection/CategoriasSection";
import DestaquesSection from "../../Components/DestaquesSection/DestaquesSection";
import EmpresasSection from "../../Components/EmpresasSection/EmpresasSection";
import FiltroComponent from "../../Components/FiltroComponent/FiltroComponent";
import ListaProdutosSection from "../../Components/ListaProdutosSection/ListaProdutosSection";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { PrincipalContainer } from "./Principal.styles";

const Principal = () => {
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);
  const [filtrandoLista, setFiltrandoLista] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const onCloseHandler = (close) =>
    globalCtxDispatch({
      type: "abreFiltroNaPagInicial",
      value: !globalCtx.abreFiltroNaPagInicial,
    });

  const categoriaHandler = (categoriaPraPesquisar) => {
    setFiltrandoLista(categoriaPraPesquisar);
  };

  return (
    <PrincipalContainer>
      {/* <DestaquesSection /> */}
      <CategoriasSection onGetCategoria={categoriaHandler} />
      {globalCtx.abreFiltroNaPagInicial && (
        <FiltroComponent onClose={onCloseHandler} />
      )}
      {globalCtx.resultadoPesquisaFiltro && (
        <Alert style={{ margin: "10px 0" }} variant="success">
          <Alert.Heading>
            {globalCtx.resultadoPesquisaFiltro.length} Resultados encontrados
          </Alert.Heading>
          <hr />
          Exibindo lista de ofertas e demandas encontradas com os critérios do
          filtro.{" "}
          <Alert.Link
            onClick={() =>
              globalCtxDispatch({ type: "setResultadoFiltro", value: null })
            }
          >
            Limpar filtro
          </Alert.Link>
        </Alert>
      )}

      <ListaProdutosSection pesquisaPorCategoria={filtrandoLista} />
      <EmpresasSection />
    </PrincipalContainer>
  );
};

export default Principal;
