import React, { useState, useEffect } from "react";
import {
  Container,
  OrderStepContainer,
  StageSpan,
  StepSvg,
} from "../../../Components/OrderStep/OrderStep.styles";
import processingDocs from "../../../Assets/order.svg";
import inTransportOrDelivered from "../../../Assets/box.svg";
import { useContext } from "react";
import GlobalDataCtx from "../../../Context/GlobalDataContext";

const EtapaSolicitacaoDocs = ({ objOferta, perfilUsuario, rowMode }) => {
  const [isAtivo, setIsAtivo] = useState(false);

  const { globalCtx } = useContext(GlobalDataCtx);

  useEffect(() => {
    if (perfilUsuario === 1 || perfilUsuario === 2) {
      if (
        objOferta?.OFN_FlagLiberaCliente &&
        objOferta?.OFN_FlagLiberaOfertador
      ) {
        setIsAtivo(true);
      }
    } else {
      setIsAtivo(true);
    }
  }, []);

  return (
    <Container rowMode={rowMode}>
      {" "}
      <OrderStepContainer isFinished={isAtivo}>
        <StepSvg src={processingDocs} />
      </OrderStepContainer>
      <StageSpan rowMode={rowMode}>
        {globalCtx.idioma ? "Solicitação de Documentos" : "Document requests"}
      </StageSpan>
    </Container>
  );
};

export default EtapaSolicitacaoDocs;
