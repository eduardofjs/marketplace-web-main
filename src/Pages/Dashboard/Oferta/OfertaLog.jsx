import React, { useEffect, useState, useContext } from "react";
import {
  FieldDesc,
  OfertaFieldDiv,
  Input,
  InputFieldsContainer,
  OfertaLogContainer,
  SectionHeader,
  SectionTitle,
  Select,
  SubsectionDesc,
  BoldText,
  OrigemContainer,
  TipoLogisticoContainer,
} from "./Oferta.styles";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { OfertaCtx } from "./Oferta";
import { FlexDivBetween } from "../../../globalStyle";
import { AUTH_HEADER, REQ_BODY } from "../../../data";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const OfertaLog = () => {
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  //armazena lista de estados
  const [ufList, setUfList] = useState();

  //mudar pra true se o endereço vier via cep
  const [enderecoViaCep, setEnderecoViaCep] = useState(false);
  const [cepInputError, setCepInputError] = useState(false);

  //opçoes do combo box TIPO LOGISTICO - SISTEMA PRODUTIVO
  const [tlSistemaProdutivo, setTlSistemaProdutivo] = useState(false);

  //opçoes do combo box TIPO LOGISTICO - PORTO
  const [tlPorto, setTlPorto] = useState(false);

  const [servicosOpcionais, setServicosOpcionais] = useState(false);

  //useContext
  const {
    ofertaFormState,
    ofertaDispatch,
    thirdStepError,
    stringOther,
    stringSelect,
    stringLoading,
  } = useContext(OfertaCtx);

  //lista de cidades
  const [cityList, setCityList] = useState();

  //esse useEffect faz a chamada pra API e busca lista de estados e cidades, além de popular os combos
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

    //popula o combo TIPO LOGISTICO - SISTEMA PRODUTIVO
    if (!tlSistemaProdutivo) {
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/TipoLogisticoSistemaProdutivo/GetAllTipoLogisticoSistemaProdutivo?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=TLS_Id`,
          REQ_BODY,
          AUTH_HEADER
        )
        .then((response) => {
          setTlSistemaProdutivo(response.data);
        });
    }
    //popula o combo TIPO LOGISTICO - SISTEMA PRODUTIVO
    if (!tlPorto) {
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/TipoLogisticoPorto/GetAllTipoLogisticoPorto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=999999&order_by=TLP_Id`,
          REQ_BODY,
          AUTH_HEADER
        )
        .then((response) => {
          setTlPorto(response.data);
        })
        .catch((err) =>
          toast.error("Erro ao popular combo de tipo logístico.")
        );
    }

    //POPULA O COMBO SERVIÇOS OPCIONAIS
    if (!servicosOpcionais) {
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/ServicoOpcional/GetAllServicoOpcional?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=SEO_Id`,
          REQ_BODY,
          AUTH_HEADER
        )
        .then((response) => {
          setServicosOpcionais(response.data);
        });
    }
  }, [ufList, ofertaFormState?.Endereco?.END_Estado]);

  const cepInputHandler = (e) => {
    const inputCepFormatado = e.target.value.trim().replace(/\D/g, "");
    if (inputCepFormatado.length >= 8) {
      axios
        .get(`${process.env.REACT_APP_CEP_ENDPOINT}/ws/${e.target.value}/json/`)
        .then((res) => {
          if (res.data.erro) {
            setCepInputError(true);
          } else {
            setEnderecoViaCep(true);
            setCepInputError(false);
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
    <OfertaLogContainer>
      {" "}
      <SectionHeader>
        <SectionTitle>
          {globalCtx.idioma ? "Logística" : "Logistics"}
        </SectionTitle>
      </SectionHeader>
      <OrigemContainer>
        <FlexDivBetween w={15}>
          <SubsectionDesc>
            {ofertaFormState.OFE_FlagMercadoExterno &&
            !ofertaFormState.OFE_FlagVender
              ? globalCtx.idioma
                ? "Destino"
                : "Destination"
              : globalCtx.idioma
              ? "Origem"
              : "Origin"}
          </SubsectionDesc>
          {enderecoViaCep && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                setEnderecoViaCep(false);
                // ofertaDispatch({
                //   type: "EnderecoCEP",
                //   value: {
                //     cep: null,
                //     estado: null,
                //     cidade: null,
                //     logradouro: null,
                //   },
                // });
              }}
            >
              <BsPencilSquare style={{ marginRight: "5px" }} />
              {globalCtx.idioma ? "Editar" : "Edit"}
            </Button>
          )}
        </FlexDivBetween>
        <InputFieldsContainer>
          <OfertaFieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                thirdStepError && ofertaFormState.Endereco.END_CEP === null
              }
            >
              {globalCtx.idioma ? "CEP*" : "TAX ID"}
            </FieldDesc>

            {enderecoViaCep ? (
              <BoldText>{ofertaFormState?.Endereco?.END_CEP} ✔</BoldText>
            ) : (
              <Input
                placeholder={
                  ofertaFormState?.Endereco?.END_CEP &&
                  ofertaFormState?.Endereco?.END_CEP
                }
                error={
                  thirdStepError && ofertaFormState?.Endereco?.END_CEP === null
                }
                type="text"
                maxLength="8"
                onChange={cepInputHandler}
              ></Input>
            )}
            {cepInputError && (
              <span style={{ color: "tomato" }}>
                {globalCtx.idioma ? "Cep inválido." : "Invalid Cep."}
              </span>
            )}
          </OfertaFieldDiv>
          <OfertaFieldDiv>
            <FieldDesc>{globalCtx.idioma ? "Estado" : "State"}</FieldDesc>
            {enderecoViaCep ? (
              <BoldText>{ofertaFormState?.Endereco?.END_Estado}</BoldText>
            ) : (
              <Select
                value={
                  ofertaFormState?.Endereco?.END_Estado &&
                  ofertaFormState?.Endereco?.END_Estado
                }
                disabled={enderecoViaCep}
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
                <option selected="selected">{stringSelect}</option>
                {ufList &&
                  ufList.map((uf) => {
                    return (
                      <option value={uf.sigla}>
                        {uf.nome} - {uf.sigla}
                      </option>
                    );
                  })}
              </Select>
            )}
          </OfertaFieldDiv>
          <OfertaFieldDiv>
            <FieldDesc>{globalCtx.idioma ? "Cidade" : "City"}</FieldDesc>
            {enderecoViaCep ? (
              <BoldText>{ofertaFormState?.Endereco?.END_Cidade}</BoldText>
            ) : (
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
                    <option selected="selected">{stringSelect}</option>
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
            )}
          </OfertaFieldDiv>
          <OfertaFieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                thirdStepError &&
                ofertaFormState?.Endereco?.END_Logradouro === null
              }
            >
              {globalCtx.idioma ? "Logradouro*" : "Street*"}
            </FieldDesc>
            {enderecoViaCep ? (
              <BoldText>{ofertaFormState?.Endereco?.END_Logradouro}</BoldText>
            ) : (
              <Input
                type="text"
                w={350}
                error={
                  thirdStepError &&
                  ofertaFormState?.Endereco?.END_Logradouro === null
                }
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
            )}
          </OfertaFieldDiv>
        </InputFieldsContainer>
        <InputFieldsContainer>
          <OfertaFieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                thirdStepError && ofertaFormState?.Endereco?.END_Bairro === null
              }
            >
              {globalCtx.idioma ? "Bairro*" : "Address*"}
            </FieldDesc>
            <Input
              type="text"
              w={250}
              error={
                thirdStepError && ofertaFormState?.Endereco?.END_Bairro === null
              }
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
          </OfertaFieldDiv>
          <OfertaFieldDiv>
            <FieldDesc>{globalCtx.idioma ? "Número" : "Number"}</FieldDesc>
            <Input
              type="text"
              w={100}
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
          </OfertaFieldDiv>
          <OfertaFieldDiv>
            <FieldDesc>
              {globalCtx.idioma ? "Complemento" : "Extra Address Info"}
            </FieldDesc>
            <Input
              type="text"
              w={350}
              maxLength="25"
              value={
                ofertaFormState?.Endereco?.END_Complemento &&
                ofertaFormState?.Endereco?.END_Complemento
              }
              onChange={(e) =>
                ofertaDispatch({
                  type: "EnderecoComplemento",
                  value: e.target.value,
                })
              }
            ></Input>
          </OfertaFieldDiv>
        </InputFieldsContainer>
      </OrigemContainer>
      {ofertaFormState?.OFE_FlagMercadoExterno === true && (
        <TipoLogisticoContainer>
          <SubsectionDesc>
            {globalCtx.idioma ? "Tipo logístico" : "Logistics Type"}
          </SubsectionDesc>
          <InputFieldsContainer>
            {" "}
            <OfertaFieldDiv>
              {/* <FieldDesc>Sistema produtivo</FieldDesc>
              <Select onChange={(e) => ofertaDispatch({ type: "TLSistemaProdutivo", value: e.target.value })} t>
                {tlSistemaProdutivo && <option selected="selected">Selecione sistema produtivo...</option>}
                {tlSistemaProdutivo ? (
                  tlSistemaProdutivo.map((el) => (
                    <option key={el.TLS_Id} value={el.TLS_Id}>
                      {el.TLS_Descricao}
                    </option>
                  ))
                ) : (
                  <option selected="selected">Carregando opções...</option>
                )}
              </Select> */}
            </OfertaFieldDiv>
            <OfertaFieldDiv>
              <FieldDesc>Incoterm</FieldDesc>
              <Select
                onChange={(e) =>
                  ofertaDispatch({ type: "TLPorto", value: e.target.value })
                }
              >
                {tlPorto && <option selected="selected">{stringSelect}</option>}
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
            </OfertaFieldDiv>
          </InputFieldsContainer>
          <SubsectionDesc>
            {globalCtx.idioma ? "Serviços opcionais" : "Optional Services"}
          </SubsectionDesc>
          <InputFieldsContainer>
            {" "}
            {servicosOpcionais &&
              servicosOpcionais?.map((so) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={
                      globalCtx.idioma
                        ? so.SEO_Descricao
                        : so.SEO_DescricaoIngles
                    }
                    style={{ margin: "10px" }}
                  />
                );
              })}
          </InputFieldsContainer>
        </TipoLogisticoContainer>
      )}
    </OfertaLogContainer>
  );
};

export default OfertaLog;
