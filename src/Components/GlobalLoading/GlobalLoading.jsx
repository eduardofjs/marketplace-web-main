import React from "react";
import styled from "styled-components";
import { Overlay } from "../Modal/Modal.styles";
import ReactLoading from "react-loading";

export const GlobalLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const LoadingDiv = styled.div`
  z-index: 9999999999;
`;

const GlobalLoading = () => {
  return (
    <GlobalLoadingContainer>
      <Overlay></Overlay>
      <LoadingDiv>
        {" "}
        <ReactLoading type={"spin"} color={"green"} height={150} width={150} />
      </LoadingDiv>
    </GlobalLoadingContainer>
  );
};

export default GlobalLoading;
