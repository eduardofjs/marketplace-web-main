import React, { useState, useContext, useEffect, useRef } from "react";
import {
  CheckboxInput,
  DealContainer,
  DealHeader,
  DealTitle,
  NegociarOfertaContainer,
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
} from "./NegociarOferta.styles";
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
import ModalCtx from "../../Context/ModalContext";
import incomeIcon from "../../Assets/income.png";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import LoginCtx from "../../Context/LoginContext";

const NegociarOferta = ({ produto }) => {
  useEffect(() => {
    setOfertaAtual(produto?.listaOXQNegociacao[0]);
    setProposalValue(produto?.listaOXQNegociacao[0].OXQ_MaiorPreco);
    setValorOferta(produto?.listaOXQNegociacao[0].OXQ_MaiorPreco);
  }, []);

  const [ofertaAtual, setOfertaAtual] = useState();

  const [valorOferta, setValorOferta] = useState();

  //state da mensagem de erro
  const [proposalValueError, setProposalValueError] = useState(false);

  //O valor proposto pelo usuario para a compra
  const [proposalValue, setProposalValue] = useState(0);

  const proposalValueInput = useRef();

  //o volume selecionado
  const [selectedWeight, setSelectedWeight] = useState();

  //modal context
  const { modalDispatch } = useContext(ModalCtx);

  const { globalCtx } = useContext(GlobalDataCtx);

  const { state } = useContext(LoginCtx);

  //buscando a empresa associada a esse usuario
  const empresaDoUsuarioLogado = globalCtx.listaEmpresas?.find(
    (emp) => emp?.EMP_UsuarioId === state.userId
  );

  const [flagContato, setFlagContato] = useState(false);

  const [mensagemAoVendedor, setMensagemAoVendedor] = useState(false);

  //funçao executada qdo o usuario troca entre as ofertas disponiveis (volumeSelecionado)
  const mudarOfertaHandler = (volumeSelecionado) => {
    const ofertaSelecionada = produto?.listaOXQNegociacao?.find(
      (oferta) => oferta.OXQ_Peso === volumeSelecionado
    );
    setOfertaAtual(ofertaSelecionada);
    proposalValueInput.current.value = ofertaSelecionada.OXQ_MaiorPreco;
  };

  const stringPropostaAbaixoDoValorMinimo = globalCtx.idioma
    ? "Valor muito baixo, aumente a oferta."
    : "Insert a valid value above the minimum offer value.";

  const stringConfirmarEnvioProposta = globalCtx.idioma
    ? `Confirmar proposta de ${getValorFormatadoMoeda(
        proposalValue,
        ofertaAtual?.OXQ_MoedaId
      )} por ${`${ofertaAtual?.OXQ_Peso} ${ofertaAtual?.UnidadePeso.UNP_Descricao}`} de ${
        ofertaAtual?.Oferta?.Produto?.PDT_Nome
      }?`
    : `Confirm offer of ${getValorFormatadoMoeda(
        proposalValue,
        ofertaAtual?.OXQ_MoedaId
      )} for ${`${ofertaAtual?.OXQ_Peso} ${ofertaAtual?.UnidadePeso.UNP_Descricao}`} of ${
        ofertaAtual?.Oferta?.Produto?.PDT_NomeIngles
      }?`;

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
              },
            },
          });
        } else {
          toast.error(
            "Erro ao enviar proposta. Status de requisição diferente de 200"
          );
          modalDispatch({ type: "SET_DISPLAY", value: false });
        }
      })
      .catch((err) => {
        modalDispatch({ type: "SET_DISPLAY", value: false });
        toast.error(err.response.data);
      });
  };

  //funçao executada quando usuario clica em 'enviar proposta'
  const submitProposalHandler = () => {
    if (empresaDoUsuarioLogado.EMP_Id === ofertaAtual.Oferta.OFE_EmpresaId) {
      toast.error("Você é o criador desta oferta.");
    } else {
      if (proposalValue !== null && proposalValue !== 0) {
        setProposalValueError(false);

        if (proposalValue < ofertaAtual.OXQ_MenorPreco) {
          toast.error(stringPropostaAbaixoDoValorMinimo);
          setProposalValueError(true);
        } else {
          const objOfertaNegociada = {
            OFN_Id: 0,
            OFN_OfertaxQuantidadeProdutoId: ofertaAtual.OXQ_Id,

            OFN_EmpresaId: empresaDoUsuarioLogado.EMP_Id,

            OFN_StatusPagamentoId: 1,
            OFN_Peso: ofertaAtual.OXQ_Peso,
            OFN_ValorProposta: proposalValue,
            OFN_Mensagem: mensagemAoVendedor,
            OFN_FlagContato: flagContato,

            OFN_FlagVendedor: false,

            OFN_EmpresaOriginalId: empresaDoUsuarioLogado.EMP_Id,
            OFN_FlagIngles: globalCtx.idioma ? true : false,
            OFN_FlagAceite: false,
            OFN_FlagDirectto: false,
          };

          modalDispatch({
            type: "CONFIG_MODAL",
            value: {
              display: true,
              title: globalCtx.idioma ? "Confirmar proposta" : "Confirm offer",
              text: stringConfirmarEnvioProposta,
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
        toast.error("Informe um valor de proposta.");
        setProposalValueError(true);
      }
    }
  };

  return (
    <NegociarOfertaContainer>
      {ofertaAtual ? (
        <>
          <DealHeader>
            <DealTitle>
              {globalCtx.idioma ? "Negociar oferta" : "Deal Offer"}
            </DealTitle>
            <ValueContainer>
              <ValueSpan>
                {globalCtx.idioma ? "Valor da Oferta" : "Offer value"}
              </ValueSpan>
              <Value>
                {ofertaAtual.Moeda?.MOE_Id === 1
                  ? ofertaAtual.OXQ_MaiorPreco.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : ofertaAtual.OXQ_MaiorPreco.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "USD",
                    })}
              </Value>
            </ValueContainer>
          </DealHeader>
          <DealContainer>
            <QtdSelContainer>
              {produto?.listaOXQNegociacao?.map((qtdOferta) => {
                return (
                  <QtdSelection
                    key={Math.random()}
                    selectedWeight={ofertaAtual.OXQ_Peso}
                    weightValue={qtdOferta.OXQ_Peso}
                    onClick={() => mudarOfertaHandler(qtdOferta.OXQ_Peso)}
                  >
                    {`${qtdOferta.OXQ_Peso} 
                        ${qtdOferta.UnidadePeso.UNP_Descricao}`}
                  </QtdSelection>
                );
              })}
            </QtdSelContainer>
            <hr></hr>
            <ProductInfo>
              <ProductInfoTitle>
                {globalCtx.idioma ? "Produto" : "Product"}
              </ProductInfoTitle>
              <ProductInfoValue>
                {" "}
                {globalCtx.idioma
                  ? ofertaAtual.Oferta?.Produto?.PDT_Descricao
                  : ofertaAtual.Oferta?.Produto?.PDT_DescricaoIngles}
              </ProductInfoValue>
            </ProductInfo>
            <ProductInfo>
              <ProductInfoTitle>Volume</ProductInfoTitle>
              <ProductInfoValue>
                {`${ofertaAtual.OXQ_Peso} ${ofertaAtual.UnidadePeso.UNP_Descricao}`}
              </ProductInfoValue>
            </ProductInfo>
            <ProductInfo>
              <ProductInfoTitle>
                {globalCtx.idioma ? "Entrega" : "Delivery"}
              </ProductInfoTitle>
              <ProductInfoValue>
                {formatarData(ofertaAtual?.OXQ_DataEntregaFim, true)}
              </ProductInfoValue>
            </ProductInfo>
            <hr></hr>
            <ProductInfo>
              <ProductInfoTitle error={proposalValueError}>
                {`${
                  globalCtx.idioma ? "Valor da oferta em " : "Offer value in "
                }
                    ${getCurrencySymbol(ofertaAtual.Moeda?.MOE_Id)}`}
              </ProductInfoTitle>

              <ProposalInput
                type="number"
                defaultValue={ofertaAtual.OXQ_MaiorPreco}
                ref={proposalValueInput}
                min={ofertaAtual.OXQ_MenorPreco}
                max={ofertaAtual.OXQ_MaiorPreco}
                placeholder={getValorFormatadoMoeda(
                  ofertaAtual.OXQ_MaiorPreco,
                  ofertaAtual.Moeda?.MOE_Id
                )}
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
                    e.target.value > ofertaAtual.OXQ_MaiorPreco
                      ? ofertaAtual.OXQ_MaiorPreco
                      : Math.abs(e.target.value))
                }
                error={proposalValueError}
              />
            </ProductInfo>
            <ProductInfo>
              <ProductInfoTitle>
                {globalCtx.idioma ? "Adiantamento" : "In-advance"} (
                {ofertaAtual.OXQ_PercentualAdiantamento}%)
              </ProductInfoTitle>
              <ProductInfoValue>
                {calcularValorAdiantamento(
                  proposalValue,
                  ofertaAtual.OXQ_PercentualAdiantamento,
                  ofertaAtual.Moeda?.MOE_Id
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
            {/* <ProductInfo>
              <ProductInfoTitle
                clickable
                onClick={() => {
                  setProposalValue(ofertaAtual.OXQ_MenorPreco);
                  proposalValueInput.current.value = ofertaAtual.OXQ_MenorPreco;
                }}
                error={proposalValue < ofertaAtual.OXQ_MenorPreco}
              >
                {globalCtx.idioma ? "Valor Mínimo" : "Minimum Value"}
              </ProductInfoTitle>
              <ProductInfoValue>
                {getValorFormatadoMoeda(
                  ofertaAtual.OXQ_MenorPreco,
                  ofertaAtual.Moeda.MOE_Id
                )}
              </ProductInfoValue>
            </ProductInfo> */}
            <ProductInfo>
              <ProductInfoTitle>Total</ProductInfoTitle>
              <ProductInfoValue>
                {getValorFormatadoMoeda(
                  ofertaAtual.OXQ_MaiorPreco,
                  ofertaAtual.Moeda.MOE_Id
                )}
              </ProductInfoValue>
            </ProductInfo>
            <hr />
            <span>
              {globalCtx.idioma
                ? "Envie uma mensagem ao vendedor"
                : "Send a message to the seller"}
            </span>
            <ProposalMsg
              maxLength={150}
              onChange={(e) => {
                setMensagemAoVendedor(e.target.value);
              }}
            />
            <CheckboxInput>
              {" "}
              <input
                type="checkbox"
                id="contatos"
                name="contatos"
                onClick={() => setFlagContato(!flagContato)}
              />
              <label for="contatos">
                {globalCtx.idioma
                  ? "Quero receber contato do Directto por e-mail, WhatsApp e outros canais."
                  : "I want to receive contact from Directto by email, WhatsApp and others"}
              </label>
            </CheckboxInput>
            <SubmitProposalBtn
              proposalState={proposalValue}
              ofertaValue={valorOferta}
              onClick={submitProposalHandler}
            >
              {proposalValue !== 0
                ? proposalValue === valorOferta
                  ? "Comprar"
                  : "Negociar valor"
                : "Insira um valor de proposta"}
            </SubmitProposalBtn>
          </DealContainer>
        </>
      ) : (
        <span>Carregando</span>
      )}
    </NegociarOfertaContainer>
  );
};

export default NegociarOferta;
