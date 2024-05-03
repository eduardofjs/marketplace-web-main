import React from "react";
import { NavItemContainer, StepIcon, StepTitle } from "./Oferta.styles";

const NavItem = ({ isSelected, step, title, onClick }) => {
  return (
    <NavItemContainer onClick={onClick}>
      <StepIcon isSelected={isSelected}>{step}</StepIcon>
      <StepTitle isSelected={isSelected}>{title}</StepTitle>
    </NavItemContainer>
  );
};

export default NavItem;
