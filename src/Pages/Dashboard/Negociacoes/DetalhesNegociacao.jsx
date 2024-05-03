import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Alert, Button } from "react-bootstrap";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ContraOferta from "../../../Components/ContraOferta/ContraOferta";
import {
  QtdSelContainer,
  QtdSelection,
} from "../../../Components/ContraOferta/ContraOferta.styles";
import LoadingDiv from "../../../Components/LoadingDiv/LoadingDiv";
import NegociarOferta from "../../../Components/NegociarOferta/NegociarOferta";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import LoginCtx from "../../../Context/LoginContext";
import ModalCtx from "../../../Context/ModalContext";
import { AUTH_HEADER } from "../../../data";
import {
  getStatusNegociacao,
  getUserRole,
  getValorFormatadoMoeda,
  getMarketplaceApiEndpoint
} from "../../../generalFunctions";
import { DashMainContainer } from "../../../globalStyle";
import { Hr } from "../../Cadastro/Cadastro.styles";
import {
  Info,
  InfoContainer,
  InfoDesc,
  InfoTitle,
  ProductDesc,
  TitleContainer,
  TitleInfo,
} from "../../Detalhes/Detalhes.styles";
import {
  ActionsDiv,
  DetalhesHeader,
  HeaderTitle,
} from "../GerenciamentoOfertas/GerenciamentoOfertas.styles";
import {
  DetalhesNegociacaoContainer,
  LinkSpan,
  MensagemNegociacao,
  MsgDiv,
  ProductTitle,
} from "./Negociacoes.styles";

const DetalhesNegociacao = () => {
  let navigate = useNavigate();
  //global context
  const { globalCtx } = useContext(GlobalDataCtx);

  const { state } = useContext(LoginCtx);

  const { modalDispatch } = useContext(ModalCtx);

  //query string react router v6
  const [searchParams] = useSearchParams();

  //pega o id negociacao da url
  const negociacaoId = searchParams.get("negociacaoId");

  //obj da negociacao sendo detalhada
  const [negociacaoObj, setNegociacaoObj] = useState();

  //
  const [contraOfertaModal, setContraOfertaModal] = useState();

  useEffect(() => {
    const negociacaoEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/GetOfertaNegociacaoById?OFN_Id=${negociacaoId}&join=true`;

    axios
      .post(negociacaoEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setNegociacaoObj(res.data);
        } else {
          toast.error("Ocorreu algum erro ao buscar os dados no servidor.");
        }
      })
      .catch((err) => {
        toast.error("Ocorreu algum erro ao buscar os dados no servidor.");
      });
  }, [negociacaoId]);

  //funçao executada qdo o user clica em 'Aprovar'
  const statusNegociacaoHandler = (mudarStatusAcao) => {
    let modalTitle;
    let modalText;
    let endpoint;
    let successMsg;

    if (mudarStatusAcao === 1 /* APROVAR */) {
      modalTitle = globalCtx.idioma
        ? "Aprovar Negociação"
        : "Approve Negotiation";

      modalText = globalCtx.idioma
        ? "Deseja confirmar a aprovação dessa negociação?"
        : "Do you wish to confirm the approval o this negotiation?";

      endpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/AprovarOfertaNegociacao?OFN_Id=${negociacaoObj.OFN_Id}&OFN_FlagVendedor=${negociacaoObj.OFN_FlagVendedor}`;

      successMsg = globalCtx.idioma
        ? "Negociação aprovada!"
        : "Negotiation was approved!";
    } else if (mudarStatusAcao === 2 /* REPROVAR */) {
      modalTitle = globalCtx.idioma
        ? "Reprovar Negociação"
        : "Cancel Negotiation";

      modalText = globalCtx.idioma
        ? "Deseja confirmar a reprovação dessa negociação?"
        : "Do you wish to deny/cancel this negotiation?";

      endpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/ReprovarOfertaNegociacao?OFN_Id=${negociacaoObj.OFN_Id}&OFN_FlagVendedor=${negociacaoObj.OFN_FlagVendedor}`;

      successMsg = globalCtx.idioma
        ? "Negociação reprovada!"
        : "Negotiation not accepted!";
    }

    modalDispatch({
      type: "CONFIG_MODAL",
      value: {
        display: true,
        title: modalTitle,
        text: modalText,
        modalWithBtn: true,

        cancelHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
        },
        confirmHandler: () => {
          modalDispatch({ type: "LOADING", value: true });
          axios
            .put(endpoint, {}, AUTH_HEADER)
            .then((res) => {
              if (res.status >= 200 && res.status <= 299) {
                toast.success(successMsg);
                navigate("/dashboard/negociacoes", { replace: true });

                modalDispatch({ type: "SET_DISPLAY", value: false });
              } else {
                toast.error(
                  "Algo de errado ocorreu. Não foi possível concluir a ação."
                );
                modalDispatch({
                  type: "SET_DISPLAY",
                  value: false,
                });
              }
            })
            .catch((err) => {
              toast.error(
                "Algo de errado ocorreu. Não foi possível concluir a ação."
              );
            });
        },
      },
    });
  };

  return (
    <DashMainContainer>
      {negociacaoObj ? (
        <DetalhesNegociacaoContainer>
          <DetalhesHeader>
            <h6>Detalhes da Proposta</h6>
            {state.empresaId !== negociacaoObj.OFN_EmpresaId ? (
              <ActionsDiv>
                <Button
                  variant="outline-success"
                  onClick={() => statusNegociacaoHandler(1)}
                  disabled={
                    getStatusNegociacao(
                      negociacaoObj.OFN_FlagAceite,
                      negociacaoObj.OFN_FlagAtivo
                    ) !== 3
                  }
                >
                  Aprovar
                </Button>
                <Button
                  variant="outline-danger"
                  style={{ margin: "0px 10px" }}
                  disabled={
                    getStatusNegociacao(
                      negociacaoObj.OFN_FlagAceite,
                      negociacaoObj.OFN_FlagAtivo
                    ) !== 3
                  }
                  onClick={() => statusNegociacaoHandler(2)}
                >
                  Reprovar
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ marginRight: "10px" }}
                  disabled={
                    getStatusNegociacao(
                      negociacaoObj.OFN_FlagAceite,
                      negociacaoObj.OFN_FlagAtivo
                    ) !== 3
                  }
                  onClick={() => {
                    setContraOfertaModal(true);
                  }}
                >
                  Contraoferta
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    navigate("/dashboard/negociacoes", { replace: true })
                  }
                >
                  Voltar
                </Button>
              </ActionsDiv>
            ) : (
              <ActionsDiv>
                {" "}
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    navigate("/dashboard/negociacoes", { replace: true })
                  }
                >
                  Voltar
                </Button>
              </ActionsDiv>
            )}
          </DetalhesHeader>
          <Hr />
          {getStatusNegociacao(
            negociacaoObj.OFN_FlagAceite,
            negociacaoObj.OFN_FlagAtivo
          ) === 1 &&
            (state.perfilUsuario === 1 || state.perfilUsuario === 2 ? (
              <Alert variant="success">
                {globalCtx.idioma ? (
                  <span>
                    ✔ Acesse o{" "}
                    <LinkSpan
                      onClick={() =>
                        navigate("/dashboard/board-operacional", {
                          replace: true,
                        })
                      }
                    >
                      Board Operacional
                    </LinkSpan>{" "}
                    para analisar esta negociação.
                  </span>
                ) : (
                  "✔ Go to the Operational Board to analyse this negotiation."
                )}
              </Alert>
            ) : (
              <Alert variant="success">
                {globalCtx.idioma
                  ? "✔ Essa negociação foi aprovada e está sendo analisada pela Directto. Em breve você receberá novas instruções no Board Operacional."
                  : "✔ This negotiation was approved and is now being analyzed by Directto. You will get further instructions in Operational Board soon."}
              </Alert>
            ))}
          {getStatusNegociacao(
            negociacaoObj.OFN_FlagAceite,
            negociacaoObj.OFN_FlagAtivo
          ) === 2 && (
            <Alert variant="danger">
              {globalCtx.idioma
                ? "❌ Essa negociação foi reprovada."
                : "❌ This negotiation was not accepted."}
            </Alert>
          )}
          {state.perfilUsuario !== 1 && state.perfilUsuario !== 2 && (
            <Alert>
              Você está envolvido nesta negociação como
              <strong>
                {getUserRole(
                  state.empresaId,
                  negociacaoObj.OFN_EmpresaOriginalId,
                  negociacaoObj.OfertaxQuantidadeProduto.Oferta.Empresa.EMP_Id,
                  false,
                  globalCtx.idioma
                )}
              </strong>
              .
            </Alert>
          )}
          <TitleContainer>
            <TitleInfo>
              <ProductTitle>
                {negociacaoObj.OfertaxQuantidadeProduto.Oferta.Produto.PDT_Nome}
              </ProductTitle>

              <InfoContainer>
                <Info>
                  <h4>Destino</h4>
                  <h5>
                    {
                      negociacaoObj.OfertaxQuantidadeProduto.Oferta.Endereco
                        .END_Cidade
                    }{" "}
                    -{" "}
                    {
                      negociacaoObj.OfertaxQuantidadeProduto.Oferta.Endereco
                        .END_Estado
                    }
                  </h5>
                </Info>
                <Info>
                  <h4>Valor proposto</h4>
                  <h5>
                    {getValorFormatadoMoeda(
                      negociacaoObj.OFN_ValorProposta,
                      negociacaoObj.OfertaxQuantidadeProduto.OXQ_MoedaId
                    )}
                  </h5>
                </Info>
                <Info>
                  <h4>Valor original da Oferta</h4>
                  <h5>
                    {getValorFormatadoMoeda(
                      negociacaoObj.OfertaxQuantidadeProduto.OXQ_MaiorPreco,
                      negociacaoObj.OfertaxQuantidadeProduto.OXQ_MoedaId
                    )}
                  </h5>
                </Info>
                <Info>
                  <h4>Volume</h4>
                  <QtdSelContainer>
                    <QtdSelection>
                      {" "}
                      {negociacaoObj.OFN_Peso}{" "}
                      {
                        negociacaoObj.OfertaxQuantidadeProduto.UnidadePeso
                          .UNP_Descricao
                      }
                    </QtdSelection>
                  </QtdSelContainer>
                </Info>

                <Hr />
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma ? "Empresa compradora" : "Buyer Company"}
                  </InfoTitle>
                  <InfoDesc>
                    {
                      globalCtx.listaEmpresas.find(
                        (emp) =>
                          emp.EMP_Id === negociacaoObj.OFN_EmpresaOriginalId
                      ).EMP_RazaoSocial
                    }
                  </InfoDesc>
                </Info>
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma ? "Usuário Comprador" : "Buyer User"}
                  </InfoTitle>
                  <InfoDesc>
                    {
                      globalCtx.listaEmpresas.find(
                        (emp) =>
                          emp.EMP_Id === negociacaoObj.OFN_EmpresaOriginalId
                      ).Usuario.USR_Email
                    }
                  </InfoDesc>
                </Info>
                {(state.perfilUsuario === 1 || state.perfilUsuario === 2) && (
                  <>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma
                          ? "Empresa vendedora"
                          : "Seller Company"}
                      </InfoTitle>
                      <InfoDesc>
                        {
                          negociacaoObj.OfertaxQuantidadeProduto.Oferta.Empresa
                            .EMP_RazaoSocial
                        }
                      </InfoDesc>
                    </Info>
                    <Info>
                      <InfoTitle>
                        {globalCtx.idioma ? "Usuário vendedor" : "Seller User"}
                      </InfoTitle>
                      <InfoDesc>
                        {
                          negociacaoObj.OfertaxQuantidadeProduto?.Oferta
                            ?.Empresa.Usuario?.USR_Email
                        }
                      </InfoDesc>
                    </Info>
                  </>
                )}
                <Info>
                  <InfoTitle>{globalCtx.idioma ? "Cidade" : "City"}</InfoTitle>
                  <InfoDesc>
                    {
                      negociacaoObj.OfertaxQuantidadeProduto.Oferta.Endereco
                        .END_Cidade
                    }{" "}
                    -{" "}
                    {
                      negociacaoObj.OfertaxQuantidadeProduto.Oferta.Endereco
                        .END_Estado
                    }{" "}
                  </InfoDesc>
                </Info>
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma
                      ? "Percentual de adiantamento"
                      : "In-advance percentage"}
                  </InfoTitle>
                  <InfoDesc>
                    {
                      negociacaoObj.OfertaxQuantidadeProduto
                        .OXQ_PercentualAdiantamento
                    }
                    %
                  </InfoDesc>
                </Info>
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma ? "Colheita" : "Harvest"}
                  </InfoTitle>
                  <InfoDesc>
                    {
                      negociacaoObj.OfertaxQuantidadeProduto.Oferta
                        .OFE_AnoColheita
                    }
                  </InfoDesc>
                </Info>
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma ? "Câmbio" : "Currency"}
                  </InfoTitle>
                  <InfoDesc>
                    {negociacaoObj.OfertaxQuantidadeProduto.Moeda.MOE_Nome}
                  </InfoDesc>
                </Info>
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma
                      ? "Sistema Produtivo"
                      : "Production system"}
                  </InfoTitle>
                  <InfoDesc>
                    {globalCtx.idioma
                      ? negociacaoObj.OfertaxQuantidadeProduto.Oferta
                          .ModoCultivoSistemaProdutivo.MCS_Descricao
                      : negociacaoObj.OfertaxQuantidadeProduto.Oferta
                          .ModoCultivoSistemaProdutivo.MCS_DescricaoIngles}
                  </InfoDesc>
                </Info>
                <Info>
                  <InfoTitle>
                    {globalCtx.idioma ? "Modo de Produção" : "Production mode"}
                  </InfoTitle>
                  <InfoDesc>
                    {" "}
                    {globalCtx.idioma
                      ? negociacaoObj.OfertaxQuantidadeProduto.Oferta
                          .ModoCultivoModoProducao.MCM_Descricao
                      : negociacaoObj.OfertaxQuantidadeProduto.Oferta
                          .ModoCultivoModoProducao.MCM_DescricaoIngles}
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
                      ? negociacaoObj.OfertaxQuantidadeProduto.Oferta
                          .StatusProduto.SPR_Descricao
                      : negociacaoObj.OfertaxQuantidadeProduto.Oferta
                          .StatusProduto.SPR_DescricaoIngles}
                  </InfoDesc>
                </Info>

                <MsgDiv>
                  <InfoTitle>Mensagem</InfoTitle>
                  <MensagemNegociacao>
                    {negociacaoObj.OFN_Mensagem}
                  </MensagemNegociacao>
                </MsgDiv>
              </InfoContainer>
            </TitleInfo>
          </TitleContainer>
        </DetalhesNegociacaoContainer>
      ) : (
        <LoadingDiv
          loadingMsg={
            globalCtx.idioma ? "Carregando detalhes..." : "Loading details..."
          }
        />
      )}
      {contraOfertaModal && (
        <ContraOferta
          objOferta={negociacaoObj}
          onCloseContraoferta={() => setContraOfertaModal(false)}
        />
      )}
    </DashMainContainer>
  );
};

export default DetalhesNegociacao;
