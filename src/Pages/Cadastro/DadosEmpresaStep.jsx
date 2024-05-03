import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import MaskedInput from "../../Components/MaskedInput/MaskedInput";
import { AUTH_HEADER, REQ_BODY } from "../../data";
import {
  ConfirmBtn,
  FlexDivBetween,
  FlexDivWrap,
  Input,
  OutlineBtn,
} from "../../globalStyle";
import {
  BoldText,
  FieldDesc,
  OfertaFieldDiv,
  Select,
  SubsectionDesc,
} from "../Dashboard/Oferta/Oferta.styles";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { CadastroCtx } from "./Cadastro";
import {
  ButtonDiv,
  FieldDiv,
  InputCep,
  Section,
  StepInterfaceContainer,
  EnderecoFieldsContainer,
  EnderecoRowContainer,
  CadastroJson,
  Select as MySelect
} from "./Cadastro.styles";
import { useSearchParams } from "react-router-dom";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";
import { listaDDI } from "../../data";

const DadosEmpresaStep = () => {
  const { currentStep, setCurrentStep, empresaFormState, empresaFormDispatch } =
    useContext(CadastroCtx);

  const [usuarioCadastrado, setUsuarioCadastrado] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  //

  const { listaUsuarios } = useContext(GlobalDataCtx);

  useEffect(() => {
    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/Usuario/GetUsuarioById?USR_Id=${searchParams.get(
          "usr-id-token"
        )}&join=true`,
        {},
        AUTH_HEADER
      )
      .then((res) => setUsuarioCadastrado(res.data));
  }, []);

  const [formError, setFormError] = useState(false);

  //armazena lista de estados
  const [ufList, setUfList] = useState();

  const [devlog, setDevlog] = useState(false);

  //pega context global pra verificar idioma
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  //checkboxes de produtos (é populado por uma chamada de API)
  const [produtosCheckbox, setProdutosCheckbox] = useState();

  //lista de cidades
  const [cityList, setCityList] = useState();

  //lista de países
  const [countryList, setCountryList] = useState();

  //define o país baseado no idioma
  useEffect(() => {
    if (globalCtx.idioma) {
      empresaFormDispatch({
        type: "EnderecoPais",
        value: "Brasil",
      });
    } else {
      empresaFormDispatch({
        type: "EnderecoPais",
        value: null,
      });
    }
    setListaPaises(getListaDDISorted());
  }, [globalCtx.idioma]);

  //esse useEffect faz a chamada pra API e busca lista de estados e cidades, além de popular alguns campos
  useEffect(() => {
    axios.get("https://servicodados.ibge.gov.br/api/v1/paises").then((res) => {
      const brasil = res.data.find(
        (country) => country.nome.abreviado === "Brasil"
      );
      const eua = res.data.find(
        (country) => country.nome.abreviado === "Estados Unidos da América"
      );

      const paisesEuropeus = res.data.filter(
        (country) => country.localizacao.regiao.nome === "Europa"
      );
      const paisesAmerica = res.data.filter(
        (country) =>
          country.localizacao.regiao.nome === "América" &&
          country !== eua &&
          country !== brasil
      );

      const outrosPaises = res.data.filter(
        (country) =>
          country.localizacao.regiao.nome !== "América" &&
          country.localizacao.regiao.nome !== "Europa"
      );

      const arrayPaises = [
        eua,
        ...paisesEuropeus,
        ...paisesAmerica,
        ...outrosPaises,
      ];

      const ids = arrayPaises.map((o) => o.id.M49);

      const arraySemDuplicatas = arrayPaises.filter(
        ({ id }, index) => !ids.includes(id.M49, index + 1)
      );

      setCountryList(arraySemDuplicatas);
    });

    if (!ufList) {
      axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((resp) => {
          setUfList(resp.data);
        });
    }

    if (!cityList && empresaFormState.Endereco.END_Estado !== null) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${empresaFormState.Endereco.END_Estado}/municipios`
        )
        .then((res) => {
          setCityList(res.data);
        });
    }

    if (!produtosCheckbox) {
      //popular checkboxes de produtos
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/Produto/GetAllProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=PDT_Id`,
          REQ_BODY,
          AUTH_HEADER
        )
        .then((resp) => {
          setProdutosCheckbox(resp.data);
        });
    }
  }, [ufList, cityList, empresaFormState.Endereco.END_Estado]);

  //valida o cep
  const cepInputHandler = (e) => {
    const inputCepFormatado = e.target.value.trim().replace(/\D/g, "");

    if (globalCtx.idioma) {
      if (inputCepFormatado.length >= 8) {
        axios
          .get(`${process.env.REACT_APP_CEP_ENDPOINT}/ws/${e.target.value}/json/`)
          .then((res) => {
            if (res.data.erro) {
              setCepInputError(true);
            } else {
              setEnderecoViaCep(true);
              setCepInputError(false);
              empresaFormDispatch({
                type: "EnderecoCEP",
                value: {
                  cep: res.data.cep,
                  estado: res.data.uf,
                  cidade: res.data.localidade,
                  logradouro:
                    res.data.logradouro.length !== 0
                      ? res.data.logradouro
                      : "N/A",
                },
              });
            }
          });
      } else {
        setCepInputError(true);
      }
    } else {
      if (inputCepFormatado.length >= 5) {
        empresaFormDispatch({
          type: "EnderecoApenasCEPouZIP",
          value: inputCepFormatado,
        });
        setCepInputError(false);
      } else {
        setCepInputError(true);
      }
    }
  };

  //mudar pra true se o endereço vier via cep
  const [enderecoViaCep, setEnderecoViaCep] = useState(false);
  const [cepInputError, setCepInputError] = useState(false);

  //useEffect para mudar a preferencia da empresa sempre q o appLang mudar
  useEffect(() => {
    empresaFormDispatch({
      type: "PreferenciaIdioma",
      value: globalCtx.idioma ? false : true,
    });
  }, [globalCtx.idioma]);

  //validaçao diferenciada para ESTADO e CIDADE baseado no idioma
  //Se for pt-BR, 'empresaFormState.Endereco.END_Estado' e 'empresaFormState.Endereco.END_Cidade' precisam estar TRUE para cadastro ser efetuado
  //Se for ingles, os campos de estado e cidade nem aparecem
  const validacaoEstadoECidade = () => {
    if (globalCtx.idioma)
      return (
        empresaFormState.Endereco.END_Cidade &&
        empresaFormState.Endereco.END_Cidade
      );
    else return true;
  };

  const getListaDDISorted = () => {
    return listaDDI.sort( (a,b) => {
      if (globalCtx.idioma) {
        return a.namePT.localeCompare(b.namePT);
      }
      return a.nameEN.localeCompare(b.nameEN);
    })
  }

  const [listaPaises, setListaPaises] = useState(getListaDDISorted);

  const [pais, setPais] = useState(
    {
      "id" : 0,
      "namePT" : "Selecione...",
      "nameEN" : "Select...",
      "mask" : "+55 (99) 99999-9999"
  });

  return (
    <>
      {" "}
      {/* <CadastroJson>
        <h6 onClick={() => setDevlog(!devlog)}>
          Obj Empresa a ser enviado via API
        </h6>
        {devlog && <pre>{JSON.stringify(empresaFormState, null, 4)}</pre>}
      </CadastroJson>{" "} */}
      <StepInterfaceContainer>
        <h4>{globalCtx.idioma ? "Cadastrar" : "Registration"}</h4>
        {globalCtx.idioma
          ? `Bem vindo de volta, ${usuarioCadastrado?.Pessoa?.PES_Nome}.`
          : `Welcome back, ${usuarioCadastrado?.Pessoa?.PES_Nome}.`}
        <p>
          {globalCtx.idioma
            ? "Agora precisamos de algumas informações da sua empresa para fornecer a melhor experiência de negociação."
            : "Now we need to know more about your company to be able to give you the best experience on our platform."}
        </p>
        <FieldDiv w={100}>
          <FieldDesc
            naoFoiPreenchido={
              formError && empresaFormState.EMP_NomeFantasia === null
            }
          >
            {globalCtx.idioma ? "Nome da empresa*" : "Company name*"}
          </FieldDesc>
          <Input
            w={90}
            error={formError && empresaFormState.EMP_NomeFantasia === null}
            placeholder={empresaFormState?.EMP_NomeFantasia}
            onChange={(e) => {
              if (e.target.value.length !== 0) {
                empresaFormDispatch({
                  type: "NomeFantasia",
                  value: e.target.value.replace(/\s+/g, " ").trim(),
                });
                empresaFormDispatch({
                  type: "RazaoSocial",
                  value: e.target.value.replace(/\s+/g, " ").trim(),
                });
              } else {
                empresaFormDispatch({ type: "NomeFantasia", value: null });
              }
            }}
          ></Input>
        </FieldDiv>
        <FieldDiv>
          <FieldDesc
            naoFoiPreenchido={formError && empresaFormState.EMP_CNPJ === null}
          >
            {globalCtx.idioma ? "CNPJ*" : "Company TAX ID*"}
          </FieldDesc>
          {globalCtx.idioma ? (
            <MaskedInput
              mask="99.999.999/9999-99"
              w={90}
              error={formError && empresaFormState.EMP_CNPJ === null}
              placeholder={empresaFormState?.EMP_CNPJ}
              onChange={(e) => {
                const inputFormatado = e.target.value.replace(/\D/g, "");
                if (inputFormatado.length !== 0) {
                  empresaFormDispatch({ type: "CNPJ", value: inputFormatado });
                } else {
                  empresaFormDispatch({ type: "CNPJ", value: null });
                }
              }}
            ></MaskedInput>
          ) : (
            <Input
              w={90}
              error={formError && empresaFormState.EMP_CNPJ === null}
              placeholder={empresaFormState?.EMP_CNPJ}
              onChange={(e) => {
                const inputFormatado = e.target.value.replace(/\D/g, "");
                if (inputFormatado.length !== 0) {
                  empresaFormDispatch({ type: "CNPJ", value: inputFormatado });
                } else {
                  empresaFormDispatch({ type: "CNPJ", value: null });
                }
              }}
            />
          )}
        </FieldDiv>
        {/* <Input
  w={90}
  error={formError && empresaFormState.EMP_RazaoSocial === null}
  placeholder={empresaFormState.EMP_RazaoSocial ? empresaFormState.EMP_RazaoSocial : "Razão Social"}
  onChange={(e) => {
    if (e.target.value.length !== 0) {
     empresaFormDispatch({ type: "RazaoSocial", value: e.target.value.replace(/\s+/g, " ").trim() });
    } else {
     empresaFormDispatch({ type: "RazaoSocial", value: null });
    }
  }}
></Input> */}


          <FieldDiv>
            <FieldDesc>
              {globalCtx.idioma ? "País" : "Country"}
            </FieldDesc>
            <MySelect
              value={ pais.id
                // ofertaFormState.OFE_TipoProdutoId !== null &&
                // ofertaFormState.OFE_TipoProdutoId
              }
              onChange={(e) => {
                listaPaises.filter( p => {
                  return p.id === parseInt(e.target.value);
                }).map( p => {
                  setPais(p);
                })
              }}
            >
              {listaPaises ? (
                <>
                  <option value="0">{globalCtx.idioma ? "Selecione..." : "Select..."}</option>
                  {listaPaises?.map((p) => (
                    <option value={p.id} key={p.id}>
                      {globalCtx.idioma
                        ? p.namePT
                        : p.nameEN}
                    </option>
                  ))}
                </>
              ) : (
                <option selected="selected">
                  {globalCtx.idioma ? "Carregando..." : "Loading..."}
                </option>
              )}
            </MySelect>
          </FieldDiv>

        <FieldDiv>
          <FieldDesc
            naoFoiPreenchido={
              formError && empresaFormState.EMP_Telefone === null
            }
          >
            {globalCtx.idioma ? "Telefone da empresa*" : "Company phone*"}
          </FieldDesc>
          <MaskedInput
            mask={pais.mask}
            w={90}
            error={formError && empresaFormState.EMP_Telefone === null}
            placeholder={empresaFormState?.EMP_Telefone}
            onChange={(e) => {
              if (e.target.value.length !== 0) {
                empresaFormDispatch({
                  type: "TelEmpresa",
                  value: e.target.value,
                });
              } else {
                empresaFormDispatch({ type: "TelEmpresa", value: null });
              }
            }}
          ></MaskedInput>
        </FieldDiv>
        {/* <Input
  w={90}
  placeholder={empresaFormState.EMP_Faturamento ? empresaFormState.EMP_Faturamento : "Faturamento"}
  type="number"
  error={formError && empresaFormState.EMP_Faturamento === null}
  onChange={(e) => {
    if (e.target.value.length !== 0) {
     empresaFormDispatch({ type: "Faturamento", value: e.target.value });
    } else {
     empresaFormDispatch({ type: "Faturamento", value: null });
    }
  }}
></Input> */}
        <SubsectionDesc
          naoFoiPreenchido={
            formError && empresaFormState.EMP_TipoEmpresaId === null
          }
        >
          {globalCtx.idioma ? "Endereço" : "Address"}
        </SubsectionDesc>

        {enderecoViaCep && (
          <Button
            style={{ fontSize: "14px", marginTop: "5px" }}
            variant="link"
            onClick={() => setEnderecoViaCep(false)}
          >
            Informações incorretas? Clique aqui para editar
          </Button>
        )}
        <EnderecoRowContainer>
          <OfertaFieldDiv>
            <FieldDesc>{globalCtx.idioma ? "CEP" : "ZIP Code"}</FieldDesc>

            {enderecoViaCep ? (
              <BoldText>{empresaFormState.Endereco.END_CEP} ✔</BoldText>
            ) : (
              <InputCep
                type="text"
                maxLength="8"
                onChange={cepInputHandler}
                placeholder={empresaFormState.Endereco.END_CEP}
              ></InputCep>
            )}
            {cepInputError && (
              <span style={{ color: "tomato" }}>
                {globalCtx.idioma ? "Cep inválido." : "Invalid Zip code."}
              </span>
            )}
          </OfertaFieldDiv>
          {!globalCtx.idioma && (
            <OfertaFieldDiv>
              <FieldDesc>{globalCtx.idioma ? "País*" : "Country*"}</FieldDesc>
              <Select
                error={formError && empresaFormState.Endereco.END_Pais === null}
                onChange={(e) => {
                  empresaFormDispatch({
                    type: "EnderecoPais",
                    value: e.target.value,
                  });
                }}
              >
                <option>Select country...</option>
                {countryList &&
                  countryList.map((country) => (
                    <option key={country.id.M49} value={country.nome.abreviado}>
                      {globalCtx.idioma
                        ? country.nome.abreviado
                        : country.nome["abreviado-EN"]}
                    </option>
                  ))}
              </Select>
            </OfertaFieldDiv>
          )}
          {globalCtx.idioma && (
            <OfertaFieldDiv>
              <FieldDesc>{globalCtx.idioma ? "Estado*" : "State*"}</FieldDesc>
              {enderecoViaCep ? (
                <BoldText>{empresaFormState.Endereco.END_Estado}</BoldText>
              ) : (
                <Select
                  disabled={enderecoViaCep}
                  error={
                    formError && empresaFormState.Endereco.END_Estado === null
                  }
                  onChange={(e) => {
                    if (
                      e.target.value !== "Selecione o estado..." &&
                      e.target.value !== "Select state..."
                    ) {
                      empresaFormDispatch({
                        type: "EnderecoEstado",
                        value: e.target.value,
                      });
                    }

                    // if (empresaFormState.Endereco.END_Estado) {
                    //   empresaFormDispatch({
                    //     type: "EnderecoEstado",
                    //     value: null,
                    //   });
                    // }
                  }}
                >
                  <option selected="selected">
                    {globalCtx.idioma
                      ? "Selecione o estado..."
                      : "Select state..."}
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
              )}
            </OfertaFieldDiv>
          )}
          {globalCtx.idioma && (
            <OfertaFieldDiv>
              <FieldDesc>{globalCtx.idioma ? "Cidade*" : "City*"}</FieldDesc>
              {enderecoViaCep ? (
                <BoldText>{empresaFormState.Endereco.END_Cidade}</BoldText>
              ) : (
                <Select
                  id="cidade-select"
                  error={
                    formError && empresaFormState.Endereco.END_Cidade === null
                  }
                  onChange={(e) => {
                    if (
                      e.target.value !== "Selecione a cidade..." &&
                      e.target.value !== "Select city..."
                    ) {
                      empresaFormDispatch({
                        type: "EnderecoCidade",
                        value: e.target.value,
                      });
                    } else {
                      empresaFormDispatch({
                        type: "EnderecoCidade",
                        value: null,
                      });
                    }
                  }}
                >
                  {cityList ? (
                    <>
                      <option selected="selected">
                        {globalCtx.idioma
                          ? "Selecione a cidade..."
                          : "Select city..."}
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
                      {globalCtx.idioma
                        ? "Selecione o estado primeiro..."
                        : "Select the state first..."}
                    </option>
                  )}
                </Select>
              )}
            </OfertaFieldDiv>
          )}
        </EnderecoRowContainer>
        <EnderecoFieldsContainer>
          <FieldDiv>
            <FieldDesc>
              {globalCtx.idioma ? "Logradouro*" : "Street*"}
            </FieldDesc>
            {enderecoViaCep ? (
              <BoldText>{empresaFormState.Endereco.END_Logradouro}</BoldText>
            ) : (
              <Input
                error={
                  formError && empresaFormState.Endereco.END_Logradouro === null
                }
                type="text"
                w={90}
                placeholder={empresaFormState.Endereco.END_Logradouro}
                onChange={(e) =>
                  empresaFormDispatch({
                    type: "EnderecoLogradouro",
                    value: e.target.value.trim().replace(/\s\s+/g, " "),
                  })
                }
              ></Input>
            )}
          </FieldDiv>
          <FieldDiv>
            <FieldDesc>{globalCtx.idioma ? "Bairro" : "Address"}</FieldDesc>
            <Input
              type="text"
              // error={formError && empresaFormState.Endereco.END_Bairro === null}
              placeholder={empresaFormState.Endereco.END_Bairro}
              w={90}
              onChange={(e) =>
                empresaFormDispatch({
                  type: "EnderecoBairro",
                  value: e.target.value.trim().replace(/\s\s+/g, " "),
                })
              }
            ></Input>
          </FieldDiv>
          <EnderecoRowContainer>
            <FieldDiv>
              {" "}
              <FieldDesc>{globalCtx.idioma ? "Número*" : "Number*"}</FieldDesc>
              <Input
                type="text"
                w={90}
                error={
                  formError && empresaFormState.Endereco.END_Numero === null
                }
                maxLength="15"
                onChange={(e) =>
                  empresaFormDispatch({
                    type: "EnderecoNumero",
                    value: e.target.value.trim().replace(/\s\s+/g, " "),
                  })
                }
              ></Input>
            </FieldDiv>
            <FieldDiv>
              <FieldDesc>
                {globalCtx.idioma ? "Complemento" : "Extra address info"}
              </FieldDesc>
              <Input
                type="text"
                w={90}
                maxLength="25"
                onChange={(e) =>
                  empresaFormDispatch({
                    type: "EnderecoComplemento",
                    value: e.target.value.trim().replace(/\s\s+/g, " "),
                  })
                }
              ></Input>
            </FieldDiv>
          </EnderecoRowContainer>

          <Section>
            <SubsectionDesc
              naoFoiPreenchido={
                formError && empresaFormState.EMP_TipoEmpresaId === null
              }
            >
              {globalCtx.idioma ? "*Interesse em:" : "*Interested in:"}
            </SubsectionDesc>
            <Form>
              <FlexDivBetween>
                {" "}
                <Form.Check
                  type="radio"
                  name="tipo-empresa"
                  label={globalCtx.idioma ? "Comprar" : "Buy"}
                  defaultChecked={empresaFormState.EMP_TipoEmpresaId === 1}
                  onClick={() => {
                    empresaFormDispatch({ type: "TipoEmpresa", value: 1 });
                  }}
                />
                <Form.Check
                  type="radio"
                  name="tipo-empresa"
                  label={globalCtx.idioma ? "Vender" : "Sell"}
                  defaultChecked={empresaFormState.EMP_TipoEmpresaId === 2}
                  onClick={() => {
                    empresaFormDispatch({ type: "TipoEmpresa", value: 2 });
                  }}
                />
              </FlexDivBetween>
            </Form>
          </Section>
        </EnderecoFieldsContainer>
        <Section>
          <SubsectionDesc
            naoFoiPreenchido={
              formError && empresaFormState.listaEmpresaXProduto.length === 0
            }
          >
            {globalCtx.idioma
              ? "Produtos de interesse:"
              : "Products you are interested in:"}
          </SubsectionDesc>
          <FlexDivWrap>
            {produtosCheckbox &&
              produtosCheckbox.map((prd) => {
                return (
                  <div style={{ margin: "10px" }} key={prd.PDT_Id}>
                    {" "}
                    <Form.Check
                      type="checkbox"
                      key={prd.PDT_Id}
                      name={prd.PDT_Nome}
                      label={
                        globalCtx.idioma ? prd.PDT_Nome : prd.PDT_NomeIngles
                      }
                      onClick={() => {
                        if (
                          empresaFormState.listaEmpresaXProduto.find(
                            (el) => el.Produto.PDT_Id === prd.PDT_Id
                          )
                        ) {
                          empresaFormDispatch({
                            type: "RemoveProdutoInteresse",
                            value: prd.PDT_Id,
                          });
                        } else {
                          empresaFormDispatch({
                            type: "AddProdutoInteresse",
                            value: { id: prd.PDT_Id, nome: prd.PDT_Nome },
                          });
                        }
                      }}
                    />
                  </div>
                );
              })}
          </FlexDivWrap>
          <FieldDiv>
            <FieldDesc>
              {globalCtx.idioma ? "Outros produtos" : "Other products"}
            </FieldDesc>
            <Input type="text" w={90} maxLength="25"></Input>
          </FieldDiv>
        </Section>

        <ButtonDiv>
          {" "}
          {currentStep > 1 && (
            <OutlineBtn
              onClick={() =>
                setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)
              }
            >
              {globalCtx.idioma ? "Voltar" : "Back"}
            </OutlineBtn>
          )}
          {currentStep < 7 && (
            <ConfirmBtn
              onClick={() => {
                if (
                  empresaFormState.EMP_NomeFantasia &&
                  empresaFormState.EMP_RazaoSocial &&
                  empresaFormState.EMP_CNPJ &&
                  empresaFormState.EMP_Telefone &&
                  validacaoEstadoECidade() &&
                  // empresaFormState.Endereco.END_Bairro &&
                  empresaFormState.Endereco.END_Pais &&
                  empresaFormState.Endereco.END_Logradouro &&
                  empresaFormState.Endereco.END_Numero &&
                  empresaFormState.EMP_TipoEmpresaId &&
                  empresaFormState.listaEmpresaXProduto.length > 0
                ) {
                  setFormError(false);

                  setCurrentStep(4);
                } else {
                  setFormError(true);
                  toast.error(
                    globalCtx.idioma
                      ? "Por favor, preencha os campos obrigatórios (*) antes de continuar."
                      : "Please fill all the required fields (*) before proceeding."
                  );
                }
              }}
            >
              {globalCtx.idioma ? "Finalizar Cadastro" : "Finish registration"}
            </ConfirmBtn>
          )}
        </ButtonDiv>
      </StepInterfaceContainer>
    </>
  );
};

export default DadosEmpresaStep;
