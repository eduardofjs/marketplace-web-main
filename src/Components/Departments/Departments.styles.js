import styled from "styled-components";

export const DepartmentsContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  overflow: hidden;
  @media only screen and (max-width: 1025px) {
    width: 100%;
    height: 200px;
    margin-top: 10px;
  }
`;

export const Title = styled.span`
  width: 100%;
  padding: 15px;
  font-size: 14px;

  background-color: #115934;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  @media only screen and (max-width: 1025px) {
    padding: 5px;
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;

  @media only screen and (max-width: 1025px) {
    overflow: scroll;
  }
`;

export const Category = styled.div`
  border-bottom: 1px solid #e5e5e5;
  width: 95%;
  padding: 12px;
  cursor: pointer;
  transition: 0.2s ease all;
  &:hover {
    background-color: #115934;
    color: #ffffff;
    border-bottom: none;
  }
  @media only screen and (max-width: 1025px) {
    padding: 8px;
  }
`;
