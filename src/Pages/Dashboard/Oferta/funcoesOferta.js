import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_HEADER, REQ_BODY, UPLOAD_HEADER } from "../../../data";
import { OfertaCtx } from "./Oferta";

//obj a ser enviado via api
export const objOfertaInicial = {
  OFE_Id: 0, //0 é insert, != 0 é update
  OFE_FlagIngles: null,
  OFE_UsuarioInsercaoId: null, //ID DO USUARIO
  OFE_FlagMercadoExterno: null,
  OFE_FlagVender: null,
  OFE_EmpresaId: null, //ID DA EMPRESA
  OFE_CategoriaId: 1,
  OFE_TipoProdutoId: null,
  OFE_ProdutoId: null,
  OFE_ModoCultivoSistemaProdutivoId: null,
  OFE_ModoCultivoModoProducaoId: null,
  OFE_StatusProdutoId: null,

  OFE_TipoLogisticoSistemaProdutivoId: 1,
  OFE_TipoLogisticoPortoId: 1,
  OFE_AnoColheita: null,
  OFE_DataCadastro: "2022-07-08T00:00:00",
  OFE_Descricao: null,

  listaOfertaxQuantidadeProduto: [
    {
      OXQ_OfertaId: 0,
      OXQ_Peso: null,
      OXQ_UnidadePesoId: null,
      OXQ_MoedaId: null,
      OXQ_MenorPreco: null,
      OXQ_MaiorPreco: null,
      OXQ_PercentualAdiantamento: null,
      OXQ_DataEntregaInicio: null,
      OXQ_DataEntregaFim: null,
      OXQ_DataExpiracao: null,
    },
  ],

  listaOfertaxCertificacao: [
    {
      OXC_TipoCertificacaoId: null,
      OXC_OfertaId: 0,
      OXC_DocumentoId: null,
      OXC_Comentarios: null,
      OXC_FlagAtivo: true,
    },
  ],

  listaOfertaxDocumento: [],

  Endereco: {
    END_Cidade: null,
    END_Estado: null,
    END_CEP: null,
    END_Logradouro: null,
    END_Bairro: null,
    END_Numero: null,
    END_Complemento: null,
  },
  Produto: {
    PDT_Nome: null,
  },
};

//modifica os atributos de cada uma das ofertas criadas
export const attributeOfertaHandler = (array, campo, valor, index) => {
  array[index][campo] = valor;
  return array;
};

//funçao reducer
export const ofertaReducer = (state, action) => {
  switch (action.type) {
    //0 - EDIÇÕES DO FORM
    case "LimparForm":
      return {
        ...objOfertaInicial,
        listaOfertaxQuantidadeProduto: [
          {
            OXQ_OfertaId: 0,
            OXQ_Peso: null,
            OXQ_UnidadePesoId: null,
            OXQ_MoedaId: null,
            OXQ_MenorPreco: null,
            OXQ_MaiorPreco: null,
            OXQ_PercentualAdiantamento: null,
            OXQ_DataEntregaInicio: null,
            OXQ_DataEntregaFim: null,
            OXQ_DataExpiracao: null,
          },
        ],
      };
    case "SetOfertaParaEditar":
      return action.value;
    case "RemoverFotos":
      return { ...state, listaOfertaxDocumento: [] };
    //1 - INFORMAÇÕES
    case "UsuarioCriandoOferta":
      return { ...state, OFE_UsuarioInsercaoId: action.value };
    case "EmpresaCriandoOferta":
      return { ...state, OFE_EmpresaId: action.value };
    case "FlagVender":
      return { ...state, OFE_FlagVender: action.value };
    case "FlagIngles":
      return { ...state, OFE_FlagIngles: action.value };
    case "Mercado":
      return { ...state, OFE_FlagMercadoExterno: action.value };
    case "TipoProduto":
      return { ...state, OFE_TipoProdutoId: action.value };
    case "TipoProdutoObj":
      return {
        ...state,
        OFE_TipoProdutoId: action.value.produtoId,
        TipoProduto: action.value.tipoProdutoObj,
      };
    case "NomeProduto":
      if (state.Produto) {
        delete state.Produto;
      }
      return { ...state, OFE_ProdutoId: action.value };
    case "EditarNomeProduto":
      return {
        ...state,
        Produto: { ...state.Produto, PDT_Nome: action.value },
      };
    case "OutroProduto":
      return {
        ...state,
        OFE_ProdutoId: 0,
        Produto: {
          PDT_Nome: action.value,
        },
      };
    case "DescricaoProduto":
      return { ...state, OFE_Descricao: action.value };
    case "AdicionarOutraOferta":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: [
          ...state.listaOfertaxQuantidadeProduto,
          {
            OXQ_OfertaId: 0,
            OXQ_Peso: null,
            OXQ_UnidadePesoId: null,
            OXQ_MoedaId: null,
            OXQ_MenorPreco: null,
            OXQ_MaiorPreco: null,
            OXQ_PercentualAdiantamento: null,
            OXQ_DataEntregaInicio: null,
            OXQ_DataEntregaFim: null,
            OXQ_DataExpiracao: null,
          },
        ],
      };
    case "RemoverOfertaNoIndex":
      return {
        ...state,
        listaOfertaxQuantidadeProduto:
          state.listaOfertaxQuantidadeProduto.filter((el, i) => {
            if (i !== action.value) {
              return el;
            }
          }),
      };
    case "AdicionarOutraCertificacao":
      return {
        ...state,
        listaOfertaxCertificacao: [
          ...state.listaOfertaxCertificacao,
          {
            OXC_OfertaId: 0,
            OXC_TipoCertificacaoId: null,
            OXC_Comentarios: null,
            OXC_DocumentoId: null,
            OXC_PathUrl: null,
          },
        ],
      };
    case "RemoverCertificacaoNoIndex":
      return {
        ...state,
        listaOfertaxCertificacao: state.listaOfertaxCertificacao.filter(
          (el, i) => {
            if (i !== action.value) {
              return el;
            }
          }
        ),
      };

    //1.1 - OFERTA
    case "OfertaPeso":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_Peso",
          action.value,
          action.index
        ),
      };
    case "OfertaUnidadePeso":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_UnidadePesoId",
          action.value,
          action.index
        ),
      };
    case "OfertaMoeda":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_MoedaId",
          action.value,
          action.index
        ),
      };
    case "OfertaMenorPreco":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_MenorPreco",
          action.value,
          action.index
        ),
      };
    case "OfertaMaiorPreco":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_MaiorPreco",
          action.value,
          action.index
        ),
      };
    case "OfertaAdiantamento":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_PercentualAdiantamento",
          action.value,
          action.index
        ),
      };
    case "OfertaDtInicio":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_DataEntregaInicio",
          action.value,
          action.index
        ),
      };
    case "OfertaDtFim":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_DataEntregaFim",
          action.value,
          action.index
        ),
      };
    case "OfertaDtExpiracao":
      return {
        ...state,
        listaOfertaxQuantidadeProduto: attributeOfertaHandler(
          state.listaOfertaxQuantidadeProduto,
          "OXQ_DataExpiracao",
          action.value,
          action.index
        ),
      };
    //2 - DETALHES
    case "MCSistemaProdutivo":
      return { ...state, OFE_ModoCultivoSistemaProdutivoId: action.value };
    case "MCModoProducao":
      return { ...state, OFE_ModoCultivoModoProducaoId: action.value };
    case "SPStatusProduto":
      return { ...state, OFE_StatusProdutoId: action.value };
    case "UploadImagem":
      return {
        ...state,
        listaOfertaxDocumento: [...state.listaOfertaxDocumento, action.value],
      };
    case "TipoCertificacao":
      return {
        ...state,
        listaOfertaxCertificacao: attributeOfertaHandler(
          state.listaOfertaxCertificacao,
          "OXC_TipoCertificacaoId",
          action.value,
          action.index
        ),
      };
    case "UploadCertificacao":
      return {
        ...state,
        listaOfertaxCertificacao: attributeOfertaHandler(
          state.listaOfertaxCertificacao,
          "OXC_PathUrl",
          action.value,
          action.index
        ),
      };
    case "ComentarioCertificado":
      return {
        ...state,
        listaOfertaxCertificacao: attributeOfertaHandler(
          state.listaOfertaxCertificacao,
          "OXC_Comentarios",
          action.value,
          action.index
        ),
      };
    case "AnoColheita":
      return { ...state, OFE_AnoColheita: action.value };
    //3 - LOGISTICA

    case "TLSistemaProdutivo":
      return { ...state, OFE_TipoLogisticoSistemaProdutivoId: action.value };
    case "TLPorto":
      return { ...state, OFE_TipoLogisticoPortoId: action.value };
    case "EnderecoCEP":
      return {
        ...state,
        Endereco: {
          ...state.Endereco,
          END_Cidade: action.value.cidade,
          END_Estado: action.value.estado,
          END_CEP: action.value.cep,
          END_Logradouro: action.value.logradouro,
        },
      };
    case "EnderecoBairro":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Bairro: action.value },
      };
    case "EnderecoEstado":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Estado: action.value },
      };
    case "EnderecoCidade":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Cidade: action.value },
      };
    case "EnderecoLogradouro":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Logradouro: action.value },
      };
    case "EnderecoNumero":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Numero: action.value },
      };
    case "EnderecoComplemento":
      return {
        ...state,
        Endereco: { ...state.Endereco, END_Complemento: action.value },
      };

    default:
      break;
  }
};
