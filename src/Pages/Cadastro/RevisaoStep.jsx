import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { ConfirmBtn, FlexDivBetween, OutlineBtn } from "../../globalStyle";
import { SubsectionDesc } from "../Dashboard/Oferta/Oferta.styles";
import { CadastroCtx } from "./Cadastro";
import {
  ButtonDiv,
  Hr,
  InfoTitle,
  InfoWrapper,
  Section,
  StepInterfaceContainer,
} from "./Cadastro.styles";
import axios from "axios";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const RevisaoStep = () => {
  const [formError, setFormError] = useState(false);
  const { currentStep, setCurrentStep, empresaFormState, empresaFormDispatch } =
    useContext(CadastroCtx);
  //pega context global pra verificar idioma
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);
  return (
    <StepInterfaceContainer>
      {" "}
      <h4>Revisão</h4>
      <p>
        Revise as informações fornecidas para garantir que está tudo correto.
      </p>
      <Section>
        <FlexDivBetween>
          <h5>Dados Gerais</h5>
          <Button variant="link" onClick={() => setCurrentStep(2)}>
            Alterar dados gerais
          </Button>
        </FlexDivBetween>

        <InfoWrapper>
          <InfoTitle>Mercado Interno:</InfoTitle>
          <span>{empresaFormState.EMP_FlagMercadoInterno ? "Sim" : "Não"}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Mercado Externo:</InfoTitle>
          <span>{empresaFormState.EMP_FlagMercadoExterno ? "Sim" : "Não"}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Valor:</InfoTitle>
          <span>
            {empresaFormState?.EMP_Valor?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Serviços adicionais:</InfoTitle>
        </InfoWrapper>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {empresaFormState.listaEmpresaxServicoAdicional.map((el) => (
            <span>{el}</span>
          ))}
        </div>
        <InfoWrapper>
          <InfoTitle>Serviços financeiros:</InfoTitle>
        </InfoWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {empresaFormState.listaEmpresaxServicoFinanceiro.map((el) => (
            <span>{el}</span>
          ))}
        </div>
      </Section>
      <Section>
        <FlexDivBetween>
          <h5>Dados do Usuário</h5>
          <Button variant="link" onClick={() => setCurrentStep(2)}>
            {" "}
            Alterar dados do usuário
          </Button>
        </FlexDivBetween>

        <InfoWrapper>
          <InfoTitle>Nome completo:</InfoTitle>
          <span>{empresaFormState.Usuario.Pessoa.PES_Nome}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>CPF:</InfoTitle>
          <span>{empresaFormState.Usuario.Pessoa.PES_Cpf}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Telefone para contato:</InfoTitle>
          <span>{empresaFormState.Usuario.Pessoa.PES_Celular}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Tipo:</InfoTitle>
          <span>
            {empresaFormState.EMP_TipoEmpresaId === 1
              ? "Comprador"
              : empresaFormState.EMP_TipoEmpresaId === 2
              ? "Fornecedor"
              : "Comprador e Fornecedor"}
          </span>
        </InfoWrapper>
      </Section>
      <Section>
        <FlexDivBetween>
          <h5>Dados da Empresa</h5>
          <Button variant="link" onClick={() => setCurrentStep(4)}>
            Alterar dados da empresa
          </Button>
        </FlexDivBetween>

        <InfoWrapper>
          <InfoTitle>Nome Fantasia:</InfoTitle>
          <span>{empresaFormState.EMP_NomeFantasia}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Razão Social:</InfoTitle>
          <span>{empresaFormState.EMP_RazaoSocial}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>CNPJ:</InfoTitle>
          <span>{empresaFormState.EMP_CNPJ}</span>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Tipo:</InfoTitle>
          <span>
            {empresaFormState.EMP_TipoEmpresaId === 1
              ? "Comprador"
              : empresaFormState.EMP_TipoEmpresaId === 2
              ? "Fornecedor"
              : "Comprador e Fornecedor"}
          </span>
        </InfoWrapper>
      </Section>
      <Hr />
      <h4>Termo de Aceite</h4>
      <p>Para finalizar, basta aceitar nossos termos.</p>
      <Section>
        <SubsectionDesc
          naoFoiPreenchido={
            formError && !empresaFormState.EMP_FlagTermoPlataforma
          }
        >
          Termo de uso da plataforma
        </SubsectionDesc>
        <Form>
          <FlexDivBetween>
            {" "}
            <Form.Check
              type="checkbox"
              id="aceite"
              label="Li e concordo"
              defaultChecked={empresaFormState.EMP_FlagTermoPlataforma === true}
              onClick={() =>
                empresaFormDispatch({
                  type: "TermoPlataforma",
                  value: !empresaFormState.EMP_FlagTermoPlataforma,
                })
              }
            />
            <a href="#">Ler o termo</a>
          </FlexDivBetween>
        </Form>
      </Section>
      <Section>
        <SubsectionDesc
          naoFoiPreenchido={
            formError && !empresaFormState.EMP_FlagTermoUsoConta
          }
        >
          Termo de uso da conta
        </SubsectionDesc>
        <Form>
          <FlexDivBetween>
            {" "}
            <Form.Check
              type="checkbox"
              id="aceite"
              label="Li e concordo"
              defaultChecked={empresaFormState.EMP_FlagTermoUsoConta === true}
              onClick={() =>
                empresaFormDispatch({
                  type: "TermoConta",
                  value: !empresaFormState.EMP_FlagTermoUsoConta,
                })
              }
            />
            <a href="#">Ler o termo</a>
          </FlexDivBetween>
        </Form>
      </Section>
      <Section>
        <SubsectionDesc
          naoFoiPreenchido={
            formError && !empresaFormState.EMP_FlagTermoPlataformaCobranca
          }
        >
          Termo de uso da plataforma de cobrança
        </SubsectionDesc>
        <Form>
          <FlexDivBetween>
            {" "}
            <Form.Check
              type="checkbox"
              id="aceite"
              label="Li e concordo"
              defaultChecked={
                empresaFormState.EMP_FlagTermoPlataformaCobranca === true
              }
              onClick={() =>
                empresaFormDispatch({
                  type: "TermoCobranca",
                  value: !empresaFormState.EMP_FlagTermoPlataformaCobranca,
                })
              }
            />
            <a href="#">Ler o termo</a>
          </FlexDivBetween>
        </Form>
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
            onClick={() => {
              if (
                empresaFormState.EMP_FlagTermoPlataformaCobranca &&
                empresaFormState.EMP_FlagTermoUsoConta &&
                empresaFormState.EMP_FlagTermoPlataforma
              ) {
                setFormError(false);
                setCurrentStep(currentStep < 7 ? currentStep + 1 : currentStep);
              } else {
                setFormError(true);
                toast.error(
                  "Por favor, aceite todos os termos antes de continuar."
                );
              }
            }}
          >
            Finalizar Cadastro
          </ConfirmBtn>
        )}
      </ButtonDiv>
    </StepInterfaceContainer>
  );
};

export default RevisaoStep;
