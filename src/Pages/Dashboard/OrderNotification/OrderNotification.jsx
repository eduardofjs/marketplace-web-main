import React from "react";
import {
  InfoDesc,
  InfoWrapper,
  LeftContainer,
  NotificationIcon,
  NotificationInfo,
  NotificationInfoTitle,
  NotificationSvg,
  RightContainer,
} from "./OrderNotification.styles";
import notifSvg from "../../../Assets/manager-warehouse.svg";
import { InfoTitle } from "../OrderDetails/OrderDetails.styles";
import EtapaAnaliseDocs from "../OrderDetails/EtapaAnaliseDocs";
import EtapaSolicitacaoDocs from "../OrderDetails/EtapaSolicitacaoDocs";
import EtapaTransporte from "../OrderDetails/EtapaTransporte";
import EtapaEntrega from "../OrderDetails/EtapaEntrega";
import { formatarData, formatarDataPath } from "../../../generalFunctions";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { useContext } from "react";

const OrderNotification = ({
  objOferta,
  perfilUsuario,
  idEmpresaLogada,
  etapa,
  title,
  desc,
}) => {
  const { globalCtx } = useContext(GlobalDataCtx);

  const getData = () => {
    let dataPath;
    //perfil logado é MASTER/DIRECTTO
    if (perfilUsuario === 1 || perfilUsuario === 2) {
      dataPath = objOferta[`OFN_DataDirEtapa${etapa}`];
    } else {
      if (idEmpresaLogada === objOferta.OFN_EmpresaOriginalId) {
        etapa === 3 || etapa === 4
          ? (dataPath = objOferta[`OFN_DataDirEtapa${etapa}`])
          : (dataPath = objOferta[`OFN_DataCliEtapa${etapa}`]);
      } else {
        etapa === 3 || etapa === 4
          ? (dataPath = objOferta[`OFN_DataDirEtapa${etapa}`])
          : (dataPath = objOferta[`OFN_DataOferEtapa${etapa}`]);
      }
    }

    return dataPath && formatarDataPath(dataPath);
  };

  return (
    <NotificationInfo>
      <LeftContainer>
        {" "}
        {etapa === 1 && (
          <EtapaSolicitacaoDocs
            objOferta={objOferta}
            perfilUsuario={perfilUsuario}
            rowMode
          />
        )}
        {etapa === 2 && (
          <EtapaAnaliseDocs
            objOferta={objOferta}
            perfilUsuario={perfilUsuario}
            idEmpresaLogada={idEmpresaLogada}
            rowMode={true}
          />
        )}
        {etapa === 3 && (
          <EtapaTransporte
            objOferta={objOferta}
            perfilUsuario={perfilUsuario}
            idEmpresaLogada={idEmpresaLogada}
            rowMode={true}
          />
        )}
        {etapa === 4 && <EtapaEntrega objOferta={objOferta} rowMode={true} />}
        <InfoWrapper>
          <NotificationInfoTitle>{title}</NotificationInfoTitle>
          <InfoDesc>{desc}</InfoDesc>
        </InfoWrapper>
      </LeftContainer>
      <RightContainer>
        <InfoWrapper>
          <InfoDesc style={{ fontSize: "14px" }}>{getData()}</InfoDesc>
          <span style={{ fontSize: "12px", color: "darkgray" }}>
            {getData() &&
              (globalCtx.idioma ? "Última Atualização" : "Last Update")}
          </span>
        </InfoWrapper>
      </RightContainer>
    </NotificationInfo>
  );
};

export default OrderNotification;
