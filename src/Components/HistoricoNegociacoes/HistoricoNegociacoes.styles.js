import styled from "styled-components";

export const NegociacoesContainer = styled.div`
  border-radius: 12px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  margin: 10px 0;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  h2 {
    font-size: 32px;
  }
  h4 {
    font-size: 15px;
  }
`;

export const CamposContainer = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Info = styled.span`
  color: darkgray;
  @media only screen and (max-width: 1025px) {
    font-size: 12px;
  }
`;

export const ConfirmDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 1025px) {
    flex-direction: column; 
  }
`;

export const ConfirmBtn = styled.button`
  padding: 10px 15px;
  width: 20%;
  color: white;
  background-color: #256d48;
  border-radius: 10px;
  border: none;
  outline: none;
  transition: 0.2s ease all;
  &:hover {
    background-color: #1a4f33;
  }
  &:active {
    transform: scale(0.95);
  }
  @media only screen and (max-width: 1025px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  margin: 4px;
  border-radius: 8px;
  font-size: 18;
  border: 1px solid ${({ error }) => (error ? "tomato" : "darkgray")};
  width: 45%;
  text-align: center;
  @media only screen and (max-width: 1025px) {
    width: 100%;
    font-size: 16px;
  }
`;
