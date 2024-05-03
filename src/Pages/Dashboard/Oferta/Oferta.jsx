import React, { useContext, useEffect, useState, useReducer } from "react";
import {
  ButtonWrapper,
  NavDivider,
  OfertaContainer,
  OfertaNav,
} from "./Oferta.styles";
import { DashCtx } from "../Dashboard";
import { Breadcrumb } from "react-bootstrap";
import NavItem from "./NavItem";
import OfertaInfo from "./OfertaInfo";
import OfertaDetalhes from "./OfertaDetalhes";
import OfertaLog from "./OfertaLog";
import OfertaAdicionais from "./OfertaAdicionais";
import { ConfirmBtn, OutlineBtn } from "../../../globalStyle";

import { CadastroJson } from "../../Cadastro/Cadastro.styles";
import ModalCtx from "../../../Context/ModalContext";
import axios from "axios";
import { AUTH_HEADER } from "../../../data";
import { toast } from "react-toastify";
import LoginCtx from "../../../Context/LoginContext";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import {
  getCurrentYear,
  validarCampos,
  validarSubcampos,
  getMarketplaceApiEndpoint
} from "../../../generalFunctions";
import { objOfertaInicial, ofertaReducer } from "./funcoesOferta";
import ReactTooltip from "react-tooltip";

//context
export const OfertaCtx = React.createContext({});

const Oferta = () => {
  const [devlog, setDevlog] = useState(false);

  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const { state } = useContext(LoginCtx);

  const { modalDispatch } = useContext(ModalCtx);

  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const stringSelect = globalCtx.idioma ? "Selecione..." : "Select...";
  const stringLoading = globalCtx.idioma ? "Carregando..." : "Loading...";
  const stringOther = globalCtx.idioma ? "Outro..." : "Other...";
  const stringMaxOffer = globalCtx.idioma
    ? "Número máximo de ofertas atingido."
    : "Maximum number of offers achieved.";
  const stringNewOffer = globalCtx.idioma
    ? "Nova oferta adicionada."
    : "New offer added.";
  const stringFormIncomplete = globalCtx.idioma
    ? "É necessário preencher todos os campos obrigatórios."
    : "You need to fill all the obrigatory fields.";

  //Informações (1) - Detalhes (2) - Logística (3) - Adicionais (4)
  const [currentStep, setCurrentStep] = useState(1);

  //states dos erros de validação de campos
  const [firstStepError, setFirstStepError] = useState(false);
  const [secondStepError, setSecondStepError] = useState(false);
  const [thirdStepError, setThirdStepError] = useState(false);
  const [fourthStepError, setFourthStepError] = useState(false);

  //manutençao do estado do obj a ser enviado para api
  let [ofertaFormState, ofertaDispatch] = useReducer(
    ofertaReducer,
    objOfertaInicial
  );

  useEffect(() => {
    ofertaDispatch({ type: "LimparForm" });

    //atribuindo id do usuario logado ao objeto q será enviado pra api
    ofertaDispatch({ type: "UsuarioCriandoOferta", value: state.userId });

    ofertaDispatch({
      type: "FlagIngles",
      value: globalCtx.idioma ? false : true,
    });

    ofertaDispatch({ type: "AnoColheita", value: getCurrentYear() });

    //buscando a empresa associada a esse usuario
    const empresaEncontrada = globalCtx.listaEmpresas.find(
      (emp) => emp.EMP_UsuarioId === state.userId
    );

    if (empresaEncontrada) {
      ofertaDispatch({
        type: "EmpresaCriandoOferta",
        value: empresaEncontrada.EMP_Id,
      });
      if (empresaEncontrada.EMP_TipoEmpresaId === 1) {
        ofertaDispatch({ type: "FlagVender", value: false });
      } else if (empresaEncontrada.EMP_TipoEmpresaId === 2) {
        ofertaDispatch({ type: "FlagVender", value: true });
      }
    } else {
      alert(
        "ATENÇÃO: Não foi possível encontrar uma empresa associada com o seu usuário. Por favor, entre em contato com o suporte."
      );
    }

    //atualizando localizaçao da pagina e breadcrumbs
    setLocationString(
      globalCtx.idioma ? "Cadastre sua Oferta/Demanda" : "Offer"
    );
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          {globalCtx.idioma ? "Início" : "Home"}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {globalCtx.idioma ? "Oferta" : "Offer"}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

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
      toast.error(
        globalCtx.idioma
          ? "Por favor, preencha os campos com valores válidos."
          : "Please, fill the form with valid values."
      );
      return false;
    } else {
      return true;
    }
  };

  //funçao executada quando o usuario clica em PUBLICAR
  const cadastrarOfertaHandler = () => {
    if (validarCamposHandler()) {
      modalDispatch({
        type: "CONFIG_MODAL",
        value: {
          display: true,
          title: globalCtx.idioma
            ? "Confirmar cadastro de Oferta"
            : "Confirm Offer Registration",
          text: globalCtx.idioma
            ? "Deseja confirmar o cadastro de oferta?"
            : "Do you want to confirm this offer registration?",
          modalWithBtn: true,
          cancelHandler: () => {
            modalDispatch({ type: "SET_DISPLAY", value: false });
          },
          confirmHandler: () => {
            modalDispatch({
              type: "CONFIG_MODAL",
              value: {
                display: true,
                title: globalCtx.idioma
                  ? `Cadastrando oferta`
                  : "Registering offer",

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
                  modalDispatch({
                    type: "CONFIG_MODAL",
                    value: {
                      display: true,
                      title: globalCtx.idioma
                        ? `Oferta cadastrada`
                        : "Offer registered",
                      text: globalCtx.idioma
                        ? "✅ A sua oferta foi cadastrada com sucesso e aguarda aprovação da Directto. Em breve você receberá informações."
                        : "Your offer was successfully registered. We are going to check it out and send you more info by e-mail.",
                      modalWithBtn: false,

                      cancelHandler: () => {
                        modalDispatch({ type: "SET_DISPLAY", value: false });
                        navigate("/dashboard", { replace: "true" });
                      },
                    },
                  });
                } else {
                  modalDispatch({ type: "SET_DISPLAY", value: false });
                  toast.error(
                    globalCtx.idioma
                      ? "O cadastro não foi realizado."
                      : "Something went wrong."
                  );
                }
              })
              .catch((err) => {
                modalDispatch({
                  type: "CONFIG_MODAL",
                  value: {
                    display: true,
                    title: `Oferta cadastrada mock`,
                    text: globalCtx.idioma
                      ? "Algo deu errado."
                      : "Something went wrong.",
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

  // Validação de cada etapa
  const validarEtapa = (etapa) => {
    let etapaIsValid = false;

    //validando campos da etapa 1
    if (etapa === 1) {
      if (
        validarCampos(
          ofertaFormState.OFE_FlagMercadoExterno,
          ofertaFormState.OFE_TipoProdutoId,
          // ofertaFormState.OFE_ProdutoId,
          ofertaFormState.Produto.PDT_Nome
        ) &&
        validarSubcampos(ofertaFormState.listaOfertaxQuantidadeProduto)
      ) {
        setFirstStepError(false);
        etapaIsValid = true;
      } else setFirstStepError(true);
    }
    //validando campos da etapa 2
    if (etapa === 2) {
      if (
        validarCampos(
          ofertaFormState.OFE_ModoCultivoSistemaProdutivoId,
          ofertaFormState.OFE_ModoCultivoModoProducaoId,
          ofertaFormState.OFE_StatusProdutoId,
          ofertaFormState.AnoColheita,
          ofertaFormState.OFE_Descricao
        ) &&
        validarSubcampos(ofertaFormState.listaOfertaxCertificacao, [
          "OXC_TipoCertificacaoId",
          "OXC_Comentarios",
          "OXC_DocumentoId",
        ])
      ) {
        setSecondStepError(false);
        etapaIsValid = true;
      } else setSecondStepError(true);
    }

    //validando campos da etapa 3
    if (etapa === 3) {
      if (globalCtx.idioma === false) {
        setThirdStepError(false);
        etapaIsValid = true;
      } else {
        if (
          validarCampos(
            ofertaFormState.Endereco.END_CEP,
            ofertaFormState.Endereco.END_Logradouro,
            ofertaFormState.Endereco.END_Bairro
          )
        ) {
          setThirdStepError(false);
          etapaIsValid = true;
        } else setThirdStepError(true);
      }
    }

    if (etapaIsValid) {
      toast.success(`Etapa ${etapa} concluída.`);
      setCurrentStep(currentStep + 1);
    } else {
      toast.error(stringFormIncomplete);
    }
  };

  return (
    <OfertaCtx.Provider
      value={{
        ofertaFormState,
        ofertaDispatch,
        firstStepError,
        secondStepError,
        thirdStepError,
        fourthStepError,
        stringFormIncomplete,
        stringLoading,
        stringMaxOffer,
        stringNewOffer,
        stringOther,
        stringSelect,
      }}
    >
      {/* <CadastroJson>
        <h6 onClick={() => setDevlog(!devlog)}>Objeto a ser enviado via API</h6>
        {devlog && <pre>{JSON.stringify(ofertaFormState, null, 4)}</pre>}
      </CadastroJson> */}
      <OfertaContainer>
        <OfertaNav>
          <NavItem
            step={1}
            title={globalCtx.idioma ? "Informações " : "Information "}
            isSelected={currentStep === 1}
            // onClick={() => setCurrentStep(1)}
          />
          <NavDivider />
          <NavItem
            step={2}
            title={globalCtx.idioma ? "Detalhes" : "Details"}
            isSelected={currentStep === 2}
            // onClick={() => setCurrentStep(2)}
          />

          <NavDivider />
          <NavItem
            step={3}
            title={globalCtx.idioma ? "Logística" : "Logistics"}
            isSelected={currentStep === 3}
            // onClick={() => setCurrentStep(3)}
          />
          <NavDivider />
          <NavItem
            step={4}
            title={globalCtx.idioma ? "Adicionais" : "Extras"}
            isSelected={currentStep === 4}
            // onClick={() => setCurrentStep(4)}
          />
        </OfertaNav>
        <hr></hr>
        {currentStep === 1 ? (
          <OfertaInfo />
        ) : currentStep === 2 ? (
          <OfertaDetalhes />
        ) : currentStep === 3 ? (
          <OfertaLog />
        ) : currentStep === 4 ? (
          <OfertaAdicionais />
        ) : (
          ""
        )}
        <ButtonWrapper>
          <OutlineBtn
            onClick={() =>
              setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)
            }
          >
            {globalCtx.idioma ? "Voltar" : "Back"}
          </OutlineBtn>
          <ConfirmBtn
            onClick={() => {
              if (currentStep === 4) {
                cadastrarOfertaHandler();
              } else {
                validarEtapa(currentStep);
              }
            }}
          >
            {currentStep === 4
              ? globalCtx.idioma
                ? "Publicar"
                : "Publish"
              : globalCtx.idioma
              ? "Continuar"
              : "Continue"}
          </ConfirmBtn>
        </ButtonWrapper>
      </OfertaContainer>
    </OfertaCtx.Provider>
  );
};

export default Oferta;
