import React, { useContext, useEffect, useState, createContext } from "react";
import {
  DashboardContainer,
  DashBody,
  DashHeader,
  LocationDiv,
  ReturnBtn,
  Section,
  StyledOutlet,
} from "./Dashboard.styles";
import LoginCtx from "../../Context/LoginContext";

import { useNavigate } from "react-router";

import SidebarDash from "./SidebarDash/SidebarDash";

import ModalCtx from "../../Context/ModalContext";

import Modal from "../../Components/Modal/Modal";

import ReactDOM from "react-dom";

import { useLocation } from "react-router-dom";

import { Breadcrumb } from "react-bootstrap";

export const DashCtx = createContext({});

const Dashboard = () => {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  let navigate = useNavigate();

  const { state, dispatch } = useContext(LoginCtx);

  //modal context
  const { modalState } = useContext(ModalCtx);

  //String do Header do dash
  const [locationString, setLocationString] = useState("Dashboard");

  //locationInfo, setLocationInfo
  const [locationInfo, setLocationInfo] = useState();

  useEffect(() => {
    dispatch({ type: "CHECK_SESSION" });
    setLocationString("Dashboard");
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item active>Início</Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  return (
    <DashCtx.Provider
      value={{
        locationString,
        setLocationString,
        locationInfo,
        setLocationInfo,
        navigate,
      }}
    >
      {" "}
      <DashboardContainer>
        {modalState?.display &&
          ReactDOM.createPortal(
            <Modal
              title={modalState.title}
              headline={modalState.headline}
              text={modalState.text}
              icon={modalState.icon}
              modalWithBtn={modalState.modalWithBtn}
              confirmBtnTxt={modalState.confirmBtnTxt}
              cancelBtnTxt={modalState.cancelBtnTxt}
              onCancel={modalState.cancelHandler}
              onConfirm={modalState.confirmHandler}
            />,
            document.getElementById("overlay-root")
          )}
        <SidebarDash />
        <DashBody>
          <LocationDiv>
            <h3>{locationString}</h3>
            {locationInfo}
          </LocationDiv>

          <StyledOutlet />
        </DashBody>
      </DashboardContainer>
    </DashCtx.Provider>
  );
};

export default Dashboard;
