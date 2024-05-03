import axios from "axios";
import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import {
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsCloudUpload, BsPencil, BsTrash } from "react-icons/bs";
import { TbPencilOff } from "react-icons/tb";
import { toast } from "react-toastify";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import LoginCtx from "../../../Context/LoginContext";
import ModalCtx from "../../../Context/ModalContext";
import { AUTH_HEADER, UPLOAD_HEADER } from "../../../data";
import { Input } from "../Oferta/Oferta.styles";
import {
  ActionBtn,
  ActionDiv,
  DocDetails,
  DocName,
  DocStats,
  DocumentationItem,
  DocumentoWrapper,
  JustificativaSpan,
  ReprovarDocDiv,
} from "./ReviewPage.styles";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const Documento = ({
  documento,
  perfilUsuario,
  onUpdateLista,
  ofnId,
  vendedorFlag,
}) => {
  //state do modo reprovar
  const [modoReprovar, setModoReprovar] = useState();

  //state do modo editar
  const [modoEditar, setModoEditar] = useState();

  const [justificativaReprovacao, setJustificativaReprovacao] = useState();

  const { modalDispatch } = useContext(ModalCtx);

  const { state } = useContext(LoginCtx);

  const { updateDataNotificacao, globalCtx } = useContext(GlobalDataCtx);

  const updateDatasAnaliseDoc = () => {
    if (vendedorFlag === "true") {
      updateDataNotificacao(parseInt(ofnId), "OFN_DataOferEtapa2");
    } else {
      updateDataNotificacao(parseInt(ofnId), "OFN_DataCliEtapa2");
    }
  };

  const updateDatasDirectto = () => {
    updateDataNotificacao(parseInt(ofnId), "OFN_DataDirEtapa2");
  };

  const [novoNomeDocInput, setNovoNomeDocInput] = useState(false);

  //Funçao ao deletar o doc
  const deletarDocHandler = (id, doc) => {
    const deletarDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/DeletarOfertaNegociacaoxDocumento?OND_Id=${id}`;

    modalDispatch({
      type: "CONFIG_MODAL",
      value: {
        display: true,
        title: "Deletar Documento",
        text: `Confirmar exclusão da solicitação do documento "${doc}"?`,
        modalWithBtn: true,

        cancelHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
        },
        confirmHandler: () => {
          modalDispatch({ type: "LOADING", value: true });

          axios
            .put(deletarDocEndpoint, {}, AUTH_HEADER)
            .then((res) => {
              if (res.status >= 200 && res.status <= 299) {
                modalDispatch({ type: "SET_DISPLAY", value: false });

                toast.success("Documento deletado.");
                updateDatasAnaliseDoc();
                updateDatasDirectto();
                onUpdateLista();
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

  //funçao executada qdo o usuario clica pra uploadear o arquivo, mas ainda nao confirmou upload
  const onFileChange = (e) => {
    let tempArquivo = e.target.files[0];

    if (tempArquivo) {
      modalDispatch({
        type: "CONFIG_MODAL",
        value: {
          display: true,
          title: "Upload de Documento",
          text: `Confirmar upload do arquivo "${tempArquivo.name}" do tipo ${tempArquivo.type}?`,
          modalWithBtn: true,

          cancelHandler: () => {
            modalDispatch({ type: "SET_DISPLAY", value: false });
          },
          confirmHandler: () => {
            onFileUpload(tempArquivo);
          },
        },
      });
    }
  };

  //funçao executada qdo usuario confirma upload
  const onFileUpload = (arquivo) => {
    modalDispatch({ type: "LOADING", value: true });
    let nomeArquivoFormatado = arquivo.name.replace(/ /g, "_"); //corrige nome do arquivo removendo espaços

    let formData = new FormData();

    formData.append("arquivo", arquivo);

    const docString = "Documentos\\\\";

    let tipoArquivo = arquivo.type === "application/pdf" ? "PDF" : "Imagem";

    const uploadFileEndpoint = `${getMarketplaceApiEndpoint()}/api/Base/Enviar${tipoArquivo}?nome_arquivo=${nomeArquivoFormatado}&nome_pasta=${docString}${state.empresaId}`;

    axios
      .post(uploadFileEndpoint, formData, UPLOAD_HEADER)
      .then((enviarArquivoRes) => {
        if (enviarArquivoRes.status >= 200 && enviarArquivoRes.status <= 299) {
          //o retorno é o que precisa ser salvo dentro do Obj Documento

          const objDocumento = {
            DOC_Id: 0,
            DOC_TipoDocumentoId: 3,
            DOC_UsuarioId: state.userId,
            DOC_Nome: nomeArquivoFormatado,
            DOC_PathUrl: enviarArquivoRes.data.path,
            DOC_Ativo: true,
          };

          axios
            .put(
              `${getMarketplaceApiEndpoint()}/api/Documento/CadastroDocumento`,
              objDocumento,
              AUTH_HEADER
            )
            .then((cadastroDocRes) => {
              if (
                cadastroDocRes.status >= 200 &&
                cadastroDocRes.status <= 299
              ) {
                if (cadastroDocRes.data !== null) {
                  let docId = cadastroDocRes.data.DOC_Id;

                  const objDocAtualizado = {
                    OND_Id: documento.OND_Id,
                    OND_DocumentoId: docId,
                    OND_OfertaNegociacaoId: documento.OND_OfertaNegociacaoId,
                    OND_FlagAtivo: true,
                    OND_Descricao: `${documento.OND_Descricao} (${nomeArquivoFormatado})`,
                  };

                  axios
                    .put(
                      `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/CadastroOfertaNegociacaoxDocumento`,
                      objDocAtualizado,
                      AUTH_HEADER
                    )
                    .then((res) => {
                      if (res.status >= 200 && res.status <= 299) {
                        if (res.data !== null) {
                          modalDispatch({
                            type: "SET_DISPLAY",
                            value: false,
                          });
                          toast.success(
                            `Documento "${nomeArquivoFormatado}" enviado com sucesso`
                          );
                          updateDatasAnaliseDoc();
                          onUpdateLista();
                        }
                      } else {
                        toast.error("ERRO AO ATUALIZAR DOCUMENTO.");
                      }
                    })
                    .catch((err) =>
                      toast.error("ERRO AO ATUALIZAR DOCUMENTO.")
                    );
                } else {
                  toast.error(`Algo deu errado ao subir o documento.`);
                }
              }
            })
            .catch((err) => {
              toast.error(`Algo deu errado ao subir o documento.`);
            });
        }
      })
      .catch((err) => {
        toast.error(`Algo deu errado ao subir o documento.`);
      });
  };

  //funçao que exibe documento
  const visualizarDocumentoHandler = (id) => {
    const getDocEndpoint = `${getMarketplaceApiEndpoint()}/api/Documento/GetDocumentoById?DOC_Id=${id}&join=true`;

    axios
      .post(getDocEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        const win = window.open(res.data.DOC_PathUrl, "_blank");
        win.focus();
      })
      .catch((err) =>
        toast.error("Ops! Algo de errado ao carregar o documento.")
      );
  };

  //funçao q aprova documento
  const controleDocHandler = (documento, aprovar, justificativa) => {
    modalDispatch({ type: "LOADING", value: true });
    const objDocAprovado = {
      OND_Id: documento.OND_Id,
      OND_DocumentoId: documento.OND_DocumentoId,
      OND_OfertaNegociacaoId: documento.OND_OfertaNegociacaoId,
      OND_FlagAtivo: true,
      OND_Descricao: documento.OND_Descricao,
      OND_FlagAprovado: true,
    };
    const objDocReprovado = {
      OND_Id: documento.OND_Id,
      OND_DocumentoId: null,
      OND_OfertaNegociacaoId: documento.OND_OfertaNegociacaoId,
      OND_FlagAtivo: true,
      OND_Descricao: documento.OND_Descricao,
      OND_FlagAprovado: false,
      OND_Justificativa: justificativa,
    };

    let endpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/CadastroOfertaNegociacaoxDocumento`;

    axios
      .put(endpoint, aprovar ? objDocAprovado : objDocReprovado, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          modalDispatch({ type: "SET_DISPLAY", value: false });
          toast.success(
            `Documento marcado como ${aprovar ? "APROVADO" : "REPROVADO"}.`
          );
          onUpdateLista();
          updateDatasDirectto();
          updateDatasAnaliseDoc();
        } else {
          modalDispatch({ type: "SET_DISPLAY", value: false });
          toast.error("Ops! Requisição retornou com status !== 200");
        }
      })
      .catch((err) => {
        modalDispatch({ type: "SET_DISPLAY", value: false });
        toast.error("Algo deu errado.");
      });
  };

  //retorna o status do documento
  const getDocStatus = (documento, retornarString) => {
    let stringDocPendente = globalCtx.idioma
      ? "Documento pendente"
      : "Pending document";

    let stringEnviadoDirectto = globalCtx.idioma
      ? "Análise pendente"
      : "Pending analysis";

    let stringEnviado = globalCtx.idioma
      ? "Documento enviado - Aguardando análise da Directto"
      : "Document sent - waiting Directto's analysis";

    let stringAprovado = globalCtx.idioma ? "Documento aprovado" : "Approved";

    let stringReprovado = globalCtx.idioma ? "Documento reprovado" : "Denied  ";

    if (documento.OND_DocumentoId) {
      if (documento.OND_FlagAprovado !== null) {
        if (documento.OND_FlagAprovado) {
          return retornarString ? stringAprovado : 2;
        } else {
          return retornarString ? stringReprovado : 3;
        }
      }
      return retornarString
        ? perfilUsuario === 1 || perfilUsuario === 2
          ? stringEnviadoDirectto
          : stringEnviado
        : 1;
    } else {
      if (documento.OND_FlagAprovado === false) {
        return retornarString ? stringReprovado : 3;
      } else {
        return retornarString ? stringDocPendente : 0;
      }
    }
  };

  //edita o nome do doc
  const editarDocHandler = () => {
    setModoEditar(false);

    const editarDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/CadastroOfertaNegociacaoxDocumento`;

    const objDocEditado = {
      OND_Id: documento.OND_Id,
      OND_DocumentoId: documento.OND_DocumentoId,
      OND_OfertaNegociacaoId: documento.OND_OfertaNegociacaoId,
      OND_FlagAtivo: documento.OND_FlagAtivo,
      OND_Descricao: novoNomeDocInput,
      OND_FlagAprovado: documento.OND_FlagAprovado,
    };

    axios
      .put(editarDocEndpoint, objDocEditado, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          toast.success("Documento editado.");
          onUpdateLista();
          updateDatasDirectto();
          updateDatasAnaliseDoc();
        } else {
          toast.error("Erro vindo da base de dados: status diferente de 200");
        }
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao editar o documento. Tente novamente.");
      });
  };

  return (
    <DocumentoWrapper>
      <DocumentationItem>
        <DocDetails>
          {modoEditar ? (
            <div>
              <input
                style={{ padding: "5px" }}
                type="text"
                placeholder={documento.OND_Descricao}
                onChange={(e) => setNovoNomeDocInput(e.target.value)}
              ></input>
              <Button
                style={{ marginLeft: "5px" }}
                variant="outline-success"
                disabled={!novoNomeDocInput}
                onClick={editarDocHandler}
              >
                <AiOutlineCheck />
              </Button>
            </div>
          ) : (
            <DocName>
              <AiOutlineFileText style={{ fontSize: "22px" }} />{" "}
              {documento.OND_Descricao}
            </DocName>
          )}
          <DocStats status={getDocStatus(documento, false)}>
            {getDocStatus(documento, true)}
          </DocStats>

          {getDocStatus(documento, false) === 3 && (
            <JustificativaSpan>
              <bold>{globalCtx.idioma ? "Motivo:" : "Reason:"}</bold>{" "}
              {documento.OND_Justificativa}
            </JustificativaSpan>
          )}
        </DocDetails>

        {perfilUsuario === 1 || perfilUsuario === 2 ? (
          // BOTÕES DE CONTROLE DE DOCUMENTAÇÃO DO MASTER
          <ActionDiv>
            {documento.OND_DocumentoId && (
              <ActionBtn
                onClick={() =>
                  visualizarDocumentoHandler(documento.OND_DocumentoId)
                }
              >
                <AiFillEye />
              </ActionBtn>
            )}
            {!documento.OND_DocumentoId && (
              <ActionBtn
                onClick={() => setModoEditar(!modoEditar)}
                style={{ color: "#106cc8", fontSize: "18px" }}
              >
                {modoEditar ? <TbPencilOff /> : <BsPencil />}
              </ActionBtn>
            )}

            {documento.OND_DocumentoId && (
              <ActionBtn
                onClick={() => {
                  modalDispatch({
                    type: "CONFIG_MODAL",
                    value: {
                      display: true,
                      title: "Aprovar Documento",
                      text: `Você deseja APROVAR o documento "${documento.OND_Descricao}"?`,
                      modalWithBtn: true,

                      cancelHandler: () => {
                        modalDispatch({ type: "SET_DISPLAY", value: false });
                      },
                      confirmHandler: () => {
                        setModoReprovar(false);
                        controleDocHandler(documento, true);
                      },
                    },
                  });
                }}
              >
                <AiOutlineCheck style={{ color: "green" }} />
              </ActionBtn>
            )}
            {documento.OND_DocumentoId && (
              <ActionBtn onClick={() => setModoReprovar(!modoReprovar)}>
                <AiOutlineClose style={{ color: "tomato" }} />
              </ActionBtn>
            )}

            <ActionBtn
              onClick={() =>
                deletarDocHandler(documento.OND_Id, documento.OND_Descricao)
              }
            >
              <BsTrash style={{ color: "tomato" }} />
            </ActionBtn>
          </ActionDiv>
        ) : (
          //BOTOÕES DE CONTROLE DE DOCUMENTAÇÃO DA EMPRESA COMPRADORA E VENDEDORA
          <ActionDiv>
            {documento.OND_DocumentoId ? (
              <ActionBtn
                onClick={() =>
                  visualizarDocumentoHandler(documento.OND_DocumentoId)
                }
              >
                <AiFillEye />
              </ActionBtn>
            ) : (
              <>
                {" "}
                <Input
                  w={380}
                  type="file"
                  id="upload-dcs"
                  style={{ display: "none" }}
                  accept="application/pdf, image/png, image/jpeg"
                  onChange={onFileChange}
                ></Input>
                <ActionBtn
                  style={{
                    color: "#106cc8",
                    fontSize: "26px",
                  }}
                >
                  <label for="upload-dcs">
                    <BsCloudUpload style={{ cursor: "pointer" }} />
                  </label>
                </ActionBtn>
              </>
            )}
          </ActionDiv>
        )}
      </DocumentationItem>
      {modoReprovar && (
        <ReprovarDocDiv>
          <input
            type="text"
            placeholder="Justificativa de reprovação"
            onChange={(e) => setJustificativaReprovacao(e.target.value)}
          ></input>
          <Button
            variant="outline-danger"
            disabled={!justificativaReprovacao}
            onClick={() => {
              modalDispatch({
                type: "CONFIG_MODAL",
                value: {
                  display: true,
                  title: "Reprovar Documento",
                  text: `Você deseja REPROVAR o documento "${documento.OND_Descricao}" pelo motivo "${justificativaReprovacao}"?`,
                  modalWithBtn: true,

                  cancelHandler: () => {
                    modalDispatch({ type: "SET_DISPLAY", value: false });
                  },
                  confirmHandler: () => {
                    setModoReprovar(false);
                    controleDocHandler(
                      documento,
                      false,
                      justificativaReprovacao
                    );
                  },
                },
              });
            }}
          >
            Reprovar
          </Button>
        </ReprovarDocDiv>
      )}
    </DocumentoWrapper>
  );
};

export default Documento;
