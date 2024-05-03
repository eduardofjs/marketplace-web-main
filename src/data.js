//categorias img
import vegetaisImg from "./Assets/IMAGE-3.png";
import acaiProdutoImg from "./Assets/acaiProduto.png";
import graosImg from "./Assets/IMAGE-5.png";
import cenouraImg from "./Assets/IMAGE-2.png";
import paoImg from "./Assets/IMAGE-4.png";
import carneImg from "./Assets/IMAGE-6.png";
//empresas parceiras img
import emp1Img from "./Assets/EMP-1.png";
import emp2Img from "./Assets/EMP-2.png";
import emp3Img from "./Assets/EMP-3.png";
import emp4Img from "./Assets/EMP-4.png";
import emp5Img from "./Assets/EMP-5.png";
//produtos img
import azeiteImg from "./Assets/azeite.png";
import cafeImg from "./Assets/grao_cafe.png";
import acaiImg from "./Assets/acai.png";
import castanhaImg from "./Assets/castanha.png";
import mangaImg from "./Assets/manga.png";
import abacaxiImg from "./Assets/abacaxi.png";
import pancsImg from "./Assets/pancsImg.png";
import oleosImg from "./Assets/oleoImg.png";
import liofilizadosImg from "./Assets/liofilizadosImg.png";
import frutasImg from "./Assets/frutasImg.png";
import passasImg from "./Assets/passasImg.png";

export const categorias = [
  { id: 1, titulo: "Açaí", img: acaiProdutoImg },
  { id: 2, titulo: "Castanhas", img: castanhaImg },
  { id: 3, titulo: "Pancs", img: pancsImg },
  { id: 4, titulo: "Óleos", img: oleosImg },
  { id: 5, titulo: "Liofilizados", img: liofilizadosImg },
  { id: 6, titulo: "Frutas", img: frutasImg },
  { id: 7, titulo: "Frutas", img: passasImg },
];

export const empresas = [
  { id: 1, img: emp1Img },
  { id: 2, img: emp2Img },
  { id: 3, img: emp3Img },
  { id: 4, img: emp4Img },
  { id: 5, img: emp5Img },
];

export const produtos = [
  {
    id: 1,
    titulo: "Azeite",
    tipo: "Liofilizado",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: azeiteImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 1, //1 = oferta, 2 = demanda
  },
  {
    id: 2,
    titulo: "Café",
    tipo: "Inteira",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: cafeImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 2, //1 = oferta, 2 = demanda
    mercadoExterno: true,
  },
  {
    id: 3,
    titulo: "Açaí",
    tipo: "Liofilizado",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: acaiImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 1, //1 = oferta, 2 = demanda
    mercadoExterno: true,
  },
  {
    id: 4,
    titulo: "Castanha da Amazônia",
    tipo: "Inteira",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: castanhaImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 1, //1 = oferta, 2 = demanda
  },
  {
    id: 5,
    titulo: "Manga",
    tipo: "Liofilizado",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: mangaImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 2, //1 = oferta, 2 = demanda
    mercadoExterno: true,
  },
  {
    id: 6,
    titulo: "Abacaxi",
    tipo: "Liofilizado",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: abacaxiImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 2, //1 = oferta, 2 = demanda
  },
  {
    id: 7,
    titulo: "Açaí (INTENSE)",
    tipo: "Liofilizado",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: acaiImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 1, //1 = oferta, 2 = demanda
    mercadoExterno: true,
  },
  {
    id: 8,
    titulo: "Açaí (CONCEPT)",
    tipo: "Liofilizado",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: acaiImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 1, //1 = oferta, 2 = demanda
    mercadoExterno: true,
  },
  {
    id: 9,
    titulo: "Castanha da Amazônia",
    tipo: "Inteira",
    vol: 16,
    entrega: "Santos, Brasil",
    package: "Bulk In 19 FCL",
    shipment: "19 Nov 2022",
    payment: "100% Pagamento Adiantado",
    peso: 28,
    img: castanhaImg,
    maisVendidoFlag: false,
    emDestaqueFlag: false,
    categoria: 2, //1 = oferta, 2 = demanda
  },
];

//AUTH_HEADER
export const AUTH_HEADER = {
  auth: {
    username: "AccessDirecttoDevAPI",
    password: "rt89723hkjbsdfjhwer928374jbsnfmjhwgjhwg",
  },
  headers: {
    Authorization: "Basic QWNjZXNzTGVhcFN0eWxlREVWQVBJOk1qQk1SV0Z3VTNSNVRHVlNiMk5yZEZOMGRXUnBiekl4",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
//AUTH_HEADER
export const UPLOAD_HEADER = {
  auth: {
    username: "AccessDirecttoDevAPI",
    password: "rt89723hkjbsdfjhwer928374jbsnfmjhwgjhwg",
  },
  headers: {
    Authorization: "Basic QWNjZXNzTGVhcFN0eWxlREVWQVBJOk1qQk1SV0Z3VTNSNVRHVlNiMk5yZEZOMGRXUnBiekl4",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
};

//REQ_BODY
export const REQ_BODY = {
  LOG_Id: 0,
  LOG_SubMenuId: 0,
  SubMenu: {
    SBM_Id: 0,
    SBM_MenuId: 0,
    Menu: {
      MEN_Id: 0,
      MEN_Nome: "string",
      MEN_Codigo: "string",
      MEN_Ativo: true,
      MEN_Ordem: 0,
      MEN_Icone: "string",
      MEN_FLAGMOBILE: true,
      Log: {},
    },
    SBM_Nome: "string",
    SBM_Descricao: "string",
    SBM_Codigo: "string",
    SBM_Controller: "string",
    SBM_Ordem: 0,
    SBM_Ativo: true,
    SBM_FLAGMOBILE: true,
    SBM_Icone: "string",
    Log: {},
  },
  LOG_UsuarioId: 0,
  Usuario: {
    USR_Id: 0,
    USR_Email: "string",
    USR_Senha: "string",
    USR_Ativo: true,
    USR_PessoaId: 0,
    Pessoa: {
      PES_Id: 0,
      PES_Nome: "string",
      PES_SexoId: 0,
      Sexo: {
        SEX_Id: 0,
        SEX_Nome: "string",
        SEX_Sigla: "string",
        SEX_Ativo: true,
        Log: {},
      },
      PES_CPF: "string",
      PES_DataNascimento: "2022-06-28T15:40:07.680Z",
      PES_Ativo: true,
      PES_RG: "string",
      PES_EnderecoId: 0,
      Endereco: {
        END_Id: 0,
        END_Logradouro: "string",
        END_Numero: 0,
        END_Bairro: "string",
        END_Cidade: "string",
        END_Estado: "string",
        END_Complemento: "string",
        END_CEP: "string",
        END_CidadeId: 0,
        Cidade: {
          CDD_Id: 0,
          CDD_Nome: "string",
          CDD_EstadoId: 0,
          Estado: {
            ESD_Id: 0,
            ESD_Nome: "string",
            ESD_Sigla: "string",
            ESD_Ativo: true,
            Log: {},
          },
          CDD_CepInicial: "string",
          CDD_CepFinal: "string",
          CDD_FlgNaturalidade: true,
          CDD_Ativo: true,
          Log: {},
        },
        END_EstadoId: 0,
        Estado: {
          ESD_Id: 0,
          ESD_Nome: "string",
          ESD_Sigla: "string",
          ESD_Ativo: true,
          Log: {},
        },
        END_Latitude: 0,
        END_Longitude: 0,
        END_Ativo: true,
        END_Regiao: "string",
        END_CodIBGE: "string",
        Log: {},
      },
      PES_EnderecoFoto: "string",
      PES_TelefoneResidencial: "string",
      PES_Celular: "string",
      PES_Email: "string",
      PES_SexoBiologico: "string",
      PES_PronomeTratamentoId: 0,
      PronomeTratamento: {
        PRT_Id: 0,
        PRT_Nome: "string",
        PRT_Descricao: "string",
        PRT_Ativo: true,
        Log: {},
      },
      PES_Renda: 0,
      PES_NomeResponsavel: "string",
      PES_CPFResponsavel: "string",
      PES_flagDoador: true,
      Log: {},
    },
    USR_UnidadeId: 0,
    USR_PrimeiroAcesso: true,
    USR_DeviceID: "string",
    USR_TokenRecoveryPassword: "string",
    USR_TokenDateExpire: "2022-06-28T15:40:07.680Z",
    Log: {},
    sucesso: true,
    mensagemSucesso: "string",
    perfilxUsuario: {
      PXU_Id: 0,
      PXU_UsuarioId: 0,
      Usuario: {},
      PXU_PerfilId: 0,
      Perfil: {
        PRF_Id: 0,
        PRF_UnidadeId: 0,
        PRF_Descricao: "string",
        PRF_Nome: "string",
        PRF_Ativo: true,
        Log: {},
      },
      PXU_Ativo: true,
      Log: {},
    },
    perfilxSubMenu: {
      PXS_Id: 0,
      PXS_SubMenuId: 0,
      SubMenu: {
        SBM_Id: 0,
        SBM_MenuId: 0,
        Menu: {
          MEN_Id: 0,
          MEN_Nome: "string",
          MEN_Codigo: "string",
          MEN_Ativo: true,
          MEN_Ordem: 0,
          MEN_Icone: "string",
          MEN_FLAGMOBILE: true,
          Log: {},
        },
        SBM_Nome: "string",
        SBM_Descricao: "string",
        SBM_Codigo: "string",
        SBM_Controller: "string",
        SBM_Ordem: 0,
        SBM_Ativo: true,
        SBM_FLAGMOBILE: true,
        SBM_Icone: "string",
        Log: {},
      },
      PXS_PerfilId: 0,
      Perfil: {
        PRF_Id: 0,
        PRF_UnidadeId: 0,
        PRF_Descricao: "string",
        PRF_Nome: "string",
        PRF_Ativo: true,
        Log: {},
      },
      PXS_Ativo: true,
      Log: {},
    },
    USR_AceitouTermoUso: true,
    USR_AceitouPolitica: true,
    USR_FlagGestor: true,
    USR_FlagContratante: true,
    USR_FlagProfissional: true,
    USR_DataLeituraAvisoCorona: "2022-06-28T15:40:07.680Z",
    ValorPagamento: 0,
  },
  LOG_DataHora: "2022-06-28T15:40:07.680Z",
  LOG_Token: "string",
  LOG_IpEstacao: "string",
  LOG_Observacao: "string",
  LOG_TipoTransacaoId: 0,
  TipoTransacaoLog: {
    TTL_Id: 0,
    TTL_Nome: "string",
    TTL_Descricao: "string",
    TTL_Ativo: true,
    Log: {},
  },
  LOG_Ativo: true,
  LOG_PlataformaId: 0,
  LOG_VersaoPlataforma: "string",
  LOG_VersaoApi: "string",
  LOG_PerfilId: 0,
  Perfil: {
    PRF_Id: 0,
    PRF_UnidadeId: 0,
    PRF_Descricao: "string",
    PRF_Nome: "string",
    PRF_Ativo: true,
    Log: {},
  },
  LOG_Metodo: "string",
  LOG_ParametroJson: "string",
  LOG_UnidadeId: 0,
  LOG_QueryString: "string",
  LOG_InternoSympor: true,
  LOG_EmpresaId: 0,
};

export const listaDDI = [
  {
    "id" : 1,
    "namePT" : "Brasil (+55)",
    "nameEN" : "Brazil (+55)",
    "mask" : "+55 (99) 99999-9999"
  },
  {
    "id" : 2,
    "namePT" : "Estados Unidos (+1)",
    "nameEN" : "United States (+1)",
    "mask" : "+1 (999) 999-9999"
  },
  {
    "id" : 3,
    "namePT" : "África do Sul (+27)",
    "nameEN" : "South Africa (+27)",
    "mask" : "+27 999 9999 99"
  },
  {
    "id" : 4,
    "namePT" : "Afeganistão (+93)",
    "nameEN" : "Afghanistan (+93)",
    "mask" : "+\\93 99 9999999"
  },
  {
    "id" : 5,
    "namePT" : "Alemanha (+49)",
    "nameEN" : "Germany (+49)",
    "mask" : "+4\\9 99 9999 9999"
  },
  {
    "id" : 6,
    "namePT" : "Argentina (+54)",
    "nameEN" : "Argentina (+54)",
    "mask" : "+54 9999 9999"
  },
  {
    "id" : 7,
    "namePT" : "Austrália (+61)",
    "nameEN" : "Australia (+61)",
    "mask" : "+61 9 9999 9999"
  },
  {
    "id" : 8,
    "namePT" : "Áustria (+43)",
    "nameEN" : "Austria (+43)",
    "mask" : "+43 999999999"
  },
  {
    "id" : 9,
    "namePT" : "Bélgica (+32)",
    "nameEN" : "Belgium (+32)",
    "mask" : "+32 999999999"
  },
  {
    "id" : 10,
    "namePT" : "Bolívia (+591)",
    "nameEN" : "Bolivia (+591)",
    "mask" : "+5\\91 999999999"
  },
  {
    "id" : 11,
    "namePT" : "Canadá (+1)",
    "nameEN" : "Canada (+1)",
    "mask" : "+1 (999) 999-9999"
  },
  {
    "id" : 12,
    "namePT" : "Chile (+56)",
    "nameEN" : "Chile (+56)",
    "mask" : "+56 (999) 999 999"
  },
  {
    "id" : 13,
    "namePT" : "Colômbia (+57)",
    "nameEN" : "Colombia (+57)",
    "mask" : "+57 (999) 999 9999"
  },
  {
    "id" : 14,
    "namePT" : "Coreia do Sul (+82)",
    "nameEN" : "South Korea (+82)",
    "mask" : "+82 (99) 9999 9999"
  },
  {
    "id" : 15,
    "namePT" : "Espanha (+34)",
    "nameEN" : "Spain (+34)",
    "mask" : "+34 999 999 999"
  },
  {
    "id" : 16,
    "namePT" : "França (+33)",
    "nameEN" : "France (+33)",
    "mask" : "+33 9 99 99 99 99"
  },
  {
    "id" : 17,
    "namePT" : "Hong Kong (+852)",
    "nameEN" : "Hong Kong (+852)",
    "mask" : "+852 9999 9999"
  },
  {
    "id" : 18,
    "namePT" : "Irlanda (+353)",
    "nameEN" : "Ireland (+353)",
    "mask" : "+353 (99) 999 9999"
  },
  {
    "id" : 19,
    "namePT" : "Itália (+39)",
    "nameEN" : "Italy (+39)",
    "mask" : "+3\\9 999 99999999"
  },
  {
    "id" : 20,
    "namePT" : "Japão (+81)",
    "nameEN" : "Japan (+81)",
    "mask" : "+81 99-9999-9999"
  },
  {
    "id" : 21,
    "namePT" : "México (+52)",
    "nameEN" : "Mexico (+52)",
    "mask" : "+52 999 999 9999"
  },
  {
    "id" : 22,
    "namePT" : "Portugal (+351)",
    "nameEN" : "Portugal (+351)",
    "mask" : "+351 999 999 999"
  },
  {
    "id" : 23,
    "namePT" : "Reino Unido (+44)",
    "nameEN" : "United Kingdom (+44)",
    "mask" : "+44 9999 999999"
  },
  {
    "id" : 24,
    "namePT" : "Uruguai (+598)",
    "nameEN" : "Uruguay (+598)",
    "mask" : "+5\\98 9999 9999"
  },
];