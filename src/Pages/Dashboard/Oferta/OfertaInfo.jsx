import React, { useState, useContext, useEffect, useRef } from "react";
import {
  AddMoreOfferSpan,
  DateInput,
  FieldDesc,
  OfertaFieldDiv,
  Input,
  InputContainer,
  OfertaDiv,
  OfertaInfoContainer,
  SectionDesc,
  SectionHeader,
  SectionTitle,
  Select,
  SelectForm,
  Subsection,
  SubsectionDesc,
  FieldInfo,
} from "./Oferta.styles";
import { Alert, Button, Form, Popover } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";

import axios from "axios";
import { AUTH_HEADER, REQ_BODY } from "../../../data";
import { OfertaCtx } from "./Oferta";
import { toast } from "react-toastify";
import { FlexDivBetween } from "../../../globalStyle";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { NumericFormat } from "react-number-format";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

let today = new Date().toISOString().slice(0, 10);

const preventMinus = (e) => {
  if (e.code === "Minus") {
    e.preventDefault();
  }
};

const preventPasteNegative = (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = parseFloat(clipboardData.getData("text"));

  if (pastedData < 0) {
    e.preventDefault();
  }
};

const OfertaInfo = () => {
  const percentualAdiantamentoRef = useRef();
  //useContext
  const {
    ofertaFormState,
    ofertaDispatch,
    firstStepError,
    stringLoading,
    stringMaxOffer,
    stringNewOffer,
    stringOther,
    stringSelect,
  } = useContext(OfertaCtx);

  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const [precoInputError, setPrecoInputError] = useState(0);

  //armazena os valores do combo QUANTIDADE DE PRODUTO - UNIDADE DE PESO
  const [comboUnidadePeso, setComboUnidadePeso] = useState(false);
  const unidadePesoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/UnidadePeso/GetAllUnidadePeso?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=UNP_Id`;

  //combo tipo produto
  const [tipoProduto, setTipoProduto] = useState(false);
  const tipoProdutoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/TipoProduto/GetAllTipoProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=TPR_Id`;

  //combo nome produto
  const [nomeProduto, setNomeProduto] = useState(false);
  const nomeProdutoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/Produto/GetAllProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=PDT_Id`;

  useEffect(() => {
    axios
      .post(unidadePesoEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => setComboUnidadePeso(response.data));
    axios
      .post(tipoProdutoEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => setTipoProduto(response.data));
    axios.post(nomeProdutoEndpoint, REQ_BODY, AUTH_HEADER).then((response) => {
      setNomeProduto(response.data);
    });
  }, []);

  const validatePrecos = (maiorPreco, menorPreco) => {
    if (maiorPreco < menorPreco) {
      setPrecoInputError(1);
      return false;
    } else if (menorPreco > maiorPreco) {
      setPrecoInputError(2);
      return false;
    } else {
      setPrecoInputError(0);
      return true;
    }
  };

  return (
    <OfertaInfoContainer>
      <SectionHeader>
        <SectionTitle>
          {globalCtx.idioma ? "Informações do Produto" : "Product Information"}
        </SectionTitle>
        <SectionDesc>
          {globalCtx.idioma
            ? "Aqui você fornecerá as informações para o cadastro de produtos na Directto. Os campos marcados com um asterisco são obrigatórios."
            : "Here you will provide the information for the registration of products on Directto. Fields marked with an asterisk are mandatory."}
        </SectionDesc>
      </SectionHeader>
      {/*==================================================*/}

      <Subsection>
        <SubsectionDesc>
          {globalCtx.idioma ? "Eu desejo" : "I want to"}
        </SubsectionDesc>
        <Form>
          <InputContainer key={`default-radio`} className="mb-3">
            <Form.Check
              name="eu-desejo"
              type="radio"
              id="vender"
              label={globalCtx.idioma ? "Vender" : "Sell"}
              style={{ marginRight: "100px" }}
              onClick={() =>
                ofertaDispatch({ type: "FlagVender", value: true })
              }
            />
            <Form.Check
              name="eu-desejo"
              type="radio"
              id="comprar"
              label={globalCtx.idioma ? "Comprar" : "Buy"}
              checked={ofertaFormState.OFE_FlagVender === false}
              onClick={() =>
                ofertaDispatch({ type: "FlagVender", value: false })
              }
            />
          </InputContainer>
        </Form>
      </Subsection>

      <hr></hr>
      {/*==================================================*/}

      <Subsection>
        <SubsectionDesc
          naoFoiPreenchido={
            firstStepError && ofertaFormState.OFE_FlagMercadoExterno === null
          }
        >
          {globalCtx.idioma ? "No mercado" : "In the market"}
        </SubsectionDesc>
        <Form>
          <InputContainer key={`default-radio`} className="mb-3">
            <Form.Check
              name="no-mercado"
              type="radio"
              id="interno"
              label={globalCtx.idioma ? "Brasileiro" : "Brazilian"}
              style={{ marginRight: "100px" }}
              onClick={() => ofertaDispatch({ type: "Mercado", value: false })}
              checked={ofertaFormState.OFE_FlagMercadoExterno === false}
            />
            <Form.Check
              name="no-mercado"
              type="radio"
              id="externo"
              label={globalCtx.idioma ? "Internacional" : "International"}
              onClick={() => ofertaDispatch({ type: "Mercado", value: true })}
              checked={ofertaFormState.OFE_FlagMercadoExterno}
            />
          </InputContainer>
        </Form>
      </Subsection>

      <hr></hr>
      {/*==================================================*/}

      <Subsection>
        <SubsectionDesc
          naoFoiPreenchido={
            firstStepError &&
            ofertaFormState.OFE_ProdutoId === null &&
            ofertaFormState.OFE_TipoProdutoId === null
          }
        >
          {globalCtx.idioma ? "Produto" : "Product"}
        </SubsectionDesc>
        <Form>
          {/* <InputContainer key={`default-radio`} className="mb-3">
              <Form.Check
                name="cat-produto"
                type="radio"
                id="commodity"
                label="Commodity"
                style={{ marginRight: "100px" }}
              />
              <Form.Check name="cat-produto" type="radio" id="industrializados" label="Industrializados" />
            </InputContainer> */}
        </Form>
        <SelectForm>
          <OfertaFieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                firstStepError && ofertaFormState.OFE_TipoProdutoId === null
              }
            >
              {globalCtx.idioma ? "Categoria do Produto*" : "Product Category*"}
            </FieldDesc>
            <Select
              value={
                ofertaFormState.OFE_TipoProdutoId !== null &&
                ofertaFormState.OFE_TipoProdutoId
              }
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  ofertaDispatch({ type: "TipoProduto", value: null });
                } else {
                  ofertaDispatch({
                    type: "TipoProduto",
                    value: parseInt(e.target.value),
                  });
                }
              }}
            >
              {tipoProduto ? (
                <>
                  <option selected="selected">{stringSelect}</option>
                  {tipoProduto?.map((tp) => (
                    <option value={tp.TPR_Id} key={tp.TPR_Id}>
                      {globalCtx.idioma
                        ? tp.TPR_Descricao
                        : tp.TPR_DescricaoIngles}
                    </option>
                  ))}
                </>
              ) : (
                <option selected="selected">
                  {globalCtx.idioma ? "Carregando..." : "Loading..."}
                </option>
              )}
            </Select>
          </OfertaFieldDiv>
          {/* <OfertaFieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                firstStepError && ofertaFormState.OFE_ProdutoId === null
              }
            >
              {globalCtx.idioma ? "Nome do Produto*" : "Product name*"}{" "}
              <FieldInfo
                data-tip={
                  globalCtx.idioma
                    ? "Nome comercial ou que forneça detalhes sobre o produto"
                    : "Trade name or providing details about the product"
                }
              />
            </FieldDesc>
            <Select
              onChange={(e) => {
                if (
                  e.target.value.length > 3 &&
                  e.target.value !== stringOther
                ) {
                  ofertaDispatch({ type: "NomeProduto", value: null });
                } else if (e.target.value === stringOther) {
                  setOutroProduto(true);
                } else {
                  ofertaDispatch({
                    type: "NomeProduto",
                    value: parseInt(e.target.value),
                  });
                  setOutroProduto(false);
                }
              }}
            >
              {" "}
              {nomeProduto ? (
                <>
                  <option selected="selected">{stringSelect}</option>
                  {nomeProduto?.map((pdt) => (
                    <option value={pdt.PDT_Id} key={pdt.PDT_Id}>
                      {globalCtx.idioma
                        ? pdt.PDT_Descricao
                        : pdt.PDT_DescricaoIngles}
                    </option>
                  ))}
                  <option value={stringOther}>{stringOther}</option>
                </>
              ) : (
                <option selected="selected">{stringSelect}</option>
              )}
            </Select>
            {/* <Input w={350} type="text" maxLength="20" onChange={(e) => {
                  if(e.target.value.length >= 1) {
                    const inputFormatado = e.target.value.trim();
                    ofertaDispatch({ type: "NomeProduto", value: inputFormatado });
                  } else {
                    ofertaDispatch({ type: "NomeProduto", value: null });
                  }                  
                }}
               />
          </OfertaFieldDiv> */}

          <OfertaFieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                firstStepError && ofertaFormState.Produto.PDT_Nome === null
              }
            >
              {globalCtx.idioma ? "Nome do Produto*" : "Product name*"}
            </FieldDesc>
            <Input
              w={300}
              maxLength={30}
              value={
                ofertaFormState.Produto.PDT_Nome &&
                ofertaFormState.Produto.PDT_Nome
              }
              onChange={(e) => {
                if (e.target.value.length >= 1) {
                  ofertaDispatch({
                    type: "OutroProduto",
                    value: e.target.value,
                  });
                } else {
                  ofertaDispatch({ type: "OutroProduto", value: null });
                }
              }}
            ></Input>
          </OfertaFieldDiv>
        </SelectForm>
      </Subsection>

      <hr />
      {/*========================OFERTA==========================*/}
      {ofertaFormState.listaOfertaxQuantidadeProduto.map((oferta, i) => {
        return (
          <OfertaDiv>
            <Subsection>
              <FlexDivBetween w={100}>
                <h4>
                  {globalCtx.idioma ? "Oferta" : "Offer"} {i + 1}{" "}
                  <FieldInfo
                    data-tip={
                      globalCtx.idioma
                        ? "Você pode clicar em 'Ofertar outra quantidade do mesmo produto' caso seja necessário ofertar outros volumes"
                        : "You can click on 'Offer another quantity of the same product' if you need to offer other volumes"
                    }
                  />{" "}
                </h4>
                {i > 0 && (
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      ofertaDispatch({
                        type: "RemoverOfertaNoIndex",
                        value: i,
                      });
                      toast.success(`Oferta ${i + 1} removida`);
                    }}
                  >
                    {globalCtx.idioma
                      ? `Remover oferta ${i + 1}`
                      : `Delete Offer ${i + 1}`}
                  </Button>
                )}
              </FlexDivBetween>

              <SubsectionDesc
                naoFoiPreenchido={
                  (oferta.OXQ_Peso === null ||
                    oferta.OXQ_UnidadePesoId === null) &&
                  firstStepError
                }
              >
                {globalCtx.idioma
                  ? "Quantidade do Produto"
                  : "Product Quantity"}
              </SubsectionDesc>
              <SelectForm>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError && oferta.OXQ_Peso === null
                    }
                  >
                    {globalCtx.idioma ? "Volume*" : "Volume*"}
                  </FieldDesc>
                  <Input
                    w={150}
                    type="number"
                    value={oferta?.OXQ_Peso && oferta?.OXQ_Peso}
                    onChange={(e) => {
                      if (e.target.value.length >= 1) {
                        ofertaDispatch({
                          type: "OfertaPeso",
                          value: e.target.value,
                          index: i,
                        });
                      } else {
                        ofertaDispatch({
                          type: "OfertaPeso",
                          value: null,
                          index: i,
                        });
                      }
                    }}
                  ></Input>
                </OfertaFieldDiv>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError && oferta.OXQ_UnidadePesoId === null
                    }
                  >
                    {globalCtx.idioma ? "Unidade de Volume*" : "Volume unity*"}
                  </FieldDesc>
                  <Select
                    value={
                      oferta?.OXQ_UnidadePesoId && oferta?.OXQ_UnidadePesoId
                    }
                    onChange={(e) =>
                      e.target.value !== stringSelect
                        ? ofertaDispatch({
                            type: "OfertaUnidadePeso",
                            value: parseInt(e.target.value),
                            index: i,
                          })
                        : ofertaDispatch({
                            type: "OfertaUnidadePeso",
                            value: null,
                            index: i,
                          })
                    }
                  >
                    {comboUnidadePeso && (
                      <option selected="selected">{stringSelect}</option>
                    )}
                    {comboUnidadePeso ? (
                      comboUnidadePeso.map((el) => (
                        <option key={el.UNP_Id} value={el.UNP_Id}>
                          {el.UNP_Descricao}
                        </option>
                      ))
                    ) : (
                      <option selected="selected">{stringLoading}</option>
                    )}
                  </Select>
                </OfertaFieldDiv>
              </SelectForm>
              <SubsectionDesc
                naoFoiPreenchido={
                  (oferta.OXQ_MoedaId === null ||
                    oferta.OXQ_MenorPreco === null ||
                    oferta.OXQ_MaiorPreco === null ||
                    oferta.OXQ_PercentualAdiantamento === null) &&
                  firstStepError
                }
              >
                {globalCtx.idioma ? "Tipo de Pagamento" : "Payment Type"}
              </SubsectionDesc>
              {oferta?.OXQ_MaiorPreco !== null &&
                oferta?.OXQ_MenorPreco !== null &&
                oferta?.OXQ_MaiorPreco <= oferta?.OXQ_MenorPreco && (
                  <Alert variant="danger">
                    O maior preço precisa ser maior que o menor preço.
                  </Alert>
                )}
              <SelectForm>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError && oferta.OXQ_MoedaId === null
                    }
                  >
                    {globalCtx.idioma ? "Moeda*" : "Currency*"}
                  </FieldDesc>
                  <Select
                    value={oferta?.OXQ_MoedaId && oferta?.OXQ_MoedaId}
                    onChange={(e) =>
                      e.target.value !== stringSelect
                        ? ofertaDispatch({
                            type: "OfertaMoeda",
                            value: parseInt(e.target.value),
                            index: i,
                          })
                        : ofertaDispatch({
                            type: "OfertaMoeda",
                            value: null,
                            index: i,
                          })
                    }
                  >
                    <option selected="selected">{stringSelect}</option>
                    <option value={1}>Reais (BRL R$)</option>
                    <option value={2}>Dollar (USD)</option>
                  </Select>
                </OfertaFieldDiv>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      (firstStepError && oferta.OXQ_MenorPreco === null) ||
                      (oferta.OXQ_MenorPreco &&
                        oferta.OXQ_MaiorPreco &&
                        oferta.OXQ_MenorPreco >= oferta.OXQ_MaiorPreco)
                    }
                  >
                    {globalCtx.idioma ? "Menor preço*" : "Lowest price*"}
                    <FieldInfo
                      data-tip={
                        globalCtx.idioma
                          ? "Menor preço do volume total. Esse valor não será mostrado na negociação"
                          : "Lowest price for the total volume. This value will not be shown on the negotiation card"
                      }
                    />
                  </FieldDesc>
                  <NumericFormat
                    customInput={Input}
                    style={{ width: "150px" }}
                    thousandSeparator={oferta?.OXQ_MoedaId === 1 ? "." : ","}
                    prefix={oferta?.OXQ_MoedaId === 1 ? "R$ " : "USD "}
                    decimalSeparator={oferta?.OXQ_MoedaId === 1 ? "," : "."}
                    allowedDecimalSeparators={["-", ".", " "]}
                    decimalScale={2}
                    displayType="input"
                    value={oferta?.OXQ_MenorPreco}
                    onValueChange={(e) => {
                      ofertaDispatch({
                        type: "OfertaMenorPreco",
                        value: parseInt(e.value),
                        index: i,
                      });
                    }}
                  ></NumericFormat>
                </OfertaFieldDiv>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      (firstStepError && oferta.OXQ_MaiorPreco === null) ||
                      (oferta?.OXQ_MaiorPreco !== null &&
                        oferta?.OXQ_MaiorPreco <= oferta?.OXQ_MenorPreco)
                    }
                  >
                    {globalCtx.idioma ? "Maior preço*" : "Highest price*"}{" "}
                    <FieldInfo
                      data-tip={
                        globalCtx.idioma
                          ? "Maior preço do volume total. Esse valor será mostrado na negociação"
                          : "Highest  price for the total volume. This value will be shown on the negotiation card"
                      }
                    />
                  </FieldDesc>

                  <NumericFormat
                    customInput={Input}
                    style={{ width: "150px" }}
                    thousandSeparator={oferta?.OXQ_MoedaId === 1 ? "." : ","}
                    prefix={oferta?.OXQ_MoedaId === 1 ? "R$ " : "USD "}
                    decimalSeparator={oferta?.OXQ_MoedaId === 1 ? "," : "."}
                    allowedDecimalSeparators={["-", ".", " "]}
                    decimalScale={2}
                    displayType="input"
                    value={oferta?.OXQ_MaiorPreco}
                    onValueChange={(e) => {
                      ofertaDispatch({
                        type: "OfertaMaiorPreco",
                        value: e.value ? parseInt(e.value) : 0,
                        index: i,
                      });
                    }}
                  ></NumericFormat>
                </OfertaFieldDiv>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError &&
                      oferta.OXQ_PercentualAdiantamento === null
                    }
                  >
                    {globalCtx.idioma
                      ? "Percentual de Adiantamento*"
                      : "In-Advance Percentage*"}{" "}
                    <FieldInfo
                      data-tip={
                        globalCtx.idioma
                          ? "Valor do Percentual de Adiantamento será mostrado na oferta"
                          : "In-Advance Percentage Value to be shown on the offer page"
                      }
                    />
                  </FieldDesc>
                  <Input
                    w={100}
                    min="1"
                    max="100"
                    ref={percentualAdiantamentoRef}
                    onPaste={preventPasteNegative}
                    value={
                      oferta?.OXQ_PercentualAdiantamento &&
                      oferta?.OXQ_PercentualAdiantamento
                    }
                    type="number"
                    onChange={(e) => {
                      if (e.target.value < 101) {
                        ofertaDispatch({
                          type: "OfertaAdiantamento",
                          value: e.target.value,
                          index: i,
                        });
                      } else {
                        percentualAdiantamentoRef.current.value = 100;
                      }
                    }}
                  ></Input>
                </OfertaFieldDiv>
              </SelectForm>
              <SubsectionDesc>
                {globalCtx.idioma ? "Data" : "Date"}
              </SubsectionDesc>
              <SelectForm>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError && oferta.OXQ_DataEntregaInicio === null
                    }
                  >
                    {globalCtx.idioma
                      ? "Data de Início da Entrega*"
                      : "Delivery Start Date*"}
                  </FieldDesc>
                  <DateInput
                    type="date"
                    value={
                      oferta.OXQ_DataEntregaInicio &&
                      oferta.OXQ_DataEntregaInicio
                    }
                    onKeyDown={(e) => e.preventDefault()}
                    min={today}
                    onChange={(e) =>
                      ofertaDispatch({
                        type: "OfertaDtInicio",
                        value: e.target.value,
                        index: i,
                      })
                    }
                  />
                </OfertaFieldDiv>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError && oferta.OXQ_DataEntregaFim === null
                    }
                  >
                    {globalCtx.idioma
                      ? "Data Final da Entrega*"
                      : "Delivery final date*"}
                  </FieldDesc>
                  <DateInput
                    type="date"
                    value={
                      oferta.OXQ_DataEntregaFim && oferta.OXQ_DataEntregaFim
                    }
                    onKeyDown={(e) => e.preventDefault()}
                    min={oferta.OXQ_DataEntregaInicio || today}
                    onChange={(e) =>
                      ofertaDispatch({
                        type: "OfertaDtFim",
                        value: e.target.value,
                        index: i,
                      })
                    }
                  />
                </OfertaFieldDiv>
                <OfertaFieldDiv>
                  <FieldDesc
                    naoFoiPreenchido={
                      firstStepError && oferta.OXQ_DataExpiracao === null
                    }
                  >
                    {globalCtx.idioma
                      ? "Data de Expiração da Oferta*"
                      : "Offer expiration date*"}
                  </FieldDesc>
                  <DateInput
                    type="date"
                    min={today}
                    value={oferta.OXQ_DataExpiracao && oferta.OXQ_DataExpiracao}
                    onKeyDown={(e) => e.preventDefault()}
                    onChange={(e) =>
                      ofertaDispatch({
                        type: "OfertaDtExpiracao",
                        value: e.target.value,
                        index: i,
                      })
                    }
                  />
                </OfertaFieldDiv>
              </SelectForm>
            </Subsection>
            <hr />
          </OfertaDiv>
        );
      })}

      <AddMoreOfferSpan
        onClick={() => {
          if (ofertaFormState.listaOfertaxQuantidadeProduto.length === 5) {
            toast.error(stringMaxOffer);
          } else {
            toast.success(stringNewOffer);
            ofertaDispatch({ type: "AdicionarOutraOferta" });
          }
        }}
      >
        {globalCtx.idioma
          ? "+ Ofertar outra quantidade do mesmo produto"
          : "Offer another quantity of the same product"}
      </AddMoreOfferSpan>
    </OfertaInfoContainer>
  );
};

export default OfertaInfo;
