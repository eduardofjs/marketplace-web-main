import styled from "styled-components";
import { Outlet } from "react-router";

export const InicioContainer = styled.div`
  width: 100%;
`;

export const BackgroundImg = styled.img`
  position: absolute;
  top: 140px;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const StyledOutlet = styled(Outlet)``;

export const PageContainer = styled.div`
  display: flex;
  margin: 0 10vw;
  @media only screen and (max-width: 1025px) {
    margin: 0 5vw;
  }
`;
