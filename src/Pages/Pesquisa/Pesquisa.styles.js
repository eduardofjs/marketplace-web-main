import styled from "styled-components";
import { HiOutlineAdjustments } from "react-icons/hi";

export const PesquisaContainer = styled.div`
  min-height: 80vh;
  width: 100%;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;

export const PesquisaTitle = styled.span`
  text-transform: uppercase;
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 30px;
`;

export const ResultQuantity = styled.span`
  text-transform: uppercase;
  font-family: "Work Sans", sans-serif;
  font-size: 18px;
`;

export const FilterBtn = styled(HiOutlineAdjustments)`
  position: fixed;
  top: 5vh;
  right: 5vw;
  border-radius: 50%;
  padding: 5px;
  font-size: 35px;
  background-color: #ffc05a;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    transform: scale(1.1);
    background-color: #e5ad52;
  }
`;
