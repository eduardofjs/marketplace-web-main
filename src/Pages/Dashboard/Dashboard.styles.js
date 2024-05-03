import styled from "styled-components";
import { Outlet } from "react-router";

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DashHeader = styled.div`
  margin-top: 50px;
  cursor: default;
  h4 {
    font-weight: 600;
  }
`;

export const ReturnBtn = styled.button`
  background: none;
  outline: none;
  border: none;
  font-style: underline;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  &:hover {
    color: #438b66;
  }
`;

export const DashBody = styled.div`
  margin: 20px 40px 10px 430px;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Section = styled.div`
  margin-bottom: 40px;
  h4 {
    margin-top: 10px;
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderItem = styled.div``;

export const StyledOutlet = styled(Outlet)`
  background-color: #ffff;
  width: 100%;
  height: 100%;
  min-height: 89vh;
  border-radius: 8px;
  padding: 20px 25px;
`;

export const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
