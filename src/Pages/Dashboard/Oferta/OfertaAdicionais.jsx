import React, { useContext, useEffect, useState } from "react";
import {
  InputFieldsContainer,
  OfertaAdicionaisContainer,
  SectionDesc,
  SectionHeader,
  SectionTitle,
  SubsectionDesc,
} from "./Oferta.styles";
import { Form } from "react-bootstrap";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import axios from "axios";
import { AUTH_HEADER } from "../../../data";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const OfertaAdicionais = () => {
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const [servicosArray, setServicosArray] = useState(false);
  const [tradeFinanceOptions, setTradeFinanceOptions] = useState(false);
  const [certificatesOptions, setCertificatesOptions] = useState(false);
  const [impactProgramOptions, setImpactProgramOptions] = useState(false);
  const [blockchainOptions, setBlockchainOptions] = useState(false);
  const [companyServicesOptions, setCompanyServicesOptions] = useState(false);

  useEffect(() => {
    if (servicosArray) {
      setTradeFinanceOptions(
        servicosArray.filter((el) => el.SEA_TipoServicoAdicionalId === 1)
      );
      setCertificatesOptions(
        servicosArray.filter((el) => el.SEA_TipoServicoAdicionalId === 2)
      );
      setImpactProgramOptions(
        servicosArray.filter((el) => el.SEA_TipoServicoAdicionalId === 3)
      );
      setBlockchainOptions(
        servicosArray.filter((el) => el.SEA_TipoServicoAdicionalId === 4)
      );
      setCompanyServicesOptions(
        servicosArray.filter((el) => el.SEA_TipoServicoAdicionalId === 5)
      );
    } else {
      const servicosEndpoint =
        `${getMarketplaceApiEndpoint()}/api/ServicoAdicional/GetAllServicoAdicional?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=99999&order_by=SEA_Id`;
      axios.post(servicosEndpoint, {}, AUTH_HEADER).then((res) => {
        setServicosArray(res.data);
      });
    }
  }, [servicosArray]);

  return (
    <OfertaAdicionaisContainer>
      <SectionHeader>
        <SectionTitle>
          {globalCtx.idioma
            ? "Serviços Adicionais da Directto"
            : "Additional Services from Directto"}
        </SectionTitle>
        <SectionDesc>
          {globalCtx.idioma
            ? "Você pode fazer uma cotação dos serviços premium abaixo que são ofertados pela nossa rede de parceiros."
            : "You can quote the premium services below that are offered by our partners network."}
        </SectionDesc>
      </SectionHeader>
      {/* ================|||||| TRADE FINANCE ||||||===================== */}
      <SubsectionDesc>Trade Finance</SubsectionDesc>
      <InputFieldsContainer>
        {tradeFinanceOptions
          ? tradeFinanceOptions?.map((op) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={
                    globalCtx.idioma ? op.SEA_Descricao : op.SEA_DescricaoIngles
                  }
                  style={{ margin: "10px" }}
                />
              );
            })
          : "Carregando"}
      </InputFieldsContainer>
      {/* ================|||||| CERTIFICAÇÕES ||||||===================== */}
      <SubsectionDesc>
        {globalCtx.idioma ? "Certificações" : "Certifications"}
      </SubsectionDesc>
      <InputFieldsContainer>
        {certificatesOptions
          ? certificatesOptions?.map((op) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={
                    globalCtx.idioma ? op.SEA_Descricao : op.SEA_DescricaoIngles
                  }
                  style={{ margin: "10px" }}
                />
              );
            })
          : "Carregando"}
      </InputFieldsContainer>
      {/* ================|||||| PROGRAMA DE IMPACTO ||||||===================== */}
      <SubsectionDesc>
        {globalCtx.idioma ? "Programa de impacto" : "Impact Program"}
      </SubsectionDesc>
      <InputFieldsContainer>
        {impactProgramOptions
          ? impactProgramOptions?.map((op) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={
                    globalCtx.idioma ? op.SEA_Descricao : op.SEA_DescricaoIngles
                  }
                  style={{ margin: "10px" }}
                />
              );
            })
          : "Carregando"}
      </InputFieldsContainer>
      {/* ================|||||| RASTREAMENTO DE BLOCKCHAIN ||||||===================== */}
      <SubsectionDesc>
        {globalCtx.idioma
          ? "Rastreamento"
          : "Tracking"}
      </SubsectionDesc>
      <InputFieldsContainer>
        {blockchainOptions
          ? blockchainOptions?.map((op) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={
                    globalCtx.idioma ? op.SEA_Descricao : op.SEA_DescricaoIngles
                  }
                  style={{ margin: "10px" }}
                />
              );
            })
          : "Carregando"}
      </InputFieldsContainer>
      {/* ================|||||| EMPRESA ||||||===================== */}
      <SubsectionDesc>
        {globalCtx.idioma ? "Empresa" : "Company"}
      </SubsectionDesc>
      <InputFieldsContainer>
        {" "}
        {companyServicesOptions
          ? companyServicesOptions?.map((op) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={
                    globalCtx.idioma ? op.SEA_Descricao : op.SEA_DescricaoIngles
                  }
                  style={{ margin: "10px" }}
                />
              );
            })
          : "Carregando"}
      </InputFieldsContainer>
    </OfertaAdicionaisContainer>
  );
};

export default OfertaAdicionais;
