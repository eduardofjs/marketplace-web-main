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
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const EtapaAnaliseDocs = ({
  objOferta,
  perfilUsuario,
  idEmpresaLogada,
  idEmpresaCompradora,
  idEmpresaVendedora,
  rowMode,
}) => {
  const { updateDataNotificacao } = useContext(GlobalDataCtx);
  const [isAtivo, setIsAtivo] = useState(false);
  const [docsAprovadosCompradora, setDocsAprovadosCompradora] = useState(false);
  const [docsAprovadosVendedora, setDocsAprovadosVendedora] = useState(false);

  const { globalCtx } = useContext(GlobalDataCtx);

  const getListaDocumentos = (empId, vendedor, povEmpresas) => {
    const listaDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/GetAllOfertaNegociacaoxDocumentoByValorExato?strValorExato=${empId}&ColunaParaValorExato=OND_EmpresaId&fSomenteAtivos=true&join=true&maxInstances=0&order_by=OND_Id`;
    axios
      .post(listaDocEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          let todosDocsDessaEmpresa = res.data.filter(
            (docs) => docs.OND_OfertaNegociacaoId === objOferta.OFN_Id
          );

          let todosDocsAprovados = todosDocsDessaEmpresa.filter(
            (docs) => docs.OND_FlagAprovado
          );

          let todosDocsUploadeados = todosDocsDessaEmpresa.filter(
            (docs) => docs.OND_DocumentoId
          );

          if (todosDocsDessaEmpresa.length !== 0) {
            if (povEmpresas) {
              if (
                todosDocsUploadeados.length === todosDocsDessaEmpresa.length
              ) {
                setIsAtivo(true);
              }
            } else {
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
            }
          } else {
            setIsAtivo(false);
          }
        }
      })
      .catch((err) => {
        if (povEmpresas) {
          getListaDocumentos(empId, vendedor, povEmpresas);
        } else {
          getListaDocumentos(empId, vendedor);
        }
      });
  };

  useEffect(() => {
    if (perfilUsuario === 1 || perfilUsuario === 2) {
      getListaDocumentos(
        objOferta.OfertaxQuantidadeProduto.Oferta.Empresa.EMP_Id,
        true
      );
      getListaDocumentos(objOferta.OFN_EmpresaOriginalId, false);
    } else {
      getListaDocumentos(idEmpresaLogada, false, true);
    }
  }, []);

  // const mudaEtapaHandler = () => {
  //   let empresaPraAtualizar;
  //   let regraPraAtualizar;

  //   if (perfilUsuario === 1 || perfilUsuario === 2) {
  //     empresaPraAtualizar = "Directto";

  //     regraPraAtualizar =
  //       isAtivo || (docsAprovadosCompradora && docsAprovadosVendedora);
  //   } else {
  //     empresaPraAtualizar =
  //       idEmpresaLogada === idEmpresaVendedora ? "Ofertador" : "Cliente";

  //     regraPraAtualizar =
  //       idEmpresaLogada === idEmpresaVendedora
  //         ? docsAprovadosVendedora
  //         : docsAprovadosCompradora;
  //   }

  //   if (regraPraAtualizar) {
  //     updateEtapas(objOferta.OFN_Id, empresaPraAtualizar, 2);
  //     return true;
  //   } else {
  //     updateEtapas(objOferta.OFN_Id, empresaPraAtualizar, 1);
  //     return false;
  //   }
  // };

  return (
    <Container rowMode={rowMode}>
      {" "}
      <OrderStepContainer
        isFinished={
          isAtivo || (docsAprovadosCompradora && docsAprovadosVendedora)
        }
      >
        <StepSvg src={processingDocs} />
      </OrderStepContainer>
      <StageSpan rowMode={rowMode}>
        {globalCtx.idioma ? "Análise Documentos" : "Document Analysis"}
      </StageSpan>
    </Container>
  );
};

export default EtapaAnaliseDocs;
