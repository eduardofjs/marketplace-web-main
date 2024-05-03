import React, { useContext } from "react";
import {
  ButtonDiv,
  DocumentUploadProgress,
  PhotoIcon,
  PhotoImg,
  StepInterfaceContainer,
  UploadedDocumentsUl,
  UploadImageDiv,
} from "./Cadastro.styles";
import cameraImg from "../../Assets/camera.png";
import { ProgressBar } from "react-bootstrap";
import { CadastroCtx } from "./Cadastro";
import { ConfirmBtn, OutlineBtn } from "../../globalStyle";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const EnviarDocsStep = () => {
  const { currentStep, setCurrentStep } = useContext(CadastroCtx);

  
  return (
    <>
      {" "}
      <StepInterfaceContainer>
        {" "}
        <h4>Envie os documentos de identificação</h4>
        <p>
          Precisamos que voce envie a frente e verso do seu RG ou a sua CNH. Formatos de arquivos aceitos: JPG, PNG
          ouasdadsasdasdas PDF.
        </p>
        <UploadImageDiv>
          <PhotoImg src={cameraImg} />
          <input type="file" id="myFile" name="filename" />
        </UploadImageDiv>
      </StepInterfaceContainer>
      <DocumentUploadProgress>
        <span>Carteira Nacional de Habilitação</span>
        <ProgressBar now={100} variant="success" striped animated />
      </DocumentUploadProgress>
      <DocumentUploadProgress>
        <span>RG.pdf</span>
        <ProgressBar now={60} variant="danger" striped animated />
      </DocumentUploadProgress>
      <ButtonDiv style={{ marginTop: "100px" }}>
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
    </>
  );
};

export default EnviarDocsStep;
