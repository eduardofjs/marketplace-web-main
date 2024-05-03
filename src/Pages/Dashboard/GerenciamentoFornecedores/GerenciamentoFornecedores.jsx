import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Alert, Breadcrumb, Button, Table } from "react-bootstrap";
import { AUTH_HEADER, REQ_BODY } from "../../../data";
import { DashMainContainer, Input } from "../../../globalStyle";
import ReactLoading from "react-loading";
import { DashCtx } from "../Dashboard";
import {
  ActionsDiv,
  DadosEmpresaDiv,
  DadosUsuarioDiv,
  DetalhesDiv,
  DetalhesHeader,
  EmpresaRow,
  FieldTitle,
  FieldWrapper,
  HeaderTitle,
  ListaDiv,
  LoadingDiv,
  PesquisaDiv,
  SectionTitle,
} from "./GerenciamentoFornecedores.styles";
import { CadastroJson, Hr } from "../../Cadastro/Cadastro.styles";

import {
  getTipoString,
  getStatusAprovacaoEmpresa,
  formatarData,
  validarCNPJ,
  getMarketplaceApiEndpoint
} from "../../../generalFunctions";
import { AiOutlineUser } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";
import ModalCtx from "../../../Context/ModalContext";
import { toast } from "react-toastify";
import stringMask from "string-mask";
import { useRef } from "react";
import { CadastroCtx } from "../../Cadastro/Cadastro";
import reactSelect from "react-select";
import MaskedInput from "../../../Components/MaskedInput/MaskedInput";
import { Select } from "../Oferta/Oferta.styles";

const empresasEndpoint =
  `${getMarketplaceApiEndpoint()}/api/Empresa/GetAllEmpresa?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=EMP_Id`;

let cnpjFormatter = new stringMask("00.000.000/0000-00");
let cpfFormatter = new stringMask("000.000.000-00");

const GerenciamentoFornecedores = () => {
  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  const { modalDispatch } = useContext(ModalCtx);

  const [empresas, setEmpresas] = useState();

  const [pesquisaAtivada, setPesquisaAtivada] = useState(false);
  const [pesquisaLog, setPesquisaLog] = useState(false);

  const [empresaDetalhes, setEmpresaDetalhes] = useState();
  const [usuarioDetalhes, setUsuarioDetalhes] = useState();
  const [modoEdicao, setModoEdicao] = useState();

  const { currentStep, setCurrentStep, empresaFormState, empresaFormDispatch } =
    useContext(CadastroCtx);

  const [devlog, setDevlog] = useState();

  const statusEmpresaHandler = (idEmpresa, nomeFantasia, action) => {
    let empresaEndpoint;
    if (action === "aprovar") {
      empresaEndpoint = `${getMarketplaceApiEndpoint()}/api/Empresa/AprovarEmpresa?EMP_Id=${idEmpresa}`;
    } else {
      empresaEndpoint = `${getMarketplaceApiEndpoint()}/api/Empresa/ReprovarEmpresa?EMP_Id=${idEmpresa}`;
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
        } de cadastro da empresa ${JSON.stringify(
          nomeFantasia
        ).toUpperCase()}?`,
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
              title: `${
                action === "aprovar" ? "Aprovar" : "Reprovar"
              } Empresa `,

              modalWithBtn: false,
              modalIsLoading: true,
            },
          });

          axios
            .put(empresaEndpoint, REQ_BODY, AUTH_HEADER)
            .then((response) => {
              if (response.status === 200) {
                modalDispatch({
                  type: "CONFIG_MODAL",
                  value: {
                    display: true,
                    title: `Empresa ${
                      action === "aprovar" ? "Aprovada" : "Reprovada"
                    }`,
                    text: response.data.Usuario.mensagemSucesso,
                    modalWithBtn: false,
                    confirmBtnTxt: "Desconectar",
                    cancelBtnTxt: "Cancelar",
                    cancelHandler: () => {
                      modalDispatch({ type: "SET_DISPLAY", value: false });
                      setEmpresaDetalhes(false);
                    },
                    confirmHandler: () => {
                      modalDispatch({ type: "SET_DISPLAY", value: false });
                      setEmpresaDetalhes(false);
                    },
                  },
                });
                updateListaEmpresas();
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
            .catch((err) => {
              toast.error("Ocorreu um erro durante a aprovação.");
            });
        },
      },
    });
  };

  useEffect(() => {
    setLocationString("Fornecedores");
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          Início
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Gerenciamento</Breadcrumb.Item>
        <Breadcrumb.Item active>Fornecedores</Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  //faz a chamada na API para buscar a lista de fornecedores
  useEffect(() => {
    axios
      .post(empresasEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((err) => {
        toast.error("Algo de errado ao buscar a lista de fornecedores.");
      });
  }, []);

  //atualiza a lista mais uma vez
  const updateListaEmpresas = () => {
    axios
      .post(empresasEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((err) => {
        toast.error("Algo de errado ao atualizar a lista de empresas.");
      });
  };

  //faz a chamada na API para buscar os detalhes do usuario relacionado com a empresa selecionada
  const detalhesHandler = (idEmpresa) => {
    const empresa = empresas.find((emp) => emp.EMP_Id === idEmpresa);
    setEmpresaDetalhes(empresa);

    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/Usuario/GetUsuarioById?USR_Id=${empresa.EMP_UsuarioId}&join=true`,
        REQ_BODY,
        AUTH_HEADER
      )
      .then((response) => {
        if (response.status === 200) {
          setUsuarioDetalhes(response.data);
        }
      })
      .catch((err) => {
        toast.error("Algo de errado ao buscar empresa.");
      });
  };

  const pesquisaInputRef = useRef();

  const handlePesquisa = () => {
    const formattedSearch = pesquisaInputRef.current.value.trim();
    if (formattedSearch.length !== 0) {
      //pesquisando por nome da empresa
      const pesquisaNomeEmpresa = empresas.filter((emp) =>
        emp.EMP_NomeFantasia.toLowerCase().includes(
          formattedSearch.toLowerCase()
        )
      );

      //pesquisando por nome empresa
      const pesquisaCnpj = empresas.filter((emp) =>
        emp.EMP_CNPJ.toLowerCase().includes(formattedSearch.toLowerCase())
      );

      setPesquisaAtivada(true);

      setPesquisaLog(
        `Pesquisando por "${formattedSearch}" (${
          [...pesquisaNomeEmpresa, ...pesquisaCnpj].length
        } resultados)`
      );

      setEmpresas([...pesquisaNomeEmpresa, ...pesquisaCnpj]);
    } else {
      setPesquisaAtivada(false);
      updateListaEmpresas();
      toast.error("O campo de pesquisa está vazio.");
    }
  };

  const clearPesquisa = () => {
    setPesquisaLog(false);
    setPesquisaAtivada(false);
    updateListaEmpresas();
    pesquisaInputRef.current.value = "";
  };

  const [objEmpresaEditar, setObjEmpresaEditar] = useState(false);

  const updateCityList = () => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${objEmpresaEditar.Endereco.END_Estado}/municipios`
      )
      .then((res) => {
        setCityList(res.data);
      });
  };

  useEffect(() => {
    if (empresaDetalhes) {
      setObjEmpresaEditar({ ...empresaDetalhes });
    }

    if (!ufList) {
      axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((resp) => {
          setUfList(resp.data);
        });
    }
  }, [empresaDetalhes]);

  useEffect(() => {
    if (empresaDetalhes && empresaDetalhes.Endereco.END_Estado) {
      updateCityList();
    }
  }, [objEmpresaEditar?.Endereco?.END_Estado]);

  const handleEditarEmpresa = () => {
    axios
      .put(
        `${getMarketplaceApiEndpoint()}/api/Empresa/CadastroEmpresa`,
        objEmpresaEditar,
        AUTH_HEADER
      )
      .then((response) => {
        toast.success("Dados da empresa editados com sucesso.");

        updateListaEmpresas();

        setEmpresaDetalhes(objEmpresaEditar);
        setModoEdicao(false);
      })
      .catch((err) => toast.error("Ocorreu algum erro ao editar a empresa."));
  };

  const [cnpjInvalido, setCnpjInvalido] = useState(false);

  const [ufList, setUfList] = useState();

  const [cityList, setCityList] = useState();

  return (
    <DashMainContainer>
      {/* <CadastroJson>
        <h6 onClick={() => setDevlog(!devlog)}>
          Obj Empresa a ser enviado via API
        </h6>
        {devlog && <pre>{JSON.stringify(objEmpresaEditar, null, 4)}</pre>}
      </CadastroJson> */}
      {empresaDetalhes ? (
        <DetalhesDiv>
          <DetalhesHeader>
            <HeaderTitle>{empresaDetalhes.EMP_NomeFantasia}</HeaderTitle>
            {modoEdicao ? (
              <ActionsDiv>
                <Button
                  variant="outline-primary"
                  onClick={() => setModoEdicao(false)}
                  style={{ margin: "0px 10px" }}
                >
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleEditarEmpresa}>
                  Gravar
                </Button>
              </ActionsDiv>
            ) : (
              <ActionsDiv>
                <Button
                  variant="outline-success"
                  onClick={() =>
                    statusEmpresaHandler(
                      empresaDetalhes.EMP_Id,
                      empresaDetalhes.EMP_NomeFantasia,
                      "aprovar"
                    )
                  }
                >
                  Aprovar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    statusEmpresaHandler(
                      empresaDetalhes.EMP_Id,
                      empresaDetalhes.EMP_NomeFantasia,
                      "reprovar"
                    )
                  }
                  style={{ margin: "0px 10px" }}
                >
                  Reprovar
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setModoEdicao(true)}
                  style={{ marginRight: "10px" }}
                >
                  Editar
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setUsuarioDetalhes(false);
                    setEmpresaDetalhes(false);
                  }}
                >
                  Voltar
                </Button>
              </ActionsDiv>
            )}
          </DetalhesHeader>
          <Hr />
          <SectionTitle>
            <IoStorefrontOutline /> Dados da Empresa
          </SectionTitle>
          <DadosEmpresaDiv>
            {" "}
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Nome da Empresa:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      EMP_NomeFantasia: e.target.value,
                      EMP_RazaoSocial: e.target.value,
                    })
                  }
                  value={objEmpresaEditar.EMP_NomeFantasia}
                ></Input>
              ) : (
                <span>{empresaDetalhes.EMP_NomeFantasia}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Tipo:</FieldTitle>
              {modoEdicao ? (
                <Select
                  value={objEmpresaEditar.EMP_TipoEmpresaId}
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      EMP_TipoEmpresaId: Number(e.target.value),
                    })
                  }
                >
                  <option value={1}>Comprador</option>
                  <option value={2}>Vendedor</option>
                </Select>
              ) : (
                <span>{getTipoString(empresaDetalhes.EMP_TipoEmpresaId)}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>CNPJ:</FieldTitle>

              {modoEdicao ? (
                <Input
                  error={cnpjInvalido}
                  placeholder={objEmpresaEditar?.EMP_CNPJ}
                  onChange={(e) => {
                    const inputFormatado = e.target.value.replace(/\D/g, "");
                    if (inputFormatado.length === 14) {
                      setObjEmpresaEditar({
                        ...objEmpresaEditar,
                        EMP_CNPJ: inputFormatado,
                      });
                      setCnpjInvalido(false);
                    } else {
                      setCnpjInvalido(true);
                    }
                  }}
                ></Input>
              ) : (
                <span>{cnpjFormatter.apply(empresaDetalhes.EMP_CNPJ)}</span>
              )}
              {modoEdicao && cnpjInvalido && (
                <span style={{ color: "tomato", fontSize: "12px" }}>
                  CNPJ inválido.
                </span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Telefone:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      EMP_Telefone: e.target.value.replace(/[^\d.-]/g, ""),
                    })
                  }
                  value={objEmpresaEditar.EMP_Telefone}
                ></Input>
              ) : (
                <span>{empresaDetalhes.EMP_Telefone}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>CEP:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Endereco: {
                        ...objEmpresaEditar.Endereco,
                        END_CEP: e.target.value.replace(/[^\d.-]/g, ""),
                      },
                    })
                  }
                  value={objEmpresaEditar?.Endereco?.END_CEP}
                ></Input>
              ) : (
                <span>{empresaDetalhes?.Endereco?.END_CEP}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Estado:</FieldTitle>
              {modoEdicao ? (
                <Select
                  onChange={(e) => {
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Endereco: {
                        ...objEmpresaEditar.Endereco,
                        END_Estado: e.target.value,
                      },
                    });
                  }}
                >
                  <option selected="selected">
                    Atual: {objEmpresaEditar.Endereco.END_Estado}
                  </option>
                  {ufList &&
                    ufList.map((uf) => {
                      return (
                        <option value={uf.sigla} key={uf.sigla}>
                          {uf.nome} - {uf.sigla}
                        </option>
                      );
                    })}
                </Select>
              ) : (
                <span>{empresaDetalhes?.Endereco?.END_Estado}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Cidade:</FieldTitle>
              {modoEdicao ? (
                <Select
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Endereco: {
                        ...objEmpresaEditar.Endereco,
                        END_Cidade: e.target.value,
                      },
                    })
                  }
                >
                  {cityList ? (
                    <>
                      <option selected="selected">
                        Atual: {empresaDetalhes.Endereco.END_Cidade}
                      </option>
                      {cityList.map((city) => {
                        return (
                          <option value={city.nome} key={city.nome}>
                            {city.nome}
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    <option selected="selected">
                      Selecione o estado primeiro...
                    </option>
                  )}
                </Select>
              ) : (
                <span>{empresaDetalhes?.Endereco?.END_Cidade}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Bairro:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Endereco: {
                        ...objEmpresaEditar.Endereco,
                        END_Bairro: e.target.value,
                      },
                    })
                  }
                  value={objEmpresaEditar?.Endereco?.END_Bairro}
                ></Input>
              ) : (
                <span>{empresaDetalhes?.Endereco?.END_Bairro}</span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Logradouro:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Endereco: {
                        ...objEmpresaEditar.Endereco,
                        END_Logradouro: e.target.value,
                      },
                    })
                  }
                  value={objEmpresaEditar?.Endereco?.END_Logradouro}
                ></Input>
              ) : (
                <span>{empresaDetalhes?.Endereco?.END_Logradouro}</span>
              )}
            </FieldWrapper>
          </DadosEmpresaDiv>

          <Hr />
          <SectionTitle>
            <AiOutlineUser /> Dados do Usuário
          </SectionTitle>

          <DadosUsuarioDiv>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>E-mail:</FieldTitle>

              <span>{empresaDetalhes.Usuario?.USR_Email}</span>
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>CPF:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Usuario: {
                        ...objEmpresaEditar.Usuario,
                        Pessoa: {
                          ...usuarioDetalhes?.Pessoa,
                          PES_CPF: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder={usuarioDetalhes?.Pessoa?.PES_CPF}
                ></Input>
              ) : (
                <span>
                  {cpfFormatter.apply(usuarioDetalhes?.Pessoa?.PES_CPF)}
                </span>
              )}
            </FieldWrapper>
            <FieldWrapper status={modoEdicao}>
              <FieldTitle>Telefone:</FieldTitle>
              {modoEdicao ? (
                <Input
                  onChange={(e) =>
                    setObjEmpresaEditar({
                      ...objEmpresaEditar,
                      Usuario: {
                        ...objEmpresaEditar.Usuario,
                        Pessoa: {
                          ...usuarioDetalhes?.Pessoa,
                          PES_Telefone: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder={usuarioDetalhes?.Pessoa?.PES_Celular}
                ></Input>
              ) : (
                <span>{usuarioDetalhes?.Pessoa?.PES_Celular}</span>
              )}
            </FieldWrapper>
          </DadosUsuarioDiv>
        </DetalhesDiv>
      ) : (
        <ListaDiv>
          <PesquisaDiv>
            {" "}
            <Input
              w={100}
              ref={pesquisaInputRef}
              placeholder="🔍 Pesquisar por nome da empresa ou CNPJ..."
            ></Input>
            <Button onClick={handlePesquisa}>Pesquisar</Button>
          </PesquisaDiv>
          {pesquisaAtivada && (
            <Alert onClose={clearPesquisa} dismissible>
              {pesquisaLog}
            </Alert>
          )}

          {empresas ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nome da empresa</th>
                  <th>CNPJ</th>
                  <th>Tipo</th>
                  <th>Data de Cadastro</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {empresas?.map((emp) => {
                  return (
                    <EmpresaRow
                      key={emp.EMP_Id}
                      onClick={() => detalhesHandler(emp.EMP_Id)}
                    >
                      <td>{emp.EMP_NomeFantasia}</td>
                      <td>{emp.EMP_CNPJ}</td>
                      <td>
                        {emp.EMP_TipoEmpresaId === 1 ? "Comprador" : "Vendedor"}
                      </td>
                      <td>{formatarData(emp.EMP_DataCadastro)}</td>
                      <td>
                        {getStatusAprovacaoEmpresa(
                          emp.EMP_FlagAprovado,
                          emp.EMP_DataReprovado
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={() => detalhesHandler(emp.EMP_Id)}
                        >
                          Avaliar
                        </Button>
                      </td>
                    </EmpresaRow>
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
              <span>Carregando lista de empresas...</span>
            </LoadingDiv>
          )}
        </ListaDiv>
      )}
    </DashMainContainer>
  );
};

export default GerenciamentoFornecedores;
