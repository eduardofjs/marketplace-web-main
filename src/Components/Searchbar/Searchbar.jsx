import React, { useState, useContext, useRef } from "react";
import {
  ControllerWrapper,
  FilterIcon,
  FilterOption,
  Logo,
  SearchbarContainer,
  SearchBtn,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SelectInput,
  Wrapper,
} from "./Searchbar.styles";
import logoDirectto from "../../Assets/directto_logo_horizontal.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import { useEffect } from "react";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const Searchbar = () => {
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const searchInputRef = useRef();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (document.activeElement === searchInputRef.current) {
        if (event.code === "Enter") {
          pesquisaHandler();
        }
      }
    });
  }, []);

  let navigate = useNavigate();
  //search input
  const [searchInput, setSearchInput] = useState();
  //
  const pesquisaHandler = () => {
    //limpa resultados do filtro caso sejam existentes

    const formattedSearchInput = searchInputRef.current.value.trim();

    let pesquisaEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaxQuantidadeProduto/GetAllOfertaxQuantidadeProdutoByFiltro?produto=${formattedSearchInput}`;

    axios
      .post(pesquisaEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        globalCtxDispatch({ type: "setResultadoFiltro", value: res.data });
        // navigate(`/pesquisa`, {
        //   replace: true,
        // });
      })
      .catch((err) => {});
  };
  return (
    <SearchbarContainer>
      <Wrapper>
        <Logo
          src={logoDirectto}
          onClick={() => navigate("/", { replace: true })}
        />
        <SearchContainer>
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder={
              globalCtx.idioma ? "Pesquisar produtos" : "Search products"
            }
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <ControllerWrapper>
            {/* <SelectInput>
              <option>{globalCtx.idioma ? "Todas as Categorias" : "All Categories"}</option>
              <option>Categoria 1</option>
              <option>Categoria 2</option>
              <option>Categoria 3</option>
            </SelectInput> */}
            <FilterOption
              onClick={() =>
                globalCtxDispatch({
                  type: "abreFiltroNaPagInicial",
                  value: !globalCtx.abreFiltroNaPagInicial,
                })
              }
            >
              <FilterIcon></FilterIcon>
            </FilterOption>
            <SearchBtn onClick={pesquisaHandler}>
              <SearchIcon />
            </SearchBtn>
          </ControllerWrapper>
        </SearchContainer>
      </Wrapper>
    </SearchbarContainer>
  );
};

export default Searchbar;
