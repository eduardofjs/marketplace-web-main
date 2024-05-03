import React, { useContext, useEffect, useState } from "react";
import {
  AboutSection,
  AboutSectionTitle,
  AboutText,
  Body,
  CheckboxInput,
  DealContainer,
  DealHeader,
  DealTitle,
  DetalhesContainer,
  AlertMsg,
  Hr,
  Info,
  InfoContainer,
  InfoDesc,
  InfoTitle,
  LeftContainer,
  MainContainer,
  ProductDesc,
  ProductInfo,
  ProductInfoTitle,
  ProductInfoValue,
  ProductStory,
  ProductTitle,
  ProposalInput,
  ProposalMsg,
  QtdSelContainer,
  QtdSelection,
  RightContainer,
  StoryInfo,
  StoryInfoTitle,
  StoryInfoValue,
  SubmitProposalBtn,
  TitleContainer,
  Value,
  ValueContainer,
  ValueSpan,
  TitleInfo,
  ProductImg,
  ImgWrapper,
} from "./Detalhes.styles";

import LoginCtx from "../../Context/LoginContext";
import { useNavigate } from "react-router";

import { useSearchParams } from "react-router-dom";

import ModalCtx from "../../Context/ModalContext";

import { AiOutlineArrowLeft } from "react-icons/ai";

import { AUTH_HEADER, produtos } from "../../data";
import HistoricoNegociacoes from "../../Components/HistoricoNegociacoes/HistoricoNegociacoes";
import { Button } from "react-bootstrap";
import GaleriaFotos from "../../Components/GaleriaFotos/GaleriaFotos";
import CertificadosProduto from "../../Components/CertificadosProduto/CertificadosProduto";
import axios from "axios";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import LoadingDiv from "../../Components/LoadingDiv/LoadingDiv";
import {
  calcularValorAdiantamento,
  calcularValorPagamento,
  formatarData,
  getCurrencySymbol,
  getValorFormatadoMoeda,
  getMarketplaceApiEndpoint
} from "../../generalFunctions";
import NegociarOferta from "../../Components/NegociarOferta/NegociarOferta";

const Detalhes = () => {
  const { globalCtx } = useContext(GlobalDataCtx);

  //pega o parametro do id do produto informado via url
  const [searchParams] = useSearchParams();
  let produtoId = searchParams.get("produtoId");

  let pagetype = searchParams.get("page-type");

  //produto exibido
  const [product, setProduct] = useState();

  //valor da oferta
  const [valorOferta, setValorOferta] = useState(false);

  let navigate = useNavigate();

  //login context
  const { state } = useContext(LoginCtx);

  //modal context
  const { modalDispatch } = useContext(ModalCtx);

  //o peso, em toneladas, selecionado
  const [selectedWeight, setSelectedWeight] = useState();

  useEffect(() => {
    if (product) {
    } else {
      const ofertaEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaxQuantidadeProduto/GetOfertaxQuantidadeProdutoById?OXQ_Id=${produtoId}&join=true`;

      axios.post(ofertaEndpoint, {}, AUTH_HEADER).then((res) => {
        setProduct(res.data);
        setValorOferta(res.data.OXQ_MaiorPreco);
      });
    }
  }, [product]);

  return (
    <DetalhesContainer>
      {product ? (
        <Body>
          <LeftContainer>
            <MainContainer>
              {" "}
              <Button
                variant="outline-success"
                onClick={() => navigate("/", { replace: true })}
                style={{ marginBottom: "10px" }}
              >
                <AiOutlineArrowLeft />
                {globalCtx.idioma ? " Voltar" : " Back"}
              </Button>
              <TitleContainer>
                <TitleInfo>
                  {" "}
                  {!state?.userLoggedIn && pagetype === "negociar" && (
                    <AlertMsg>
                      {globalCtx.idioma
                        ? "Negociações são disponíveis apenas para usuários logados."
                        : "Deals can only be made by logged-in users."}
                      <a href="./login">
                        {globalCtx.idioma
                          ? "Clique aqui para fazer log-in"
                          : "Click here to log in."}
                      </a>
                    </AlertMsg>
                  )}
                  <ProductTitle>
                    {product?.Oferta?.Produto?.PDT_Nome}
                  </ProductTitle>
                  <ProductDesc>
                    {globalCtx.idioma
                      ? product?.Oferta?.TipoProduto?.TPR_Descricao
                      : product?.Oferta?.TipoProduto?.TPR_DescricaoIngles}
                  </ProductDesc>
                  <InfoContainer>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma ? "Cidade" : "City"}
                      </InfoTitle>
                      <InfoDesc>{`${product.Oferta.Endereco.END_Cidade}, ${product.Oferta.Endereco.END_Estado}`}</InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma
                          ? "Percentual de adiantamento"
                          : "In-advance percentage"}
                      </InfoTitle>
                      <InfoDesc>
                        {product?.OXQ_PercentualAdiantamento}%
                      </InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma ? "Colheita" : "Harvest"}
                      </InfoTitle>
                      <InfoDesc>{product?.Oferta?.OFE_AnoColheita}</InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma ? "Câmbio" : "Currency"}
                      </InfoTitle>
                      <InfoDesc>{product?.Moeda?.MOE_Nome}</InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma
                          ? "Sistema Produtivo"
                          : "Production system"}
                      </InfoTitle>
                      <InfoDesc>
                        {globalCtx.idioma
                          ? product?.Oferta?.ModoCultivoSistemaProdutivo
                              .MCS_Descricao
                          : product?.Oferta?.ModoCultivoSistemaProdutivo
                              .MCS_DescricaoIngles}
                      </InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma
                          ? "Modo de Produção"
                          : "Production mode"}
                      </InfoTitle>
                      <InfoDesc>
                        {globalCtx.idioma
                          ? product?.Oferta?.ModoCultivoModoProducao
                              .MCM_Descricao
                          : product?.Oferta?.ModoCultivoModoProducao
                              .MCM_DescricaoIngles}
                      </InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma
                          ? "Status de Produção"
                          : "Production Status"}
                      </InfoTitle>
                      <InfoDesc>
                        {globalCtx.idioma
                          ? product?.Oferta?.StatusProduto?.SPR_Descricao
                          : product?.Oferta?.StatusProduto?.SPR_DescricaoIngles}
                      </InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>Volume</InfoTitle>
                      <InfoDesc>{`${product.OXQ_Peso} ${product.UnidadePeso.UNP_Descricao}`}</InfoDesc>
                    </Info>
                    {/* <Info>
                      <InfoTitle>Informações Adicionais</InfoTitle>
                      <InfoDesc>
                        Adiantamento pode ser negociado a depender da quantidade
                        negociada
                      </InfoDesc>
                      <InfoDesc>
                        Podemos enviar em embalagens de 10kg, 20kg ou 50kg.
                      </InfoDesc>
                    </Info> */}
                  </InfoContainer>
                </TitleInfo>
                <ImgWrapper>
                  {" "}
                  <ProductImg
                    src={product?.Oferta?.TipoProduto?.TPR_PathUrlOferta}
                  />
                </ImgWrapper>
              </TitleContainer>
              <Hr />
              <AboutSection>
                <AboutSectionTitle>
                  {globalCtx.idioma ? "Sobre o produto" : "About the product"}
                </AboutSectionTitle>
                <AboutText>{product?.Oferta?.OFE_Descricao}</AboutText>
              </AboutSection>
            </MainContainer>
          </LeftContainer>
          {state?.userLoggedIn && pagetype === "negociar" && (
            <NegociarOferta produto={product} />
          )}
        </Body>
      ) : (
        <LoadingDiv loadingMsg="Carregando oferta..." />
      )}
      {/* {pagetype === "detalhes" && (
        <AboutSellerContainer>
          <AboutSellerTitle>Sobre o vendedor</AboutSellerTitle>
          <SellerInfoContainer>
            <SellerName>Marcelo</SellerName>
            <SellerOrigin>Amazonas, AM</SellerOrigin>
            <SellerDesc>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores laborum atque culpa quos laboriosam?
              Obcaecati vero porro iste, possimus odit qui laboriosam nulla rerum optio, sunt ad earum autem nihil!
              Suscipit ab neque laboriosam numquam tempora odio fuga blanditiis soluta!
            </SellerDesc>
          </SellerInfoContainer>
        </AboutSellerContainer>
      )}
      {pagetype === "detalhes" && (
        <ServicesContainer>
          <h3>Serviços adicionais</h3>
          <FlexWrap>
            <Service>Recolha na origem</Service>
            <Service>Despesas da estiva à descarga</Service>
            <Service>Carregamento no caminhão</Service>
            <Service>Seguro</Service>
            <Service>Recolha na origem</Service>
            <Service>Seguro</Service>
            <Service>Carregamento no caminhão</Service>
            <Service>Despesas da estiva à descarga</Service>
          </FlexWrap>
        </ServicesContainer>
      )} */}
      {product?.Oferta?.listaOfertaxDocumento.length !== 0 && (
        <GaleriaFotos fotos={product?.Oferta?.listaOfertaxDocumento} />
      )}

      {/* <HistoricoNegociacoes /> */}
      {/* <ProductStory>
        <h3>{globalCtx.idioma ? "Histórico do produto" : "Product history"}</h3>
        <InfoContainer>
          <StoryInfo>
            <StoryInfoTitle>
              {globalCtx.idioma ? "Pagamento antecipado" : "In-advance payment"}{" "}
              (50%)
            </StoryInfoTitle>
            <StoryInfoValue>R$ 73.080</StoryInfoValue>
          </StoryInfo>
          <StoryInfo>
            {/* <StoryInfoTitle>Pagamento final (50%):</StoryInfoTitle>
            <StoryInfoValue>R$ 73.080</StoryInfoValue>}
          </StoryInfo>
          <StoryInfo>
            <StoryInfoTitle>Subtotal:</StoryInfoTitle>
            <StoryInfoValue>R$ 73.080</StoryInfoValue>
          </StoryInfo>

          <StoryInfo>
            <StoryInfoTitle>Total:</StoryInfoTitle>
            <StoryInfoValue>R$ 73.080</StoryInfoValue>
          </StoryInfo>
        </InfoContainer>
      </ProductStory> */}
      <CertificadosProduto />
    </DetalhesContainer>
  );
};

export default Detalhes;
