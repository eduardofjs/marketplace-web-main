import React, { useState, useContext, useEffect } from "react";
import {
  FieldDesc,
  OfertaFieldDiv,
  OfertaDetalhesContainer,
  SectionDesc,
  SectionHeader,
  SectionTitle,
  Select,
  SelectForm,
  SubsectionDesc,
  AddMoreOfferSpan,
  Input,
  TextArea,
  CertLabel,
  CertificadoDiv,
  ContainerFotos,
  ContainerUploadFotos,
} from "./Oferta.styles";
import axios from "axios";
import { OfertaCtx } from "./Oferta";
import { AUTH_HEADER, REQ_BODY } from "../../../data";
import { Hr } from "../../Cadastro/Cadastro.styles";
import { toast } from "react-toastify";
import FotoOferta from "../../../Components/FotoOferta/FotoOferta";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { Button } from "react-bootstrap";
import UploadArquivo from "../../../Components/UploadArquivo/UploadArquivo";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const currentYear = new Date().getFullYear();

const getPastYears = (qtd) => {
  let tempYearsArray = [];
  for (let i = 1; i < qtd; i++) {
    tempYearsArray.push(currentYear - i);
  }
  return tempYearsArray;
};

const OfertaDetalhes = () => {
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  //armazena os valores do combo MODO CULTIVO - SISTEMA PRODUTIVO
  const [comboSistemaProdutivo, setComboSistemaProdutivo] = useState(false);
  const sistemaProdutivoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/ModoCultivoSistemaProdutivo/GetAllModoCultivoSistemaProdutivo?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=MCS_Id`;

  //armazena os valores do combo MODO CULTIVO - MODO DE PRODUÇÃO
  const [comboModoProducao, setComboModoProducao] = useState(false);
  const modoProducaoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/ModoCultivoModoProducao/GetAllModoCultivoModoProducao?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=MCM_Id`;

  //armazena os valores do combo SITUAÇAO DO PRODUTO - STATUS DO PRODUTO
  const [comboStatusProduto, setComboStatusProduto] = useState(false);
  const statusProdutoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/StatusProduto/GetAllStatusProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=99999&order_by=SPR_Id`;

  //armazena os valores do combo CERTIFICAÇOES - TIPO DE CERTIFICAÇÃO
  const [comboCertificacoes, setComboCertificacoes] = useState(false);
  const tipoCertificacaoEndpoint =
    `${getMarketplaceApiEndpoint()}/api/TipoCertificacao/GetAllTipoCertificacao?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=TPC_Id`;

  //useContext
  const {
    ofertaFormState,
    ofertaDispatch,
    secondStepError,
    stringOther,
    stringSelect,
    stringLoading,
  } = useContext(OfertaCtx);

  //useEffect que vai popular os combos
  useEffect(() => {
    //combo sistema prdodutivo
    axios
      .post(sistemaProdutivoEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => {
        setComboSistemaProdutivo(response.data);
      });
    //combo modo de produção
    axios.post(modoProducaoEndpoint, REQ_BODY, AUTH_HEADER).then((response) => {
      setComboModoProducao(response.data);
    });
    //combo status produto
    axios
      .post(statusProdutoEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => {
        setComboStatusProduto(response.data);
      });
    //combo tipo certificaçoes
    axios
      .post(tipoCertificacaoEndpoint, REQ_BODY, AUTH_HEADER)
      .then((response) => {
        setComboCertificacoes(response.data);
      });
  }, []);

  return (
    <OfertaDetalhesContainer>
      <SectionHeader>
        <SectionTitle>
          {globalCtx.idioma ? "Detalhes do Produto" : "Product Details"}
        </SectionTitle>
        <SectionDesc>
          {globalCtx.idioma
            ? "Aqui você fornecerá as informações para o cadastro de produtos na Directto."
            : "Here you will provide the information for the registration of products on Directto."}
        </SectionDesc>
      </SectionHeader>
      <SubsectionDesc
        naoFoiPreenchido={
          secondStepError &&
          (ofertaFormState.OFE_ModoCultivoSistemaProdutivoId === null ||
            ofertaFormState.OFE_ModoCultivoModoProducaoId === null)
        }
      >
        {globalCtx.idioma ? "Modo cultivo" : "Cultivation mode"}
      </SubsectionDesc>
      <SelectForm>
        <OfertaFieldDiv>
          <FieldDesc
            naoFoiPreenchido={
              secondStepError &&
              ofertaFormState.OFE_ModoCultivoSistemaProdutivoId === null
            }
          >
            {globalCtx.idioma ? "Sistema produtivo*" : "Productive system*"}
          </FieldDesc>
          <Select
            value={
              ofertaFormState.OFE_ModoCultivoSistemaProdutivoId &&
              ofertaFormState.OFE_ModoCultivoSistemaProdutivoId
            }
            onChange={(e) => {
              if (e.target.value.length > 2) {
                ofertaDispatch({ type: "MCSistemaProdutivo", value: null });
              } else {
                ofertaDispatch({
                  type: "MCSistemaProdutivo",
                  value: parseInt(e.target.value),
                });
              }
            }}
          >
            {comboSistemaProdutivo ? (
              <>
                <option selected="selected">{stringSelect}</option>
                {comboSistemaProdutivo ? (
                  comboSistemaProdutivo.map((el) => (
                    <option key={el.MCS_Id} value={el.MCS_Id}>
                      {globalCtx.idioma
                        ? el.MCS_Descricao
                        : el.MCS_DescricaoIngles}
                    </option>
                  ))
                ) : (
                  <option selected="selected">{stringLoading}</option>
                )}
              </>
            ) : (
              <option selected="selected">{stringLoading}</option>
            )}
          </Select>
        </OfertaFieldDiv>
        <hr />
        <OfertaFieldDiv>
          <FieldDesc
            naoFoiPreenchido={
              secondStepError &&
              ofertaFormState.OFE_ModoCultivoModoProducaoId === null
            }
          >
            {globalCtx.idioma ? "Modo de produção*" : "Production mode*"}
          </FieldDesc>
          <Select
            value={
              ofertaFormState.OFE_ModoCultivoModoProducaoId &&
              ofertaFormState.OFE_ModoCultivoModoProducaoId
            }
            onChange={(e) => {
              if (e.target.value.length > 2) {
                ofertaDispatch({ type: "MCModoProducao", value: null });
              } else {
                ofertaDispatch({
                  type: "MCModoProducao",
                  value: parseInt(e.target.value),
                });
              }
            }}
          >
            {comboModoProducao ? (
              <>
                <option selected="selected">{stringSelect}</option>
                {comboModoProducao.map((el) => (
                  <option key={el.MCM_Id} value={el.MCM_Id}>
                    {globalCtx.idioma
                      ? el.MCM_Descricao
                      : el.MCM_DescricaoIngles}
                  </option>
                ))}
              </>
            ) : (
              <option selected="selected">{stringLoading}</option>
            )}
          </Select>
        </OfertaFieldDiv>
      </SelectForm>
      <SubsectionDesc
        naoFoiPreenchido={
          secondStepError &&
          (ofertaFormState.OFE_StatusProdutoId === null ||
            ofertaFormState.OFE_ModoCultivoModoProducaoId === null)
        }
      >
        {globalCtx.idioma ? "Situação do Produto" : "Product caracteristics"}
      </SubsectionDesc>
      <SelectForm>
        <hr />
        <OfertaFieldDiv>
          <FieldDesc
            naoFoiPreenchido={
              secondStepError && ofertaFormState.OFE_StatusProdutoId === null
            }
          >
            {globalCtx.idioma ? "Status do produto*" : "Product status*"}
          </FieldDesc>
          <Select
            value={
              ofertaFormState.OFE_StatusProdutoId &&
              ofertaFormState.OFE_StatusProdutoId
            }
            onChange={(e) => {
              if (e.target.value.length > 2) {
                ofertaDispatch({ type: "SPStatusProduto", value: null });
              } else {
                ofertaDispatch({
                  type: "SPStatusProduto",
                  value: parseInt(e.target.value),
                });
              }
            }}
          >
            {comboStatusProduto ? (
              <>
                <option selected="selected">{stringSelect}</option>
                {comboStatusProduto.map((el) => (
                  <option key={el.SPR_Id} value={el.SPR_Id}>
                    {globalCtx.idioma
                      ? el.SPR_Descricao
                      : el.SPR_DescricaoIngles}
                  </option>
                ))}
              </>
            ) : (
              <option selected="selected">{stringLoading}</option>
            )}
          </Select>
        </OfertaFieldDiv>
        <OfertaFieldDiv>
          <FieldDesc
            naoFoiPreenchido={
              secondStepError && ofertaFormState.OFE_AnoColheita === null
            }
          >
            {globalCtx.idioma ? "Ano da colheita*" : "Harvest year*"}
          </FieldDesc>
          <Select
            value={
              ofertaFormState.OFE_AnoColheita && ofertaFormState.OFE_AnoColheita
            }
            onChange={(e) => {
              ofertaDispatch({ type: "AnoColheita", value: e.target.value });
            }}
          >
            {/* <option selected="selected" value={currentYear}>
              {stringSelect}
            </option> */}
            <option>{currentYear}</option>
            {getPastYears(5).map((year) => {
              return <option>{year}</option>;
            })}
          </Select>
        </OfertaFieldDiv>
      </SelectForm>
      <SubsectionDesc
        naoFoiPreenchido={
          secondStepError && ofertaFormState.OFE_Descricao === null
        }
      >
        {globalCtx.idioma ? "Sobre o produto*" : "About the product*"}
      </SubsectionDesc>

      <FieldDesc
        naoFoiPreenchido={
          secondStepError && ofertaFormState.OFE_Descricao === null
        }
      >
        {globalCtx.idioma
          ? "Aqui você pode fornecer informações adicionais em formato de texto que serão exibidas na página de oferta. (Max. 250 caracteres)"
          : "Here you can provide additional information in text format that will be displayed on the offer page."}
      </FieldDesc>
      <TextArea
        value={ofertaFormState.OFE_Descricao && ofertaFormState.OFE_Descricao}
        maxLength="250"
        onChange={(e) => {
          if (e.target.value.length >= 1) {
            ofertaDispatch({ type: "DescricaoProduto", value: e.target.value });
          } else {
            ofertaDispatch({ type: "DescricaoProduto", value: null });
          }
        }}
      ></TextArea>
      <SubsectionDesc>{globalCtx.idioma ? "Fotos" : "Pictures"}</SubsectionDesc>
      <FieldDesc>
        {globalCtx.idioma
          ? "Forneça algumas fotos para a página de oferta (Max. 5 fotos)"
          : "Please provide some pictures for the offer page (Max. 5 pics)"}
      </FieldDesc>
      {/* <UploadFotosContainer>

        <UploadIcon></UploadIcon>

        <input id="foto" type="file" style={{display: "none"}} onChange={(e) => {
          //C:/fakepath/nomeArquivo.jpg ----> nomeArquivo.jpg
          const nomeArqFormatado = e.target.value.split("\\").at(-1);
          let arquivo = e.target.files[0]; 
          
          
          
         uploadImagem(nomeArqFormatado, ofertaFormState.OFE_EmpresaId, ofertaFormState.OFE_UsuarioInsercaoId, arquivo);
        }}/>

        <label for="foto">  <span>{globalCtx.idioma ? "Clique aqui para fazer o upload" : "Click here to upload"}</span></label>
      
      </UploadFotosContainer>
      */}
      <ContainerUploadFotos>
        {ofertaFormState.listaOfertaxDocumento.length < 5 && <UploadArquivo />}
        <ContainerFotos>
          {ofertaFormState.listaOfertaxDocumento.map((documento) => {
            return (
              <FotoOferta idDocumento={documento.OXD_DocumentoId}></FotoOferta>
            );
          })}
        </ContainerFotos>
      </ContainerUploadFotos>

      <SubsectionDesc>
        {globalCtx.idioma ? "Certificações & Selos" : "Certifications & Seals"}
      </SubsectionDesc>
      <SelectForm type="col">
        {ofertaFormState.listaOfertaxCertificacao.map((cert, i) => {
          return (
            <CertificadoDiv>
              <OfertaFieldDiv>
                <FieldDesc>
                  {globalCtx.idioma
                    ? "Tipo de certificação"
                    : "Type of certification"}
                </FieldDesc>

                <Select
                  onChange={(e) => {
                    ofertaDispatch({
                      type: "TipoCertificacao",
                      value: parseInt(e.target.value),
                      index: i,
                    });
                  }}
                >
                  {comboCertificacoes && <option>{stringSelect}</option>}
                  {comboCertificacoes ? (
                    comboCertificacoes.map((el) => (
                      <option key={el.TPC_Id} value={el.TPC_Id}>
                        {el.TPC_Descricao}
                      </option>
                    ))
                  ) : (
                    <option selected="selected">{stringLoading}</option>
                  )}
                </Select>
              </OfertaFieldDiv>

              <OfertaFieldDiv>
                <FieldDesc>
                  {globalCtx.idioma ? "Comentários" : "Comments"}
                </FieldDesc>
                <Input
                  w={400}
                  type="text"
                  placeholder={
                    globalCtx.idioma
                      ? "Comentários em caso de certificação especial"
                      : "Comments in case of special certification"
                  }
                  onChange={(e) =>
                    ofertaDispatch({
                      type: "ComentarioCertificado",
                      value: e.target.value,
                      index: i,
                    })
                  }
                ></Input>
              </OfertaFieldDiv>
              <OfertaFieldDiv>
                <FieldDesc>
                  {globalCtx.idioma
                    ? "Upload da Certificação* (PDF ou Imagem)"
                    : "Certification Upload (Image/PDF)"}
                </FieldDesc>
                <Input
                  w={380}
                  type="file"
                  id={`uploadCert${i}`}
                  style={{ display: "none" }}
                  accept="application/pdf, image/png, image/jpeg"
                  onChange={(e) => {
                    ofertaDispatch({
                      type: "UploadCertificacao",
                      value: e.target.value,
                      index: i,
                    });
                  }}
                ></Input>
                <CertLabel for={`uploadCert${i}`}>
                  {ofertaFormState.listaOfertaxCertificacao[i].OXC_PathUrl !==
                  null
                    ? `${
                        globalCtx.idioma ? "Arquivo" : "File"
                      }: ${ofertaFormState.listaOfertaxCertificacao[
                        i
                      ].OXC_PathUrl?.split("\\").at(-1)} ✔`
                    : `${
                        globalCtx.idioma
                          ? "Clique aqui para enviar a certificação"
                          : "Click here to upload certification"
                      }`}
                </CertLabel>
              </OfertaFieldDiv>
              {i > 0 && (
                <Button
                  onClick={() =>
                    ofertaDispatch({
                      type: "RemoverCertificacaoNoIndex",
                      value: i,
                    })
                  }
                  style={{ height: "50px", marginLeft: "20px" }}
                  variant="outline-danger"
                >
                  {globalCtx.idioma ? "Remover" : "Remove"}
                </Button>
              )}
            </CertificadoDiv>
          );
        })}
      </SelectForm>

      <Hr />
      <AddMoreOfferSpan
        onClick={() => {
          if (ofertaFormState.listaOfertaxCertificacao.length === 5) {
            toast.error(
              globalCtx.idioma
                ? "Número máximo de certificados atingido."
                : "Max number reached."
            );
          } else {
            toast.success(
              globalCtx.idioma
                ? "Novo campo de certificado adicionado."
                : "New Certificate field added."
            );
            ofertaDispatch({ type: "AdicionarOutraCertificacao" });
          }
        }}
      >
        {globalCtx.idioma ? "+ Nova certificação" : "+ New Certification"}
      </AddMoreOfferSpan>
    </OfertaDetalhesContainer>
  );
};

export default OfertaDetalhes;
