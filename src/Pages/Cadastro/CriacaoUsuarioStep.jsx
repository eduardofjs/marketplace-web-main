import React, { useContext, useState, useEffect } from "react";
import { ConfirmBtn, FlexDivWrap, Input, OutlineBtn } from "../../globalStyle";
import { FieldDesc, SubsectionDesc } from "../Dashboard/Oferta/Oferta.styles";
import {
  ButtonDiv,
  InputWrapper,
  PwdReq,
  ReqDone,
  Section,
  FieldDiv,
  StepInterfaceContainer,
  CadastroJson,
  Select,
  Icon,
  FieldIcon
} from "./Cadastro.styles";

import { CadastroCtx } from "./Cadastro";
import { toast } from "react-toastify";
import { validaCPF, validatePassword } from "../../generalFunctions";
import InputMask from "react-input-mask";
import MaskedInput from "../../Components/MaskedInput/MaskedInput";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { UsuarioService } from "../../Services/UsuariosService";
import { listaDDI } from "../../data";

const CriacaoUsuarioStep = () => {
  const [formError, setFormError] = useState(false);
  const [confirmPwdError, setConfirmPwdError] = useState(false);
  const [existingEmailError, setExistingEmailError] = useState(false);
  const [devlog, setDevlog] = useState(false);

  const {
    currentStep,
    setCurrentStep,
    userFormState,
    userFormDispatch,
    appLang,
  } = useContext(CadastroCtx);

  const { globalCtx } = useContext(GlobalDataCtx);

  const [cpfInvalido, setCpfInvalido] = useState(false);

  //useEffect para mudar a preferencia de idioma do usuario sempre q o appLang mudar
  useEffect(() => {
    userFormDispatch({
      type: "PreferenciaIdioma",
      value: globalCtx.idioma ? false : true,
    });
    setListaPaises(getListaDDISorted());
  }, [globalCtx.idioma]);

  const inputCpfHandler = (e) => {
    const inputFormatado = e.target.value.replace(/\D/g, "");

    if (globalCtx.idioma) {
      if (inputFormatado.length !== 0) {
        if (inputFormatado.length === 11) {
          if (validaCPF(inputFormatado)) {
            userFormDispatch({
              type: "CPF",
              value: inputFormatado,
            });
            setCpfInvalido(false);
          } else {
            setCpfInvalido(true);
          }
        }
      } else {
        setCpfInvalido(false);
        userFormDispatch({ type: "CPF", value: null });
      }
    } else {
      userFormDispatch({
        type: "CPF",
        value: inputFormatado,
      });
      setCpfInvalido(false);
    }
  };

  const usuarioService = UsuarioService();
  
  const checarEmailExistenteHandler = async (email) => {

    const usuarioResponse = await usuarioService.validarEmailExistente(email);

    if (Array.isArray(usuarioResponse.data) && usuarioResponse.data.length === 0) {
      setExistingEmailError(false);
      return true;
    }
  
    setExistingEmailError(true);
    return false;
  
  };

  const getListaDDISorted = () => {
    return listaDDI.sort( (a,b) => {
      if (globalCtx.idioma) {
        return a.namePT.localeCompare(b.namePT);
      }
      return a.nameEN.localeCompare(b.nameEN);
    })
  }

  const [listaPaises, setListaPaises] = useState(getListaDDISorted());

  const [pais, setPais] = useState(
    {
      "id" : 0,
      "namePT" : "Selecione...",
      "nameEN" : "Select...",
      "mask" : "+55 (99) 99999-9999"
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <>    
      {/* <CadastroJson>
        <h6 onClick={() => setDevlog(!devlog)}>
          Obj Usuario a ser enviado via API
        </h6>
        {devlog && <pre>{JSON.stringify(userFormState, null, 4)}</pre>}
      </CadastroJson>{" "} */}
      <StepInterfaceContainer>
        <h4>{globalCtx.idioma ? "Cadastrar" : "Registration"}</h4>
        <p>
          {globalCtx.idioma
            ? "Para começar a negociar na Directto é simples e como primeiro passo queremos conhecer um pouco mais sobre você."
            : "First we want to know more about you."}
        </p>
        <InputWrapper>
          <FieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                formError && userFormState.Pessoa.PES_Nome === null
              }
            >
              {globalCtx.idioma ? "Nome completo" : "Full name"}
            </FieldDesc>
            <Input
              w={90}
              error={formError && userFormState.Pessoa.PES_Nome === null}
              placeholder={userFormState?.Usuario?.Pessoa.PES_Nome}
              onChange={(e) => {
                if (e.target.value.length !== 0) {
                  userFormDispatch({
                    type: "NomeCompleto",
                    value: e.target.value.replace(/\s+/g, " ").trim(),
                  });
                } else {
                  userFormDispatch({ type: "NomeCompleto", value: null });
                }
              }}
            ></Input>
          </FieldDiv>

          <FieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                formError && userFormState.Pessoa.PES_Cpf === null
              }
            >
              {globalCtx.idioma ? "CPF" : "TAX ID"}
            </FieldDesc>
            {cpfInvalido && (
              <span id="meuspan" style={{ color: "tomato" }}>
                {globalCtx.idioma
                  ? "O CPF inserido não é válido!"
                  : "Invalid TAX ID!"}
              </span>
            )}
            {globalCtx.idioma ? (
                <MaskedInput
                  mask="999.999.999-99"
                  w={90}
                  error={
                    formError &&
                    (userFormState.Pessoa.PES_Cpf === null || cpfInvalido)
                  }
                  placeholder={userFormState?.Usuario?.Pessoa?.PES_Cpf}
                  onChange={(e) => inputCpfHandler(e)}
                ></MaskedInput>
            ) : (
              <Input
                w={90}
                error={
                  formError &&
                  (userFormState.Pessoa.PES_Cpf === null || cpfInvalido)
                }
                placeholder={userFormState?.Usuario?.Pessoa?.PES_Cpf}
                onChange={(e) => inputCpfHandler(e)}
              />
            )}

            <FieldDesc
              naoFoiPreenchido={formError && userFormState.USR_Email === null}
            >
              {globalCtx.idioma ? "E-mail" : "E-mail"}
            </FieldDesc>
            <Input
              w={90}
              type="email"
              error={formError && userFormState.USR_Email === null}
              placeholder={userFormState?.Usuario?.USR_Email}
              onChange={(e) => {
                if (e.target.value.length >= 1) {
                  setExistingEmailError(false);
                  userFormDispatch({ type: "Email", value: e.target.value });
                } else {
                  userFormDispatch({ type: "Email", value: null });
                }
              }}
            ></Input>
            {existingEmailError && (
              <span
                style={{
                  color: "tomato",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                {globalCtx.idioma
                  ? " Já existe um usuário cadastrado com esse e-mail."
                  : "This e-mail is already registered."}
              </span>
            )}
          </FieldDiv>

          <FieldDiv>
            <FieldDesc>
              {globalCtx.idioma ? "País" : "Country"}
            </FieldDesc>
            <Select
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
            </Select>
          </FieldDiv>


          <FieldDiv>
            <FieldDesc
              naoFoiPreenchido={
                formError && userFormState.Pessoa.PES_Celular === null
              }
            >
              {globalCtx.idioma ? "Telefone" : "Phone"}
            </FieldDesc>
            <MaskedInput
              mask={pais.mask}
              w={90}
              error={formError && userFormState.Pessoa.PES_Celular === null}
              placeholder={userFormState?.Usuario?.Pessoa?.PES_Celular}
              onChange={(e) => {
                const inputFormatado = e.target.value.replace(/\D/g, "");
                if (inputFormatado.length !== 0) {
                  userFormDispatch({ type: "Telefone", value: inputFormatado });
                } else {
                  userFormDispatch({ type: "Telefone", value: null });
                }
              }}
            ></MaskedInput>
          </FieldDiv>

          <FieldDiv>
            <FieldDesc
              naoFoiPreenchido={formError && userFormState.USR_Senha === null}
            >
              {globalCtx.idioma ? "Senha" : "Password"}
            </FieldDesc>
            <FieldIcon>
              <Input
                w={90}
                type={showPassword ? "text" : "password"}
                placeholder={
                  userFormState.USR_Senha &&
                  "*".repeat(userFormState.USR_Senha.length)
                }
                error={formError && userFormState.USR_Senha === null}
                onKeyDown={(e) => {
                  e.which === 32 && e.preventDefault();
                }}
                onChange={(e) => {
                  if (e.target.value.length !== 0) {
                    userFormDispatch({
                      type: "Senha",
                      value: e.target.value.replace(/\s/g, "").trim(),
                    });
                  } else {
                    userFormDispatch({ type: "Senha", value: null });
                  }
                }}
              >
                {/* { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> } */}
              </Input>
              {
                showPassword ?
                  <Icon className="fa-solid fa-eye" id="eye-password" onClick={ (e) => setShowPassword(!showPassword) }/>
                  :
                  <Icon className="fa-solid fa-eye-slash" id="eye-password" onClick={ (e) => setShowPassword(!showPassword) }/>
              }
            </FieldIcon>
          </FieldDiv>

          
          <FieldDiv>
            <FieldDesc>
              {globalCtx.idioma ? "Confirmar senha" : "Confirm password"}
            </FieldDesc>
            <FieldIcon>
              <Input
                w={90}
                type={showConfirmPassword ? "text" : "password"}
                error={confirmPwdError && userFormState.USR_Senha !== null}
                onChange={(e) =>
                  e.target.value !== userFormState.USR_Senha
                    ? setConfirmPwdError(true)
                    : setConfirmPwdError(false)
                }
              ></Input>
              {
                showConfirmPassword ?
                  <Icon className="fa-solid fa-eye" id="eye-password-confirm" onClick={ (e) => setShowConfirmPassword(!showConfirmPassword)}/>
                  :
                  <Icon className="fa-solid fa-eye-slash" id="eye-password-confirm" onClick={ (e) => setShowConfirmPassword(!showConfirmPassword)}/>
              }
            </FieldIcon>
          </FieldDiv>
        </InputWrapper>
        {/* <Section>
        <SubsectionDesc naoFoiPreenchido={formError && userFormState.EMP_TipoEmpresaId === null}>Eu sou</SubsectionDesc>
        <Form>
          <FlexDivBetween>
            {" "}
            <Form.Check
              type="radio"
              name="tipo-empresa"
              label="Comprador"
              defaultChecked={userFormState.EMP_TipoEmpresaId === 1}
              onClick={() => {
               userFormDispatch({ type: "TipoEmpresa", value: 1 });
              }}
            />
            <Form.Check
              type="radio"
              name="tipo-empresa"
              label="Fornecedor"
              defaultChecked={userFormState.EMP_TipoEmpresaId === 2}
              onClick={() => {
               userFormDispatch({ type: "TipoEmpresa", value: 2 });
              }}
            />
            <Form.Check
              type="radio"
              name="tipo-empresa"
              id="ambos"
              label="Ambos"
              defaultChecked={userFormState.EMP_TipoEmpresaId === 3}
              onClick={() => {
               userFormDispatch({ type: "TipoEmpresa", value: 3 });
              }}
            />
          </FlexDivBetween>
        </Form>
      </Section> */}
        {/* <SubsectionDesc>Senha</SubsectionDesc> */}
        {confirmPwdError && (
          <span style={{ color: "tomato" }}>
            {globalCtx.idioma
              ? "As senhas precisam ser iguais."
              : "Password must match."}
          </span>
        )}
        <Section hide={userFormState.USR_Senha === null}>
          <SubsectionDesc>
            {globalCtx.idioma
              ? "Sua senha deve conter"
              : "Your password must have"}
          </SubsectionDesc>
          <FlexDivWrap>
            <PwdReq
              error={
                userFormState.USR_Senha !== null &&
                !validatePassword(userFormState.USR_Senha, /(.*[A-Z].*)/)
              }
            >
              <ReqDone />
              <span>
                {globalCtx.idioma
                  ? "1 letra maiúscula"
                  : "At least 1 uppercase character"}
              </span>
            </PwdReq>
            <PwdReq
              error={
                userFormState.USR_Senha !== null &&
                !validatePassword(userFormState.USR_Senha, /(.*[a-z].*)/)
              }
            >
              <ReqDone />
              {globalCtx.idioma
                ? "1 letra minúscula"
                : "At least 1 lowercase character"}
            </PwdReq>
            <PwdReq
              error={
                userFormState.USR_Senha !== null &&
                !validatePassword(userFormState.USR_Senha, /(.*\W.*)/)
              }
            >
              <ReqDone />
              {globalCtx.idioma
                ? "1 caractere especial (@, #, $...)"
                : "1 special symbol (@, #, $...)"}
            </PwdReq>
            <PwdReq
              error={
                userFormState.USR_Senha !== null &&
                userFormState.USR_Senha.length < 8
              }
            >
              <ReqDone />
              {globalCtx.idioma
                ? "No mínimo 8 caracteres"
                : "At least 8 characters"}
            </PwdReq>
          </FlexDivWrap>
        </Section>
        <ButtonDiv>
          {" "}
          {currentStep > 1 && (
            <OutlineBtn
              onClick={() =>
                setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)
              }
            >
              Voltar
            </OutlineBtn>
          )}
          {currentStep < 7 && (
            <ConfirmBtn
              onClick={async () => {
                const isEmailExistente = await checarEmailExistenteHandler(userFormState.USR_Email);
                if (
                  isEmailExistente &&
                  userFormState.Pessoa.PES_Nome !== null &&
                  userFormState.Pessoa.PES_Cpf !== null &&
                  userFormState.Pessoa.PES_Celular !== null &&
                  userFormState.USR_Email !== null &&
                  userFormState.USR_Senha !== null &&
                  !cpfInvalido &&
                  userFormState.USR_Senha.length >= 8 &&
                  confirmPwdError === false
                ) {
                  if (validatePassword(userFormState.USR_Senha)) {
                    setCurrentStep(
                      currentStep < 7 ? currentStep + 1 : currentStep
                    );
                  } else {
                    toast.error(
                      globalCtx.idioma
                        ? "A senha inserida não é válida."
                        : "Password is not valid."
                    );
                  }
                } else {
                  setFormError(true);
                  toast.error(
                    globalCtx.idioma
                      ? "Por favor, preencha todos os campos para continuar."
                      : "Please complete all fields before proceeding."
                  );
                }
              }}
            >
              {globalCtx.idioma ? "Criar usuário" : "Create user"}
            </ConfirmBtn>
          )}
        </ButtonDiv>
      </StepInterfaceContainer>
    </>
  );
};

export default CriacaoUsuarioStep;
