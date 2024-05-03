import styled from "styled-components";

export const ProgressContainer = styled.div`
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  border-radius: 4px;
  margin-top: 10px;
  margin-right: 10px;
  width: 350px;
`;

export const ProgressInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CircularProgressbarContainer = styled.div`
  width: 50%;
  margin-left: 4.375rem;
`;

export const ProgressbarValueDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProgressValue = styled.h3`
  margin-left: 10px;
  font-weight: 700;
`;

export const PInfoWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  h6 {
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PInfoTitle = styled.span`
  color: gray;
`;

export const PInfoValue = styled.span`
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DetailsBtn = styled.button`
  background-color: white;
  padding: 8px 12px;
  color: #115934;
  border: none;
  border-radius: 10px;
  width: 130px;
  transition: 0.2s ease all;
  &:hover {
    color: #ffffff;
    background-color: #115934;
  }
`;

export const NegociarBtn = styled.button`
  background-color: #115934;
  padding: 8px 12px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  width: 110px;
  &:hover {
    background-color: #0c3d23;
  }
`;
