import React, { useState, useContext } from "react";
import {
  ButtonWrapper,
  RecoverModal,
  RecuperarSenhaContainer,
  SentMsgIcon,
  SendEmailContainer,
  EmailSentContainer,
} from "./RecuperarSenha.styles";
import logo from "../../Assets/directto_logo.png";
import { DirecttoLogo } from "../Login/Login.styles";
import { FlexDivWrap, Input } from "../../globalStyle";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import ModalCtx from "../../Context/ModalContext";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import ReactLoading from "react-loading";
import { PwdReq, ReqDone } from "../Cadastro/Cadastro.styles";
import { validatePassword } from "../../generalFunctions";
import { useSearchParams } from "react-router-dom";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const RecuperarSenha = () => {
  let navigate = useNavigate();

  //query string react router v6
  const [searchParams] = useSearchParams();

  //pega o token
  const token = searchParams.get("sToken");

  const { globalCtx } = useContext(GlobalDataCtx);

  const [isLoading, setIsLoading] = useState(false);

  const [senhaInput, setSenhaInput] = useState("");

  const [confirmarSenhaInput, setConfirmarSenhaInput] = useState("");

  const mudarSenhaHandler = () => {
    setIsLoading(true);
    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/Usuario/UpdateRecoveryPassword?sToken=${token}&sSenha=${senhaInput}`,
        {},
        AUTH_HEADER
      )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          toast.success(
            "Senha alterada com sucesso! Use a nova senha para fazer log-in."
          );
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        setSenhaInput("");
        setConfirmarSenhaInput("");
        toast.error("Erro ao tentar mudar senha. ", +err.message);
        setIsLoading(false);
      });
  };

  return (
    <RecuperarSenhaContainer>
      <RecoverModal>
        <DirecttoLogo
          src={logo}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        />
        {isLoading ? (
          <>
            <ReactLoading
              type={"spin"}
              color={"green"}
              height={50}
              width={50}
            />
          </>
        ) : (
          <>
            <h4>Nova Senha</h4>
            <span>Por favor, escolha uma nova senha.</span>
            <Input
              type="password"
              placeholder={"Nova Senha"}
              onChange={(e) => {
                setSenhaInput(e.target.value);
              }}
            ></Input>
            <Input
              type="password"
              placeholder={"Confirmar Senha"}
              error={senhaInput && senhaInput !== confirmarSenhaInput}
              onChange={(e) => {
                setConfirmarSenhaInput(e.target.value);
              }}
            ></Input>
            <ButtonWrapper>
              <Button
                variant="success"
                disabled={
                  !validatePassword(senhaInput) ||
                  senhaInput !== confirmarSenhaInput
                }
                onClick={mudarSenhaHandler}
              >
                Mudar Senha
              </Button>
            </ButtonWrapper>

            <FlexDivWrap>
              <PwdReq
                error={
                  senhaInput !== null &&
                  !validatePassword(senhaInput, /(.*[A-Z].*)/)
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
                  senhaInput !== null &&
                  !validatePassword(senhaInput, /(.*[a-z].*)/)
                }
              >
                <ReqDone />
                {globalCtx.idioma
                  ? "1 letra minúscula"
                  : "At least 1 lowercase character"}
              </PwdReq>
              <PwdReq
                error={
                  senhaInput !== null &&
                  !validatePassword(senhaInput, /(.*\W.*)/)
                }
              >
                <ReqDone />
                {globalCtx.idioma
                  ? "1 caractere especial (@, #, $...)"
                  : "1 special symbol (@, #, $...)"}
              </PwdReq>
              <PwdReq error={senhaInput !== null && senhaInput.length < 8}>
                <ReqDone />
                {globalCtx.idioma
                  ? "No mínimo 8 caracteres"
                  : "At least 8 characters"}
              </PwdReq>
            </FlexDivWrap>
          </>
        )}
      </RecoverModal>
    </RecuperarSenhaContainer>
  );
};

export default RecuperarSenha;
