import styled from "styled-components";

export const DetalhesContainer = styled.div`
  margin-top: 50px;
  z-index: 2;
`;

export const Header = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
  left: 0;
  top: 0;
`;

export const HeaderImg = styled.img``;

export const Body = styled.div`
  display: flex;
  margin-top: 30px;

  @media only screen and (max-width: 1025px) {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  flex: 3;
`;

export const MainContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  margin-right: 10px;
  padding: 25px 45px;
  height: 100%;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  @media only screen and (max-width: 1025px) {
    margin: 10px 0;
    padding: 15px 20px;
  }
`;

export const AboutSellerContainer = styled.div`
  background-color: #ffffff;

  border-radius: 16px;
  margin: 15px 0px;
  padding: 25px 45px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  @media only screen and (max-width: 1025px) {
    margin: 10px 0;
    padding: 15px 20px;
  }
`;

export const AboutSellerTitle = styled.span`
  font-size: 12px;
  color: rgb(60, 60, 60);
`;

export const SellerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SellerName = styled.span`
  font-size: 24px;
`;

export const SellerDesc = styled.p`
  margin-top: 15px;
  line-height: 1.8;
  font-size: 15px;
  margin-right: 70px;
  @media only screen and (max-width: 1025px) {
    max-height: 450px;
    overflow: scroll;
    line-height: 1.5;
    margin-right: 0;
    padding-right: 20px;
  }
`;

export const SellerOrigin = styled.span``;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    padding: 4px;
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 1025px) {
    flex-direction: column-reverse;
  }
`;

export const TitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

export const ImgWrapper = styled.div`
  width: 450px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
`;

export const ProductImg = styled.img`
  border: 1px solid #eeeeee;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ProductTitle = styled.span`
  font-size: 36px;
  @media only screen and (max-width: 1025px) {
    font-size: 30px;
  }
`;

export const ProductDesc = styled.span`
  font-size: 18px;
  font-transform: uppercase;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const Info = styled.div`
  margin-right: 40px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

export const InfoTitle = styled.span`
  font-size: 14px;
  color: rgb(75, 75, 75);
`;

export const InfoDesc = styled.span`
  font-size: 16px;
`;

export const Hr = styled.hr`
  margin: 40px 0;
`;

export const AboutSection = styled.div`
  margin-bottom: 50px;
  @media only screen and (max-width: 1025px) {
    margin-bottom: 20px;
  }
`;

export const AboutSectionTitle = styled.h2`
  color: rgb(75, 75, 75);
  font-size: 22px;
`;

export const AboutText = styled.p`
  line-height: 1.8;
  font-size: 15px;
  margin-right: 70px;

  @media only screen and (max-width: 1025px) {
    max-height: 450px;
    overflow: scroll;
    line-height: 1.5;
    margin-right: 0;
    padding-right: 20px;
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  @media only screen and (max-width: 1025px) {
    margin: 10px 0;
  }
`;

export const AlertMsg = styled.span`
  color: red;
  padding: 4px;
  font-size: 14px;
`;

export const ServicesContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 25px 45px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  @media only screen and (max-width: 1025px) {
    padding: 15px;
  }
`;

export const Service = styled.span`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #256d48;
  border-radius: 10px;
  border: none;
  outline: none;
  margin: 5px 10px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  @media only screen and (max-width: 1025px) {
    padding: 5px 10px;
    margin: 5px;
  }
`;

export const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ProductStory = styled.div`
  color: #ffffff;
  background-color: #434343;
  border-radius: 16px;
  margin: 40px 0;
  padding: 25px 45px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
`;

export const StoryInfo = styled.div`
  margin-left: 40px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const StoryInfoTitle = styled.span`
  font-size: 14px;
`;

export const StoryInfoValue = styled.span`
  font-size: 30px;
`;

export const NegociarContainer = styled.div``;
