import React, { useContext, useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";
import LoginCtx from "../../../Context/LoginContext";
import {
  InfoTitle,
  InfoValue,
  InfoWrapper,
  OrderContainer,
  OrderHeader,
  OrderInfo,
  OrderInfoContainer,
} from "../OrderDetails/OrderDetails.styles";
import { Alert, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Tooltip from "react-bootstrap/Tooltip";

import {
  ActionBtn,
  ActionDiv,
  DocDetails,
  DocName,
  DocStats,
  DocumentationContainer,
  DocumentationItem,
  DocumentationList,
  FileContainer,
  Icon,
  NewDocContainer,
  NewDocInput,
  ProgressBarContainer,
  ReviewPageContainer,
} from "./ReviewPage.styles";
import { BiImageAdd } from "react-icons/bi";
import { ProgressBar } from "react-bootstrap";
import {
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsCloudUpload, BsPencil, BsTrash } from "react-icons/bs";

import { useSearchParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { DashCtx } from "../Dashboard";
import { NegociarBtn } from "../../../Components/ListaProdutosSection/ListaProdutosSection.styles";
import { Input } from "../Oferta/Oferta.styles";
import { ButtonWrapper } from "../../RecuperarSenha/RecuperarSenha.styles";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import axios from "axios";
import { AUTH_HEADER } from "../../../data";
import LoadingDiv from "../../../Components/LoadingDiv/LoadingDiv";
import ModalCtx from "../../../Context/ModalContext";
import { TbDropCircle } from "react-icons/tb";
import Documento from "./Documento";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const ReviewPage = () => {
  //busca parametros na url
  const [searchParams] = useSearchParams();

  //pega o parametro do id da oferta na url
  const ofnId = searchParams.get("OFN_Id");

  //pega o parametro do id da empresa na url
  const empresaId = searchParams.get("EMP_Id");

  //pega o parametro da flag vendedor da url
  const vendedorFlag = searchParams.get("vendedor");

  //context de login
  const { state } = useContext(LoginCtx);

  //context global
  const { globalCtx, updateDataNotificacao } = useContext(GlobalDataCtx);

  //context modal
  const { modalDispatch } = useContext(ModalCtx);

  //array que armazena os documentos
  const [documentosArray, setDocumentosArray] = useState();

  const [porcentagemDocumentos, setPorcentagemDocumentos] = useState(0);

  //empresa da qual está sendo analisado e solicitado a documentação
  const [empresa, setEmpresa] = useState(false);

  const [newDocInput, setNewDocInput] = useState("Documento");

  const [modoAddDocumento, setModoAddDocumento] = useState(false);

  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  useEffect(() => {
    setLocationString(
      globalCtx.idioma ? "Detalhes da Negociação" : "Deal Details"
    );
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          {globalCtx.idioma ? "Início" : "Home"}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            navigate("/dashboard/board-operacional", { replace: true })
          }
        >
          {globalCtx.idioma ? "Board Operacional" : "Operational Board"}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            navigate("/dashboard/board-operacional/order", { replace: true })
          }
        >
          {globalCtx.idioma ? "Detalhes da Negociação" : "Negotiation details"}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {globalCtx.idioma ? "Documentação" : "Documentation"}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
    getInfoEmpresa();
    updateListaDocumentosDaEmpresa();
  }, []);

  //funçao utilizada para listar e atualizar a lista de documentos
  const updateListaDocumentosDaEmpresa = () => {
    const listaDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/GetAllOfertaNegociacaoxDocumentoByValorExato?strValorExato=${parseInt(
      empresaId
    )}&ColunaParaValorExato=OND_EmpresaId&fSomenteAtivos=true&join=true&maxInstances=0&order_by=OND_Id`;
    axios
      .post(listaDocEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setDocumentosArray(
            res.data.filter(
              (docs) => docs.OfertaNegociacao.OFN_Id === parseInt(ofnId)
            )
          );
        }
      })
      .catch((err) =>
        toast.error("Erro ao buscar lista de documentos dessa empresa.")
      );
  };

  const configPorcentagemDocsAprovados = () => {
    if (documentosArray) {
      if (documentosArray.length >= 1) {
        let todosDocumentos = documentosArray?.length;

        const docsUploadeados = documentosArray.filter(
          (documentos) =>
            documentos.OND_DocumentoId && documentos.OND_FlagAprovado !== false
        ).length;

        const docsAprovados = documentosArray.filter(
          (docs) => docs.OND_FlagAprovado === true
        );

        const porcentagem = (docsUploadeados / todosDocumentos) * 100;

        setPorcentagemDocumentos(porcentagem.toFixed(0));
      } else {
        setPorcentagemDocumentos(0);
      }
    }
  };

  useEffect(() => {
    configPorcentagemDocsAprovados();
  }, [documentosArray]);

  //funçao q pega informaçoes da empresa na API
  const getInfoEmpresa = () => {
    const empresa = globalCtx.listaEmpresas.find(
      (emp) => emp.EMP_Id === parseInt(empresaId)
    );

    setEmpresa(empresa);
  };

  //state
  const [isLoadingDocCreation, setIsLoadingDocCreation] = useState(false);

  //Funçao disparada quando o usuario clica em '✔' para adicionar o documento
  const criarDocumentoHandler = () => {
    setIsLoadingDocCreation(true);

    const criarDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/CadastroOfertaNegociacaoxDocumento`;

    const objDoc = {
      OND_Id: 0,
      OND_OfertaNegociacaoId: parseInt(ofnId),
      OND_Descricao: newDocInput,
      OND_FlagAtivo: true,
      OND_FlagIngles: false,
      OND_EmpresaId: parseInt(empresaId),
    };

    axios
      .put(criarDocEndpoint, objDoc, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          toast.success("Novo documento criado.");
          setModoAddDocumento(false);
          setIsLoadingDocCreation(false);
          updateListaDocumentosDaEmpresa();
        } else {
          toast.error("Erro vindo da base de dados: status diferente de 200");
          setModoAddDocumento(false);
          setIsLoadingDocCreation(false);
        }
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao criar documento. Tente novamente.");
        setModoAddDocumento(false);
        setIsLoadingDocCreation(false);
      });
  };

  const liberarSolicitacaoHandler = () => {
    const liberarDocsEmpresaVendedoraEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/OfertaNegociacaoLiberaOfertador?OFN_Id=${parseInt(
      ofnId
    )}`;

    const liberarDocsEmpresaCompradoraEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/OfertaNegociacaoLiberaCliente?OFN_Id=${parseInt(
      ofnId
    )}`;

    modalDispatch({
      type: "CONFIG_MODAL",
      value: {
        display: true,
        title: "Liberar Solicitação",
        text: `Confirmar liberação de solicitação de documentos para a Empresa "${empresa.EMP_RazaoSocial}"?`,
        modalWithBtn: true,

        cancelHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
        },
        confirmHandler: () => {
          modalDispatch({ type: "LOADING", value: true });

          axios
            .put(
              vendedorFlag === "true"
                ? liberarDocsEmpresaVendedoraEndpoint
                : liberarDocsEmpresaCompradoraEndpoint,
              {},
              AUTH_HEADER
            )
            .then((res) => {
              if (res.status >= 200 && res.status <= 299) {
                modalDispatch({ type: "SET_DISPLAY", value: false });
                updateDataNotificacao(parseInt(ofnId), "OFN_DataDirEtapa1");
                if (vendedorFlag === "true") {
                  updateDataNotificacao(parseInt(ofnId), "OFN_DataOferEtapa1");
                } else {
                  updateDataNotificacao(parseInt(ofnId), "OFN_DataCliEtapa1");
                }

                toast.success(
                  "A empresa recebeu a solicitação de documentos no seu Board Operacional."
                );
                updateListaDocumentosDaEmpresa();
              } else {
                toast.error("Algo de errado com a requisição para a API.");
              }
            })
            .catch((err) =>
              toast.error("Não foi possível concluir a requisição.")
            );
        },
      },
    });
  };

  return (
    <ReviewPageContainer>
      <OrderHeader>
        <DocumentationContainer>
          <h5>{globalCtx.idioma ? "Documentação" : "Documentation"}</h5>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            {empresa && (
              <span style={{ fontWeight: "700", fontSize: "14px" }}>
                {globalCtx.idioma ? "Empresa:" : "Company:"}{" "}
                {empresa.EMP_RazaoSocial}
              </span>
            )}
            {empresa && (
              <span style={{ fontWeight: "700", fontSize: "14px" }}>
                {globalCtx.idioma ? "Usuário:" : "User:"}{" "}
                {empresa.Usuario.USR_Email}
              </span>
            )}
          </div>

          <ProgressBarContainer>
            <ProgressBar
              now={porcentagemDocumentos}
              variant="success"
              striped
              animated
            />
            <span>
              {porcentagemDocumentos}%{" "}
              {globalCtx.idioma ? "completa" : "complete"}
            </span>
          </ProgressBarContainer>
          <hr />
          <DocumentationList>
            {state.perfilUsuario !== 1 && state.perfilUsuario !== 2 && (
              <Alert variant="info">
                {globalCtx.idioma
                  ? "Por favor, faça o upload dos documentos solicitados."
                  : "Please upload the requested documents."}
              </Alert>
            )}
            {documentosArray ? (
              documentosArray?.length >= 1 ? (
                documentosArray.map((documento, i) => {
                  return (
                    <Documento
                      key={i}
                      documento={documento}
                      perfilUsuario={state.perfilUsuario}
                      onUpdateLista={updateListaDocumentosDaEmpresa}
                      ofnId={ofnId}
                      vendedorFlag={vendedorFlag}
                    />
                  );
                })
              ) : (
                <Alert variant="danger">
                  {globalCtx.idioma
                    ? "Nenhum documento solicitado"
                    : "No document requested yet"}
                </Alert>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
                <ReactLoading
                  type={"spin"}
                  color={"green"}
                  height={50}
                  width={50}
                />
              </div>
            )}

            {modoAddDocumento && (
              <NewDocContainer>
                <NewDocInput
                  type="text"
                  disabled={isLoadingDocCreation}
                  placeholder="Insira o nome e informações da documentação solicitada"
                  onChange={(e) => setNewDocInput(e.target.value)}
                ></NewDocInput>{" "}
                {isLoadingDocCreation ? (
                  <ReactLoading
                    type={"spin"}
                    color={"green"}
                    height={35}
                    width={35}
                  />
                ) : (
                  <>
                    {" "}
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="outline-danger"
                      onClick={() => setModoAddDocumento(false)}
                    >
                      X
                    </Button>
                    <Button variant="success" onClick={criarDocumentoHandler}>
                      <AiOutlineCheck />
                    </Button>
                  </>
                )}
              </NewDocContainer>
            )}
          </DocumentationList>
          {(state.perfilUsuario === 1 || state.perfilUsuario === 2) && (
            <>
              <Button
                disabled={modoAddDocumento}
                variant="outline-success"
                style={{ marginBottom: "10px" }}
                onClick={() => setModoAddDocumento(true)}
              >
                {globalCtx.idioma
                  ? "+ Nova solicitação de documento"
                  : "+ New Document Request"}
              </Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "spaceBetween",
                  width: "100%",
                }}
              >
                {" "}
                <Button
                  variant="outline-secondary"
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    navigate(`board-operacional/order?OFN_id=${ofnId}`, {
                      replace: true,
                    })
                  }
                >
                  {globalCtx.idioma ? "Voltar" : "Return"}
                </Button>
                <Button
                  style={{ width: "100%" }}
                  variant="success"
                  disabled={modoAddDocumento}
                  onClick={liberarSolicitacaoHandler}
                >
                  {globalCtx.idioma
                    ? "Liberar solicitação para o cliente"
                    : "Send requests to client"}
                </Button>
              </div>
            </>
          )}
          {state.perfilUsuario !== 1 && state.perfilUsuario !== 2 && (
            <Button
              variant="outline-secondary"
              style={{ marginRight: "10px" }}
              onClick={() =>
                navigate(`board-operacional/order?OFN_id=${ofnId}`, {
                  replace: true,
                })
              }
            >
              {globalCtx.idioma ? "Voltar" : "Return"}
            </Button>
          )}
        </DocumentationContainer>
      </OrderHeader>
    </ReviewPageContainer>
  );
};

export default ReviewPage;
