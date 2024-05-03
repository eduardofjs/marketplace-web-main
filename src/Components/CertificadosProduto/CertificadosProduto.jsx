import React, { useContext } from "react";
import {
  EmpresaItem,
  EmpresasList,
  EmpresasSectionContainer,
  EmpresasTitle,
  EmpresasTopbar,
} from "./CertificadosProduto.styles";
import { empresas } from "../../data";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const CertificadosProduto = () => {
  const { globalCtx } = useContext(GlobalDataCtx);

  return (
    <EmpresasSectionContainer>
      <EmpresasTopbar>
        <EmpresasTitle>
          {globalCtx.idioma
            ? "Certificados desse produto"
            : "Product certificates"}
        </EmpresasTitle>
      </EmpresasTopbar>
      <EmpresasList>
        {empresas.map((e) => {
          return (
            <EmpresaItem key={Math.random()}>
              <img src={e.img} alt="" />
            </EmpresaItem>
          );
        })}
      </EmpresasList>
    </EmpresasSectionContainer>
  );
};

export default CertificadosProduto;
