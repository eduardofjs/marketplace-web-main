import React, { useContext, useState, useEffect } from "react";
import ReactLoading from "react-loading";
import {
  InfoLink,
  InfoTitle,
  InfoValue,
  InfoWrapper,
  OperationalBoard,
  OrderBody,
  OrderContainer,
  OrderHeader,
  OrderInfo,
  OrderInfoContainer,
  OrderInfoTitle,
  StepsContainer,
  StepSeparator,
} from "./OrderDetails.styles";
import { Alert } from "react-bootstrap";
import OrderStep from "../../../Components/OrderStep/OrderStep";
import OrderNotification from "../OrderNotification/OrderNotification";
import LoginCtx from "../../../Context/LoginContext";
import { formatName, getUserRole } from "../../../generalFunctions";
import ProgressInfo from "../ProgressInfo/ProgressInfo";
import ContactModal from "../ContactModal/ContactModal";
import { DashCtx } from "../Dashboard";
import { Breadcrumb } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { CategoriaTag } from "../../../Components/ListaProdutosSection/ListaProdutosSection.styles";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillSave } from "react-icons/ai";
import OrderDetailsInfo from "./OrderDetailsInfo";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AUTH_HEADER } from "../../../data";
import { toast } from "react-toastify";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import LoadingDiv from "../../../Components/LoadingDiv/LoadingDiv";
import EtapaSolicitacaoDocs from "./EtapaSolicitacaoDocs";
import EtapaAnaliseDocs from "./EtapaAnaliseDocs";
import EtapaTransporte from "./EtapaTransporte";
import EtapaEntrega from "./EtapaEntrega";
import { getMarketplaceApiEndpoint } from "../../../generalFunctions";

const OrderDetails = () => {
  const [objOferta, setObjOferta] = useState();

  const [contactModal, setContactModal] = useState(false);

  const [modoEditar, setModoEditar] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const modalHandler = (state) => setContactModal(state);

  const { globalCtx, updateEtapas, updateDataNotificacao } =
    useContext(GlobalDataCtx);

  const { state, dispatch } = useContext(LoginCtx);

  //informaçoes inputadas pelo usuario
  const [meioTransporte, setMeioTransporte] = useState();
  const [estimativaEmbarque, setEstimativaEmbarque] = useState();
  const [dataEmbarque, setDataEmbarque] = useState();
  const [permiteEntrega, setPermiteEntrega] = useState();
  const [termoPagamento, setTermoPagamento] = useState();
  const [statusPagamento, setStatusPagamento] = useState();

  //query string react router v6
  const [searchParams] = useSearchParams();

  //pega o token
  const tokenOFNId = searchParams.get("OFN_id");

  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  useEffect(() => {
    setLocationString(
      globalCtx.idioma ? "Detalhes da Negociação" : "Deal Details"
    );
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          {globalCtx.idioma ? "Início" : "Home"}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            navigate("/dashboard/board-operacional", { replace: true })
          }
        >
          {globalCtx.idioma ? "Board Operacional" : "Operational Board"}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {globalCtx.idioma ? "Detalhes da Negociação" : "Deal Details"}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  //pega a oferta em analise
  useEffect(() => {
    updateDados();
  }, [tokenOFNId]);

  //funçao disparada qdo usuario clica em 'salvar'
  const salvarDetalhesHandler = () => {
    if ((meioTransporte, estimativaEmbarque, dataEmbarque)) {
      setIsLoading(true);
      let salvarDadosEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/UpdateOfertaNegociacaoDirectto?OFN_Id=${objOferta.OFN_Id}&OFN_MeioTransporteId=${meioTransporte}&OFN_DataEmbarque=${dataEmbarque}&OFN_DataEstimativaEmbarque=${estimativaEmbarque}&OFN_TermosPagamento=${termoPagamento}&OFN_StatusPagamentoId=${statusPagamento}`;

      axios
        .put(salvarDadosEndpoint, {}, AUTH_HEADER)
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            toast.success(
              globalCtx.idioma ? "Dados atualizados." : "Updated data."
            );
            setModoEditar(false);
            setIsLoading(false);
            updateDados();
          }
        })
        .catch((err) => {
          toast.error(
            globalCtx.idioma
              ? "Ocorreu algum erro ao salvar. Tente novamente."
              : "Something wrong. Please try again."
          );
          setIsLoading(false);
        });
    } else {
      toast.error(
        globalCtx.idioma
          ? "Por favor, preencha os campos corretamente."
          : "Please fill the fields properly."
      );
    }
  };

  //atualiza os dados
  const updateDados = () => {
    const ofertaNegociacaoEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/GetOfertaNegociacaoById?OFN_Id=${tokenOFNId}&join=true`;

    axios
      .post(ofertaNegociacaoEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        setObjOferta(res.data);
      })
      .catch((err) =>
        toast.error(
          globalCtx.idioma
            ? "Algo de errado ao buscar a oferta no banco de dados."
            : "Something wrong."
        )
      );
  };

  //pega o booleano de <EtapaTransporte/> para saber se está concluida e mudar o state de 'permiteEntrega'
  const getIsTransporteFinished = (val) => setPermiteEntrega(val);

  return (
    <OrderContainer Container>
      {objOferta ? (
        <>
          {" "}
          <OrderHeader>
            <OperationalBoard>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <h3>
                    {globalCtx.idioma
                      ? "Resumo da Operação"
                      : "Operation Summary"}
                  </h3>
                  {/* {docsAprovadosComprador && (
                    <span>DOCS COMPRADOR APROVADOS</span>
                  )}
                  {docsAprovadosVendedor && (
                    <span>DOCS Vendedor APROVADOS</span>
                  )} */}
                  <CategoriaTag
                    categoria={
                      objOferta.OfertaxQuantidadeProduto.Oferta
                        .OFE_FlagMercadoExterno
                        ? false
                        : true
                    }
                  >
                    {objOferta.OfertaxQuantidadeProduto.Oferta
                      .OFE_FlagMercadoExterno
                      ? globalCtx.idioma
                        ? "Internacional"
                        : "International"
                      : globalCtx.idioma
                      ? "Brasileiro"
                      : "Brazilian"}
                  </CategoriaTag>
                </div>
                {!isLoading ? (
                  <>
                    {" "}
                    {(state.perfilUsuario === 1 || state.perfilUsuario === 2) &&
                      modoEditar && (
                        <Button
                          variant="outline-success"
                          onClick={() => setModoEditar(false)}
                        >
                          {globalCtx.idioma ? "Cancelar" : "Cancel"}
                        </Button>
                      )}
                    {modoEditar ? (
                      <Button variant="success" onClick={salvarDetalhesHandler}>
                        <AiFillSave style={{ marginRight: "10px" }} />
                        {globalCtx.idioma ? "Salvar" : "Save"}
                      </Button>
                    ) : (
                      (state.perfilUsuario === 1 ||
                        state.perfilUsuario === 2) && (
                        <Button
                          variant="success"
                          onClick={() => setModoEditar(true)}
                        >
                          <BsFillPencilFill style={{ marginRight: "10px" }} />
                          {globalCtx.idioma ? "Editar" : "Edit"}
                        </Button>
                      )
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      padding: "5px",
                      alignItems: "center",
                    }}
                  >
                    <ReactLoading
                      type={"spin"}
                      color={"green"}
                      height={50}
                      width={50}
                    />{" "}
                    <span style={{ marginLeft: "10px", fontSize: "12px" }}>
                      {globalCtx.idioma ? "Salvando..." : "Saving..."}
                    </span>
                  </div>
                )}
              </div>

              {state.perfilUsuario !== 1 && state.perfilUsuario !== 2 && (
                <Alert style={{ marginTop: "10px" }}>
                  {globalCtx.idioma
                    ? "Você está envolvido nesta negociação como "
                    : "You are involved in this negotiation as "}
                  <strong>
                    {getUserRole(
                      state.empresaId,
                      objOferta.OFN_EmpresaOriginalId,
                      objOferta.OfertaxQuantidadeProduto.Oferta.Empresa.EMP_Id,
                      false,
                      globalCtx?.idioma
                    )}
                  </strong>
                  .
                </Alert>
              )}
              <span style={{ color: "#242424" }}>
                {globalCtx.idioma ? "Número do Pedido: " : "Order number: "}{" "}
                {objOferta.OFN_NumeroPedido}
              </span>
              {objOferta && (
                <OrderDetailsInfo
                  modoEditar={modoEditar}
                  objOferta={objOferta}
                  meioTransporte={meioTransporte}
                  setMeioTransporte={setMeioTransporte}
                  estimativaEmbarque={estimativaEmbarque}
                  setEstimativaEmbarque={setEstimativaEmbarque}
                  dataEmbarque={dataEmbarque}
                  setDataEmbarque={setDataEmbarque}
                  termoPagamento={termoPagamento}
                  setTermoPagamento={setTermoPagamento}
                  statusPagamento={statusPagamento}
                  setStatusPagamento={setStatusPagamento}
                />
              )}
              <StepsContainer>
                {/* <OrderStep stage={0} isFinished={verificaEtapaHandler(1)} /> */}
                <EtapaSolicitacaoDocs
                  objOferta={objOferta}
                  perfilUsuario={state.perfilUsuario}
                  rowMode={false}
                />
                <StepSeparator />
                {/* <OrderStep stage={1} isFinished={verificaEtapaHandler(2)} /> */}
                <EtapaAnaliseDocs
                  objOferta={objOferta}
                  perfilUsuario={state.perfilUsuario}
                  idEmpresaLogada={state.empresaId}
                  idEmpresaVendedora={
                    objOferta.OfertaxQuantidadeProduto.Oferta.Empresa.EMP_Id
                  }
                  idEmpresaCompradora={objOferta.OFN_EmpresaOriginalId}
                  rowMode={false}
                />
                <StepSeparator />
                {/* <OrderStep stage={2} isFinished={verificaEtapaHandler(3)} /> */}
                <EtapaTransporte
                  objOferta={objOferta}
                  perfilUsuario={state.perfilUsuario}
                  idEmpresaLogada={state.empresaId}
                  getIsTransporteFinished={getIsTransporteFinished}
                />
                <StepSeparator />
                {/* <OrderStep stage={3} isFinished={verificaEtapaHandler(4)} /> */}
                <EtapaEntrega
                  objOferta={objOferta}
                  perfilUsuario={state.perfilUsuario}
                />
              </StepsContainer>
              {(state.perfilUsuario === 18 || state.perfilUsuario === 23) && (
                <Alert variant="info">
                  {globalCtx.idioma
                    ? "Para obter mais informações, Ligar para a linha direta: 0800 888 8888. Clique na "
                    : "To get more information, call direct line: 0800 888 8888. Click on "}
                  <Alert.Link href="#">
                    {globalCtx.idioma ? "página inicial" : "home"}
                  </Alert.Link>
                  .
                </Alert>
              )}

              {(state.perfilUsuario === 1 || state.perfilUsuario === 2) && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* <Button
                    style={{ marginRight: "10px" }}
                    variant="outline-primary"
                    disabled={!permiteEntrega}
                  >
                    Confirmar transporte
                  </Button> */}
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      if (objOferta.OFN_EtapaNegociacaoDirectto === 4) {
                        updateEtapas(
                          parseInt(tokenOFNId),
                          "Directto",
                          3,
                          updateDados
                        );

                        updateDataNotificacao(
                          parseInt(tokenOFNId),
                          "OFN_DataDirEtapa4"
                        );
                      } else {
                        updateEtapas(
                          parseInt(tokenOFNId),
                          "Directto",
                          4,
                          updateDados
                        );

                        updateDataNotificacao(
                          parseInt(tokenOFNId),
                          "OFN_DataDirEtapa4"
                        );
                      }
                    }}
                    disabled={!permiteEntrega}
                  >
                    {objOferta.OFN_EtapaNegociacaoDirectto === 4
                      ? "Cancelar confirmação de entrega"
                      : "Confirmar entrega"}
                  </Button>
                </div>
              )}
            </OperationalBoard>
            <OrderInfoContainer>
              {" "}
              <OrderInfo>
                <OrderInfoTitle>
                  {globalCtx.idioma ? "Informações do pedido" : "Order Info"}
                </OrderInfoTitle>
                <InfoWrapper>
                  <InfoTitle>
                    {globalCtx.idioma ? "Número do pedido:" : "Order number:"}
                  </InfoTitle>
                  <InfoValue>#{objOferta.OFN_NumeroPedido}</InfoValue>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoTitle>
                    {globalCtx.idioma ? "Nome da Loja:" : "Store name:"}
                  </InfoTitle>
                  <InfoValue>
                    {
                      objOferta?.OfertaxQuantidadeProduto?.Oferta?.Empresa
                        ?.EMP_NomeFantasia
                    }
                  </InfoValue>
                </InfoWrapper>
              </OrderInfo>
              <OrderNotification
                objOferta={objOferta}
                perfilUsuario={state.perfilUsuario}
                idEmpresaLogada={state.empresaId}
                etapa={1}
              />
              <OrderNotification
                objOferta={objOferta}
                perfilUsuario={state.perfilUsuario}
                idEmpresaLogada={state.empresaId}
                etapa={2}
              />
              <OrderNotification
                objOferta={objOferta}
                perfilUsuario={state.perfilUsuario}
                idEmpresaLogada={state.empresaId}
                etapa={3}
              />
              <OrderNotification
                objOferta={objOferta}
                perfilUsuario={state.perfilUsuario}
                idEmpresaLogada={state.empresaId}
                etapa={4}
              />
            </OrderInfoContainer>
          </OrderHeader>
          <OrderBody>
            <ProgressInfo
              objEmpresa={objOferta?.OfertaxQuantidadeProduto.Oferta.Empresa}
              objOferta={objOferta}
              vendedor={true}
              onModalHandler={modalHandler}
            />
            <ProgressInfo
              objEmpresa={globalCtx.listaEmpresas.find(
                (emp) => emp.EMP_Id === objOferta.OFN_EmpresaOriginalId
              )}
              objOferta={objOferta}
              vendedor={false}
              onModalHandler={modalHandler}
            />
          </OrderBody>
          {contactModal && <ContactModal onModalHandler={modalHandler} />}
        </>
      ) : (
        <LoadingDiv
          loadingMsg={
            globalCtx.idioma
              ? "Carregando Board Operacional..."
              : "Loading Operational Board..."
          }
        />
      )}
    </OrderContainer>
  );
};

export default OrderDetails;
