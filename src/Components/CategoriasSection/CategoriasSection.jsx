import React, { useEffect, useState, useContext } from "react";
import {
  CategoriaItem,
  CategoriasList,
  CategoriasSectionContainer,
  CategoriasTitle,
  CategoriasTopbar,
} from "./CategoriasSection.styles";
import { AUTH_HEADER } from "../../data";
import axios from "axios";

import LoadingDiv from "../LoadingDiv/LoadingDiv";
import { useNavigate } from "react-router";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const endpointTipoProduto =
  `${getMarketplaceApiEndpoint()}/api/TipoProduto/GetAllTipoProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=TPR_Id`;

const CategoriasSection = () => {
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  let navigate = useNavigate();
  const [tipoProdutoList, setTipoProdutoList] = useState(false);

  useEffect(() => {
    axios.post(endpointTipoProduto, {}, AUTH_HEADER).then((res) => {
      setTipoProdutoList(res.data);
    });
  }, []);

  return (
    <CategoriasSectionContainer>
      <CategoriasTopbar>
        <CategoriasTitle>
          {globalCtx.idioma ? "Nossos Produtos" : "Our Products"}
        </CategoriasTitle>
      </CategoriasTopbar>
      <CategoriasList>
        {tipoProdutoList ? (
          tipoProdutoList.map((c) => {
            return (
              <CategoriaItem
                key={Math.random()}
                onClick={() => {
                  //limpa resultados tetstst
                  globalCtxDispatch({
                    type: "setResultadoFiltro",
                    value: null,
                  });
                  let navigateUrl = window.location.href.includes("pesquisa")
                    ? `?categoriaId=${c.TPR_Id}&cat=${
                        globalCtx.idioma
                          ? c.TPR_Descricao
                          : c.TPR_DescricaoIngles
                      }`
                    : `pesquisa?categoriaId=${c.TPR_Id}&cat=${
                        globalCtx.idioma
                          ? c.TPR_Descricao
                          : c.TPR_DescricaoIngles
                      }`;
                  navigate(navigateUrl, {
                    replace: true,
                  });
                }}
              >
                <img src={c.TPR_PathUrl} alt="" />
                <span>
                  {globalCtx.idioma ? c.TPR_Descricao : c.TPR_DescricaoIngles}
                </span>
              </CategoriaItem>
            );
          })
        ) : (
          <LoadingDiv
            loadingMsg={
              globalCtx.idioma
                ? "Carregando categorias..."
                : "Loading categories..."
            }
          />
        )}
      </CategoriasList>
    </CategoriasSectionContainer>
  );
};

export default CategoriasSection;
