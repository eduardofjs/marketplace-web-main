import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  OrderStepContainer,
  StageSpan,
  StepSvg,
} from "../../../Components/OrderStep/OrderStep.styles";
import processingDocs from "../../../Assets/order.svg";
import inTransportOrDelivered from "../../../Assets/box.svg";
import { AUTH_HEADER } from "../../../data";
import axios from "axios";
import LoginCtx from "../../../Context/LoginContext";
import GlobalDataCtx from "../../../Context/GlobalDataContext";

const EtapaEntrega = ({
  objOferta,
  perfilUsuario,
  idEmpresaLogada,
  rowMode,
}) => {
  const { globalCtx } = useContext(GlobalDataCtx);
  return (
    <Container rowMode={rowMode}>
      {" "}
      <OrderStepContainer
        isFinished={objOferta.OFN_EtapaNegociacaoDirectto >= 4}
      >
        <StepSvg src={inTransportOrDelivered} />
      </OrderStepContainer>
      <StageSpan rowMode={rowMode}>
        {globalCtx.idioma ? "Entrega" : "Delivery"}
      </StageSpan>
    </Container>
  );
};

export default EtapaEntrega;
