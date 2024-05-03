import React from "react";
import {
  Btn,
  DestaqueH1,
  DestaqueH2,
  DestaqueItemContainer,
  DestaqueText,
  HeadlineContainer,
  Img,
  LeftContainer,
  RightContainer,
  TextContainer,
} from "./DestaqueItem.styles";

const DestaqueItem = ({ h1, h2, texts, btnText, img }) => {
  return (
    <DestaqueItemContainer>
      <LeftContainer>
        {" "}
        <HeadlineContainer>
          <DestaqueH1>{h1}</DestaqueH1>
          <DestaqueH2>{h2}</DestaqueH2>
        </HeadlineContainer>
        <TextContainer>
          {texts &&
            texts?.map((t) => {
              return <DestaqueText key={Math.random()}>{t}</DestaqueText>;
            })}
        </TextContainer>
        {/* <Btn>{btnText}</Btn> */}
      </LeftContainer>
      <RightContainer>
        <Img src={img} />
      </RightContainer>
    </DestaqueItemContainer>
  );
};

export default DestaqueItem;
