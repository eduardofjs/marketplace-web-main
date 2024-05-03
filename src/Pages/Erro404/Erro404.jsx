import React, { useState, useContext } from "react";
import { RecoverModal } from "./Erro404.styles";
import logo from "../../Assets/directto_logo.png";
import { DirecttoLogo } from "../Login/Login.styles";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import { Erro404Container } from "./Erro404.styles";

const Erro404 = () => {
  let navigate = useNavigate();

  return (
    <Erro404Container>
      <RecoverModal>
        <DirecttoLogo src={logo} />

        <h4>Erro 404</h4>
        <span>Ops... Essa página não existe.</span>
        <Button
          style={{ marginTop: "15px" }}
          variant="outline-success"
          onClick={(e) => navigate("/", { replace: true })}
        >
          Voltar ao Início
        </Button>
      </RecoverModal>
    </Erro404Container>
  );
};

export default Erro404;
