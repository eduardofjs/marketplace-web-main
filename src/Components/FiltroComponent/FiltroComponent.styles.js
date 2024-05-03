import styled from "styled-components";

export const FiltroContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 5vh;
  right: 5vh;
  z-index: 2000;
`;

export const FiltroHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffc05a;
  border-radius: 16px 16px 0 0;
  padding: 5px 20px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.2);
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #e5ad52;
  }
`;

export const FiltroBody = styled.form`
  padding: 20px;
  background-color: white;
  border-radius: 0 0 16px 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.2);
`;

export const FieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const FieldDesc = styled.span`
  font-family: "Work Sans", sans-serif;
  font-size: 12px;

  color: #8f8f8f;
`;

export const Input = styled.input`
  width: ${({ w }) => (w ? `${w}px` : "250px")};
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  margin-right: 5px;
  &:focus {
    border: 1px solid #115934;
  }
`;

export const Select = styled.select`
  width: ${({ w }) => (w ? `${w}px` : "250px")};
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  background: none;
  color: #242424;
  &:focus {
    border: 1px solid #115934;
  }
  option {
    color: #242424;
  }
`;

export const PesoDiv = styled.div`
  display: flex;
`;
