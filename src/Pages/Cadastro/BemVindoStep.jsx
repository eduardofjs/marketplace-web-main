import React, { useState, useContext } from "react";
import { ButtonDiv, Hr, Section, StepInterfaceContainer } from "./Cadastro.styles";

import { Form } from "react-bootstrap";
import { ConfirmBtn, FlexDivBetween, Input, OutlineBtn } from "../../globalStyle";
import { SubsectionDesc } from "../Dashboard/Oferta/Oferta.styles";
import { CadastroCtx } from "./Cadastro";
import { toast } from "react-toastify";

const BemVindoStep = () => {
  //esse state fica 'true' quando o usuario tenta continuar pra proxima etapa mas nao preencheu todo o formulario
  const [formError, setFormError] = useState(false);

  const { currentStep, setCurrentStep, empresaFormState, empresaFormDispatch } = useContext(CadastroCtx);

  return (
    <StepInterfaceContainer>
      {" "}
      <h4>Seja Bem-vindo ao Directto</h4>
      <p>
        É muito bom ter você conosco. Por favor, preencha o formulário para realizar o seu cadastro. Todos os campos são
        obrigatórios.
      </p>
      <SubsectionDesc naoFoiPreenchido={formError && empresaFormState.EMP_FlagMercadoInterno === null}>
        Mercado
      </SubsectionDesc>
      <Form>
        <FlexDivBetween>
          <Form.Check
            inline
            defaultChecked={
              empresaFormState.EMP_FlagMercadoInterno === true && empresaFormState.EMP_FlagMercadoExterno === false
            }
            type="radio"
            label="Interno"
            name="mercado"
            onClick={() => empresaFormDispatch({ type: "MercadoInterno" })}
          />
          <Form.Check
            inline
            defaultChecked={
              empresaFormState.EMP_FlagMercadoInterno === false && empresaFormState.EMP_FlagMercadoExterno === true
            }
            type="radio"
            label="Externo"
            name="mercado"
            onClick={() => empresaFormDispatch({ type: "MercadoExterno" })}
          />
          <Form.Check
            inline
            defaultChecked={
              empresaFormState.EMP_FlagMercadoInterno === true && empresaFormState.EMP_FlagMercadoExterno === true
            }
            type="radio"
            label="Ambos"
            name="mercado"
            onClick={() => empresaFormDispatch({ type: "MercadoAmbos" })}
          />
        </FlexDivBetween>
      </Form>
      <Hr />
      <Section>
        <SubsectionDesc naoFoiPreenchido={formError && empresaFormState.EMP_Valor === null}>Valores</SubsectionDesc>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <Input
          error={formError && empresaFormState.EMP_Valor === null}
          placeholder={empresaFormState.EMP_Valor !== null ? empresaFormState.EMP_Valor : "Preço"}
          type="number"
          onChange={(e) => empresaFormDispatch({ type: "EMP_Valor", value: parseInt(e.target.value) })}
        ></Input>
      </Section>
      <Hr />
      <Section>
        <SubsectionDesc>Serviços adicionais</SubsectionDesc>
        <Form>
          <FlexDivBetween>
            {" "}
            <Form.Check
              type="checkbox"
              id="servicos-adicionais"
              label="Rastreabilidade"
              defaultChecked={empresaFormState.listaEmpresaxServicoAdicional.includes("Rastreabilidade")}
              onClick={() => {
                if (empresaFormState.listaEmpresaxServicoAdicional.includes("Rastreabilidade")) {
                  empresaFormDispatch({ type: "ServicosAdicionaisREMOVE", value: "Rastreabilidade" });
                } else {
                  empresaFormDispatch({ type: "ServicosAdicionaisADD", value: "Rastreabilidade" });
                }
              }}
            />
            <Form.Check
              type="checkbox"
              id="servicos-adicionais"
              label="Armazenamento"
              defaultChecked={empresaFormState.listaEmpresaxServicoAdicional.includes("Armazenamento")}
              onClick={() => {
                if (empresaFormState.listaEmpresaxServicoAdicional.includes("Armazenamento")) {
                  empresaFormDispatch({ type: "ServicosAdicionaisREMOVE", value: "Armazenamento" });
                } else {
                  empresaFormDispatch({ type: "ServicosAdicionaisADD", value: "Armazenamento" });
                }
              }}
            />
            <Form.Check
              type="checkbox"
              id="servicos-adicionais"
              label="Serviços financeiros"
              defaultChecked={empresaFormState.listaEmpresaxServicoAdicional.includes("Serviços financeiros")}
              onClick={() => {
                if (empresaFormState.listaEmpresaxServicoAdicional.includes("Serviços financeiros")) {
                  empresaFormDispatch({ type: "ServicosAdicionaisREMOVE", value: "Serviços financeiros" });
                } else {
                  empresaFormDispatch({ type: "ServicosAdicionaisADD", value: "Serviços financeiros" });
                }
              }}
            />
          </FlexDivBetween>
        </Form>
      </Section>
      <Hr />
      {empresaFormState.EMP_FlagMercadoExterno === true && (
        <>
          <Section>
            <SubsectionDesc>Logística</SubsectionDesc>
            <Form>
              <FlexDivBetween>
                {" "}
                <Form.Check
                  type="checkbox"
                  label="Incoterms"
                  defaultChecked={empresaFormState.listaEmpresaxLogistica.includes("Incoterms")}
                  onClick={() => {
                    if (empresaFormState.listaEmpresaxLogistica.includes("Incoterms")) {
                      empresaFormDispatch({ type: "LogisticaREMOVE", value: "Incoterms" });
                    } else {
                      empresaFormDispatch({ type: "LogisticaADD", value: "Incoterms" });
                    }
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Serviços para cada incoterms"
                  defaultChecked={empresaFormState.listaEmpresaxLogistica.includes("Serviços para cada incoterms")}
                  onClick={() => {
                    if (empresaFormState.listaEmpresaxLogistica.includes("Serviços para cada incoterms")) {
                      empresaFormDispatch({ type: "LogisticaREMOVE", value: "Serviços para cada incoterms" });
                    } else {
                      empresaFormDispatch({ type: "LogisticaADD", value: "Serviços para cada incoterms" });
                    }
                  }}
                />
              </FlexDivBetween>
            </Form>
          </Section>
          <Hr />
        </>
      )}
      <Section>
        <SubsectionDesc>Serviços financeiros</SubsectionDesc>
        <Form>
          <FlexDivBetween>
            {" "}
            <Form.Check
              type="checkbox"
              label="Câmbio"
              defaultChecked={empresaFormState.listaEmpresaxServicoFinanceiro.includes("Câmbio")}
              onClick={() => {
                if (empresaFormState.listaEmpresaxServicoFinanceiro.includes("Câmbio")) {
                  empresaFormDispatch({ type: "ServicosFinanceirosREMOVE", value: "Câmbio" });
                } else {
                  empresaFormDispatch({ type: "ServicosFinanceirosADD", value: "Câmbio" });
                }
              }}
            />
            <Form.Check
              type="checkbox"
              label="Financiamento"
              defaultChecked={empresaFormState.listaEmpresaxServicoFinanceiro.includes("Financiamento")}
              onClick={() => {
                if (empresaFormState.listaEmpresaxServicoFinanceiro.includes("Financiamento")) {
                  empresaFormDispatch({ type: "ServicosFinanceirosREMOVE", value: "Financiamento" });
                } else {
                  empresaFormDispatch({ type: "ServicosFinanceirosADD", value: "Financiamento" });
                }
              }}
            />
            <Form.Check
              type="checkbox"
              label="Antecipação de recebíveis"
              defaultChecked={empresaFormState.listaEmpresaxServicoFinanceiro.includes("Antecipação de recebíveis")}
              onClick={() => {
                if (empresaFormState.listaEmpresaxServicoFinanceiro.includes("Antecipação de recebíveis")) {
                  empresaFormDispatch({ type: "ServicosFinanceirosREMOVE", value: "Antecipação de recebíveis" });
                } else {
                  empresaFormDispatch({ type: "ServicosFinanceirosADD", value: "Antecipação de recebíveis" });
                }
              }}
            />
          </FlexDivBetween>
        </Form>
      </Section>
      <Hr />
      <Section>
        <SubsectionDesc naoFoiPreenchido={formError && empresaFormState.EMP_FlagTermoTransporte === null}>
          Termos de transporte
        </SubsectionDesc>
        <FlexDivBetween w={100}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, illo.</p>
          <a href="#">Ler o termo</a>
        </FlexDivBetween>
        <Form>
          {" "}
          <Form.Check
            type="checkbox"
            id="rastreabilidade"
            label="Li e aceito"
            defaultChecked={empresaFormState.EMP_FlagTermoTransporte === true}
            onClick={() =>
              empresaFormDispatch({ type: "TermoTransporte", value: !empresaFormState.EMP_FlagTermoTransporte })
            }
          />
        </Form>
      </Section>
      <Hr />
      <Section>
        <SubsectionDesc naoFoiPreenchido={formError && empresaFormState.EMP_FlagTermoPagamento === null}>
          Termos de pagamento
        </SubsectionDesc>
        <FlexDivBetween w={100}>
          <p>Sed cupiditate quae, quo facilis nulla expedita dolorem.</p>
          <a href="#">Ler o termo</a>
        </FlexDivBetween>
        <Form>
          {" "}
          <Form.Check
            type="checkbox"
            id="rastreabilidade"
            label="Li e aceito"
            defaultChecked={empresaFormState.EMP_FlagTermoPagamento === true}
            onClick={() =>
              empresaFormDispatch({ type: "TermoPagamento", value: !empresaFormState.EMP_FlagTermoPagamento })
            }
          />
        </Form>
        <ButtonDiv>
          {" "}
          {currentStep > 1 && (
            <OutlineBtn onClick={() => setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)}>
              Voltar
            </OutlineBtn>
          )}
          {currentStep < 7 && (
            <ConfirmBtn
              onClick={() => {
                if (
                  empresaFormState.EMP_FlagMercadoInterno !== null &&
                  empresaFormState.EMP_FlagMercadoExterno !== null &&
                  empresaFormState.EMP_Valor !== null &&
                  empresaFormState.EMP_FlagTermoPagamento !== null &&
                  empresaFormState.EMP_FlagTermoTransporte !== null
                ) {
                  setFormError(false);
                  setCurrentStep(currentStep < 7 ? currentStep + 1 : currentStep);
                } else {
                  setFormError(true);
                  toast.error("Por favor, preencha todos os campos antes de continuar.");
                }
              }}
            >
              Continuar
            </ConfirmBtn>
          )}
        </ButtonDiv>
      </Section>
    </StepInterfaceContainer>
  );
};

export default BemVindoStep;
