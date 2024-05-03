import React, { useState } from "react";
import styled from "styled-components";
import { CollapseIcon, ExpandIcon, SubNavItemWrapper } from "./SidebarDash.styles";
import { useNavigate } from "react-router";

const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const NavItemSpan = styled.span`
  margin-left: 10px;
  width: 100%;
  &:hover {
    border-radius: 6px;
    background-color: #256d48;
    color: #eeeeee;
  }
`;

export const SubnavContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavItemDiv = styled.div`
  display: flex;
  align-items: center;
  color: #242424;
  cursor: pointer;
  padding: 8px;
  margin: 10px;
  width: 100%;
  &:hover {
    border-radius: 6px;
    background-color: #256d48;
    color: #eeeeee;
  }
`;

export const NavIcon = styled.div`
  font-size: 20px;
`;

const NavItem = ({ title, icon, hasSubnav, navItem }) => {
  const [showSubnav, setShowSubnav] = useState(true);
  let navigate = useNavigate();

  return (
    <NavItemWrapper>
      <NavItemDiv
        onClick={() => {
          if (hasSubnav) {
            setShowSubnav(!showSubnav);
          } else {
            navigate(navItem.path, { replace: true });
          }
        }}
      >
        <NavIcon>{icon}</NavIcon>

        <NavItemSpan>{title}</NavItemSpan>
        {hasSubnav ? showSubnav ? <CollapseIcon /> : <ExpandIcon /> : ""}
      </NavItemDiv>

      {hasSubnav &&
        showSubnav &&
        navItem.subNavItems.map((subnav) => {
          return (
            <SubNavItemWrapper>
              {subnav.icon}
              <NavItemSpan onClick={() => navigate(subnav.path, { replace: true })}>{subnav.title}</NavItemSpan>
            </SubNavItemWrapper>
          );
        })}
    </NavItemWrapper>
  );
};

export default NavItem;
