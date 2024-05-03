import styled from "styled-components";

export const NegociacaoRow = styled.tr`
  cursor: pointer;
  td {
    text-align: center;
    vertical-align: center;
    font-size: 15px;
  }
`;

export const DetalhesNegociacaoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MsgDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MensagemNegociacao = styled.p`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  line-height: 2;
`;

export const ProductTitle = styled.h2`
  margin: 10px 0;
  color: #ff8e28;
`;

export const StatusNegociacaoTd = styled.span`
  color: ${({ status }) =>
    status === 1 ? "green" : status === 2 ? "red" : "#f3923d"};
  font-weight: 700;
`;

export const LinkSpan = styled.span`
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
