import styled from "styled-components";
import { HiOutlineAdjustments } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

export const SearchbarContainer = styled.div`
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebebeb;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  display: flex;
  width: 65%;
  @media only screen and (max-width: 1025px) {
    width: 90%;
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  width: 150px;
  cursor: pointer;
  transition: 0.5s all;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.8);
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #e5e5e5;
  width: 800px;
  height: 45px;
  box-shadow: inset 2px 1px 23px -19px rgba(0, 0, 0, 0.75);
  @media only screen and (max-width: 1025px) {
    width: 350px;
  }
`;

export const FilterOption = styled.div`
  min-width: 30px;
  min-height: 30px;
  border-radius: 100px;
  background-color: #d6d6d6;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: darkgray;
  }
  @media only screen and (max-width: 1025px) {
    display: none;
  }
`;

export const FilterIcon = styled(HiOutlineAdjustments)`
  font-size: 18px;
`;
export const SearchBtn = styled.div`
  margin-left: 5px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 100px;
  background-color: #115934;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease all;
  cursor: pointer;
  &:hover {
    background-color: #0c3f25;
  }
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 18px;
`;

export const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 5px 15px;
  font-size: 13px;
  color: #242424;
`;

export const SelectInput = styled.select`
  background-color: none;
  border: none;
  outline: none;
  background: none;
  color: #777777;
  padding: 5px 0;
  margin-right: 5px;
  font-family: "Work Sans", sans-serif;
  font-size: 13px;
  @media only screen and (max-width: 1025px) {
    display: none;
  }
`;

export const ControllerWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100px;
  margin-right: 5px;
  border-left: 1px solid #d6d6d6;
  padding-left: 5px;
  @media only screen and (max-width: 1025px) {
    width: 50px;
  }
`;
