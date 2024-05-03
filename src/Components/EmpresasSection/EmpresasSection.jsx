import React, { useContext } from "react";
import {
  EmpresaItem,
  EmpresasList,
  EmpresasSectionContainer,
  EmpresasTitle,
  EmpresasTopbar,
} from "./EmpresasSection.styles";
import { empresas } from "../../data";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const EmpresasSection = () => {
  const { globalCtx } = useContext(GlobalDataCtx);

  return (
    <EmpresasSectionContainer>
      <EmpresasTopbar>
        <EmpresasTitle>
          {globalCtx.idioma ? "Empresas parceiras" : "Partners"}
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

export default EmpresasSection;
