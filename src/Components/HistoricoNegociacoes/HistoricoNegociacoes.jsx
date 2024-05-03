import React from "react";
import { Hr } from "../../Pages/Detalhes/Detalhes.styles";
import { CheckboxInput } from "../NegociarOferta/NegociarOferta.styles";
import {
  CamposContainer,
  ConfirmBtn,
  ConfirmDiv,
  NegociacoesContainer,
  Info,
  Input,
} from "./HistoricoNegociacoes.styles";

const HistoricoNegociacoes = () => {
  return (
    <NegociacoesContainer>
      <h3>Veja as negociações desse produto</h3>
      <h4>Tudo sem compromisso, vamos começar com alguns dados</h4>
      <CamposContainer>
        <form>
          <Input placeholder="Nome*" required></Input>
          <Input placeholder="Data de Nascimento*" required></Input>
          <Input placeholder="E-mail*" type="email" required></Input>
          <Input placeholder="CPF*" required></Input>
          <Input placeholder="Telefone*" required></Input>
          <Input placeholder="Endereço*" required></Input>
        </form>
      </CamposContainer>
      <Info>*Todos os campos são obrigatórios</Info>
      <Info>
        *Para realizar a sua simulação, as suas informações serão compartilhadas
        com a Directto.
      </Info>
      <Hr />
      <ConfirmDiv>
        <CheckboxInput>
          {" "}
          <input type="checkbox" id="descontos" name="descontos" />
          <label for="descontos">
            Quero receber descontos, ofertas e comunicações da Directto.
          </label>
        </CheckboxInput>
        <ConfirmBtn>Negociar</ConfirmBtn>
      </ConfirmDiv>
    </NegociacoesContainer>
  );
};

export default HistoricoNegociacoes;
