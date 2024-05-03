import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { Alert, Button, Form } from "react-bootstrap";
import { BsImages } from "react-icons/bs";

import { IoStorefrontOutline } from "react-icons/io5";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import FotoOferta from "../../../Components/FotoOferta/FotoOferta";
import UploadArquivo from "../../../Components/UploadArquivo/UploadArquivo";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import ModalCtx from "../../../Context/ModalContext";
import { AUTH_HEADER } from "../../../data";
import {
  formatarData,
  formatarDataPath,
  formatarDataSimples,
  getCurrentYear,
  getPastYears,
  today,
  getMarketplaceApiEndpoint
} from "../../../generalFunctions";
import { Input } from "../../../globalStyle";
import { CadastroJson, Hr } from "../../Cadastro/Cadastro.styles";
import {
  AddMoreOfferSpan,
  BoldText,
  ContainerFotos,
  ContainerUploadFotos,
  DateInput,
  InputContainer,
  Select,
  TextArea,
} from "../Oferta/Oferta.styles";

import {
  AboutWrapper,
  DadosOfertaDiv,
  FieldTitle,
  FieldWrapper,
  SectionTitle,
} from "./GerenciamentoOfertas.styles";

const EditarOfertaForm = ({
  modoEdicao,
  setModoEdicao,
  ofertaDetalhes,
  ofertaFormState,
  ofertaDispatch,
}) => {
  let navigate = useNavigate();
  const [devlog, setDevlog] = useState(false);

  const { globalCtx } = useContext(GlobalDataCtx);

  const { modalDispatch } = useContext(ModalCtx);

  //endereço via cep
  const [enderecoViaCep, setEnderecoViaCep] = useState(false);

  //campos de edição
  const [categoryOptions, setCategoryOptions] = useState(false);
  const [unidadePesoOptions, setUnidadePesoOptions] = useState(false);

  //lista de cidades e estados
  const [cityList, setCityList] = useState();
  const [ufList, setUfList] = useState();

  //armazena os valores do combo MODO CULTIVO - SISTEMA PRODUTIVO
  const [comboSistemaProdutivo, setComboSistemaProdutivo] = useState(false);
  const sistemaProdutivoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/ModoCultivoSistemaProdutivo/GetAllModoCultivoSistemaProdutivo?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=MCS_Id`;

  //armazena os valores do combo MODO CULTIVO - MODO DE PRODUÇÃO
  const [comboModoProducao, setComboModoProducao] = useState(false);
  const modoProducaoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/ModoCultivoModoProducao/GetAllModoCultivoModoProducao?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=MCM_Id`;

  //armazena os valores do combo SITUAÇAO DO PRODUTO - STATUS DO PRODUTO
  const [comboStatusProduto, setComboStatusProduto] = useState(false);
  const statusProdutoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/StatusProduto/GetAllStatusProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=99999&order_by=SPR_Id`;

  //opçoes do combo box TIPO LOGISTICO - SISTEMA PRODUTIVO
  const [tlPorto, setTlPorto] = useState(false);

  //armazena os valores do combo CERTIFICAÇOES - TIPO DE CERTIFICAÇÃO
  const [comboCertificacoes, setComboCertificacoes] = useState(false);
  const tipoCertificacaoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/TipoCertificacao/GetAllTipoCertificacao?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=TPC_Id`;
  const [moedaOptions, setMoedaOptions] = useState(false);

  // useEffect(() => {
  //   ofertaDispatch({ type: "SetOfertaParaEditar", value: ofertaDetalhes });
  // }, [ofertaDetalhes]);

  //Busca as opções dos selects
  useEffect(() => {
    if (!ufList) {
      axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((resp) => {
          setUfList(resp.data);
        });
    }

    if (ofertaFormState?.Endereco?.END_Estado !== null) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ofertaFormState?.Endereco?.END_Estado}/municipios`
        )
        .then((res) => {
          setCityList(res.data);
        });
    }

    const tipoProdutoEndpoint =
      `${getMarketplaceApiEndpoint()}/api/TipoProduto/GetAllTipoProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=TPR_Id`;
    axios.post(tipoProdutoEndpoint, {}, AUTH_HEADER).then((res) => {
      setCategoryOptions(res.data);
    });

    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/UnidadePeso/GetAllUnidadePeso?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=0&order_by=UNP_Id`,
        {},
        AUTH_HEADER
      )
      .then((res) => {
        setUnidadePesoOptions(res.data);
      });

    //combo sistema prdodutivo
    axios.post(sistemaProdutivoEndpoint, {}, AUTH_HEADER).then((response) => {
      setComboSistemaProdutivo(response.data);
    });
    //combo modo de produção
    axios.post(modoProducaoEndpoint, {}, AUTH_HEADER).then((response) => {
      setComboModoProducao(response.data);
    });
    //combo status produto
    axios.post(statusProdutoEndpoint, {}, AUTH_HEADER).then((response) => {
      setComboStatusProduto(response.data);
    });
    //combo tipo certificaçoes
    axios.post(tipoCertificacaoEndpoint, {}, AUTH_HEADER).then((response) => {
      setComboCertificacoes(response.data);
    });
    //popula o combo TIPO LOGISTICO - SISTEMA PRODUTIVO

    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/TipoLogisticoPorto/GetAllTipoLogisticoPorto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=999999&order_by=TLP_Id`,
        {},
        AUTH_HEADER
      )
      .then((response) => {
        setTlPorto(response.data);
      })
      .catch((err) => {
        toast.error("Um erro ocorreu ao buscar o tipo logístico.");
      });
  }, [modoEdicao, ofertaFormState]);

  const cepInputHandler = (e) => {
    const inputCepFormatado = e.target.value.trim().replace(/\D/g, "");
    if (inputCepFormatado.length >= 8) {
      axios
        .get(`${process.env.REACT_APP_CEP_ENDPOINT}/ws/${e.target.value}/json/`)
        .then((res) => {
          if (res.data.erro) {
            toast.error("CEP inválido.");
          } else {
            setEnderecoViaCep(true);

            ofertaDispatch({
              type: "EnderecoCEP",
              value: {
                cep: res.data.cep,
                estado: res.data.uf,
                cidade: res.data.localidade,
                logradouro: res.data.logradouro,
              },
            });
          }
        });
    }
  };

  return (
    <>
      <CadastroJson>
        {/* <h6 onClick={() => setDevlog(!devlog)}>
          Obj Usuario a ser enviado via API
        </h6>
        {devlog && <pre>{JSON.stringify(ofertaFormState, null, 4)}</pre>} */}
      </CadastroJson>{" "}
      <SectionTitle>
        <IoStorefrontOutline /> Informações do Produto
      </SectionTitle>
      <AboutWrapper>
        <FieldTitle>Sobre o Produto:</FieldTitle>
        {modoEdicao ? (
          <TextArea
            min="1"
            max="100"
            value={ofertaFormState.OFE_Descricao}
            onChange={(e) =>
              ofertaDispatch({
                type: "DescricaoProduto",
                value: e.target.value,
              })
            }
            type="date"
          ></TextArea>
        ) : (
          <p>{ofertaDetalhes.OFE_Descricao}</p>
        )}
      </AboutWrapper>
      <DadosOfertaDiv>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Tipo:</FieldTitle>
          {modoEdicao ? (
            <Form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                <Form.Check
                  name="eu-desejo"
                  type="radio"
                  id="vender"
                  label={globalCtx.idioma ? "Vender" : "Sell"}
                  checked={ofertaFormState.OFE_FlagVender}
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
              </div>
            </Form>
          ) : (
            <span>{ofertaFormState.OFE_FlagVender ? "Vender" : "Comprar"}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Mercado:</FieldTitle>

          {modoEdicao ? (
            <Form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Check
                  name="no-mercado"
                  type="radio"
                  id="interno"
                  label={globalCtx.idioma ? "Brasileiro" : "Brazilian"}
                  style={{ marginRight: "100px" }}
                  onClick={() =>
                    ofertaDispatch({ type: "Mercado", value: false })
                  }
                  checked={ofertaFormState.OFE_FlagMercadoExterno === false}
                />
                <Form.Check
                  name="no-mercado"
                  type="radio"
                  id="externo"
                  label={globalCtx.idioma ? "Internacional" : "International"}
                  onClick={() =>
                    ofertaDispatch({ type: "Mercado", value: true })
                  }
                  checked={ofertaFormState.OFE_FlagMercadoExterno}
                />
              </div>
            </Form>
          ) : (
            <span>
              {ofertaDetalhes.OFE_FlagMercadoExterno
                ? "Internacional"
                : "Brasileiro"}
            </span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Categoria do Produto:</FieldTitle>
          {modoEdicao ? (
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
              {categoryOptions ? (
                <>
                  {categoryOptions?.map((tp) => (
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
          ) : (
            <span>{ofertaDetalhes.TipoProduto.TPR_Descricao}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Nome do Produto:</FieldTitle>
          {modoEdicao ? (
            <Input
              placeholder={ofertaDetalhes.Produto.PDT_Nome}
              onChange={(e) =>
                ofertaDispatch({
                  type: "EditarNomeProduto",
                  value: e.target.value,
                })
              }
            ></Input>
          ) : (
            <span>{ofertaDetalhes.Produto.PDT_Nome}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Sistema Produtivo:</FieldTitle>
          {modoEdicao ? (
            <Select
              value={
                ofertaFormState.OFE_ModoCultivoSistemaProdutivoId &&
                ofertaFormState.OFE_ModoCultivoSistemaProdutivoId
              }
              onChange={(e) =>
                ofertaDispatch({
                  type: "MCSistemaProdutivo",
                  value: Number(e.target.value),
                })
              }
            >
              {comboSistemaProdutivo &&
                comboSistemaProdutivo.map((spr) => {
                  return (
                    <option key={spr.MCS_Id} value={spr.MCS_Id}>
                      {spr.MCS_Descricao}
                    </option>
                  );
                })}
            </Select>
          ) : (
            <span>
              {ofertaDetalhes.ModoCultivoSistemaProdutivo.MCS_Descricao}
            </span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Status Produto:</FieldTitle>
          {modoEdicao ? (
            <Select
              value={
                ofertaFormState.OFE_StatusProdutoId &&
                ofertaFormState.OFE_StatusProdutoId
              }
              onChange={(e) =>
                ofertaDispatch({
                  type: "SPStatusProduto",
                  value: Number(e.target.value),
                })
              }
            >
              {comboStatusProduto &&
                comboStatusProduto.map((spr) => {
                  return (
                    <option key={spr.SPR_Id} value={spr.SPR_Id}>
                      {spr.SPR_Descricao}
                    </option>
                  );
                })}
            </Select>
          ) : (
            <span>{ofertaDetalhes.StatusProduto.SPR_Descricao}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Modo Produção:</FieldTitle>
          {modoEdicao ? (
            <Select
              value={
                ofertaFormState.OFE_ModoCultivoModoProducaoId &&
                ofertaFormState.OFE_ModoCultivoModoProducaoId
              }
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  ofertaDispatch({ type: "MCModoProducao", value: null });
                } else {
                  ofertaDispatch({
                    type: "MCModoProducao",
                    value: parseInt(e.target.value),
                  });
                }
              }}
            >
              {comboModoProducao ? (
                <>
                  {comboModoProducao.map((el) => (
                    <option key={el.MCM_Id} value={el.MCM_Id}>
                      {globalCtx.idioma
                        ? el.MCM_Descricao
                        : el.MCM_DescricaoIngles}
                    </option>
                  ))}
                </>
              ) : (
                <option selected="selected">Aguarde</option>
              )}
            </Select>
          ) : (
            <span>{ofertaDetalhes.ModoCultivoModoProducao.MCM_Descricao}</span>
          )}
        </FieldWrapper>

        {/* <FieldWrapper status={modoEdicao}>
              <FieldTitle>Percentual de Adiantamento:</FieldTitle>
              {modoEdicao ? (
                <Input
                  type="number"
                  placeholder={ofertaDetalhes.listaOfertaxQuantidadeProduto[0].OXQ_PercentualAdiantamento + "%"}
                ></Input>
              ) : (
                <span>{ofertaDetalhes.OFE_PercentualAdiantamento + "%"}</span>
              )}
            </FieldWrapper> */}
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Ano de Colheita:</FieldTitle>
          {modoEdicao ? (
            <Select
              value={
                ofertaFormState.OFE_AnoColheita &&
                ofertaFormState.OFE_AnoColheita
              }
              onChange={(e) => {
                ofertaDispatch({ type: "AnoColheita", value: e.target.value });
              }}
            >
              {/* <option selected="selected" value={currentYear}>
              {stringSelect}
            </option> */}
              <option>{getCurrentYear()}</option>
              {getPastYears(5).map((year) => {
                return <option>{year}</option>;
              })}
            </Select>
          ) : (
            <span>{ofertaDetalhes.OFE_AnoColheita}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Data Cadastro:</FieldTitle>

          <span>
            {ofertaDetalhes?.OFE_DataCadastro.includes("T")
              ? formatarData(ofertaDetalhes.OFE_DataCadastro, true)
              : formatarDataSimples(ofertaDetalhes.OFE_DataCadastro)}
          </span>
        </FieldWrapper>
        {ofertaDetalhes.OFE_DataAlteracao && (
          <FieldWrapper status={modoEdicao}>
            <FieldTitle>Última Atualização:</FieldTitle>
            <span>
              {ofertaDetalhes.OFE_DataAlteracao.includes("T")
                ? formatarData(ofertaDetalhes.OFE_DataAlteracao, true)
                : formatarDataSimples(ofertaDetalhes.OFE_DataAlteracao)}
            </span>
          </FieldWrapper>
        )}
      </DadosOfertaDiv>
      {ofertaDetalhes &&
        ofertaDetalhes?.listaOfertaxQuantidadeProduto.map((oferta, i) => {
          return ofertaFormState.listaOfertaxQuantidadeProduto[i] ? (
            <>
              {" "}
              <Hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <SectionTitle>
                  <IoStorefrontOutline /> Dados da Oferta {i + 1}
                </SectionTitle>
                {i > 0 && modoEdicao && (
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
                    Deletar Oferta {i + 1}
                  </Button>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {" "}
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Peso:</FieldTitle>
                  {modoEdicao ? (
                    <Input
                      w={100}
                      type="number"
                      value={oferta.OXQ_Peso}
                      onChange={(e) =>
                        ofertaDispatch({
                          type: "OfertaPeso",
                          value: Number(e.target.value),
                          index: i,
                        })
                      }
                    ></Input>
                  ) : (
                    <span>{oferta.OXQ_Peso}</span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Unidade:</FieldTitle>
                  {modoEdicao ? (
                    <Select
                      value={
                        oferta?.OXQ_UnidadePesoId && oferta?.OXQ_UnidadePesoId
                      }
                      onChange={(e) =>
                        ofertaDispatch({
                          type: "OfertaUnidadePeso",
                          value: parseInt(e.target.value),
                          index: i,
                        })
                      }
                    >
                      {unidadePesoOptions ? (
                        unidadePesoOptions.map((el) => (
                          <option key={el.UNP_Id} value={el.UNP_Id}>
                            {el.UNP_Descricao}
                          </option>
                        ))
                      ) : (
                        <option selected="selected">Aguarde</option>
                      )}
                    </Select>
                  ) : (
                    <span>{oferta.UnidadePeso.UNP_Descricao}</span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Menor Preço:</FieldTitle>
                  {modoEdicao ? (
                    <NumericFormat
                      customInput={Input}
                      style={{ width: "150px" }}
                      thousandSeparator={oferta?.OXQ_MoedaId === 1 ? "." : ","}
                      prefix={oferta?.OXQ_MoedaId === 1 ? "R$ " : "USD "}
                      decimalSeparator={oferta?.OXQ_MoedaId === 1 ? "," : "."}
                      allowedDecimalSeparators={["-", ".", " "]}
                      decimalScale={2}
                      displayType="input"
                      placeholder={
                        oferta?.OXQ_MenorPreco && oferta?.OXQ_MenorPreco
                      }
                      onValueChange={(e) => {
                        ofertaDispatch({
                          type: "OfertaMenorPreco",
                          value: e.value,
                          index: i,
                        });
                      }}
                    ></NumericFormat>
                  ) : (
                    <span>
                      {oferta.OXQ_MenorPreco.toLocaleString(
                        oferta.Moeda.MOE_Id === 1 ? "pt-br" : "en-br",
                        {
                          style: "currency",
                          currency: oferta.Moeda.MOE_Id === 1 ? "BRL" : "USD",
                        }
                      )}
                    </span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Maior Preço:</FieldTitle>
                  {modoEdicao ? (
                    <NumericFormat
                      customInput={Input}
                      style={{ width: "150px" }}
                      thousandSeparator={oferta?.OXQ_MoedaId === 1 ? "." : ","}
                      prefix={oferta?.OXQ_MoedaId === 1 ? "R$ " : "USD "}
                      decimalSeparator={oferta?.OXQ_MoedaId === 1 ? "," : "."}
                      allowedDecimalSeparators={["-", ".", " "]}
                      decimalScale={2}
                      displayType="input"
                      placeholder={
                        oferta?.OXQ_MaiorPreco && oferta?.OXQ_MaiorPreco
                      }
                      onValueChange={(e) => {
                        ofertaDispatch({
                          type: "OfertaMaiorPreco",
                          value: e.value,
                          index: i,
                        });
                      }}
                    ></NumericFormat>
                  ) : (
                    <span>
                      {oferta.OXQ_MaiorPreco.toLocaleString(
                        oferta.Moeda.MOE_Id === 1 ? "pt-br" : "en-br",
                        {
                          style: "currency",
                          currency: oferta.Moeda.MOE_Id === 1 ? "BRL" : "USD",
                        }
                      )}
                    </span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Percentual de Adiantamento:</FieldTitle>
                  {modoEdicao ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Input
                        w={30}
                        placeholder={oferta?.OXQ_PercentualAdiantamento}
                        type="number"
                        onChange={(e) =>
                          ofertaDispatch({
                            type: "OfertaAdiantamento",
                            value: Number(e.target.value),
                            index: i,
                          })
                        }
                      ></Input>
                      %
                    </div>
                  ) : (
                    <span>{oferta.OXQ_PercentualAdiantamento}%</span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Moeda:</FieldTitle>
                  {modoEdicao ? (
                    <Select
                      value={oferta?.OXQ_MoedaId && oferta?.OXQ_MoedaId}
                      onChange={(e) =>
                        ofertaDispatch({
                          type: "OfertaMoeda",
                          value: parseInt(e.target.value),
                          index: i,
                        })
                      }
                    >
                      <option value={1}>Reais (BRL R$)</option>
                      <option value={2}>Dólares (USD)</option>
                    </Select>
                  ) : (
                    <span>
                      {oferta.Moeda.MOE_Id === 1
                        ? "Reais (R$)"
                        : "Dólares (USD)"}
                    </span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Data Início da Entrega:</FieldTitle>
                  {modoEdicao ? (
                    <DateInput
                      type="date"
                      value={oferta.OXQ_DataEntregaInicio.split("T")[0]}
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
                  ) : (
                    <span>
                      {oferta.OXQ_DataEntregaInicio.includes("T")
                        ? formatarData(oferta.OXQ_DataEntregaInicio, true)
                        : formatarDataSimples(oferta.OXQ_DataEntregaInicio)}
                    </span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Data Final da Entrega:</FieldTitle>
                  {modoEdicao ? (
                    <DateInput
                      type="date"
                      value={oferta.OXQ_DataEntregaFim.split("T")[0]}
                      onKeyDown={(e) => e.preventDefault()}
                      min={today}
                      onChange={(e) =>
                        ofertaDispatch({
                          type: "OfertaDtFim",
                          value: e.target.value,
                          index: i,
                        })
                      }
                    />
                  ) : (
                    <span>
                      {oferta.OXQ_DataEntregaFim.includes("T")
                        ? formatarData(oferta.OXQ_DataEntregaFim, true)
                        : formatarDataSimples(oferta.OXQ_DataEntregaFim)}
                    </span>
                  )}
                </FieldWrapper>
                <FieldWrapper status={modoEdicao}>
                  <FieldTitle>Data Expiração:</FieldTitle>
                  {modoEdicao ? (
                    <DateInput
                      type="date"
                      value={oferta.OXQ_DataExpiracao.split("T")[0]}
                      onKeyDown={(e) => e.preventDefault()}
                      min={today}
                      onChange={(e) =>
                        ofertaDispatch({
                          type: "OfertaDtExpiracao",
                          value: e.target.value,
                          index: i,
                        })
                      }
                    />
                  ) : (
                    <span>
                      {oferta.OXQ_DataExpiracao.includes("T")
                        ? formatarData(oferta.OXQ_DataExpiracao, true)
                        : formatarDataSimples(oferta.OXQ_DataExpiracao)}
                    </span>
                  )}
                </FieldWrapper>
              </div>
            </>
          ) : (
            modoEdicao && (
              <>
                <Hr />
                <Alert variant="danger">
                  Atenção! A Oferta {i + 1} foi excluída. Para cancelar a
                  exclusão, clique em "Cancelar". Para confirmar as alterações,
                  clique em "Gravar".
                </Alert>
              </>
            )
          );
        })}
      <Hr />
      <SectionTitle>
        <IoStorefrontOutline /> Logística -{" "}
        {ofertaFormState.OFE_FlagMercadoExterno ? "Destino" : "Origem"}
      </SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {ofertaFormState.OFE_FlagMercadoExterno && (
          <FieldWrapper status={modoEdicao}>
            <FieldTitle>Tipo Logístico:</FieldTitle>
            {modoEdicao ? (
              <Select
                onChange={(e) =>
                  ofertaDispatch({ type: "TLPorto", value: e.target.value })
                }
              >
                {tlPorto ? (
                  tlPorto.map((el) => (
                    <option key={el.TLP_Id} value={el.TLP_Id}>
                      {globalCtx.idioma
                        ? el.TLP_Descricao
                        : el.TLP_DescricaoIngles}
                    </option>
                  ))
                ) : (
                  <option selected="selected">Incoterm</option>
                )}
              </Select>
            ) : (
              <span>
                {ofertaDetalhes.TipoLogisticoSistemaProdutivo.TLS_Descricao}
              </span>
            )}
          </FieldWrapper>
        )}
        <FieldWrapper>
          <FieldTitle>CEP:</FieldTitle>
          {modoEdicao ? (
            <Input
              placeholder={ofertaFormState?.Endereco?.END_CEP}
              type="text"
              maxLength="8"
              onChange={cepInputHandler}
            ></Input>
          ) : (
            <span>{ofertaFormState?.Endereco?.END_CEP}</span>
          )}
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Estado:</FieldTitle>
          {modoEdicao ? (
            <Select
              value={
                ofertaFormState?.Endereco?.END_Estado &&
                ofertaFormState?.Endereco?.END_Estado
              }
              onChange={(e) => {
                e.target.value !== "default" &&
                  ofertaDispatch({
                    type: "EnderecoEstado",
                    value: e.target.value,
                  });
                if (ofertaFormState?.Endereco?.END_Cidade) {
                  ofertaDispatch({
                    type: "EnderecoCidade",
                    value: cityList[0].nome,
                  });
                }
              }}
            >
              {ufList &&
                ufList.map((uf) => {
                  return (
                    <option value={uf.sigla}>
                      {uf.nome} - {uf.sigla}
                    </option>
                  );
                })}
            </Select>
          ) : (
            <span>{ofertaFormState?.Endereco?.END_Estado}</span>
          )}
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Cidade:</FieldTitle>
          {modoEdicao ? (
            <Select
              id="cidade-select"
              value={
                ofertaFormState?.Endereco?.END_Cidade &&
                ofertaFormState?.Endereco?.END_Cidade
              }
              onChange={(e) =>
                e.target.value !== "default" &&
                ofertaDispatch({
                  type: "EnderecoCidade",
                  value: e.target.value,
                })
              }
            >
              {cityList ? (
                <>
                  {cityList.map((city) => {
                    return <option value={city.nome}>{city.nome}</option>;
                  })}
                </>
              ) : (
                <option selected="selected">
                  {globalCtx.idioma
                    ? "Selecione o estado primeiro..."
                    : "Select State first..."}
                </option>
              )}
            </Select>
          ) : (
            <span>{ofertaFormState?.Endereco?.END_Cidade}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Logradouro:</FieldTitle>
          {modoEdicao ? (
            <Input
              type="text"
              w={100}
              value={
                ofertaFormState?.Endereco?.END_Logradouro &&
                ofertaFormState?.Endereco?.END_Logradouro
              }
              onChange={(e) =>
                ofertaDispatch({
                  type: "EnderecoLogradouro",
                  value: e.target.value.trim().replace(/\s\s+/g, " "),
                })
              }
            ></Input>
          ) : (
            <span>{ofertaFormState?.Endereco?.END_Logradouro}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Bairro:</FieldTitle>
          {modoEdicao ? (
            <Input
              type="text"
              w={90}
              value={
                ofertaFormState?.Endereco?.END_Bairro &&
                ofertaFormState?.Endereco?.END_Bairro
              }
              onChange={(e) =>
                ofertaDispatch({
                  type: "EnderecoBairro",
                  value: e.target.value,
                })
              }
            ></Input>
          ) : (
            <span>{ofertaFormState?.Endereco?.END_Bairro}</span>
          )}
        </FieldWrapper>
        <FieldWrapper status={modoEdicao}>
          <FieldTitle>Número:</FieldTitle>
          {modoEdicao ? (
            <Input
              type="text"
              w={40}
              maxLength="15"
              value={
                ofertaFormState?.Endereco?.END_Numero &&
                ofertaFormState?.Endereco?.END_Numero
              }
              onChange={(e) =>
                ofertaDispatch({
                  type: "EnderecoNumero",
                  value: e.target.value.trim().replace(/\s\s+/g, " "),
                })
              }
            ></Input>
          ) : (
            <span>{ofertaFormState?.Endereco?.END_Numero}</span>
          )}
        </FieldWrapper>
        <Hr />
        <div display="flex" flexDirection="column">
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {" "}
            <SectionTitle>
              <BsImages /> Fotos do Produto
            </SectionTitle>
          </div>
          {modoEdicao ? (
            <ContainerUploadFotos>
              {ofertaFormState.listaOfertaxDocumento.length < 5 && (
                <UploadArquivo
                  editarUploadEmpresaId={ofertaFormState.OFE_EmpresaId}
                  editarUploadUsuarioInsercaoId={
                    ofertaFormState.OFE_UsuarioInsercaoId
                  }
                  editarUploadOfertaDispatch={ofertaDispatch}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ContainerFotos>
                  {ofertaFormState.listaOfertaxDocumento.map((documento) => {
                    return (
                      <FotoOferta
                        idDocumento={documento.OXD_DocumentoId}
                      ></FotoOferta>
                    );
                  })}
                </ContainerFotos>
                {ofertaFormState.listaOfertaxDocumento.length >= 1 && (
                  <Button
                    style={{ marginLeft: "1rem" }}
                    variant="outline-danger"
                    onClick={() => {
                      ofertaDispatch({ type: "RemoverFotos" });
                    }}
                  >
                    Remover fotos
                  </Button>
                )}
              </div>
            </ContainerUploadFotos>
          ) : (
            <ContainerFotos>
              {ofertaFormState.listaOfertaxDocumento.map((documento) => {
                return (
                  <FotoOferta
                    idDocumento={documento.OXD_DocumentoId}
                  ></FotoOferta>
                );
              })}
            </ContainerFotos>
          )}
        </div>
      </div>
      {/* <FieldWrapper status={modoEdicao}>
        <FieldTitle>Modo Cultivo:</FieldTitle>
        {modoEdicao ? (
          <Input
            min="1"
            max="100"
            value={oferta.OXQ_DataExpiracao.split("T")[0]}
            type="date"
          ></Input>
        ) : (
          <span>{formatarData(oferta.OXQ_DataExpiracao)}</span>
        )}
      </FieldWrapper> */}
      {/* <Hr /> */}
      {/* <SectionTitle>
            <AiOutlineUser /> Dados da Empresa
          </SectionTitle> */}
      {/* {empresaDetalhes ? (
            <DadosEmpresaDiv>
              <FieldWrapper status={modoEdicao}>
                <FieldTitle>Nome Fantasia:</FieldTitle>
                {modoEdicao ? (
                  <Input value={empresaDetalhes?.EMP_NomeFantasia}></Input>
                ) : (
                  <span>{empresaDetalhes?.EMP_NomeFantasia}</span>
                )}
              </FieldWrapper>
              <FieldWrapper status={modoEdicao}>
                <FieldTitle>CNPJ:</FieldTitle>
                {modoEdicao ? (
                  <Input value={empresaDetalhes?.EMP_CNPJ}></Input>
                ) : (
                  <span>{cnpjFormatter.apply(empresaDetalhes?.EMP_CNPJ)}</span>
                )}
              </FieldWrapper>
              <FieldWrapper status={modoEdicao}>
                <FieldTitle>Tipo Empresa:</FieldTitle>
                {modoEdicao ? (
                  <Input
                    value={getTipoString(empresaDetalhes?.EMP_TipoEmpresaId)}
                  ></Input>
                ) : (
                  <span>
                    {getTipoString(empresaDetalhes?.EMP_TipoEmpresaId)}
                  </span>
                )}
              </FieldWrapper>
              <FieldWrapper status={modoEdicao}>
                <FieldTitle>Telefone:</FieldTitle>
                {modoEdicao ? (
                  <Input value={empresaDetalhes?.EMP_Telefone}></Input>
                ) : (
                  <span>{empresaDetalhes?.EMP_Telefone}</span>
                )}
              </FieldWrapper>
            </DadosEmpresaDiv>
          ) : (
            <span>
              Não foi encontrado nenhuma empresa registrada para essa oferta.
            </span>
          )} */}
    </>
  );
};

export default EditarOfertaForm;
