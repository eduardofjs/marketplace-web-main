import React, { useState, useContext } from "react";
import {
  ButtonWrapper,
  RecoverModal,
  EsqueceuSenhaContainer,
  SentMsgIcon,
  SendEmailContainer,
  EmailSentContainer,
} from "./EsqueceuSenha.styles";
import logo from "../../Assets/directto_logo.png";
import { DirecttoLogo } from "../Login/Login.styles";
import { Input } from "../../globalStyle";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import ModalCtx from "../../Context/ModalContext";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import ReactLoading from "react-loading";
import { validatePassword, getMarketplaceApiEndpoint } from "../../generalFunctions";

const EsqueceuSenha = () => {
  let navigate = useNavigate();

  const { modalDispatch } = useContext(ModalCtx);

  const { globalCtx } = useContext(GlobalDataCtx);

  const [emailInput, setEmailInput] = useState();

  const [inputError, setInputError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [emailWasSent, setEmailWasSent] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const recuperarSenhaHandler = () => {
    if (validateEmail(emailInput)) {
      // alert(emailInput);
      setIsLoading(true);
      axios
        .post(
          `${getMarketplaceApiEndpoint()}/api/Usuario/RecoveryPasswordEmail?sEmail=${emailInput}&isProfessional=true`,
          {},
          AUTH_HEADER
        )
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            setIsLoading(false);
            setEmailWasSent(true);
          }
        })
        .catch((err) => {
          setIsLoading(false);

          toast.error(err.response.data.mensagem);
        });
    } else {
      setInputError(true);
      toast.error("Insira um e-mail válido.");
    }
  };

  return (
    <EsqueceuSenhaContainer>
      <RecoverModal>
        <DirecttoLogo src={logo} onClick={() => setEmailWasSent(true)} />
        {emailWasSent ? (
          <>
            <h4>E-mail enviado!</h4>
            <span>
              Enviamos um e-mail para {emailInput} contendo as próximas
              instruções para recuperação de senha. Lembre-se de verificar a
              caixa de spam.
            </span>
            <Button
              style={{ marginTop: "15px" }}
              variant="outline-success"
              onClick={(e) => navigate("/", { replace: true })}
            >
              Ir para Página Inicial
            </Button>
          </>
        ) : (
          <>
            {" "}
            <h4>Recuperar meu acesso</h4>
            {!isLoading && (
              <span>
                Insira seu e-mail para recuperar a senha de acesso a plataforma
              </span>
            )}
            {!isLoading && (
              <Input
                type="email"
                placeholder={"Insira seu e-mail"}
                error={inputError}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              ></Input>
            )}
            {isLoading ? (
              <ReactLoading
                type={"spin"}
                color={"green"}
                height={50}
                width={50}
              />
            ) : (
              <ButtonWrapper>
                {" "}
                <Button
                  variant="outline-success"
                  onClick={() => {
                    navigate("/login", { replace: true });
                  }}
                >
                  Voltar
                </Button>
                <Button variant="success" onClick={recuperarSenhaHandler}>
                  Confirmar
                </Button>
              </ButtonWrapper>
            )}
          </>
        )}
      </RecoverModal>
    </EsqueceuSenhaContainer>
  );
};

export default EsqueceuSenha;
