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
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const EtapaTransporte = ({
  objOferta,
  perfilUsuario,
  idEmpresaLogada,
  rowMode,
  getIsTransporteFinished,
}) => {
  const [isAtivo, setIsAtivo] = useState(false);
  const [docsAprovadosCompradora, setDocsAprovadosCompradora] = useState(false);
  const [docsAprovadosVendedora, setDocsAprovadosVendedora] = useState(false);
  const { globalCtx, updateEtapas, updateDataNotificacao } =
    useContext(GlobalDataCtx);

  const getListaDocumentos = (empId, vendedor) => {
    const listaDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/GetAllOfertaNegociacaoxDocumentoByValorExato?strValorExato=${empId}&ColunaParaValorExato=OND_EmpresaId&fSomenteAtivos=true&join=true&maxInstances=0&order_by=OND_Id`;
    axios
      .post(listaDocEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          let todosDocsDessaEmpresa = res.data.filter(
            (docs) => docs.OND_OfertaNegociacaoId === objOferta.OFN_Id
          );

          if (todosDocsDessaEmpresa.length !== 0) {
            let todosDocsAprovados = todosDocsDessaEmpresa.filter(
              (docs) => docs.OND_FlagAprovado
            );

            if (todosDocsAprovados.length === todosDocsDessaEmpresa.length) {
              if (vendedor) {
                setDocsAprovadosVendedora(true);
              } else {
                setDocsAprovadosCompradora(true);
              }
            } else {
              if (vendedor) {
                setDocsAprovadosVendedora(false);
              } else {
                setDocsAprovadosCompradora(false);
              }
            }
          } else {
            setIsAtivo(false);
          }
        }
      })
      .catch((err) => {
        getListaDocumentos(empId, vendedor);
      });
  };

  useEffect(() => {
    getListaDocumentos(
      objOferta.OfertaxQuantidadeProduto.Oferta.Empresa.EMP_Id,
      true
    );
    getListaDocumentos(objOferta.OFN_EmpresaOriginalId, false);
  }, []);

  useEffect(() => {
    if (docsAprovadosCompradora && docsAprovadosVendedora) {
      setIsAtivo(true);
    } else {
      setIsAtivo(false);
    }
  }, [docsAprovadosCompradora, docsAprovadosVendedora]);

  useEffect(() => {
    if (!rowMode) {
      getIsTransporteFinished(isAtivo);
    }
    // updateDataNotificacao(parseInt(objOferta.OFN_Id), "OFN_DataDirEtapa3");
  }, [isAtivo]);

  return (
    <Container rowMode={rowMode}>
      {" "}
      <OrderStepContainer isFinished={isAtivo}>
        <StepSvg src={inTransportOrDelivered} />
      </OrderStepContainer>
      <StageSpan rowMode={rowMode}>
        {globalCtx.idioma ? "Transporte" : "Transport"}
      </StageSpan>
    </Container>
  );
};

export default EtapaTransporte;
