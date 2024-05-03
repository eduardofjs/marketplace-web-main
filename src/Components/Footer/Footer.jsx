import React, { useContext } from "react";
import {
  ContactDiv,
  ContactInfo,
  ContactInfoValue,
  ContactInfoWrapper,
  ContactTitle,
  EmailInput,
  EmailInputContainer,
  FollowAndContact,
  FooterContainer,
  FooterContent,
  FooterEnding,
  FooterWrapper,
  IconContainer,
  Link,
  LinkSection,
  PromotionNewsletter,
  SectionTitle,
  SocialMediaDiv,
  SocialMediaIcon,
  SubmitBtn,
  UsefulLink,
  UsefulLinks,
} from "./Footer.styles";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

import { FaFacebook } from "react-icons/fa";
import GlobalDataCtx from "../../Context/GlobalDataContext";

const Footer = () => {
  const { globalCtx } = useContext(GlobalDataCtx);

  return (
    <FooterContainer>
      <PromotionNewsletter>
        <span>{globalCtx.idioma ? "Receber Promoções" : "Get Discounts"}</span>
        <EmailInputContainer>
          <EmailInput
            placeholder={
              globalCtx.idioma ? "contato@email.com" : "contact@email.com"
            }
          />
          <SubmitBtn>{globalCtx.idioma ? "Inscrever" : "Subscribe"}</SubmitBtn>
        </EmailInputContainer>
      </PromotionNewsletter>
      <FooterWrapper>
        {" "}
        <FooterContent>
          <FollowAndContact>
            <SocialMediaDiv>
              <span>{globalCtx.idioma ? "Siga-nos" : "Follow us"}</span>
              <IconContainer>
                <SocialMediaIcon>
                  <Link href="/">
                    <AiFillInstagram />
                  </Link>
                </SocialMediaIcon>
                <SocialMediaIcon>
                  <Link href="/">
                    <AiFillTwitterCircle />
                  </Link>
                </SocialMediaIcon>
                <SocialMediaIcon>
                  <Link href="/">
                    <FaFacebook />
                  </Link>
                </SocialMediaIcon>
              </IconContainer>
            </SocialMediaDiv>
            <ContactDiv>
              <ContactTitle>
                {globalCtx.idioma ? "Contato" : "Contact"}
              </ContactTitle>
              <ContactInfoWrapper>
                <ContactInfo>
                  <ContactInfoValue>
                    {globalCtx.idioma ? "Endereço:" : "Address:"}
                  </ContactInfoValue>
                  <ContactInfoValue>
                    123 New Design Str, Melbourne, Australia
                  </ContactInfoValue>
                </ContactInfo>
                <ContactInfo>
                  <ContactInfoValue>
                    {globalCtx.idioma ? "Telefone:" : "Phone:"}
                  </ContactInfoValue>
                  <ContactInfoValue>1-888-123-456-89</ContactInfoValue>
                </ContactInfo>
                <ContactInfo>
                  <ContactInfoValue>E-mail:</ContactInfoValue>
                  <ContactInfoValue>info@directto.com</ContactInfoValue>
                </ContactInfo>
              </ContactInfoWrapper>
            </ContactDiv>
          </FollowAndContact>
          {/* <UsefulLinks>
            <LinkSection>
              <SectionTitle>Extras</SectionTitle>
              <UsefulLink href="/">Brands</UsefulLink>
              <UsefulLink href="/">Gift Vouchers</UsefulLink>
              <UsefulLink href="/">Affiliates</UsefulLink>
              <UsefulLink href="/">Specials</UsefulLink>
            </LinkSection>
            <LinkSection>
              <SectionTitle>
                {globalCtx.idioma ? "Produtos" : "Products"}
              </SectionTitle>
              <UsefulLink href="/">Brands</UsefulLink>
              <UsefulLink href="/">Gift Vouchers</UsefulLink>
              <UsefulLink href="/">Affiliates</UsefulLink>
              <UsefulLink href="/">Specials</UsefulLink>
            </LinkSection>
            <LinkSection>
              <SectionTitle>
                {globalCtx.idioma ? "Nossa Empresa" : "Our Company"}
              </SectionTitle>
              <UsefulLink href="/">Brands</UsefulLink>
              <UsefulLink href="/">Gift Vouchers</UsefulLink>
              <UsefulLink href="/">Affiliates</UsefulLink>
              <UsefulLink href="/">Specials</UsefulLink>
            </LinkSection>
            <LinkSection>
              <SectionTitle>Extras</SectionTitle>
              <UsefulLink href="/">Brands</UsefulLink>
              <UsefulLink href="/">Gift Vouchers</UsefulLink>
              <UsefulLink href="/">Affiliates</UsefulLink>
              <UsefulLink href="/">Specials</UsefulLink>
            </LinkSection>
          </UsefulLinks> */}
          <FooterEnding>{process.env.REACT_APP_VERSION}</FooterEnding>
        </FooterContent>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
