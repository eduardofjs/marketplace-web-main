import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { DestaqueContainer } from "./DestaqueCarousel.styles";
import grapeImg from "../../Assets/destaqueimg.png";
import vegImg from "../../Assets/graocafe2.png";
import DestaqueItem from "./DestaqueItem";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const DestaqueCarousel = () => {
  const { globalCtx } = useContext(GlobalDataCtx);

  const destaques = [
    {
      id: 1,
      headline1: globalCtx.idioma ? "Safra do Açaí" : "Açaí Harvest",
      headline2: globalCtx.idioma
        ? "Perspectiva de recorde de produção"
        : "Production record",
      texts: [
        globalCtx.idioma ? "Economize até 10%" : "Save up to 10%",
        globalCtx.idioma
          ? "Retorno em 24 horas"
          : "The best prices on the market",
      ],
      btnText: "Ver Estoque",
      img: grapeImg,
    },
    {
      id: 1,
      headline1: globalCtx.idioma ? "Café em Promoção" : "Coffe on Sale",
      headline2: globalCtx.idioma ? "Até 25% de Desconto" : "Production record",
      texts: [
        globalCtx.idioma ? "Economize até 10%" : "Save up to 10%",
        globalCtx.idioma
          ? "Retorno em 24 horas"
          : "The best prices on the market",
      ],
      btnText: "Ver Estoque",
      img: vegImg,
    },
  ];

  return (
    <DestaqueContainer>
      <Carousel variant="dark" controls={false}>
        {destaques.map((d) => {
          return (
            <Carousel.Item interval={2500} key={Math.random()}>
              <DestaqueItem
                key={d.DestaqueItem}
                h1={d.headline1}
                h2={d.headline2}
                texts={d.texts}
                btnText={d.btnText}
                img={d.img}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </DestaqueContainer>
  );
};

export default DestaqueCarousel;
