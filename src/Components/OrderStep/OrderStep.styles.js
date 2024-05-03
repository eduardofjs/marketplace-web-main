import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ rowMode }) => (rowMode ? "row" : "column")};
  justify-content: center;
  align-items: center;
`;

export const OrderStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${({ isFinished, stepOwner }) => {
    if (stepOwner == 0) {
      return isFinished ? "#277BC0" : "#E5E5E5";
    } else {
      return isFinished ? "#277BC0" : "#E5E5E5";
    }
  }};
  border-radius: 50%;
`;

export const StepSvg = styled.img`
  width: 40px;
  height: 40px;
`;

export const StageSpan = styled.span`
  margin-top: 10px;
  font-size: ${({ rowMode }) => (rowMode ? "15px" : "12px")};
  font-weight: 600;
  width: 100px;
  text-align: ${({ rowMode }) => (rowMode ? "left" : "center")};
  ${({ rowMode }) => rowMode && "margin-left: 10px"};
`;
