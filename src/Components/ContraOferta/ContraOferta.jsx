import React, { useState, useContext, useEffect, useRef } from "react";
import {
  CheckboxInput,
  DealContainer,
  DealHeader,
  DealTitle,
  ContraOfertaContainer,
  ProductInfo,
  ProductInfoTitle,
  ProductInfoValue,
  ProposalInput,
  ProposalMsg,
  QtdSelContainer,
  QtdSelection,
  SubmitProposalBtn,
  Value,
  ValueContainer,
  ValueSpan,
  TitleDiv,
  AumentoSpan,
  ContraofertaOverlay,
} from "./ContraOferta.styles";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import LoadingDiv from "../LoadingDiv/LoadingDiv";
import {
  calcularValorAdiantamento,
  calcularValorPagamento,
  formatarData,
  getAumentoEmPorcentagem,
  getCurrencySymbol,
  getUserRole,
  getValorFormatadoMoeda,
  getMarketplaceApiEndpoint
} from "../../generalFunctions";
import ModalCtx from "../../Context/ModalContext";
import incomeIcon from "../../Assets/income.png";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import { ButtonWrapper, CloseModalBtn, Overlay } from "../Modal/Modal.styles";
import { FlexDivCol } from "../../globalStyle";
import { Button } from "react-bootstrap";
import LoginCtx from "../../Context/LoginContext";
import { useNavigate } from "react-router";

const ContraOferta = ({ objOferta, onCloseContraoferta }) => {
  let navigate = useNavigate();
  const [valorOferta, setValorOferta] = useState();

  const { globalCtx } = useContext(GlobalDataCtx);

  //login context state
  const { state, dispatch } = useContext(LoginCtx);

  //buscando a empresa associada a esse usuario
  const empresaDoUsuarioLogado = globalCtx.listaEmpresas.find(
    (emp) => emp.EMP_UsuarioId === state.userId
  );

  //state da mensagem de erro
  const [proposalValueError, setProposalValueError] = useState(false);

  //O valor proposto pelo usuario para a compra
  const [proposalValue, setProposalValue] = useState(0);

  //aumento em porcentagem em relaçao ao valor da proposta
  const [aumentoPorcentagem, setAumentoPorcentagem] = useState(0);

  const proposalValueInput = useRef();

  //modal context
  const { modalDispatch } = useContext(ModalCtx);

  const [flagContato, setFlagContato] = useState(false);

  const [mensagemAoVendedor, setMensagemAoVendedor] = useState(false);

  const stringContraOfertaAbaixoProposta = globalCtx.idioma
    ? "O valor da Contraoferta precisa ser MAIOR que o valor da proposta."
    : "The counteroffer value must be HIGHER than the proposal.";
  const stringContraOfertaAcimaMaiorPreco = globalCtx.idioma
    ? "O valor da Contraoferta não pode ser acima do valor da oferta original."
    : "The counteroffer value cannot be higher than the original offer value.";

  //funçao q envia o obj proposta pra bse de dados
  const enviarObjProposta = (objOfertaNegociada) => {
    modalDispatch({ type: "LOADING", value: true });
    axios
      .put(
        `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/CadastroOfertaNegociacao`,
        objOfertaNegociada,
        AUTH_HEADER
      )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          modalDispatch({
            type: "CONFIG_MODAL",
            value: {
              display: true,
              title: globalCtx.idioma ? "Proposta enviada" : "Offer sent",
              headline: globalCtx.idioma
                ? "Recebemos sua proposta"
                : "We got your offer",
              icon: incomeIcon,
              text: globalCtx.idioma
                ? `Obrigado por enviar a sua proposta. Sua resposta chegará dentro de alguns dias.`
                : `Thank you for sending your offer! You will get a reply on a few days.`,
              modalWithBtn: false,
              cancelHandler: () => {
                modalDispatch({ type: "SET_DISPLAY", value: false });
                navigate("/dashboard/negociacoes", { replace: true });
              },
            },
          });
        } else {
          alert("ERRO AO ENVIAR PROPOSTA.");
          modalDispatch({ type: "SET_DISPLAY", value: false });
        }
      })
      .catch((err) => {
        modalDispatch({ type: "SET_DISPLAY", value: false });
        onCloseContraoferta();

        toast.error(err.response.data);
      });
  };

  //funçao executada quando usuario clica em 'enviar proposta'
  const submitProposalHandler = () => {
    if (proposalValue !== null && proposalValue !== 0) {
      setProposalValueError(false);

      // if (proposalValue < objOferta.OFN_ValorProposta) {
      //   toast.error(stringContraOfertaAbaixoProposta);
      //   setProposalValueError(true);
      // } else
      if (proposalValue >= objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco) {
        toast.error(stringContraOfertaAcimaMaiorPreco);
        setProposalValueError(true);
      } else {
        const objOfertaNegociada = {
          OFN_Id: 0,
          OFN_OfertaxQuantidadeProdutoId:
            objOferta.OfertaxQuantidadeProduto.OXQ_Id,
          OFN_EmpresaId: empresaDoUsuarioLogado.EMP_Id,
          OFN_StatusPagamentoId: 1,
          OFN_ContadorCliente: objOferta.OFN_ContadorCliente,
          OFN_ContadorOfertador: objOferta.OFN_ContadorOfertador,
          OFN_Peso: objOferta.OFN_Peso,
          OFN_ValorProposta: proposalValue,
          OFN_Mensagem: mensagemAoVendedor,
          OFN_FlagContato: flagContato,
          OFN_FlagAceite: false,
          OFN_FlagDirectto: false,

          OFN_FlagVendedor:
            getUserRole(
              state.empresaId,
              objOferta.OFN_EmpresaOriginalId,
              objOferta.OfertaxQuantidadeProduto.Oferta.Empresa.EMP_Id,
              true,
              globalCtx.idioma
            ) === 2
              ? true
              : false,

          OFN_EmpresaOriginalId: objOferta.OFN_EmpresaOriginalId,
        };

        modalDispatch({
          type: "CONFIG_MODAL",
          value: {
            display: true,
            title: globalCtx.idioma
              ? "Confirmar contraoferta"
              : "Confirm offer",
            text: "Confirmar contraoferta?",
            modalWithBtn: true,
            cancelHandler: () => {
              modalDispatch({ type: "SET_DISPLAY", value: false });
            },
            confirmHandler: () => {
              enviarObjProposta(objOfertaNegociada);
            },
          },
        });
      }
    } else {
      toast.error("Informe um valor de contraoferta.");
      setProposalValueError(true);
    }
  };

  useEffect(() => {
    setProposalValue(objOferta.OFN_ValorProposta);
  }, []);

  const aumentarValorHandler = (porcentagem) => {
    const aumento = parseInt(proposalValue) * (porcentagem / 100);
    setProposalValue((parseInt(proposalValue) + parseInt(aumento)).toFixed(0));
    proposalValueInput.current.value = (
      parseInt(proposalValue) + parseInt(aumento)
    ).toFixed(0);
    toast.success(
      globalCtx.idioma
        ? `+${porcentagem}% no valor da Contraoferta`
        : `+${porcentagem}% on Counteroffer value`
    );
    setAumentoPorcentagem(aumentoPorcentagem + porcentagem);
  };

  ///////////////////////////////////////////////////// JSX //////////////////////////////////////////////////////////////////

  return (
    <>
      <ContraOfertaContainer>
        {objOferta ? (
          <>
            <DealHeader>
              <TitleDiv>
                {" "}
                <DealTitle>
                  {globalCtx.idioma ? "Fazer Contraoferta" : "Counteroffer"}
                </DealTitle>
                <CloseModalBtn onClick={onCloseContraoferta} />
              </TitleDiv>

              <ValueContainer>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ValueSpan>
                    {globalCtx.idioma
                      ? "Valor Original da Oferta"
                      : "Original Offer Value"}
                  </ValueSpan>
                  <Value>
                    {getValorFormatadoMoeda(
                      objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco,
                      objOferta.OfertaxQuantidadeProduto.Moeda.MOE_Id
                    )}
                  </Value>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  {" "}
                  <ValueSpan>
                    {globalCtx.idioma ? "Valor Proposto" : "Proposed Value"}
                  </ValueSpan>
                  <Value>
                    {getValorFormatadoMoeda(
                      objOferta.OFN_ValorProposta,
                      objOferta.OfertaxQuantidadeProduto.Moeda.MOE_Id
                    )}
                  </Value>
                </div>
              </ValueContainer>
            </DealHeader>
            <DealContainer>
              <QtdSelContainer>
                <QtdSelection>
                  {objOferta.OfertaxQuantidadeProduto.OXQ_Peso}{" "}
                  {objOferta.OfertaxQuantidadeProduto.UnidadePeso.UNP_Descricao}
                </QtdSelection>
              </QtdSelContainer>
              <hr></hr>
              <ProductInfo>
                <ProductInfoTitle>
                  {globalCtx.idioma ? "Produto" : "Product"}
                </ProductInfoTitle>
                <ProductInfoValue>
                  {" "}
                  {globalCtx.idioma
                    ? objOferta.OfertaxQuantidadeProduto.Oferta?.Produto
                        ?.PDT_Descricao
                    : objOferta.OfertaxQuantidadeProduto.Oferta?.Produto
                        ?.PDT_DescricaoIngles}
                </ProductInfoValue>
              </ProductInfo>
              <ProductInfo>
                <ProductInfoTitle>Volume</ProductInfoTitle>
                <ProductInfoValue>
                  {objOferta.OfertaxQuantidadeProduto.OXQ_Peso}{" "}
                  {objOferta.OfertaxQuantidadeProduto.UnidadePeso.UNP_Descricao}
                </ProductInfoValue>
              </ProductInfo>
              <ProductInfo>
                <ProductInfoTitle>
                  {globalCtx.idioma ? "Entrega" : "Delivery"}
                </ProductInfoTitle>
                <ProductInfoValue>
                  {formatarData(
                    objOferta?.OfertaxQuantidadeProduto.OXQ_DataEntregaFim,
                    true
                  )}
                </ProductInfoValue>
              </ProductInfo>
              <hr></hr>
              <ProductInfo>
                <FlexDivCol>
                  {" "}
                  <ProductInfoTitle
                    error={
                      proposalValueError ||
                      proposalValue >
                        objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                    }
                  >
                    {`${
                      globalCtx.idioma
                        ? "Valor da Contraoferta em "
                        : "Counteroffer value in "
                    }
                    ${getCurrencySymbol(
                      objOferta.OfertaxQuantidadeProduto.Moeda?.MOE_Id
                    )}`}
                  </ProductInfoTitle>
                </FlexDivCol>

                <ProposalInput
                  type="number"
                  defaultValue={objOferta.OFN_ValorProposta}
                  ref={proposalValueInput}
                  // min={objOferta.OFN_ValorProposta}
                  max={objOferta.OfertaxQuantidadeProduto.OFN_MaiorPreco}
                  onChange={(e) => {
                    setProposalValueError(false);
                    setProposalValue(parseInt(e.target.value));
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onInput={(e) =>
                    (e.target.value =
                      e.target.value >
                      objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                        ? objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                        : Math.abs(e.target.value))
                  }
                  error={
                    proposalValueError ||
                    // proposalValue < objOferta.OFN_ValorProposta ||
                    proposalValue >
                      objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                  }
                />
              </ProductInfo>
              <ButtonWrapper>
                <Button
                  variant="outline-success"
                  onClick={() => aumentarValorHandler(10)}
                  disabled={
                    proposalValue >=
                    objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                  }
                >
                  +10%
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => aumentarValorHandler(25)}
                  disabled={
                    proposalValue >=
                    objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                  }
                >
                  +25%
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => aumentarValorHandler(50)}
                  disabled={
                    proposalValue >=
                    objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                  }
                >
                  +50%
                </Button>
              </ButtonWrapper>
              <hr></hr>
              <ProductInfo>
                <ProductInfoTitle>
                  {globalCtx.idioma ? "Adiantamento" : "In-advance"} (
                  {
                    objOferta.OfertaxQuantidadeProduto
                      .OXQ_PercentualAdiantamento
                  }
                  %)
                </ProductInfoTitle>
                <ProductInfoValue>
                  {calcularValorAdiantamento(
                    proposalValue,
                    objOferta.OfertaxQuantidadeProduto
                      .OXQ_PercentualAdiantamento,
                    objOferta.OfertaxQuantidadeProduto.Moeda?.MOE_Id
                  )}
                </ProductInfoValue>
              </ProductInfo>
              <ProductInfo>
                {/* <ProductInfoTitle>Pagamento Final (50%)</ProductInfoTitle>
                  <ProductInfoValue>
                    {(proposalValue / 2).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </ProductInfoValue> */}
              </ProductInfo>

              <ProductInfo>
                <ProductInfoTitle>
                  Total Proposto na Contraoferta
                </ProductInfoTitle>
                <ProductInfoValue>
                  {getValorFormatadoMoeda(
                    proposalValue,
                    objOferta.OfertaxQuantidadeProduto.Moeda.MOE_Id
                  )}
                </ProductInfoValue>
              </ProductInfo>
              {proposalValue > objOferta.OFN_ValorProposta && (
                <AumentoSpan
                  error={
                    proposalValue >=
                    objOferta.OfertaxQuantidadeProduto.OXQ_MaiorPreco
                  }
                >
                  {"Aumento de " +
                    getAumentoEmPorcentagem(
                      proposalValue,
                      objOferta.OFN_ValorProposta
                    ) +
                    "% em relação ao valor proposto"}
                </AumentoSpan>
              )}
              <hr />
              <span>
                {globalCtx.idioma ? "Envie uma mensagem" : "Send a message"}
              </span>
              <ProposalMsg
                maxLength={150}
                onChange={(e) => {
                  setMensagemAoVendedor(e.target.value);
                }}
              />

              <SubmitProposalBtn
                proposalState={proposalValue}
                ofertaValue={valorOferta}
                onClick={submitProposalHandler}
              >
                {proposalValue !== 0
                  ? "Propor Contraoferta"
                  : "Insira um valor de Contraoferta"}
              </SubmitProposalBtn>
            </DealContainer>
          </>
        ) : (
          <span>Carregando</span>
        )}
      </ContraOfertaContainer>
      <ContraofertaOverlay />
    </>
  );
};

export default ContraOferta;
