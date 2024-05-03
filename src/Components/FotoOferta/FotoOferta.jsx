import axios from "axios";
import React, { useEffect, useState } from "react";
import { AUTH_HEADER } from "../../data";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { getMarketplaceApiEndpoint } from "../../generalFunctions";

const FotoImg = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  -webkit-box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.27);
  box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.27);
`;

const FotoOferta = ({ idDocumento }) => {
  const [foto, setFoto] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${getMarketplaceApiEndpoint()}/api/Documento/GetDocumentoById?DOC_Id=${idDocumento}&join=true`,
        {},
        AUTH_HEADER
      )
      .then((res) => {
        setFoto(res.data.DOC_PathUrl);
      });
  }, []);

  return foto ? (
    <FotoImg src={foto} />
  ) : (
    <ReactLoading type={"spin"} color={"green"} height={50} width={50} />
  );
};

export default FotoOferta;
