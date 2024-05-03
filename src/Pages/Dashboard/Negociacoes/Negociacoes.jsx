import React, { useEffect, useState, useContext } from "react";
import { DashMainContainer } from "../../../globalStyle";
import { DashCtx } from "../Dashboard";
import { Breadcrumb, Button, Table } from "react-bootstrap";
import { AUTH_HEADER } from "../../../data";
import axios from "axios";
import { NegociacaoRow, StatusNegociacaoTd } from "./Negociacoes.styles";
import {
  formatarData,
  getStatusNegociacao,
  getValorFormatadoMoeda,
  getMarketplaceApiEndpoint
} from "../../../generalFunctions";
import DetalhesNegociacao from "./DetalhesNegociacao";
import GlobalDataCtx from "../../../Context/GlobalDataContext";
import LoadingDiv from "../../../Components/LoadingDiv/LoadingDiv";
import LoginCtx from "../../../Context/LoginContext";
import { toast } from "react-toastify";

const Negociacoes = () => {
  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  const { globalCtx } = useContext(GlobalDataCtx);

  //login context state
  const { state, dispatch } = useContext(LoginCtx);

  //buscando a empresa associada a esse usuario
  const empresaEncontrada = globalCtx.listaEmpresas.find(
    (emp) => emp.EMP_Id === state.empresaId
  );

  const [listaNegociacoes, setListaNegociacoes] = useState();

  useEffect(() => {
    setLocationString("Negociações");
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          Início
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Negociações</Breadcrumb.Item>
      </Breadcrumb>
    );

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
          setListaNegociacoes(res.data);
        }
      })
      .catch((err) => {
        toast.error("Algum erro ocorreu ao buscar lista de negociações.");
      });
  }, []);

  return (
    <DashMainContainer>
      {listaNegociacoes ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Data</th>

              <th>Empresa Compradora</th>
              <th>Mensagem</th>
              <th>Valor Original</th>

              <th>Valor da Proposta</th>
              <th>Pagamento</th>
              <th>Última Atualização</th>
              <th>Status</th>

              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaNegociacoes.map((ngc, i) => {
              return (
                <NegociacaoRow
                  onClick={() =>
                    navigate(
                      `negociacoes/detalhes?negociacaoId=${ngc.OFN_Id}`,
                      {
                        replace: true,
                      }
                    )
                  }
                >
                  <td>
                    {ngc.OfertaxQuantidadeProduto.Oferta.Produto.PDT_Nome}
                  </td>
                  <td>{formatarData(ngc.OFN_DataCadastro)}</td>

                  <td>
                    {
                      globalCtx.listaEmpresas.find(
                        (emp) => emp.EMP_Id === ngc.OFN_EmpresaOriginalId
                      ).EMP_RazaoSocial
                    }
                  </td>
                  <td
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {ngc.OFN_Mensagem === "False"
                      ? "-"
                      : `${ngc.OFN_Mensagem.slice(0, 14)}...`}
                  </td>
                  <td>
                    {getValorFormatadoMoeda(
                      ngc.OfertaxQuantidadeProduto.OXQ_MaiorPreco,
                      ngc.OfertaxQuantidadeProduto.OXQ_MoedaId
                    )}
                  </td>
                  <td>
                    {getValorFormatadoMoeda(
                      ngc.OFN_ValorProposta,
                      ngc.OfertaxQuantidadeProduto.OXQ_MoedaId
                    )}
                  </td>

                  <td>{ngc.StatusPagamento.SPG_Nome}</td>
                  <td>{formatarData(ngc.OFN_DataAtualizacao)}</td>
                  <td>
                    {" "}
                    <StatusNegociacaoTd
                      status={getStatusNegociacao(
                        ngc.OFN_FlagAceite,
                        ngc.OFN_FlagAtivo
                      )}
                    >
                      {getStatusNegociacao(
                        ngc.OFN_FlagAceite,
                        ngc.OFN_FlagAtivo,
                        "returnString"
                      )}
                    </StatusNegociacaoTd>
                  </td>

                  <td>
                    <Button
                      variant="outline-success"
                      onClick={() =>
                        navigate(
                          `negociacoes/detalhes?negociacaoId=${ngc.OFN_Id}`,
                          {
                            replace: true,
                          }
                        )
                      }
                    >
                      Avaliar
                    </Button>
                  </td>
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
    </DashMainContainer>
  );
};

export default Negociacoes;
