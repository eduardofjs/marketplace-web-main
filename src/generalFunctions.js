export const formatName = (name) => {
  if (name) {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    return formattedName;
  } else {
    return "?";
  }
};

export const colorBasedOnAccess = () => {};

export const stringBasedOnAccessType = (
  accessType,
  stringAdmin,
  stringBuyer,
  stringSeller
) => {
  //ACCESS TYPES: 0 (admin), 1 (buyer), 2 (seller)
  if (accessType === 0) {
    return stringAdmin;
  } else if (accessType === 1) {
    return stringBuyer;
  } else if (accessType === 2) {
    return stringSeller;
  } else {
    return " [Erro em obter a string específica do tipo de usuário.] ";
  }
};

export const validatePassword = (pwd, regex) => {
  let regExp;
  if (regex) {
    regExp = regex;
  } else {
    regExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
  }

  if (pwd.match(regExp)) {
    return true;
  } else {
    return false;
  }
};

//////////////////////////// FUNÇOES GERENCIAMENTO DE FORNECEDORES

export const getTipoString = (tipoEmpresaId) => {
  if (parseInt(tipoEmpresaId) === 1) {
    return "Comprador";
  } else return "Vendedor";
};

export const getStatusAprovacaoEmpresa = (flagAprovado, dataReprovado) => {
  if (flagAprovado) {
    return <span style={{ color: "green", fontWeight: "600" }}>Aprovado</span>;
  } else if (dataReprovado) {
    return <span style={{ color: "red", fontWeight: "600" }}>Reprovado</span>;
  } else {
    return (
      <span style={{ color: "#ea772a", fontWeight: "600" }}>
        Avaliação pendente
      </span>
    );
  }
};
export const getStatusAprovacaoOferta = (flagAprovado, dataReprovado) => {
  if (flagAprovado) {
    return <span style={{ color: "green", fontWeight: "600" }}>Aprovado</span>;
  } else if (dataReprovado) {
    return <span style={{ color: "red", fontWeight: "600" }}>Reprovado</span>;
  } else {
    return (
      <span style={{ color: "#ea772a", fontWeight: "600" }}>
        Avaliação pendente
      </span>
    );
  }
};

////////////////////////////////////////////////////

export const formatarInput = (valor) => {};

export const formatarData = (data, min) => {
  const dataSeparada = data.split("T");

  const dataFormatadaTemp = dataSeparada[0].split("-");
  const dataFormatadaFinal =
    dataFormatadaTemp[2] +
    "/" +
    dataFormatadaTemp[1] +
    "/" +
    dataFormatadaTemp[0];
  const horarioFormatadoTemp = dataSeparada[1].split(":");

  const horarioFormatadoFinal =
    horarioFormatadoTemp[0] + ":" + horarioFormatadoTemp[1] + "h";

  if (min) {
    return `${dataFormatadaFinal}`;
  } else {
    return `${dataFormatadaFinal} (${horarioFormatadoFinal})`;
  }
};

export const formatarDataSimples = (data) => {
  const dataSeparada = data.split("-");
  return `${dataSeparada[2]}/${dataSeparada[1]}/${dataSeparada[0]}`;
};

//validação de campos especificos e unicos
export const validarCampos = (...campos) => {
  const camposValidos = campos.every((el) => el !== null);
  return camposValidos;
};

//validação dos campos que podem ter múltiplos (tipo certificação e oferta)
//O primeiro parametro é a array com os subcampos, o segundo parametro é um array com todos os campos que não são obrigatórios
export const validarSubcampos = (
  arrayComSubcampos,
  arrayComSubcamposNaoObrigatorios
) => {
  let isNullish = false;

  arrayComSubcampos.forEach((obj) => {
    if (arrayComSubcamposNaoObrigatorios) {
      Object.keys(obj).some((sc) => {
        if (arrayComSubcamposNaoObrigatorios.includes(sc)) delete obj[sc];
      });
    }

    Object.values(obj).forEach((value) => {
      if (value === null) isNullish = true;
    });
  });

  return !isNullish;
};

export const getTodayDate = () => {};

export const calcularValorPagamento = (
  maiorPreco,
  percentualAdiantamento,
  moedaId,
  retornarFormatado
) => {
  const precoComAdiantamento =
    maiorPreco + maiorPreco * (percentualAdiantamento / 100);

  if (retornarFormatado) {
    if (moedaId === 1) {
      return precoComAdiantamento.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });
    } else if (moedaId === 2) {
      return precoComAdiantamento.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "USD",
      });
    }
  } else {
    return precoComAdiantamento;
  }
};

export const getValorFormatadoMoeda = (valor, moedaId) => {
  if (moedaId === 1) {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });
  } else if (moedaId === 2) {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "USD",
    });
  }
};

export const calcularValorAdiantamento = (
  valorOriginal,
  porcentagem,
  moedaId
) => {
  let porcentagemDecimal = porcentagem / 100;

  let valorAdiantamento = valorOriginal * porcentagemDecimal;

  if (moedaId) {
    if (moedaId === 1) {
      return valorAdiantamento.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });
    } else if (moedaId === 2) {
      return valorAdiantamento.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "USD",
      });
    }
  } else {
    return valorAdiantamento;
  }
};

export const getCurrencySymbol = (moedaId) => {
  if (moedaId === 1) {
    return "BRL (R$)";
  } else if (moedaId === 2) {
    return "USD (US$)";
  }
};

export const validaCPF = (cpf) => {
  var Soma = 0;
  var Resto;

  var strCPF = String(cpf).replace(/[^\d]/g, "");

  if (strCPF.length !== 11) return false;

  if (
    [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ].indexOf(strCPF) !== -1
  )
    return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;

  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;

  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;

  if (Resto != parseInt(strCPF.substring(10, 11))) return false;

  return true;
};

export const getAumentoEmPorcentagem = (numA, numB) => {
  const resultado = (((numA - numB) / numB) * 100).toFixed(0);

  return resultado;
};

export const getStatusNegociacao = (OFN_FlagAceite, OFN_FlagAtivo, modo) => {
  if (OFN_FlagAceite) {
    return modo === "returnString" ? "Aprovado" : 1;
  } else if (!OFN_FlagAceite && !OFN_FlagAtivo) {
    return modo === "returnString" ? "Reprovado" : 2;
  } else if (!OFN_FlagAceite && OFN_FlagAtivo) {
    return modo === "returnString" ? "Em Negociação" : 3;
  } else {
    return "Indefinido";
  }
};

export const getUserRole = (
  empLogadaId,
  empCompradoraId,
  empVendedoraId,
  getRoleId,
  idioma
) => {
  if (empLogadaId === empCompradoraId && empLogadaId !== empVendedoraId) {
    if (getRoleId) {
      return 1;
    } else {
      return idioma ? " Empresa Compradora" : " Buyer Company";
    }
  } else if (
    empLogadaId === empVendedoraId &&
    empLogadaId !== empCompradoraId
  ) {
    if (getRoleId) {
      return 2;
    } else {
      return idioma ? " Empresa Vendedora" : " Seller Company";
    }
  } else {
    return idioma
      ? " Ambas empresas (Compradora e Vendedora)"
      : " Both roles (Buyer and Seller)";
  }
};

export const isEmpresaVendedora = (empLogadaId, empVendedoraId) => {
  if (empLogadaId === empVendedoraId) {
    return true;
  } else {
    return false;
  }
};

export const formatarDataPath = (dateStr) => {
  const tmpdate1 = dateStr.split("T");

  const tmpdate2 = tmpdate1[0].split("-");

  const formattedDate = tmpdate2[2] + "/" + tmpdate2[1] + "/" + tmpdate2[0];

  const tmpdate3 = tmpdate1[1].split(":");

  const formattedTime = tmpdate3[0] + ":" + tmpdate3[1] + "h";

  return formattedDate + " - " + formattedTime;
};

export const getCurrentYear = () => new Date().getFullYear();

export const getMarketplaceApiEndpoint = () => {
  return process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_MARKETPLACE_API_TEST_ENDPOINT : process.env.REACT_APP_MARKETPLACE_API_ENDPOINT;
};


export const getPastYears = (qtd) => {
  let tempYearsArray = [];
  for (let i = 1; i < qtd; i++) {
    tempYearsArray.push(getCurrentYear() - i);
  }
  return tempYearsArray;
};

export const today = new Date().toISOString().slice(0, 10);

export function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

