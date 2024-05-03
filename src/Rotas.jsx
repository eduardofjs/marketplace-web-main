import { useContext } from "react";
import LoginCtx from "./Context/LoginContext";
import { useRoutes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Detalhes from "./Pages/Detalhes/Detalhes";
import Inicio from "./Pages/Inicio/Inicio";
import Login from "./Pages/Login/Login";
import Pesquisa from "./Pages/Pesquisa/Pesquisa";
import Principal from "./Pages/Principal/Principal";
import OrderDetails from "./Pages/Dashboard/OrderDetails/OrderDetails";
import OrderList from "./Pages/Dashboard/OrderList/OrderList";
import ReviewPage from "./Pages/Dashboard/ReviewPage/ReviewPage";
import InicioDash from "./Pages/Dashboard/InicioDash/InicioDash";
import Oferta from "./Pages/Dashboard/Oferta/Oferta";
import Cadastro from "./Pages/Cadastro/Cadastro";
import GerenciamentoFornecedores from "./Pages/Dashboard/GerenciamentoFornecedores/GerenciamentoFornecedores";
import GerenciamentoOfertas from "./Pages/Dashboard/GerenciamentoOfertas/GerenciamentoOfertas";
import Negociacoes from "./Pages/Dashboard/Negociacoes/Negociacoes";
import DetalhesNegociacao from "./Pages/Dashboard/Negociacoes/DetalhesNegociacao";
import EsqueceuSenha from "./Pages/EsqueceuSenha/EsqueceuSenha";
import RecuperarSenha from "./Pages/RecuperarSenha/RecuperarSenha";
import Erro404 from "./Pages/Erro404/Erro404";

const Rotas = () => {
  const { state, dispatch } = useContext(LoginCtx);

  const element = useRoutes([
    {
      path: "*",
      element: <Erro404 />,
    },
    {
      path: "/",
      element: <Inicio />,
      children: [
        { path: "", element: <Principal /> },
        { path: "detalhe-produto", element: <Detalhes /> },
        { path: "pesquisa", element: <Pesquisa /> },
      ],
    },
    {
      path: "dashboard",
      element:
        state.loginAttemptSuccess === "success" ? <Dashboard /> : <Login />,
      children: [
        { path: "", element: <InicioDash /> },
        {
          path: "board-operacional",

          children: [
            { path: "", element: <OrderList /> },
            { path: "order", element: <OrderDetails /> },
            { path: "review", element: <ReviewPage /> },
          ],
        },
        {
          path: "oferta",

          children: [{ path: "", element: <Oferta /> }],
        },
        {
          path: "negociacoes",

          children: [
            { path: "", element: <Negociacoes /> },
            { path: "detalhes", element: <DetalhesNegociacao /> },
          ],
        },
        {
          path: "gerenciamento",
          children: [
            { path: "fornecedores", element: <GerenciamentoFornecedores /> },
            { path: "ofertas", element: <GerenciamentoOfertas /> },
          ],
        },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "cadastro", element: <Cadastro /> },
    { path: "esqueceu-senha", element: <EsqueceuSenha /> },
    { path: "recuperar-senha", element: <RecuperarSenha /> },
  ]);
  return element;
};

export default Rotas;
