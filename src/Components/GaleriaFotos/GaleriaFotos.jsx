import React, { useContext } from "react";
import { Foto, FotosDiv, GaleriaFotosContainer } from "./GaleriaFotos.styles";
import acaiPic from "../../Assets/acailarge.jpeg";
import acaiPic2 from "../../Assets/acai.png";
import acaiPic3 from "../../Assets/acaiarvore.jpeg";
import acaiPic4 from "../../Assets/Acai-Miniatura.jpg";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const GaleriaFotos = ({ fotos }) => {
  const { globalCtx } = useContext(GlobalDataCtx);
  return (
    <GaleriaFotosContainer>
      <h3>{globalCtx.idioma ? "Galeria de Fotos" : "Photo Gallery"}</h3>
      <FotosDiv>
        {fotos &&
          fotos.map((docObj) => {
            return (
              <Foto key={Math.random()} src={docObj.Documento.DOC_PathUrl} />
            );
          })}
      </FotosDiv>
    </GaleriaFotosContainer>
  );
};

export default GaleriaFotos;
