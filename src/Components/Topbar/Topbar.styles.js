import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { NavDropdown } from "react-bootstrap";
import { FiUserPlus } from "react-icons/fi";
import { RiVipCrownLine } from "react-icons/ri";

export const TopbarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #e5e5e5;
  //display
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  //font
  font-size: 13px;
  color: #777777;
  @media only screen and (max-width: 1025px) {
    display: none;
  }
`;

export const IdiomaContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  span {
    margin-right: 10px;
  }
`;

export const SelectedIdioma = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  //texto
  span {
    color: #242424;
    margin-left: 5px;
    &:hover {
      color: #115934;
    }
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const MoedaContainer = styled.div`
  span {
    margin-right: 10px;
  }
`;

export const SelectedMoeda = styled.span`
  color: #242424;
  cursor: pointer;
  &:hover {
    color: #115934;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 30%;
  align-items: center;
`;

export const IdiomaFlag = styled.img``;

export const NavItem = styled.span`
  padding: 6px 12px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease all;
  &:hover {
    color: #eeeeee;
    background-color: #115934;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const LoginIcon = styled(FaRegUserCircle)`
  margin-right: 5px;
  font-size: 16px;
`;

export const RegisterIcon = styled(FiUserPlus)`
  margin-right: 5px;
  font-size: 16px;
`;

export const LoginBtn = styled.span`
  &:hover {
    color: #115934;
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  color: #115934 !important;
`;

export const LoginOrRegisterWrapper = styled.div`
  display: flex;
`;

export const RegisterBtn = styled.span`
  margin-right: 10px;
  &:hover {
    color: #115934;
  }
`;

export const PerfilMasterIcon = styled(RiVipCrownLine)`
  color: orange;
  font-size: 18px;
`;
