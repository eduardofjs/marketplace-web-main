import React, { useState, useReducer, useEffect, useContext } from "react";
import {
  BoldTag,
  CadastroContainer,
  CadastroFormContainer,
  CadastroHeaderBg,
  Checked,
  CloseBtn,
  CurrentStepDisplay,
  DirecttoLogo,
  FinishedStep,
  FormMain,
  FormNavigation,
  LoadingNextStepDiv,
  Step,
  StepDivider,
  StepsContainer,
  StepTitle,
  SwitchLangDiv,
  Unchecked,
} from "./Cadastro.styles";
import ReactLoading from "react-loading";
import logo from "../../Assets/directto_logo.png";
import { useNavigate } from "react-router";
import CriacaoUsuarioStep from "./CriacaoUsuarioStep";
import DadosEmpresaStep from "./DadosEmpresaStep";
import errorSvg from "../../Assets/errorCadastro.svg";

import Sucesso from "./Sucesso";
import Flag from "react-world-flags";
import ConfirmUser from "./ConfirmUser";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AUTH_HEADER, REQ_BODY } from "../../data";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { toast } from "react-toastify";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

//state do preenchimento do formulario USUARIO
let objUsuarioInicial = {
  USR_Id: 0,
  USR_Email: null,
  USR_Senha: null,
  USR_Ativo: true,
  USR_FlagIngles: false,
  Pessoa: {
    PES_Nome: null,
    PES_Cpf: null,
    PES_Celular: null, //campo "telefone" na tela
  },
};

//função reducer que vai modificar o obj formulario usuario
const userReducer = (state, action) => {
  switch (action.type) {
    case "NomeCompleto":
      return { ...state, Pessoa: { ...state.Pessoa, PES_Nome: action.value } };
    case "Email":
      return { ...state, USR_Email: action.value };
    case "CPF":
      return { ...state, Pessoa: { ...state.Pessoa, PES_Cpf: action.value } };
    case "Telefone":
      return {
        ...state,
        Pessoa: { ...state.Pessoa, PES_Celular: action.value },
      };
    case "Senha":
      return { ...state, USR_Senha: action.value };
    case "PreferenciaIdioma":
      return { ...state, USR_FlagIngles: action.value };
    default:
      break;
  }
};

//state do preenchimento do formulario EMPRESA
let objEmpresaInicial = {
  EMP_UsuarioId: null,
  listaEmpresaXProduto: [],

  EMP_TipoEmpresaId: null, //se é comprador (1), vendedor (2) ou ambos

  EMP_FlagIngles: false,
  EMP_CNPJ: null,
  EMP_RazaoSocial: null,
  EMP_NomeFantasia: null,

  EMP_Telefone: null,

  Endereco: {
    END_Pais: null,
    END_CEP: null,
    END_Estado: null,
    END_Cidade: null,
    END_Bairro: null,
    END_Numero: null,
    END_Logradouro: null,
  },

  EMP_Ativo: true,
};

//funçao reducer que modifica os campos de cadastro
const reducer = (state, action) => {
  switch (action.type) {
    case "AtribuirUsuario":
      return { ...state, EMP_UsuarioId: action.value };
    case "MercadoInterno":
      return {
        ...state,
        EMP_FlagMercadoInterno: true,
        EMP_FlagMercadoExterno: false,
      };
    case "MercadoExterno":
      return {
        ...state,
        EMP_FlagMercadoInterno: false,
        EMP_FlagMercadoExterno: true,
      };
    case "MercadoAmbos":
      return {
        ...state,
        EMP_FlagMercadoInterno: true,
        EMP_FlagMercadoExterno: true,
      };
    case "EnderecoEstado":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Estado: action.value },
      };
    case "EnderecoPais":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Pais: action.value },
      };
    case "EnderecoCidade":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Cidade: action.value },
      };
    case "EnderecoCEP":
      return {
        ...state,
        Endereco: {
          ...state.Endereco,
          END_CEP: action.value.cep,
          END_Estado: action.value.estado,
          END_Cidade: action.value.cidade,
          END_Logradouro: action.value.logradouro,
        },
      };
    case "EnderecoApenasCEPouZIP":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_CEP: action.value },
      };
    case "EnderecoLogradouro":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Logradouro: action.value },
      };
    case "EnderecoBairro":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Bairro: action.value },
      };
    case "EnderecoNumero":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Numero: action.value },
      };
    case "EnderecoComplemento":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Complemento: action.value },
      };
    case "EMP_Valor":
      return { ...state, EMP_Valor: action.value };
    case "ServicosAdicionaisADD":
      return {
        ...state,
        listaEmpresaxServicoAdicional: [
          ...state.listaEmpresaxServicoAdicional,
          action.value,
        ],
      };
    case "ServicosAdicionaisREMOVE":
      return {
        ...state,
        listaEmpresaxServicoAdicional:
          state.listaEmpresaxServicoAdicional.filter(
            (el) => el !== action.value
          ),
      };
    case "ServicosFinanceirosADD":
      return {
        ...state,
        listaEmpresaxServicoFinanceiro: [
          ...state.listaEmpresaxServicoFinanceiro,
          action.value,
        ],
      };
    case "ServicosFinanceirosREMOVE":
      return {
        ...state,
        listaEmpresaxServicoFinanceiro:
          state.listaEmpresaxServicoFinanceiro.filter(
            (el) => el !== action.value
          ),
      };
    case "LogisticaADD":
      return {
        ...state,
        listaEmpresaxLogistica: [...state.listaEmpresaxLogistica, action.value],
      };
    case "LogisticaREMOVE":
      return {
        ...state,
        listaEmpresaxLogistica: state.listaEmpresaxLogistica.filter(
          (el) => el !== action.value
        ),
      };
    case "TermoTransporte":
      return { ...state, EMP_FlagTermoTransporte: action.value };
    case "TermoPagamento":
      return { ...state, EMP_FlagTermoPagamento: action.value };

    case "TipoEmpresa":
      return { ...state, EMP_TipoEmpresaId: action.value };
    case "CNPJ":
      return { ...state, EMP_CNPJ: action.value };
    case "NomeFantasia":
      return { ...state, EMP_NomeFantasia: action.value };
    case "RazaoSocial":
      return { ...state, EMP_RazaoSocial: action.value };
    case "TelEmpresa":
      return { ...state, EMP_Telefone: action.value };
    case "PreferenciaIdioma":
      return { ...state, EMP_FlagIngles: action.value };

    case "AddProdutoInteresse":
      return {
        ...state,
        listaEmpresaXProduto: [
          ...state.listaEmpresaXProduto,
          {
            Produto: {
              PDT_Id: action.value.id,
              PDT_Nome: action.value.nome,
              PDT_FlagAtivo: false,
            },
          },
        ],
      };
    case "RemoveProdutoInteresse":
      return {
        ...state,
        listaEmpresaXProduto: state.listaEmpresaXProduto.filter(
          (el) => el.Produto.PDT_Id !== action.value
        ),
      };
    default:
  }
};

//cria um context pra tornar o reducer e o formulario disponivel em todos os subcomponentes
export const CadastroCtx = React.createContext({});

const Cadastro = () => {
  let navigate = useNavigate();

  //pega context global pra verificar idioma
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  ///////////////// VERIFICAÇÃO PARA IR PARA A ETAPA DE CADASTRO EMPRESA //////////////////////////////////
  //aqui verifica se recebeu o ID do usuario cadastrado via URL - caso tenha recebido,
  //1) validar usuario
  //2) verificar se usuario ja tem empresa cadastrada
  //3) caso nao haja empresa cadastrada para aquele usuario, prosseguir para o cadastro de empresa

  const [usuarioCadastrado, setUsuarioCadastrado] = useState(false);
  const [jaExisteEmpresa, setJaExisteEmpresa] = useState(false);

  //query string react router v6
  const [searchParams] = useSearchParams();

  //pega o token
  const token = searchParams.get("usr-id-token");

  const [loadingNextStep, setLoadingNextStep] = useState(false);

  useEffect(() => {
    if (token) {
      setLoadingNextStep(true);

      const endpointUser = `${getMarketplaceApiEndpoint()}/api/Usuario/GetUsuarioById?USR_Id=${token}&join=true`;

      const endpointEmpresa = `${getMarketplaceApiEndpoint()}/api/Empresa/GetAllEmpresa?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=EMP_Id`;

      axios
        .post(endpointUser, REQ_BODY, AUTH_HEADER)
        .then((response) => {
          if (response.status === 200) {
            const USR_Id = response.data.USR_Id;

            empresaFormDispatch({ type: "AtribuirUsuario", value: USR_Id });
            setUsuarioCadastrado(response.data);
            //aqui o usuario foi validado. Agora, vamos verificar se já existe um cadastro de empresa para esse usuario
            axios
              .post(endpointEmpresa, REQ_BODY, AUTH_HEADER)
              .then((response) => {
                if (response.status === 200) {
                  const empresaCadastrada = response.data.find(
                    (empresa) => empresa.EMP_UsuarioId == USR_Id
                  );
                  if (empresaCadastrada) {
                    setJaExisteEmpresa(true);
                  } else {
                    setCurrentStep(3);
                    setLoadingNextStep(false);
                  }
                }
              });
          }
        })
        .catch((err) => {
          toast.error("Erro ao buscar dados de usuário.");
        });
    }
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [currentStep, setCurrentStep] = useState(1);

  //estado e dispatcher do formulario EMPRESA
  let [empresaFormState, empresaFormDispatch] = useReducer(
    reducer,
    objEmpresaInicial
  );

  //estado e dispatcher do formulario USUARIO
  let [userFormState, userFormDispatch] = useReducer(
    userReducer,
    objUsuarioInicial
  );

  //essa funçao é executada quando o usuario clica em "continuar"
  //ela verifica se os campos do passo atual estão todos preenchidos

  return (
    <CadastroCtx.Provider
      value={{
        empresaFormState,
        empresaFormDispatch,
        userFormState,
        userFormDispatch,
        currentStep,
        setCurrentStep,
      }}
    >
      {" "}
      {loadingNextStep && (
        <LoadingNextStepDiv>
          {!jaExisteEmpresa ? (
            <>
              <ReactLoading
                type={"spin"}
                color={"green"}
                height={150}
                width={150}
              />
              <h4 style={{ marginTop: "30px" }}> Carregando...</h4>
            </>
          ) : (
            <>
              <img src={errorSvg} width="250px"></img>
              <h4 style={{ marginTop: "30px" }}>
                Ops! Já existe uma empresa cadastrada para o usuário{" "}
                {<BoldTag>{usuarioCadastrado.Pessoa.PES_Nome}</BoldTag>}.
              </h4>
            </>
          )}
        </LoadingNextStepDiv>
      )}
      <CadastroContainer>
        <SwitchLangDiv
          onClick={() =>
            globalCtx.idioma
              ? globalCtxDispatch({ type: "setIdiomaEN" })
              : globalCtxDispatch({ type: "setIdiomaBR" })
          }
        >
          <Flag code={globalCtx.idioma ? "BR" : "US"} height="16" />
          <span>{globalCtx.idioma ? "Português" : "English"}</span>
        </SwitchLangDiv>
        <CadastroHeaderBg>
          <DirecttoLogo src={logo} />
          <CloseBtn onClick={() => navigate("/", { replace: true })} />
        </CadastroHeaderBg>
        <CadastroFormContainer>
          <FormNavigation>
            <h4>{globalCtx.idioma ? "Passos" : "Steps"}</h4>
            <StepsContainer>
              <Step>
                <StepTitle>
                  {" "}
                  {currentStep >= 1 ? <Checked /> : <Unchecked />}{" "}
                  <span>
                    {globalCtx.idioma ? "Informações do Usuário" : "User Info"}
                  </span>
                </StepTitle>
                {currentStep > 1 && <FinishedStep />}
              </Step>
              <StepDivider />
              <Step>
                <StepTitle>
                  {" "}
                  {currentStep >= 2 ? <Checked /> : <Unchecked />}{" "}
                  <span>
                    {globalCtx.idioma ? "Confirmar Usuário" : "Confirm User"}
                  </span>
                </StepTitle>
                {currentStep > 2 && <FinishedStep />}
              </Step>
              <StepDivider />

              {
                token ? 
                <Step onClick={() => setCurrentStep(3)}>
                  {/* onClick={() => setCurrentStep(3)} */}
                  <StepTitle>
                    {" "}
                    {currentStep >= 3 ? <Checked /> : <Unchecked />}{" "}
                    <span>
                      {globalCtx.idioma
                        ? "Informações da Empresa"
                        : "Company Info"}
                    </span>
                  </StepTitle>
                  {currentStep > 3 && <FinishedStep />}
                </Step>
                :
                <Step>
                <StepTitle>
                  {" "}
                  {currentStep >= 3 ? <Checked /> : <Unchecked />}{" "}
                  <span>
                    {globalCtx.idioma
                      ? "Informações da Empresa"
                      : "Company Info"}
                  </span>
                </StepTitle>
                {currentStep > 3 && <FinishedStep />}
              </Step>
              }
              

              {/* <StepDivider />
              <Step>
                <StepTitle>
                  {currentStep >= 5 ? <Checked /> : <Unchecked />} <span>Enviar documentos</span>
                </StepTitle>
                {currentStep > 5 && <FinishedStep />}
              </Step>
              <StepDivider />
              <Step>
                <StepTitle>
                  {" "}
                  {currentStep >= 6 ? <Checked /> : <Unchecked />} <span>Termos</span>
                </StepTitle>
                {currentStep > 6 && <FinishedStep />}
              */}
              {/* </Step> */}
              <StepDivider />
              <Step>
                <StepTitle>
                  {" "}
                  {currentStep >= 4 ? <Checked /> : <Unchecked />}{" "}
                  <span>
                    {globalCtx.idioma
                      ? "Concluir cadastro"
                      : "Finish registration"}
                  </span>
                </StepTitle>
              </Step>
            </StepsContainer>
          </FormNavigation>
          <FormMain>
            <CurrentStepDisplay>
              {" "}
              {currentStep === 1 && <CriacaoUsuarioStep />}
              {currentStep === 2 && <ConfirmUser />}
              {currentStep === 3 && <DadosEmpresaStep />}
              {currentStep === 4 && <Sucesso />}
            </CurrentStepDisplay>
          </FormMain>
        </CadastroFormContainer>
      </CadastroContainer>
    </CadastroCtx.Provider>
  );
};

export default Cadastro;
