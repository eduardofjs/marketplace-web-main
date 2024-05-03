import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { AUTH_HEADER } from "../../../data";
import { formatarData } from "../../../generalFunctions";
import { Input } from "../../../globalStyle";
import { Select } from "../Oferta/Oferta.styles";
import { InputDetails, SelectDetails } from "./OrderDetails.styles";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const DetailsInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0;
  padding: 15px 20px;
  -webkit-box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  width: 100%;
`;

const InfoTitle = styled.span`
  color: darkgray;
`;

const InfoValue = styled.span`
  font-weight: 700;
  color: #242424;
`;

const OrderDetailsInfo = ({
  modoEditar,
  objOferta,
  meioTransporte,
  setMeioTransporte,
  dataEmbarque,
  setDataEmbarque,
  estimativaEmbarque,
  setEstimativaEmbarque,
  termoPagamento,
  setTermoPagamento,
  statusPagamento,
  setStatusPagamento,
}) => {
  //combo do meio de transporte vindo da base
  const [meioTransporteCombo, setMeioTransporteCombo] = useState();
  const [statusPagamentoCombo, setStatusPagamentoCombo] = useState();

  //context global
  const { globalCtx } = useContext(GlobalDataCtx);

  //alimenta o combo meio de transporte e status pagamento
  useEffect(() => {
    const meioTransporteEndpoint = `${getMarketplaceApiEndpoint()}/api/MeioTransporte/GetAllMeioTransporte?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=MTR_Id`;

    const statusPagEndpoint = `${getMarketplaceApiEndpoint()}/api/StatusPagamento/GetAllStatusPagamento?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=0&order_by=SPG_Id`;

    axios
      .post(meioTransporteEndpoint, {}, AUTH_HEADER)
      .then((res) => setMeioTransporteCombo(res.data))
      .catch((err) =>
        toast.error("Algo de errado ao buscar dados do meio de transporte.")
      );

    axios
      .post(statusPagEndpoint, {}, AUTH_HEADER)
      .then((res) => setStatusPagamentoCombo(res.data))
      .catch((err) =>
        toast.error("Algo de errado ao buscar dados do status de pagamento.")
      );
  }, []);

  const getMeioTransporteString = (meioTransporteId) => {
    if (meioTransporteCombo) {
      const meioTransporteEncontrado = meioTransporteCombo?.find(
        (mtc) => mtc.MTR_Id === meioTransporteId
      );
      return globalCtx.idioma
        ? meioTransporteEncontrado.MTR_Descricao
        : meioTransporteEncontrado.MTR_DescricaoIngles;
    }
  };
  const getStatusPagString = (StatusPagId) => {
    if (statusPagamentoCombo) {
      const statusPagEncontrado = statusPagamentoCombo?.find(
        (spg) => spg.SPG_Id === StatusPagId
      );
      return globalCtx.idioma
        ? statusPagEncontrado.SPG_Nome
        : statusPagEncontrado.SPG_NomeIngles;
    }
  };

  return (
    <DetailsInfoContainer>
      <DetailRow>
        <InfoTitle>{globalCtx.idioma ? "Produto" : "Product"}</InfoTitle>
        <InfoValue>
          {objOferta.OfertaxQuantidadeProduto.Oferta.Produto.PDT_Nome}
        </InfoValue>
      </DetailRow>
      <DetailRow>
        <InfoTitle>Volume</InfoTitle>
        <InfoValue>
          {objOferta.OFN_Peso}{" "}
          {objOferta.OfertaxQuantidadeProduto.UnidadePeso.UNP_Descricao}
        </InfoValue>
      </DetailRow>
      <DetailRow>
        <InfoTitle>
          {globalCtx.idioma ? "Meio de Transporte" : "Means of Transport"}
        </InfoTitle>
        {modoEditar ? (
          <SelectDetails onChange={(e) => setMeioTransporte(e.target.value)}>
            <option selected="selected">Selecione...</option>
            {meioTransporteCombo &&
              meioTransporteCombo.map((mto) => {
                return (
                  <option value={mto.MTR_Id}>
                    {globalCtx.idioma
                      ? mto.MTR_Descricao
                      : mto.MTR_DescricaoIngles}
                  </option>
                );
              })}
          </SelectDetails>
        ) : (
          <InfoValue>
            {objOferta?.OFN_MeioTransporteId
              ? getMeioTransporteString(objOferta?.OFN_MeioTransporteId)
              : "-"}
          </InfoValue>
        )}
      </DetailRow>
      <DetailRow>
        <InfoTitle>
          {globalCtx.idioma ? "Estimativa de Embarque" : "Estimated departure"}
        </InfoTitle>
        {modoEditar ? (
          <InputDetails
            type="date"
            onChange={(e) => setEstimativaEmbarque(e.target.value)}
          />
        ) : (
          <InfoValue>
            {objOferta?.OFN_DataEstimativaEmbarque
              ? formatarData(objOferta?.OFN_DataEstimativaEmbarque, true)
              : "-"}
          </InfoValue>
        )}
      </DetailRow>
      <DetailRow>
        <InfoTitle>
          {globalCtx.idioma ? "Data de Embarque" : "Date of shipment"}
        </InfoTitle>
        <InfoValue>
          {modoEditar ? (
            <InputDetails
              type="date"
              onChange={(e) => setDataEmbarque(e.target.value)}
            />
          ) : (
            <InfoValue>
              {objOferta?.OFN_DataEmbarque
                ? formatarData(objOferta?.OFN_DataEmbarque, true)
                : "-"}
            </InfoValue>
          )}
        </InfoValue>
      </DetailRow>
      <DetailRow>
        <InfoTitle>
          {globalCtx.idioma ? "Termos de Pagamento" : "Payment terms"}
        </InfoTitle>
        {modoEditar ? (
          <Input onChange={(e) => setTermoPagamento(e.target.value)}></Input>
        ) : (
          <InfoValue>
            {objOferta?.OFN_TermosPagamento
              ? objOferta.OFN_TermosPagamento
              : "-"}
          </InfoValue>
        )}
      </DetailRow>
      <DetailRow>
        <InfoTitle>
          {globalCtx.idioma ? "Status de Pagamento" : "Payment Status"}
        </InfoTitle>
        {modoEditar ? (
          <SelectDetails onChange={(e) => setStatusPagamento(e.target.value)}>
            <option selected="selected">Selecione...</option>
            {statusPagamentoCombo &&
              statusPagamentoCombo.map((spg) => {
                return (
                  <option value={spg.SPG_Id}>
                    {globalCtx.idioma ? spg.SPG_Nome : spg.SPG_NomeIngles}
                  </option>
                );
              })}
          </SelectDetails>
        ) : (
          <InfoValue>
            {objOferta?.OFN_StatusPagamentoId
              ? getStatusPagString(objOferta?.OFN_StatusPagamentoId)
              : "-"}
          </InfoValue>
        )}
      </DetailRow>
      <DetailRow>
        <InfoTitle>
          {globalCtx.idioma ? "Adiantamento (%)" : "Advanced payment (%)"}
        </InfoTitle>
        <InfoValue>
          {objOferta.OfertaxQuantidadeProduto.OXQ_PercentualAdiantamento}%
        </InfoValue>
      </DetailRow>
    </DetailsInfoContainer>
  );
};

export default OrderDetailsInfo;
