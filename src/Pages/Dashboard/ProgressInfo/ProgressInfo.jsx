import React, { useState, useContext, useEffect } from "react";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbarContainer,
  PInfoTitle,
  PInfoValue,
  PInfoWrapper,
  ProgressbarValueDiv,
  ProgressContainer,
  ProgressInfoContainer,
  ProgressValue,
} from "./ProgressInfo.styles";
import {
  DetailsBtn,
  NegociarBtn,
} from "../../../Components/ListaProdutosSection/ListaProdutosSection.styles";
import { useNavigate } from "react-router";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import LoginCtx from "../../../Context/LoginContext";
import { Button } from "react-bootstrap";
import axios from "axios";
import { AUTH_HEADER } from "../../../data";
import { toast } from "react-toastify";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const ProgressInfo = ({
  percentage,
  objEmpresa,
  objOferta,
  vendedor,
  onModalHandler,
}) => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(LoginCtx);

  const { globalCtx } = useContext(GlobalDataCtx);

  const objEndereco = globalCtx?.listaEmpresas?.find(
    (emp) => emp.EMP_Id === objEmpresa?.EMP_Id
  ).Endereco;

  const [listaDocumentos, setListaDocumentos] = useState();

  const [porcentagem, setPorcentagem] = useState(0);

  //funçao utilizada para listar e atualizar a lista de documentos
  const getListaDocumentos = () => {
    const listaDocEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacaoxDocumento/GetAllOfertaNegociacaoxDocumentoByValorExato?strValorExato=${parseInt(
      objEmpresa.EMP_Id
    )}&ColunaParaValorExato=OND_EmpresaId&fSomenteAtivos=true&join=true&maxInstances=0&order_by=OND_Id`;
    axios
      .post(listaDocEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setListaDocumentos(res.data);
        }
      })
      .catch((err) => {
        toast.error(
          globalCtx.idioma
            ? `Erro ao buscar lista de documentos da empresa ${objEmpresa.EMP_RazaoSocial}.`
            : `Error trying to fetch list of documents for company ${objEmpresa.EMP_RazaoSocial}.`
        );
        getListaDocumentos();
      });
  };

  //useEffect
  useEffect(() => {
    if (listaDocumentos) {
      if (listaDocumentos.length >= 1) {
        let todosDocumentos = listaDocumentos?.length;

        const docsDessaOferta = listaDocumentos.filter(
          (docs) => docs.OfertaNegociacao.OFN_Id === objOferta.OFN_Id
        );

        const docsAprovados = docsDessaOferta.filter(
          (documentos) =>
            documentos.OND_FlagAprovado !== false && documentos.OND_DocumentoId
        ).length;

        const porcentagem = (docsAprovados / docsDessaOferta.length) * 100;

        setPorcentagem(porcentagem.toFixed(0));
      } else {
        setPorcentagem(0);
      }
    } else {
      getListaDocumentos();
    }
  }, [listaDocumentos]);

  return (
    <ProgressContainer>
      <PInfoWrapper>
        <h6>
          {vendedor
            ? globalCtx.idioma
              ? "Vendedor:"
              : "Seller:"
            : globalCtx.idioma
            ? "Comprador:"
            : "Buyer:"}{" "}
          {objEmpresa.EMP_NomeFantasia}
        </h6>
      </PInfoWrapper>
      <CircularProgressbarContainer>
        <CircularProgressbarWithChildren
          value={porcentagem}
          styles={{
            path: {
              stroke: vendedor ? "#FF6600" : "#115934",
              strokeLinecap: "butt",
            },

            trail: {
              stroke: "#d6d6d6",
              strokeLinecap: "butt",

              transform: "rotate(0.25turn)",
              transformOrigin: "center center",
            },
          }}
        >
          <ProgressbarValueDiv>
            <ProgressValue>{porcentagem}%</ProgressValue>
            <strong>{globalCtx.idioma ? "Completo" : "Complete"}</strong>
          </ProgressbarValueDiv>
        </CircularProgressbarWithChildren>
      </CircularProgressbarContainer>

      <ProgressInfoContainer>
        <hr></hr>
        <PInfoWrapper>
          <PInfoTitle>
            {globalCtx.idioma ? "Responsável" : "Responsible"}
          </PInfoTitle>
          <PInfoValue>{objEmpresa?.Usuario?.Pessoa?.PES_Nome}</PInfoValue>
        </PInfoWrapper>
        <hr></hr>
        <PInfoWrapper>
          <PInfoTitle>
            {vendedor
              ? globalCtx.idioma
                ? "Porto de origem"
                : "Port of origin"
              : globalCtx.idioma
              ? "Porto de destino"
              : "Port of destination"}
          </PInfoTitle>
          <PInfoValue>
            {objEndereco.END_Cidade}, {objEndereco.END_Estado}
          </PInfoValue>
        </PInfoWrapper>
        <PInfoWrapper>
          <PInfoTitle>Icoterm</PInfoTitle>
          <PInfoValue>Vitae, sed</PInfoValue>
        </PInfoWrapper>

        <hr></hr>
        {/* =========== BOTÕES DO CARD CASO USUARIO SEJA MASTER DIRECTTO OU MASTER ROCKET ======== */}
        {(state.perfilUsuario === 1 || state.perfilUsuario === 2) && (
          <PInfoWrapper>
            <DetailsBtn onClick={() => onModalHandler(true)}>
              Contato
            </DetailsBtn>
            <NegociarBtn
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(
                  `/dashboard/board-operacional/review?vendedor=${vendedor}&OFN_Id=${objOferta.OFN_Id}&EMP_Id=${objEmpresa.EMP_Id}`,
                  {
                    replace: true,
                  }
                );
              }}
            >
              {globalCtx.idioma ? "Editar" : "Edit"}
            </NegociarBtn>
          </PInfoWrapper>
        )}

        <PInfoWrapper>
          {objEmpresa.EMP_Id === state.empresaId && (
            <Button
              variant="success"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(
                  `/dashboard/board-operacional/review?vendedor=${vendedor}&OFN_Id=${objOferta.OFN_Id}&EMP_Id=${state.empresaId}`,
                  {
                    replace: true,
                  }
                );
              }}
            >
              {globalCtx.idioma ? "Editar Documentos" : "Edit Documents"}
            </Button>
          )}
        </PInfoWrapper>
      </ProgressInfoContainer>
    </ProgressContainer>
  );
};

export default ProgressInfo;
