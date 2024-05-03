import axios from "axios";
import React, { useContext, useState, useEffect, useReducer } from "react";
import { Alert, Breadcrumb, Button, Form, Table } from "react-bootstrap";
import { AUTH_HEADER, REQ_BODY } from "../../../data";
import { DashMainContainer, Input } from "../../../globalStyle";
import ReactLoading from "react-loading";
import { DashCtx } from "../Dashboard";
import {
  ActionsDiv,
  DadosOfertaDiv,
  DadosEmpresaDiv,
  DetalhesDiv,
  DetalhesHeader,
  OfertaRow,
  FieldTitle,
  FieldWrapper,
  HeaderTitle,
  ListaDiv,
  LoadingDiv,
  PesquisaDiv,
  SectionTitle,
} from "./GerenciamentoOfertas.styles";
import { Hr } from "../../Cadastro/Cadastro.styles";

import {
  getTipoString,
  getStatusAprovacaoOferta,
  formatarData,
  getMarketplaceApiEndpoint
} from "../../../generalFunctions";
import { AiOutlineUser } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";
import ModalCtx from "../../../Context/ModalContext";
import stringMask from "string-mask";
import { useRef } from "react";
import reactSelect from "react-select";
import { toast } from "react-toastify";
import { Select } from "../Oferta/Oferta.styles";
import { OfertaCtx } from "../Oferta/Oferta";
import EditarOfertaForm from "./EditarOfertaForm";
import { objOfertaInicial, ofertaReducer } from "../Oferta/funcoesOferta";

let cnpjFormatter = new stringMask("00.000.000/0000-00");
let cpfFormatter = new stringMask("000.000.000-00");

const ofertasEndpoint =
  `${getMarketplaceApiEndpoint()}/api/Oferta/GetAllOferta?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=OFE_Id`;

const GerenciamentoOfertas = () => {
  //manutençao do estado do obj a ser enviado para api
  let [ofertaFormState, ofertaDispatch] = useReducer(
    ofertaReducer,
    objOfertaInicial
  );

  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  const { modalDispatch } = useContext(ModalCtx);

  const [ofertas, setOfertas] = useState();

  const [pesquisaAtivada, setPesquisaAtivada] = useState(false);
  const [pesquisaLog, setPesquisaLog] = useState(false);

  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const [ofertaDetalhes, setOfertaDetalhes] = useState();

  const [empresaDetalhes, setEmpresaDetalhes] = useState();
  const [modoEdicao, setModoEdicao] = useState();

  const statusOfertaHandler = (idOferta, nomeFantasia, action) => {
    let ofertaEndpoint;
    if (action === "aprovar") {
      ofertaEndpoint = `${getMarketplaceApiEndpoint()}/api/Oferta/AprovarOferta?OFE_Id=${idOferta}`;
    } else {
      ofertaEndpoint = `${getMarketplaceApiEndpoint()}/api/Oferta/ReprovarOferta?OFE_Id=${idOferta}`;
    }

    modalDispatch({
      type: "CONFIG_MODAL",
      value: {
        display: true,
        title: `Confirmar  ${
          action === "aprovar" ? "Aprovação" : "Reprovação"
        }`,
        text: `Confirmar ${
          action === "aprovar" ? "APROVAÇÃO" : "REPROVAÇÃO"
        } de cadastro da oferta ${JSON.stringify(nomeFantasia).toUpperCase()}?`,
        modalWithBtn: true,
        confirmBtnTxt: "Confirmar",
        cancelBtnTxt: "Cancelar",
        cancelHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
        },
        confirmHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
          modalDispatch({
            type: "CONFIG_MODAL",
            value: {
              display: true,
              title: `${action === "aprovar" ? "Aprovar" : "Reprovar"} Oferta `,

              modalWithBtn: false,
              modalIsLoading: true,
            },
          });

          axios
            .put(ofertaEndpoint, REQ_BODY, AUTH_HEADER)
            .then((response) => {
              if (response.status === 200) {
                modalDispatch({
                  type: "CONFIG_MODAL",
                  value: {
                    display: true,
                    title: `Oferta ${
                      action === "aprovar" ? "Aprovada" : "Reprovada"
                    }`,
                    text: response.data.Usuario.mensagemSucesso,
                    modalWithBtn: false,
                    confirmBtnTxt: "Desconectar",
                    cancelBtnTxt: "Cancelar",
                    cancelHandler: () => {
                      modalDispatch({ type: "SET_DISPLAY", value: false });
                      setOfertaDetalhes(false);
                    },
                    confirmHandler: () => {
                      modalDispatch({ type: "SET_DISPLAY", value: false });
                      setOfertaDetalhes(false);
                    },
                  },
                });
                updateListaOfertas();
              } else {
                modalDispatch({
                  type: "CONFIG_MODAL",
                  value: {
                    display: true,
                    title: "Erro",
                    text: "Ocorreu um erro durante a aprovação.",
                    modalWithBtn: false,
                    cancelHandler: () => {
                      modalDispatch({ type: "SET_DISPLAY", value: false });
                    },
                  },
                });
              }
            })
            .catch((err) => toast.error("Erro ao aprovar."));
        },
      },
    });
  };

  useEffect(() => {
    setLocationString("Ofertas");
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          Início
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Gerenciamento</Breadcrumb.Item>
        <Breadcrumb.Item active>Ofertas</Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  //atualiza a lista mais uma vez
  const updateListaOfertas = () => {
    axios
      .post(ofertasEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => {
        setOfertas(response.data.reverse());
      })
      .catch((err) => toast.error("Erro ao atualizar lista."));
  };

  //faz a chamada na API para buscar a lista de fornecedores
  useEffect(() => {
    updateListaOfertas();
  }, []);

  //faz a chamada na API para buscar os detalhes do usuario relacionado com a oferta selecionada
  const detalhesHandler = (idOferta) => {
    const oferta = ofertas?.find((ofe) => ofe.OFE_Id === idOferta);

    const ofertaEndpoint = `${getMarketplaceApiEndpoint()}/api/Oferta/GetOfertaEditarById?OFE_Id=${idOferta}&join=true`;
    axios
      .post(ofertaEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        setOfertaDetalhes(res.data);
        ofertaDispatch({
          type: "SetOfertaParaEditar",
          value: res.data,
        });
      })
      .catch((err) => {
        toast.error(
          "Ocorreu um erro ao tentar buscar dados da oferta para edição."
        );
      });

    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/Empresa/GetEmpresaById?EMP_Id=${oferta.Empresa.EMP_Id}&join=true`,
        REQ_BODY,
        AUTH_HEADER
      )
      .then((response) => {
        if (response.status === 200) {
          setEmpresaDetalhes(response.data);
        }
      })
      .catch((err) => toast.error("Erro ao buscar empresa."));
  };

  const pesquisaInputRef = useRef();

  const handlePesquisa = () => {
    const formattedSearch = pesquisaInputRef.current.value.trim();
    if (formattedSearch.length !== 0) {
      //pesquisando por produto
      const pesquisaProduto = ofertas.filter((ofe) =>
        ofe.Produto.PDT_Nome.toLowerCase().includes(
          formattedSearch.toLowerCase()
        )
      );

      //pesquisando por nome empresa
      const pesquisaEmpresa = ofertas.filter((ofe) =>
        ofe.Empresa.EMP_NomeFantasia.toLowerCase().includes(
          formattedSearch.toLowerCase()
        )
      );

      setPesquisaAtivada(true);

      setPesquisaLog(
        `Pesquisando por "${formattedSearch}" (${
          [...pesquisaProduto, ...pesquisaEmpresa].length
        } resultados)`
      );

      setOfertas([...pesquisaProduto, ...pesquisaEmpresa]);
    } else {
      setPesquisaAtivada(false);
      updateListaOfertas();
      toast.error("O campo de pesquisa está vazio.");
    }
  };

  const clearPesquisa = () => {
    setPesquisaLog(false);
    setPesquisaAtivada(false);
    updateListaOfertas();
    pesquisaInputRef.current.value = "";
  };

  const handleAbrirEdicao = () => {
    setIsLoadingEdit(true);
    axios
      .put(
        `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/ValidaExistenciaNegociacao?OfertaId=${ofertaDetalhes.OFE_Id}`,
        {},
        AUTH_HEADER
      )
      .then((res) => {
        setIsLoadingEdit(false);
        if (res.data === false) {
          setModoEdicao(true);
        } else {
          setIsLoadingEdit(false);
          toast.error(
            "Não é possível editar uma oferta que já possua negociações."
          );
        }
      })
      .catch((err) => toast.error("Erro ao editar oferta."));
  };

  //funçao que valida os campos
  const validarCamposHandler = () => {
    if (
      ofertaFormState.OFE_FlagMercadoExterno === null ||
      ofertaFormState.OFE_FlagVender === null ||
      ofertaFormState.OFE_CategoriaId === null ||
      ofertaFormState.OFE_TipoProdutoId === null ||
      ofertaFormState.OFE_ProdutoId === null ||
      ofertaFormState.OFE_ModoCultivoSistemaProdutivoId === null ||
      ofertaFormState.OFE_ModoCultivoModoProducaoId === null ||
      ofertaFormState.OFE_StatusProdutoId === null
    ) {
      toast.error("Por favor, preencha os campos com valores válidos.");
      return false;
    } else {
      return true;
    }
  };

  //funçao executada quando o usuario clica em GRAVAR
  const editarOfertaHandler = () => {
    if (validarCamposHandler()) {
      modalDispatch({
        type: "CONFIG_MODAL",
        value: {
          display: true,
          title: "Confirmar Edição de Oferta",

          text: "Deseja confirmar a edição dos dados dessa oferta?",

          modalWithBtn: true,
          cancelHandler: () => {
            modalDispatch({ type: "SET_DISPLAY", value: false });
          },
          confirmHandler: () => {
            modalDispatch({
              type: "CONFIG_MODAL",
              value: {
                display: true,
                title: `Editando oferta`,

                modalWithBtn: false,
                modalIsLoading: true,
              },
            });
            axios
              .put(
                `${getMarketplaceApiEndpoint()}/api/Oferta/CadastroOferta`,
                ofertaFormState,
                AUTH_HEADER
              )
              .then((res) => {
                if (res.status === 200) {
                  setModoEdicao(false);

                  detalhesHandler(ofertaDetalhes.OFE_Id);
                  modalDispatch({
                    type: "CONFIG_MODAL",
                    value: {
                      display: true,
                      title: `Oferta editada`,

                      text: "✅ A oferta foi editada com sucesso.",

                      modalWithBtn: false,

                      cancelHandler: () => {
                        modalDispatch({ type: "SET_DISPLAY", value: false });
                      },
                    },
                  });
                } else {
                  modalDispatch({ type: "SET_DISPLAY", value: false });
                  toast.error("Algum erro ocorreu.");
                }
              })
              .catch((err) => {
                modalDispatch({
                  type: "CONFIG_MODAL",
                  value: {
                    display: true,
                    title: `Erro ao Editar Oferta`,
                    text: "Algo deu errado",
                    modalWithBtn: false,

                    cancelHandler: () => {
                      modalDispatch({ type: "SET_DISPLAY", value: false });
                    },
                  },
                });
              });
          },
        },
      });
    }
  };

  return (
    <DashMainContainer>
      {ofertaDetalhes ? (
        <DetalhesDiv>
          <DetalhesHeader>
            <HeaderTitle>
              {modoEdicao && "Editando Oferta: "}
              {ofertaDetalhes?.Produto.PDT_Nome +
                " - " +
                ofertaDetalhes?.Empresa.EMP_NomeFantasia}
            </HeaderTitle>
            {modoEdicao ? (
              <ActionsDiv>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setModoEdicao(false);
                    detalhesHandler(ofertaDetalhes.OFE_Id);
                  }}
                  style={{ margin: "0px 10px" }}
                >
                  Cancelar
                </Button>
                <Button variant="primary" onClick={editarOfertaHandler}>
                  Gravar
                </Button>
              </ActionsDiv>
            ) : (
              <ActionsDiv>
                <Button
                  variant="outline-success"
                  onClick={() =>
                    statusOfertaHandler(
                      ofertaDetalhes.OFE_Id,
                      ofertaDetalhes.Produto.PDT_Nome +
                        " - " +
                        ofertaDetalhes.Empresa.EMP_NomeFantasia,
                      "aprovar"
                    )
                  }
                >
                  Aprovar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    statusOfertaHandler(
                      ofertaDetalhes.OFE_Id,
                      ofertaDetalhes.Produto.PDT_Nome +
                        " - " +
                        ofertaDetalhes.Empresa.EMP_NomeFantasia,
                      "reprovar"
                    )
                  }
                  style={{ margin: "0px 10px" }}
                >
                  Reprovar
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={handleAbrirEdicao}
                  style={{ marginRight: "10px" }}
                >
                  {isLoadingEdit ? (
                    <ReactLoading
                      type={"spin"}
                      color={"cyan"}
                      height={25}
                      width={25}
                    />
                  ) : (
                    "Editar"
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setEmpresaDetalhes(false);
                    setOfertaDetalhes(false);
                  }}
                >
                  Voltar
                </Button>
              </ActionsDiv>
            )}
          </DetalhesHeader>
          <Hr />
          <EditarOfertaForm
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            ofertaDetalhes={ofertaDetalhes}
            ofertaFormState={ofertaFormState}
            ofertaDispatch={ofertaDispatch}
          />
        </DetalhesDiv>
      ) : (
        <ListaDiv>
          <PesquisaDiv>
            {" "}
            <Input
              w={100}
              ref={pesquisaInputRef}
              placeholder="🔍 Pesquisar por produto ou empresa.."
            ></Input>
            <Button onClick={handlePesquisa}>Pesquisar</Button>
          </PesquisaDiv>
          {pesquisaAtivada && (
            <Alert onClose={clearPesquisa} dismissible>
              {pesquisaLog}
            </Alert>
          )}

          {ofertas ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Tipo da Oferta</th>
                  <th>Produto</th>
                  <th>Empresa</th>
                  <th>Mercado</th>
                  <th>Tipo</th>

                  <th>Data Cadastro</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ofertas?.map((ofe) => {
                  return (
                    <OfertaRow
                      key={ofe.OFE_Id}
                      onClick={() => detalhesHandler(ofe.OFE_Id)}
                    >
                      <td>{ofe.OFE_FlagVender ? "Vender" : "Comprar"}</td>
                      <td>{ofe.Produto.PDT_Nome}</td>
                      <td>{ofe.Empresa.EMP_NomeFantasia}</td>
                      <td>
                        {ofe.OFE_MercadoExterno ? "Internacional" : "Nacional"}
                      </td>
                      <td>
                        {ofe.Empresa.EMP_TipoEmpresaId === 1
                          ? "Comprador"
                          : "Vendedor"}
                      </td>

                      <td>{formatarData(ofe.OFE_DataCadastro)}</td>
                      <td>
                        {getStatusAprovacaoOferta(
                          ofe.OFE_FlagAprovado,
                          ofe.OFE_DataReprovado
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={() => detalhesHandler(ofe.OFE_Id)}
                        >
                          Avaliar
                        </Button>
                      </td>
                    </OfertaRow>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <LoadingDiv>
              <ReactLoading
                type={"spin"}
                color={"green"}
                height={150}
                width={150}
              />
              <span>Carregando lista de ofertas...</span>
            </LoadingDiv>
          )}
        </ListaDiv>
      )}
    </DashMainContainer>
  );
};

export default GerenciamentoOfertas;
