import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
const LoadingDivContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h5 {
    margin-top: 20px;
  }
  padding: 20px;
`;

const LoadingDiv = ({ loadingMsg }) => {
  return (
    <LoadingDivContainer>
      <ReactLoading type={"spin"} color={"green"} height={170} width={170} />
      <h5>{loadingMsg}</h5>
    </LoadingDivContainer>
  );
};

export default LoadingDiv;
