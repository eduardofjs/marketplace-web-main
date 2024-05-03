import React, { useState, useEffect, useContext } from "react";
import {
  BtnContainer,
  CategoriaTag,
  Category,
  DetailsBtn,
  ExtraTag,
  ImgContainer,
  InfoContainer,
  InfoTitle,
  InfoValue,
  InfoWrapper,
  LPSectionContainer,
  NegociarBtn,
  ProdImg,
  Product,
  ProductCode,
  ProductName,
  ProductNotFound,
  ProductShowcase,
  SelectCategoryContainer,
  TagContainer,
} from "./ListaProdutosSection.styles";
import { AUTH_HEADER } from "../../data";
import { useNavigate } from "react-router";
import LoginCtx from "../../Context/LoginContext";
import { FieldInfo } from "../../Pages/Dashboard/Oferta/Oferta.styles";
import axios from "axios";

import { formatarData } from "../../generalFunctions";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const ListaProdutosSection = ({ search, searchByTipo, onGetQtd }) => {
  let navigate = useNavigate();
  const { state } = useContext(LoginCtx);

  //query string react router v6
  const [searchParams] = useSearchParams();

  //pega o token
  const market = searchParams.get("market");

  useEffect(() => {
    if (market === "international") {
      setSelectedCategory(2);
    }
  }, [market]);

  //Lista de ofertas sendo exibida pro usuario nesse momento
  const [ofertasList, setOfertasList] = useState(false);

  //lista completa de ofertas vindo da base
  const [rawOfertasList, setRawOfertasList] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(1);

  const { globalCtx } = useContext(GlobalDataCtx);

  useEffect(() => {
    if (globalCtx.resultadoPesquisaFiltro) {
      aplicarFiltrosHandler();
    } else {
      let ofertasFiltradas;

      let formattedSearch = search
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (rawOfertasList) {
        if (searchByTipo) {
          ofertasFiltradas = rawOfertasList.filter((o) => {
            return o.Oferta.OFE_TipoProdutoId === parseInt(searchByTipo);
          });
        } else {
          ofertasFiltradas = search
            ? rawOfertasList.filter((p) =>
                p.Oferta.Produto.PDT_Nome.toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(formattedSearch)
              )
            : rawOfertasList;
        }

        switch (selectedCategory) {
          case 1:
            setOfertasList(
              ofertasFiltradas.filter(
                (o) => o.Oferta.OFE_FlagMercadoExterno === false
              )
            );
            break;

          case 2:
            setOfertasList(
              ofertasFiltradas.filter(
                (o) => o.Oferta.OFE_FlagMercadoExterno === true
              )
            );
            break;
          default:
            toast.error(
              "Categoria inexistente. Entrar em contato com suporte técnico."
            );
            break;
        }

        onGetQtd && onGetQtd(ofertasList?.length);
      } else {
        //pegando ofertas da base
        const ofertasEndpoint =
          `${getMarketplaceApiEndpoint()}/api/OfertaxQuantidadeProduto/GetAllOfertaxQuantidadeProdutoByValorExato?strValorExato=1&ColunaParaValorExato=OFE_FlagAprovado&fSomenteAtivos=true&join=true&maxInstances=0&order_by=OFE_Id`;

        axios
          .post(ofertasEndpoint, {}, AUTH_HEADER)
          .then((res) => {
            //apenas as ofertas aprovados
            setRawOfertasList(res.data);
          })
          .catch((err) => {
            toast.error(
              `Ocorreu algum erro na requisição das ofertas: ${err} `
            );
          });
      }
    }
  }, [
    selectedCategory,
    search,
    rawOfertasList,
    searchByTipo,
    globalCtx.resultadoPesquisaFiltro,
  ]);

  const aplicarFiltrosHandler = () => {
    const ofertasMercadoNacional = globalCtx.resultadoPesquisaFiltro.filter(
      (o) => o.Oferta.OFE_FlagMercadoExterno === false
    );

    const ofertasMercadoExterno = globalCtx.resultadoPesquisaFiltro.filter(
      (o) => o.Oferta.OFE_FlagMercadoExterno === true
    );
    if (selectedCategory === 1) {
      setOfertasList(ofertasMercadoNacional);
    } else {
      setOfertasList(ofertasMercadoExterno);
    }
  };

  return (
    <LPSectionContainer>
      <SelectCategoryContainer>
        <Category
          onClick={() => setSelectedCategory(1)}
          id={1}
          currentSelected={selectedCategory}
        >
          {globalCtx.idioma ? "Mercado Brasileiro" : "Brazilian Market"}{" "}
          <FieldInfo
            data-tip={
              globalCtx.idioma
                ? "Produtos da bioeconomia brasileira para o mercado nacional"
                : "Products from the Brazilian bioeconomy for the national market"
            }
          />
        </Category>
        <Category
          onClick={() => setSelectedCategory(2)}
          id={2}
          currentSelected={selectedCategory}
        >
          {globalCtx.idioma ? "Produtos para exportação" : "Products to Export"}
          <FieldInfo
            data-tip={
              globalCtx.idioma
                ? "Produtos da bioeconomia brasileira para o mercado internacional"
                : "Products from the Brazilian bioeconomy for the international market"
            }
          />
        </Category>
      </SelectCategoryContainer>

      <ProductShowcase>
        {ofertasList?.length > 0 ? (
          ofertasList?.map((p) => {
            return (
              <Product key={Math.random()}>
                <TagContainer>
                  <CategoriaTag categoria={p.Oferta.OFE_FlagVender}>
                    {p.Oferta.OFE_FlagVender
                      ? globalCtx.idioma
                        ? "Oferta"
                        : "Offer"
                      : globalCtx.idioma
                      ? "Demanda"
                      : "Demand"}
                  </CategoriaTag>
                  <ExtraTag>
                    {globalCtx.idioma
                      ? p.Oferta.ModoCultivoSistemaProdutivo.MCS_Descricao
                      : p.Oferta.ModoCultivoSistemaProdutivo
                          .MCS_DescricaoIngles}
                  </ExtraTag>
                </TagContainer>
                <ImgContainer>
                  <ProdImg src={p.Oferta.TipoProduto.TPR_PathUrlOferta} />
                </ImgContainer>

                <ProductCode>
                  {globalCtx.idioma
                    ? p.Oferta.TipoProduto.TPR_Descricao
                    : p.Oferta.TipoProduto.TPR_DescricaoIngles}{" "}
                </ProductCode>
                <ProductName>
                  {globalCtx.idioma
                    ? p.Oferta.Produto.PDT_Nome
                    : p.Oferta.Produto.PDT_Nome}
                </ProductName>
                <InfoContainer>
                  <InfoWrapper>
                    <InfoTitle>Volume</InfoTitle>
                    <InfoValue>{`${p.OXQ_Peso} ${p.UnidadePeso.UNP_Descricao}`}</InfoValue>
                  </InfoWrapper>
                  <InfoWrapper>
                    <InfoTitle>
                      {globalCtx.idioma ? "Origem" : "Origin"}
                    </InfoTitle>
                    <InfoValue>{`${p.Oferta.Endereco.END_Cidade}, ${p.Oferta.Endereco.END_Estado}`}</InfoValue>
                  </InfoWrapper>

                  <InfoWrapper>
                    <InfoTitle>
                      {globalCtx.idioma ? "Entrega" : "Delivery"}
                    </InfoTitle>
                    <InfoValue>
                      {formatarData(p.OXQ_DataEntregaFim, true)}
                    </InfoValue>
                  </InfoWrapper>
                  <InfoWrapper>
                    <InfoTitle>
                      {globalCtx.idioma ? "Expiração" : "Expiration Date"}
                    </InfoTitle>
                    <InfoValue>
                      {formatarData(p.OXQ_DataExpiracao, true)}
                    </InfoValue>
                  </InfoWrapper>
                  <InfoWrapper>
                    <InfoTitle>
                      {globalCtx.idioma ? "Pagamento" : "Payment"}
                    </InfoTitle>
                    <InfoValue>
                      {p.OXQ_PercentualAdiantamento}%{" "}
                      {globalCtx.idioma ? "Adiantado" : "In-Advance"}
                    </InfoValue>
                  </InfoWrapper>
                </InfoContainer>
                <BtnContainer>
                  <DetailsBtn
                    onClick={() => {
                      navigate(
                        `/detalhe-produto?produtoId=${p.OXQ_Id}&page-type=detalhes`,
                        { replace: true }
                      );
                    }}
                  >
                    {globalCtx.idioma ? "Detalhes" : "More Info"}
                  </DetailsBtn>
                  <NegociarBtn
                    onClick={() => {
                      if (state?.userLoggedIn !== null) {
                        navigate(
                          `/detalhe-produto?produtoId=${p.OXQ_Id}&page-type=negociar`,
                          { replace: true }
                        );
                      } else {
                        navigate("/login", { replace: true });
                      }
                    }}
                  >
                    {globalCtx.idioma ? "Negociar" : "Negotiate"}
                  </NegociarBtn>
                </BtnContainer>
              </Product>
            );
          })
        ) : (
          <ProductNotFound>
            <h3>
              {globalCtx.idioma
                ? "Nenhum produto encontrado nesta categoria."
                : "No product found on this category."}
            </h3>
          </ProductNotFound>
        )}
      </ProductShowcase>
    </LPSectionContainer>
  );
};

export default ListaProdutosSection;
