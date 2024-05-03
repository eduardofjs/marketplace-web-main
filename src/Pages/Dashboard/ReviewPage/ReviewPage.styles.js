import styled from "styled-components";

export const ReviewOperationalBoard = styled.div`
  padding: 20px 25px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  border-radius: 4px;
  flex: 5;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const RInfoWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

export const RInfoTitle = styled.span`
  color: gray;
`;

export const RInfoValue = styled.span`
  font-weight: 600;
`;

export const DocumentationContainer = styled.div`
  width: 650px;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  border-radius: 4px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px dashed green;
  background-color: #eeeeee;
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  span {
    color: green;
    font-size: 14px;
    text-align: center;
  }
`;

export const Icon = styled.div`
  font-size: 30px;
  text-align: center;
  color: green;
`;

export const ProgressBarContainer = styled.div`
  span {
    font-weight: 700;
    font-size: 14px;
  }
`;

export const NewDocContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const NewDocInput = styled.input`
  border-radius: 10px;
  padding: 5px 8px;
  width: 100%;
  border: 1px solid #242424;
  margin-right: 10px;
`;

export const DocumentationList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const DocumentoWrapper = styled.div`
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: column;
`;

export const ReprovarDocDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  input {
    width: 100%;
    padding: 5px;
    margin-right: 5px;
  }
`;

export const JustificativaSpan = styled.span`
  color: tomato;
  bold {
    font-weight: 800;
  }
  font-size: 16px;
`;

export const DocumentationItem = styled.div`
  display: flex;

  justify-content: space-between;

  width: 100%;
  cursor: default;
  padding: 4px;
  &:hover {
    background-color: #eeeeee;
  }
`;

export const DocDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

export const DocName = styled.span`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const DocStats = styled.span`
  ${({ status }) => status === 0 && "color: tomato;"}
  ${({ status }) => status === 1 && "color: orange;"}
  ${({ status }) => status === 2 && "color: green;"}
  ${({ status }) => status === 3 && "color: tomato;"}
`;

export const ActionDiv = styled.div`
  display: flex;
  font-size: 25px;
`;

export const ActionBtn = styled.button`
  margin: 0 8px;
  background: none;
  border: none;
  outline: none;
  transition: 0.2s all;
  &:hover {
    transform: scale(1.3);
  }
  &:active {
    transform: scale(1.1);
  }
`;

export const ReviewPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
