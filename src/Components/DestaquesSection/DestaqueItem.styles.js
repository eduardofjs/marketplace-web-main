import styled from "styled-components";

export const DestaqueItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 480px;
  align-items: center;
  padding: 30px;
  @media only screen and (max-width: 1025px) {
    padding: 30px 40px;
    flex-direction: column-reverse;
  }
`;

export const HeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DestaqueH1 = styled.h1`
  width: 65%;
  font-family: "Rubik", sans-serif;
  font-size: 50px;
  text-transform: uppercase;
  font-weight: 550;
  @media only screen and (max-width: 1025px) {
    font-size: 25px;
    width: 100%;
  }
`;

export const DestaqueH2 = styled.h2`
  font-family: "Rubik", sans-serif;
  color: #ff6600;
  @media only screen and (max-width: 1025px) {
    font-size: 19px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DestaqueText = styled.span`
  color: #115934;
  text-transform: uppercase;
`;

export const Btn = styled.button`
  background-color: #115934;
  padding: 10px 15px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  width: 200px;
  &:hover {
    background-color: #0c3d23;
  }
`;

export const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px;
`;

export const RightContainer = styled.div``;

export const Img = styled.img`
  width: 100%;
  @media only screen and (max-width: 1025px) {
    font-size: 19px;
  }
`;
