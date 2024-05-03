import React, { useEffect, useState, useContext } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { CadastroCtx } from "./Cadastro";
import successSvg from "../../Assets/success.svg";
import errorSvg from "../../Assets/errorCadastro.svg";
import { AUTH_HEADER } from "../../data";
import GlobalDataCtx from "../../Context/GlobalDataContext";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const Sucesso = () => {
  const { empresaFormState, appLang } = useContext(CadastroCtx);
  const [response, setResponse] = useState();
  //pega context global pra verificar idioma
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  useEffect(() => {
    axios
      .put(
        `${getMarketplaceApiEndpoint()}/api/Empresa/CadastroEmpresa`,
        empresaFormState,
        AUTH_HEADER
      )
      .then((response) => {
        setResponse(response);
      })
      .catch((err) => setResponse(err.response));
  }, []);

  return (
    <div>
      {response ? (
        response?.status === 200 ? (
          <>
            <img width="250px" src={successSvg} />
            <h4>
              {globalCtx.idioma
                ? "Cadastro realizado com sucesso!"
                : "You have successfully registered!"}
            </h4>

            <p>
              {globalCtx.idioma
                ? "É muito bom ter você conosco! Em breve entraremos em contato via e-mail com mais informações."
                : "It's really good to have you with us. Check your e-mail for more information."}
            </p>
            <a href="/">Voltar para a página inicial</a>
          </>
        ) : (
          <>
            <img width="250px" src={errorSvg} />
            <h4>
              {globalCtx.idioma
                ? "O seu cadastro não foi realizado."
                : "Something went wrong, your registering was not successful."}
            </h4>

            <p>{response.data}</p>

            <a href="/">
              {globalCtx.idioma
                ? "Voltar para a página inicial"
                : "Go back to homepage"}
            </a>
          </>
        )
      ) : (
        <ReactLoading type={"spin"} color={"green"} height={150} width={150} />
      )}
    </div>
  );
};

export default Sucesso;
