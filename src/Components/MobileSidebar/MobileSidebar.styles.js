import styled from "styled-components";
import { FaBars } from "react-icons/fa";

export const SidebarContainer = styled.div`
  @media only screen and (min-width: 1025px) {
    display: none;
  }
`;

export const SidebarBtn = styled(FaBars)`
  position: fixed;
  top: 5px;
  right: 5px;
  font-size: 25px;
  z-index: 9999999999;
  cursor: pointer;
`;

export const SidebarMenu = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 9999999;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ isExpanded }) => (isExpanded ? "0" : "105vw")};
  transition: 0.3s ease all;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const NavItem = styled.span`
  padding: 10px 20px;
  color: black;
  background-color: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  &:active {
    background-color: #115934;
    color: white;
  }
`;

export const LoginBtn = styled.button`
  background: white;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 24px;
  border: 1px solid black;
  border-radius: 10px;
  &:active,
  &:hover {
    border: 1px solid #115934;
    background-color: #115934;
    color: white;
  }
`;
