import styled from "styled-components";

export const NegociarOfertaContainer = styled.div`
  flex: 1;

  @media only screen and (max-width: 1025px) {
    margin: 10px 0;
  }
`;


export const DealContainer = styled.div`
  background-color: #ffffff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  padding: 10px 15px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
`;

export const DealHeader = styled.div`
  padding: 15px;
  background-color: #256d48;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  color: white;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
`;

export const DealTitle = styled.span`
  font-size: 20px;
`;

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const ValueSpan = styled.span`
  font-size: 12px;
`;

export const Value = styled.span`
  font-size: 26px;
`;

export const QtdSelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const QtdSelection = styled.button`
  padding: 12px 8px;
  margin: 5px;
  border: 1px solid #256d48;
  outline: none;
  background-color: ${({ selectedWeight, weightValue }) =>
    selectedWeight == weightValue ? "#256d48" : "white"};
  color: ${({ selectedWeight, weightValue }) =>
    selectedWeight == weightValue ? "white" : "black"};
  font-size: 12px;
  border-radius: 5px;
  transition: 0.2s ease all;
  &:hover {
    background-color: #256d48;
    color: white;
  }
  &:active {
    background-color: #1a4f33;
    transform: scale(0.8);
    color: white;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ProductInfoTitle = styled.span`
  color: ${({ error }) => (error ? "tomato" : "#256d48")};
  font-weight: 600;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export const ProductInfoValue = styled.span`
  color: #242424;
`;

export const ProposalInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 18;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#256d48")};
  width: 200px;
  text-align: center;
`;

export const ProposalMsg = styled.textarea`
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #256d48;
  width: 100%;
`;

export const CheckboxInput = styled.div`
  margin: 10px 0;
  display: flex;
  label {
    margin-left: 10px;
    font-size: 12px;
    cursor: pointer;
  }
`;

export const SubmitProposalBtn = styled.button`
  padding: 10px 15px;
  width: 100%;
  color: white;
  background-color: ${({ proposalState, ofertaValue }) =>
    proposalState == 0
      ? "darkgray"
      : proposalState === ofertaValue
      ? "#256d48"
      : "#FF6600"};
  cursor: ${({ proposalState }) =>
    proposalState == 0 ? "not-allowed" : "pointer"};
  border-radius: 10px;
  border: none;
  outline: none;
  transition: 0.2s ease all;
  &:hover {
    background-color: ${({ proposalState, ofertaValue }) =>
      proposalState == 0
        ? "darkgray"
        : proposalState === ofertaValue
        ? "#1a4f33"
        : "#e55b00"};
  }
  &:active {
    transform: scale(0.95);
  }
`;
