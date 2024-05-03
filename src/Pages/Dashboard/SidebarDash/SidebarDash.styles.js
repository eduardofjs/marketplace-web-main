import styled from "styled-components";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";

export const SidebarContainer = styled.div`
  display: flex;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
`;

export const SidebarNavigation = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 4px 8px 16px rgba(69, 79, 89, 0.04);
  width: 80px;
`;

export const NavList = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid white;
`;

export const NavLogo = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px 0;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const NavMenu = styled.div`
  width: 45px;
  height: 45px;
  padding: 5px;
  margin: 15px 0;
  background-color: ${({ isSelected }) =>
    isSelected ? "#256D48" : "transparent"};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #494949;
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s ease all;
  &:hover {
    color: #eeee;
    background-color: #256d48;
  }
`;

export const SidebarContent = styled.div`
  padding: 15px 0;
  width: 320px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f4f4f4;
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  height: 40px;
`;

export const SearchInput = styled.input`
  width: 250px;
  padding: 4px 12px;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  background-color: none;
  margin-right: 10px;
  outline: none;
  color: #242424;
  transition: 0.3s ease all;
  &:focus {
    border: 1px solid #256d48;
  }
`;

export const SearchBtn = styled.button`
  width: 100%;
  border-radius: 6px;
  background-color: #256d48;
  border: none;
  color: #eeeeee;
  font-size: 20px;
`;

export const Content = styled.div`
  width: 94%;
  margin-top: 30px;
`;

export const SubNavItemWrapper = styled.div`
  display: flex;
  color: #242424;
  cursor: pointer;
  padding: 8px;
  margin: 10px 0;
  margin-left: 35px;
  align-items: center;
  width: 90%;
  &:hover {
    border-radius: 6px;
    background-color: #256d48;
    color: #eeeeee;
  }
`;

export const ExpandIcon = styled(RiArrowDownSLine)`
  font-size: 25px;
`;

export const CollapseIcon = styled(RiArrowUpSLine)`
  font-size: 25px;
`;

export const AlertSpan = styled.p`
  text-align: center;
  padding: 10px;
  margin: 20px;
  font-size: 14px;
`;

export const UserTagContainer = styled.div`
  display: flex;
  align-items: center;
  color: darkgray;
  width: 100%;
  padding: 0 10px;
  cursor: default;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserTag = styled(FaUserCircle)`
  margin: 5px;
  font-size: 18px;
`;

export const EmpresaNome = styled.span`
  margin-bottom: 5px;
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
`;

export const UsuarioNome = styled.span`
  font-size: 14px;
  font-style: italic;
`;

export const EmpresaTag = styled(IoStorefrontOutline)`
  margin: 5px;
  font-size: 18px;
`;
