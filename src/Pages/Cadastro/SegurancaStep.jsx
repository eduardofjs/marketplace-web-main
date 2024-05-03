import React, { useContext } from "react";
import { ConfirmBtn, OutlineBtn } from "../../globalStyle";
import { CadastroCtx } from "./Cadastro";
import { ButtonDiv, SmsCodeDiv, SmsCodeInput, StepInterfaceContainer } from "./Cadastro.styles";

const SegurancaStep = () => {
  const { currentStep, setCurrentStep } = useContext(CadastroCtx);
  return (
    <StepInterfaceContainer>
      {" "}
      <h4>Precisamos que valide seus dados de contato</h4>
      <p>Entre com o código por SMS enviado para o número (xx) xxxx-xxxx.</p>
      <SmsCodeDiv>
        <SmsCodeInput maxLength={1} />
        <SmsCodeInput maxLength={1} />
        <SmsCodeInput maxLength={1} />
        <SmsCodeInput maxLength={1} />
        <SmsCodeInput maxLength={1} />
        <SmsCodeInput maxLength={1} />
      </SmsCodeDiv>
      <a href="#">Reenviar código </a>
      <ButtonDiv style={{ marginTop: "320px" }}>
        {" "}
        {currentStep > 1 && (
          <OutlineBtn onClick={() => setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)}>
            Voltar
          </OutlineBtn>
        )}
        {currentStep < 7 && (
          <ConfirmBtn
            onClick={() => {
              setCurrentStep(currentStep < 7 ? currentStep + 1 : currentStep);
            }}
          >
            Continuar
          </ConfirmBtn>
        )}
      </ButtonDiv>
    </StepInterfaceContainer>
  );
};

export default SegurancaStep;
