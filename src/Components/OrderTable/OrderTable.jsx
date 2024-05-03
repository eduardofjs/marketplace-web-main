import React, { useState, useEffect, useContext } from "react";
import { OrderTableContainer, StyledOrderTable } from "./OrderTable.styles";
import { useNavigate, useParams } from "react-router";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import LoginCtx from "../../Context/LoginContext";
import axios from "axios";
import { AUTH_HEADER } from "../../data";
import { Breadcrumb, Button, Table } from "react-bootstrap";
import {
  NegociacaoRow,
  StatusNegociacaoTd,
} from "../../Pages/Dashboard/Negociacoes/Negociacoes.styles";
import {
  formatarData,
  getStatusNegociacao,
  getValorFormatadoMoeda,
  getMarketplaceApiEndpoint
} from "../../generalFunctions";
import LoadingDiv from "../LoadingDiv/LoadingDiv";
import { toast } from "react-toastify";

const OrderTable = () => {
  let nav = useNavigate();

  const [listaNegociacoes, setListaNegociacoes] = useState(false);

  const { globalCtx } = useContext(GlobalDataCtx);

  //login context state
  const { state } = useContext(LoginCtx);

  //buscando a empresa associada a esse usuario
  const empresaEncontrada = globalCtx.listaEmpresas.find(
    (emp) => emp.EMP_UsuarioId === state.userId
  );

  useEffect(() => {
    let negociacoesEndpoint;

    if (state.perfilUsuario === 1 || state.perfilUsuario === 2) {
      negociacoesEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/GetAllOfertaNegociacao?fVerTodos=true&fSomenteAtivos=false&join=true&maxInstances=0&order_by=OFN_Id`;
    } else {
      negociacoesEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaNegociacao/GetOfertaNegociacaoByEmpresaId?EmpresaId=${empresaEncontrada.EMP_Id}&fSomenteAtivos=false&maxInstances=0&order_by=OFN_Id`;
    }
    axios
      .post(negociacoesEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          //verifica o perfil atual do usuario logado
          if (state.perfilUsuario === 1 || state.perfilUsuario === 2) {
            //SE usuario logado for master directto ou rocket, irá exibir todas as negociaçoes aprovadas entre comprador/vendedor
            setListaNegociacoes(res.data.filter((ngc) => ngc.OFN_FlagAceite));
          } else {
            //SE usuario logado nao for master, irá exibir todas as negociações com flagDirectto = true
            setListaNegociacoes(
              res.data.filter((ngc) => {
                return ngc.OFN_EmpresaOriginalId === state.empresaId
                  ? ngc.OFN_FlagLiberaOfertador //LIBERA PRO VENDEDOR
                  : ngc.OFN_FlagLiberaCliente; //LIBERA PRO COMPRADOR
              })
            );
          }
        }
      })
      .catch((err) => {
        toast.error("Erro ao manipular negociação.");
      });
  }, []);

  return (
    <OrderTableContainer>
      {listaNegociacoes ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Número do Pedido</th>
              <th>Nome da Loja</th>
              <th>Produto</th>
              <th>Qtd</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listaNegociacoes.map((ngc, i) => {
              return (
                <NegociacaoRow
                  onClick={() =>
                    nav(`./order?OFN_id=${ngc.OFN_Id}`, { replace: "true" })
                  }
                >
                  <td>{ngc?.OFN_NumeroPedido}</td>
                  <td>
                    {
                      ngc?.OfertaxQuantidadeProduto?.Oferta?.Empresa
                        ?.EMP_NomeFantasia
                    }
                  </td>
                  <td>
                    {ngc.OfertaxQuantidadeProduto.Oferta.Produto.PDT_Nome}
                  </td>
                  <td>
                    {ngc.OfertaxQuantidadeProduto.OXQ_Peso}
                    {ngc.OfertaxQuantidadeProduto.UnidadePeso.UNP_Descricao}
                  </td>
                  <td>Processando documentação</td>
                </NegociacaoRow>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <LoadingDiv
          loadingMsg={
            globalCtx.idioma
              ? "Carregando lista de negociações..."
              : "Loading negotiations list..."
          }
        />
      )}
      {listaNegociacoes?.length === 0 && (
        <h6>Nenhuma negociação encontrada. </h6>
      )}
      {/* <StyledOrderTable striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Número do Pedido</th>
            <th>Nome da Loja</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => nav("./order", { replace: "true" })}>
            <td>1</td>
            <td>8147077236075289</td>
            <td>MoesHouse Official Store</td>
            <td>Açai</td>
            <td>20ton</td>
            <td>Processando documentação (1)</td>
          </tr>
          <tr onClick={() => nav("./order", { replace: "true" })}>
            <td>2</td>
            <td>8147077236075289</td>
            <td>MoesHouse Official Store</td>
            <td>Açai</td>
            <td>20ton</td>
            <td>Processando documentação (1)</td>
          </tr>
          <tr onClick={() => nav("./order", { replace: "true" })}>
            <td>3</td>
            <td>8147077236075289</td>
            <td>MoesHouse Official Store</td>
            <td>Açai</td>
            <td>20ton</td>
            <td>Processando documentação (1)</td>
          </tr>
        </tbody>
      </StyledOrderTable> */}
    </OrderTableContainer>
  );
};

export default OrderTable;
