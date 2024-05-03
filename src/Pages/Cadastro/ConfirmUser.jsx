import React, { useEffect, useState, useContext } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { CadastroCtx } from "./Cadastro";
import successSvg from "../../Assets/confirmEmail.svg";
import errorSvg from "../../Assets/errorCadastro.svg";
import { BoldTag, ConfirmRegisterDiv } from "./Cadastro.styles";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const ConfirmUser = () => {
  let navigate = useNavigate();
  const { userFormState, appLang } = useContext(CadastroCtx);
  const [requestResponse, setRequestResponse] = useState();

  const nomeUsuarioCadastrado = userFormState.Pessoa.PES_Nome;
  const emailUsuarioCadastrado = userFormState.USR_Email;

  useEffect(() => {
    axios
      .put(`${getMarketplaceApiEndpoint()}/api/Usuario/CadastroUsuario`, userFormState, {
        auth: {
          username: "AccessDirecttoDevAPI",
          password: "rt89723hkjbsdfjhwer928374jbsnfmjhwgjhwg",
        },
        headers: {
          Authorization: "Basic QWNjZXNzTGVhcFN0eWxlREVWQVBJOk1qQk1SV0Z3VTNSNVRHVlNiMk5yZEZOMGRXUnBiekl4",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRequestResponse(response);
        } else {
          setRequestResponse(response.data.mensagemSucesso);
        }
      });
  }, []);

    //pega context global pra verificar idioma
  const {globalCtx, globalCtxDispatch} = useContext(GlobalDataCtx);

  return (
    <ConfirmRegisterDiv>
      {requestResponse ? (
        requestResponse?.status === 200 ? (
          <>
            <img width="250px" src={successSvg} />
            <h4>
              {globalCtx.idioma
                ? "Confirme seu cadastro de usuário via E-mail"
                : "Confirm your user registration on your E-mail"}
            </h4>

            <p>
              {globalCtx.idioma
                ? `Bem vindo, ${nomeUsuarioCadastrado}! Antes de iniciarmos o cadastro da sua
              empresa, precisamos primeiro confirmar o seu cadastro de usuário.`
                : `Welcome, ${nomeUsuarioCadastrado}! Before starting the process of your company registration, we need you to confirm your user registration.`}
            </p>

            <p>
              {globalCtx.idioma
                ? `Você recebeu um link de confirmação de cadastro no seu e-mail
              ${emailUsuarioCadastrado}. Verifique a caixa de spam.`
                : `You received an confirmation link on your e-mail address
              ${emailUsuarioCadastrado}. Remember to check the spam box.`}
            </p>

            <bold>
              {globalCtx.idioma
                ? ` Ao clicar no link enviado por e-mail, você será redirecionado de volta para a tela de cadastro para a
              próxima etapa.`
                : `When you click on the confirmation link, you will be redirected back to the company registration step.`}
            </bold>
          </>
        ) : (
          <>
            <img width="250px" src={errorSvg} />
            <h4>
              {globalCtx.idioma
                ? "O seu cadastro não foi realizado."
                : "Something wen't wrong, your registration wasn't successful."}
            </h4>

            <p>{requestResponse}</p>

            <Button variant="link" onClick={() => navigate("/", { replace: "true" })}>
              Voltar para a página inicial
            </Button>
          </>
        )
      ) : (
        <ReactLoading type={"spin"} color={"green"} height={150} width={150} />
      )}
    </ConfirmRegisterDiv>
  );
};

export default ConfirmUser;
