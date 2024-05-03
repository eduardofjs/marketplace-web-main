import React, { useState, useEffect, useContext, useRef } from "react";
import {
  BtnContainer,
  DetailsBtn,
  NegociarBtn,
} from "../ListaProdutosSection/ListaProdutosSection.styles";
import {
  FieldDesc,
  FieldDiv,
  FiltroBody,
  FiltroContainer,
  FiltroHeader,
  Input,
  PesoDiv,
  Select,
} from "./FiltroComponent.styles";
import { FiMinimize2 } from "react-icons/fi";
import { AUTH_HEADER } from "../../data";
import axios from "axios";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const FiltroComponent = ({ onClose, onGetResultadosFiltrados }) => {
  //context global
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  // //query string react router v6
  // const [searchParams] = useSearchParams();

  // //pega o token
  // const resultadoQuery = searchParams.get("resultado");

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //states que armazenam os inputs
  const [nomeInput, setNomeInput] = useState("");
  const [categoriaInput, setCategoriaInput] = useState(0);
  const [sistemaProdutivoInput, setSistemaProdutivoInput] = useState(0);
  const [modoProducaoInput, setModoProducaoInput] = useState(0);
  const [statusProducaoInput, setStatusProducaoInput] = useState(0);
  const [anoColheitaInput, setAnoColheitaInput] = useState(0);
  const [unidadePesoInput, setUnidadePesoInput] = useState(0);
  const [pesoInput, setPesoInput] = useState(0);

  //refs
  const nomeRef = useRef();
  const categoriaRef = useRef();
  const sisProdRef = useRef();
  const modoProdRef = useRef();
  const prodStatusRef = useRef();
  const anoColheitaRef = useRef();
  const unidPesoRef = useRef();
  const pesoRef = useRef();

  //states que armazenam as options dos selects
  const [statusProducaoCombo, setStatusProducaoCombo] = useState();
  const [categoriaCombo, setCategoriaCombo] = useState();
  const [sisProdCombo, setSisProdCombo] = useState();
  const [modoProducaoCombo, setModoProducaoCombo] = useState();
  const [unidadePesoCombo, setUnidadePesoCombo] = useState();

  //useEffect que vai popular os selects
  useEffect(() => {
    const categoriaEndpoint = `${getMarketplaceApiEndpoint()}/api/Categoria/GetAllCategoria?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=CAT_Id`;
    const sistemaProdutivoEndpoint = `${getMarketplaceApiEndpoint()}/api/ModoCultivoSistemaProdutivo/GetAllModoCultivoSistemaProdutivo?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=9999&order_by=MCS_Id`;
    const modoProducaoEndpoint = `${getMarketplaceApiEndpoint()}/api/ModoCultivoModoProducao/GetAllModoCultivoModoProducao?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=0&order_by=MCM_Id`;
    const statusProdutoEndpoint = `${getMarketplaceApiEndpoint()}/api/StatusProduto/GetAllStatusProduto?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=0&order_by=SPR_Id`;
    const unidadePesoEndpoint = `${getMarketplaceApiEndpoint()}/api/UnidadePeso/GetAllUnidadePeso?fVerTodos=true&fSomenteAtivos=true&join=true&maxInstances=0&order_by=UNP_Id`;

    fetchDados(categoriaEndpoint, setCategoriaCombo);
    fetchDados(sistemaProdutivoEndpoint, setSisProdCombo);
    fetchDados(modoProducaoEndpoint, setModoProducaoCombo);
    fetchDados(statusProdutoEndpoint, setStatusProducaoCombo);
    fetchDados(unidadePesoEndpoint, setUnidadePesoCombo);
  }, []);

  const fetchDados = (endpoint, setState) => {
    axios
      .post(endpoint, {}, AUTH_HEADER)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        toast.error("Erro ao buscar unidades de peso.");
      });
  };

  const getPastYears = (qtd) => {
    const currentYear = new Date().getFullYear();
    let tempYearsArray = [];
    for (let i = 0; i < qtd; i++) {
      tempYearsArray.push(i === 0 ? currentYear : currentYear - i);
    }

    return tempYearsArray;
  };

  const pesquisarComFiltroHandler = (e) => {
    if (e) {
      e.preventDefault();
    }

    setIsLoading(true);

    let pesquisaEndpoint = `${getMarketplaceApiEndpoint()}/api/OfertaxQuantidadeProduto/GetAllOfertaxQuantidadeProdutoByFiltro?idCategoria=${categoriaInput}&idSistemaProdutivo=${sistemaProdutivoInput}&idModoProducao=${modoProducaoInput}&idStatusProduto=${statusProducaoInput}&anoColheita=${anoColheitaInput}&peso=${pesoInput}&idVolume=${unidadePesoInput}&maxInstances=9999`;

    if (nomeInput.length !== 0) {
      pesquisaEndpoint = pesquisaEndpoint + `&produto=${nomeInput}`;
    }

    axios
      .post(pesquisaEndpoint, {}, AUTH_HEADER)
      .then((res) => {
        setIsLoading(false);

        globalCtxDispatch({ type: "setResultadoFiltro", value: res.data });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const limparFiltroHandler = () => {
    //limpa resultados
    globalCtxDispatch({ type: "setResultadoFiltro", value: null });
    //limpa states
    setAnoColheitaInput(0);
    setCategoriaInput(0);
    setModoProducaoInput(0);
    setNomeInput("");
    setPesoInput(0);
    setSistemaProdutivoInput(0);
    setStatusProducaoInput(0);
    setUnidadePesoInput(0);
    //limpa refs
    nomeRef.current.value = "";
    anoColheitaRef.current.value = 0;
    categoriaRef.current.value = 0;
    modoProdRef.current.value = 0;
    pesoRef.current.value = 0;
    unidPesoRef.current.value = 0;
    sisProdRef.current.value = 0;
    prodStatusRef.current.value = 0;
  };

  return (
    <FiltroContainer>
      <FiltroHeader onClick={() => onClose(false)}>
        <span>Filtro</span>
        <FiMinimize2 />
      </FiltroHeader>
      <FiltroBody onSubmit={pesquisarComFiltroHandler}>
        {/*=========================================NOME DO PRODUTO ======================================================= */}
        <FieldDiv>
          <FieldDesc>Nome do produto</FieldDesc>
          <Input
            ref={nomeRef}
            disabled={isLoading}
            type="text"
            onChange={(e) => setNomeInput(e.target.value.trim())}
          />
        </FieldDiv>
        {/*=========================================CATEGORIA DO PRODUTO ======================================================= */}
        <FieldDiv>
          <FieldDesc>Categoria</FieldDesc>
          <Select
            ref={categoriaRef}
            disabled={isLoading}
            onChange={(e) => setCategoriaInput(e.target.value)}
            placeholder="Selecionar categoria"
          >
            {categoriaCombo && (
              <option selected="selected" value={0}>
                Selecione...
              </option>
            )}
            {categoriaCombo &&
              categoriaCombo.map((c) => {
                return <option value={c.CAT_Id}>{c.CAT_Descricao}</option>;
              })}
          </Select>
        </FieldDiv>
        {/* <FieldDiv>
          <FieldDesc>Tipo</FieldDesc>
          <Select
          disabled={isLoading}
          placeholder="Selecionar Tipo">
            <option>Selecionar Tipo</option>
          </Select>
        </FieldDiv> */}
        {/*========================================= SISTEMA PRODUTIVO ======================================================= */}
        <FieldDiv>
          <FieldDesc>Sistema Produtivo</FieldDesc>
          <Select
            ref={sisProdRef}
            disabled={isLoading}
            onChange={(e) => setSistemaProdutivoInput(e.target.value)}
            placeholder="Selecionar"
          >
            {sisProdCombo && (
              <option selected="selected" value={0}>
                Selecione...
              </option>
            )}
            {sisProdCombo &&
              sisProdCombo.map((m) => {
                return <option value={m.MCS_Id}>{m.MCS_Descricao}</option>;
              })}
          </Select>
        </FieldDiv>
        {/*========================================= MODO DE PRODUÇÃO ======================================================= */}
        <FieldDiv>
          <FieldDesc>Modo de produção</FieldDesc>
          <Select
            ref={modoProdRef}
            disabled={isLoading}
            onChange={(e) => setModoProducaoInput(e.target.value)}
            placeholder="Selecionar"
          >
            {modoProducaoCombo && (
              <option selected="selected" value={0}>
                Selecione...
              </option>
            )}
            {modoProducaoCombo &&
              modoProducaoCombo.map((m) => {
                return <option value={m.MCM_Id}>{m.MCM_Descricao}</option>;
              })}
          </Select>
        </FieldDiv>
        {/*========================================= STATUS DE PRODUÇÃO ======================================================= */}
        <FieldDiv>
          <FieldDesc>Status de Produção</FieldDesc>
          <Select
            ref={prodStatusRef}
            disabled={isLoading}
            onChange={(e) => setStatusProducaoInput(e.target.value)}
            placeholder="Selecionar"
          >
            {statusProducaoCombo && (
              <option selected="selected" value={0}>
                Selecione...
              </option>
            )}
            {statusProducaoCombo &&
              statusProducaoCombo.map((s) => {
                return <option value={s.SPR_Id}>{s.SPR_Descricao}</option>;
              })}
          </Select>
        </FieldDiv>
        {/* <FieldDiv>
          <FieldDesc>Embalagem para envio</FieldDesc>
          <Select
          disabled={isLoading}
          placeholder="Selecionar">
            <option>Selecionar</option>
          </Select>
        </FieldDiv> */}
        {/* <FieldDiv>
          <FieldDesc>País de Origem</FieldDesc>
          <Select
          disabled={isLoading}
          placeholder="Selecionar">
            <option>Selecionar</option>
          </Select>
        </FieldDiv> */}
        {/*========================================= ANO DE COLHEITA ======================================================= */}
        <FieldDiv>
          <FieldDesc>Ano de Colheita</FieldDesc>
          <Select
            ref={anoColheitaRef}
            disabled={isLoading}
            onChange={(e) => setAnoColheitaInput(e.target.value)}
          >
            <option selected="selected" value={0}>
              Selecione...
            </option>
            {getPastYears(5).map((a) => (
              <option value={a}>{a}</option>
            ))}
          </Select>
        </FieldDiv>
        {/*========================================= PESO E UNIDADE ======================================================= */}
        <FieldDiv>
          <FieldDesc>Peso</FieldDesc>
          <PesoDiv>
            <Input
              ref={pesoRef}
              disabled={isLoading}
              type="number"
              w={120}
              onChange={(e) => setPesoInput(e.target.value)}
            />
            <Select
              disabled={isLoading}
              useRef={unidPesoRef}
              onChange={(e) => setUnidadePesoInput(e.target.value)}
              w={100}
            >
              <option selected="selected" value={0}>
                ton/kg...
              </option>

              {unidadePesoCombo &&
                unidadePesoCombo.map((u) => {
                  return <option value={u.UNP_Id}>{u.UNP_Descricao}</option>;
                })}
            </Select>
          </PesoDiv>
        </FieldDiv>
        {/* <FieldDiv>
          <FieldDesc>Preço de cada produto (R$)</FieldDesc>
          <Input
           disabled={isLoading}></Input>
        </FieldDiv> */}
        <PesoDiv>
          <DetailsBtn
            type="reset"
            onClick={limparFiltroHandler}
            style={{ marginRight: "10px" }}
          >
            Limpar
          </DetailsBtn>
          <NegociarBtn type="submit">
            {isLoading ? "Filtrando..." : "Pesquisar"}
          </NegociarBtn>
        </PesoDiv>
      </FiltroBody>
    </FiltroContainer>
  );
};

export default FiltroComponent;
