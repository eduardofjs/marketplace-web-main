import styled from "styled-components";

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const OrderHeader = styled.div`
  display: flex;
`;

export const OrderBody = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OperationalBoard = styled.div`
  padding: 20px 25px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  border-radius: 4px;
  flex: 5;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  justify-content: center;
`;

export const StepSeparator = styled.div`
  border-top: 1px dashed #c4c4c4;
  width: 150px;
  margin-bottom: 10px;
`;

export const OrderInfoContainer = styled.div`
  flex: 3;
  margin-left: 15px;
`;

export const OrderInfo = styled.div`
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  border-radius: 4px;
`;

export const OrderInfoTitle = styled.span`
  font-weight: 800;
`;

export const InfoWrapper = styled.span`
  display: flex;
  font-size: 13px;
`;

export const InfoTitle = styled.span`
  color: #777777;
  margin-right: 4px;
`;

export const InfoValue = styled.span`
  margin-right: 4px;
`;

export const InfoLink = styled.a``;

export const FlexDirCol = styled.div``;

export const InputDetails = styled.input`
  border-radius: 6px;
  padding: 4px 8px;
  border: 1px solid #242424;
`;

export const SelectDetails = styled.select`
  border-radius: 6px;
  padding: 4px 8px;
  border: 1px solid #242424;
`;
