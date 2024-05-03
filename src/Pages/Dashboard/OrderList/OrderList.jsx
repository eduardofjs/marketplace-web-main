import React, { useContext, useEffect } from "react";
import { Section } from "../Dashboard.styles";
import OrderTable from "../../../Components/OrderTable/OrderTable";
import LoginCtx from "../../../Context/LoginContext";
import { stringBasedOnAccessType } from "../../../generalFunctions";
import { BoardOperacionalContainer } from "./OrderList.styles";
import { Breadcrumb } from "react-bootstrap";
import { DashCtx } from "../Dashboard";

const OrderList = () => {
  const { state } = useContext(LoginCtx);
  const { setLocationString, setLocationInfo, navigate } = useContext(DashCtx);

  useEffect(() => {
    setLocationString("Board Operacional");
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          Início
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Board Operacional</Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  return (
    <>
      <BoardOperacionalContainer>
        <Section>
          {" "}
          <h5>Negociações aprovadas</h5>
          <span>
            Lista de negociações que foram aprovadas e estão em fase
            operacional.
          </span>
          <OrderTable />
        </Section>
      </BoardOperacionalContainer>
    </>
  );
};

export default OrderList;
