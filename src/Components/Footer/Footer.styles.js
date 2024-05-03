import styled from "styled-components";

export const FooterContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1025px) {
    height: 100%;
  }
`;

export const FooterWrapper = styled.div`
  margin: 1vw 20vw;
  height: 100%;
  @media only screen and (max-width: 1025px) {
    margin: 1vw 5vw;
  }
`;

export const PromotionNewsletter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #008459;

  height: 80px;
  span {
    color: #ffffff;
    font-size: 20px;
    font-family: "Work Sans", sans-serif !important;
    weight: 900;
  }
  @media only screen and (max-width: 1025px) {
    flex-direction: column;
    font-size: 18px;
    padding: 20px 10px;
  }
`;

export const EmailInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #e5e5e5;
  width: 400px;
  height: 40px;
  background-color: #ffffff;
  margin-left: 100px;
  box-shadow: inset 2px 1px 23px -19px rgba(0, 0, 0, 0.75);
  @media only screen and (max-width: 1025px) {
    width: 100%;
    margin: 0 10px;
  }
`;

export const EmailInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  height: 100%;
  padding: 15px;
`;

export const SubmitBtn = styled.button`
  background-color: #115934;
  padding: 4px 8px;
  margin-right: 4px;
  color: #ffffff;
  border: none;
  border-radius: 18px;
  width: 250px;
  font-size: 14px;
  &:hover {
    background-color: #0c3d23;
  }
`;

export const FooterContent = styled.div``;

export const FollowAndContact = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  padding: 40px 0;
  justify-content: space-around;
  width: 100%;
  @media only screen and (max-width: 1025px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const SocialMediaDiv = styled.div`
  span {
    font-size: 25px;
    color: #242424;
    margin: 0;
  }
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const SocialMediaIcon = styled.div`
  transition: 0.2s ease all;
  font-size: 45px;
  margin: 0 4px;

  &:hover {
    color: #115934;
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const ContactDiv = styled.div``;

export const ContactTitle = styled.span`
  font-size: 25px;
  color: #242424;
`;

export const ContactInfoWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 1025px) {
    flex-direction: column;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
  @media only screen and (max-width: 1025px) {
    margin: 5px 0;
  }
`;

export const ContactInfoValue = styled.span`
  color: darkgray;
  font-size: 12px;
`;

export const UsefulLinks = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  height: 100%;
  padding: 60px 0;
  border-bottom: 1px solid #e5e5e5;
  @media only screen and (max-width: 1025px) {
    flex-direction: column;
  }
`;

export const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1025px) {
    margin-bottom: 30px;
  }
`;

export const SectionTitle = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 15px;
  @media only screen and (max-width: 1025px) {
    margin-bottom: 5px;
    font-size: 20px;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 30px;
  }
`;
export const UsefulLink = styled.a`
  text-transform: uppercase;
  color: #777777;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

export const FooterEnding = styled.div``;
