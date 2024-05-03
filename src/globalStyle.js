import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";

const GlobalStyle = createGlobalStyle`

 
  html, body {
    overflow-x: hidden;
    background-color: #E5E5E5;
    font-family: 'Work Sans', sans-serif !important;
  }

  * {
      margin: 0;
      padding: 0;
  }
  `;

export const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity

  .Toastify__progress-bar {
    background-color: #115934;
  }
`;

export default GlobalStyle;

export const OutlineBtn = styled.button`
  background-color: white;
  padding: 8px 12px;
  color: #115934;
  border: 1px solid #115934;
  border-radius: 10px;
  width: 130px;
  transition: 0.2s ease all;
  &:hover {
    color: #ffffff;
    background-color: #115934;
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const ConfirmBtn = styled.button`
  background-color: #115934;
  padding: 8px 12px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  min-width: 110px;
  transition: 0.2s ease all;
  &:hover {
    background-color: #0c3d23;
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const Input = styled.input`
  width: ${({ w }) => (w ? `${w}%` : "250px")};
  border-radius: 8px;
  padding: 8px 13px;
  margin: 2px 0;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  margin-right: 5px;

  &:focus {
    border: 1px solid ${({ error }) => (error ? "red" : "#115934")};
  }
`;

export const FlexDivBetween = styled.div`
  display: flex;
  width: ${({ w }) => (w ? `${w}%` : "500px")};
  justify-content: space-between;
  align-items: center;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexDivCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlexDivWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const DashMainContainer = styled.div`
  background-color: #ffff;
  width: 100%;
  height: 100%;
  min-height: 89vh;
  border-radius: 8px;

  padding: 25px 40px;
`;

export const CenterContentDiv = styled.div`
  display: flex;
  justify-content: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
