import React from "react";
import {
  Container,
  OrderStepContainer,
  StageSpan,
  StepSvg,
} from "./OrderStep.styles";
import processingDocs from "../../Assets/order.svg";
import inTransportOrDelivered from "../../Assets/box.svg";

const getStageText = (stage) => {
  switch (stage) {
    case 0:
      return "Solicitação de Documentos";
    case 1:
      return "Análise Documentos";
    case 2:
      return "Transporte";
    case 3:
      return "Entrega";

    default:
      break;
  }
};

const OrderStep = ({ stepOwner, stage, isFinished }) => {
  //stepOwner: quem é responsável por essa etapa. 0 = buyer, 1 = seller
  return (
    <Container>
      {" "}
      <OrderStepContainer
        stepOwner={stepOwner}
        stage={stage}
        isFinished={isFinished}
      >
        <StepSvg src={stage === 0 ? processingDocs : inTransportOrDelivered} />
      </OrderStepContainer>
      <StageSpan>{getStageText(stage)}</StageSpan>
    </Container>
  );
};

export default OrderStep;
