import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContainer,
  CardDesc,
  CardHeader,
  CardIcon,
  CardTitle,
  InicioDashContainer,
} from "./InicioDash.styles";
import { ImLeaf } from "react-icons/im";
import { useNavigate } from "react-router";
import { Breadcrumb } from "react-bootstrap";
import { DashCtx } from "../Dashboard";
import GlobalDataCtx from "../../../Context/GlobalDataContext";

const InicioDash = () => {
  let navigate = useNavigate();

  const { setLocationString, setLocationInfo } = useContext(DashCtx);

  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const [marketplace, setMarketplace] = useState(false);

  useEffect(() => {
    setLocationString("Dashboard");
    setLocationInfo(
      <Breadcrumb>
        <Breadcrumb.Item active>
          {globalCtx.idioma ? "Início" : "Home"}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  const cardData = [
    {
      cardTitle: globalCtx.idioma
        ? "Cadastre sua oferta ou demanda"
        : "Create Offer or Demand",
      cardDesc: globalCtx.idioma
        ? "Cadastre o produto para começar a fazer negócios no marketplace."
        : "Register the product to start doing business on the marketplace.",
      cardIcon: <ImLeaf />,
      bgColor: "#115934",
      path: "oferta",
    },
    {
      cardTitle: "Marketplace",
      cardDesc: globalCtx.idioma
        ? "Aqui você pode buscar as ofertas, comprar, vender, marcar favoritos, e ser notificado quando novas ofertas sairem."
        : "Here you can search for deals, buy, sell, bookmark, and get notified when new deals come out.",
      cardIcon: <ImLeaf />,
      bgColor: "#FF6600",
      path: "",
    },
    {
      cardTitle: globalCtx.idioma ? "Board Operacional" : "Operational Board",
      cardDesc: globalCtx.idioma
        ? "Aqui você encontra os seus pedidos e o status de cada pedido."
        : "Here you can find your orders and the status of each order.",
      cardIcon: <ImLeaf />,
      bgColor: "#FF6600",
      path: "/dashboard/board-operacional",
    },
  ];

  const marketPlaceCards = [
    {
      cardTitle: globalCtx.idioma ? "Mercado Nacional" : "National Market",
      cardDesc: globalCtx.idioma
        ? "Comprar produtos locais"
        : "Buy local products",
      cardIcon: <ImLeaf />,
      bgColor: "#FF6600",
      path: "/",
    },
    {
      cardTitle: globalCtx.idioma
        ? "Mercado Internacional"
        : "International Market",
      cardDesc: globalCtx.idioma
        ? "Fora do Brasil? Produtos para exportação"
        : "Out of Brazil? See products for export",
      cardIcon: <ImLeaf />,
      bgColor: "#FF6600",
      path: "/?market=international",
    },
  ];

  return (
    <>
      <InicioDashContainer>
        <CardContainer>
          {cardData.map((card) => {
            return (
              <Card
                bgColor={card.bgColor}
                onClick={() => {
                  if (card.cardTitle === "Marketplace") {
                    setMarketplace(!marketplace);
                  } else {
                    navigate(card.path, { replace: "true" });
                  }
                }}
              >
                <CardHeader>
                  <CardIcon>{card.cardIcon}</CardIcon>
                  <CardTitle>{card.cardTitle}</CardTitle>
                </CardHeader>
                <CardDesc>{card.cardDesc}</CardDesc>
              </Card>
            );
          })}
        </CardContainer>
        {marketplace && (
          <CardContainer>
            {marketPlaceCards.map((card) => {
              return (
                <Card
                  bgColor={card.bgColor}
                  onClick={() =>
                    navigate(card.path, {
                      replace: "true",
                    })
                  }
                >
                  <CardHeader>
                    <CardIcon>{card.cardIcon}</CardIcon>
                    <CardTitle>{card.cardTitle}</CardTitle>
                  </CardHeader>
                  <CardDesc>{card.cardDesc}</CardDesc>
                </Card>
              );
            })}
          </CardContainer>
        )}
      </InicioDashContainer>
    </>
  );
};

export default InicioDash;
