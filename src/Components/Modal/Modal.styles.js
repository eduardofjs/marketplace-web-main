import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

export const ModalContainer = styled.div`
  //display
  display: flex;
  flex-direction: column;
  justify-content: ${({ modalWithBtn }) =>
    modalWithBtn ? "space-between" : "center"};

  //position center and above all
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  margin-top: -150px;
  margin-left: -250px;
  z-index: 2001;

  //styling
  background-color: #ffffff;
  border-radius: 18px;
  padding: 15px;

  //animation
  animation: slide-down 500ms ease-out forwards;
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-4rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  //media query
  @media only screen and (max-width: 980px) {
    width: 350px;
    margin-left: -175px;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ modalWithBtn }) =>
    modalWithBtn ? "center" : "space-around"};
  align-items: center;
  height: 100%;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2000;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalTitle = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  cursor: default;
`;

export const CloseModalBtn = styled(AiOutlineClose)`
  font-size: 24px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  text-align: center;
  cursor: default;
  margin: 0 40px;
  line-height: 1.7;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #115934;
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 10px;
  width: 130px;
  transition: 0.2s ease all;
  &:hover {
    color: #ffffff;
    background-color: #0c3d23;
  }
`;

export const Icon = styled.img`
  width: 65px;
  margin-bottom: 30px;
`;

export const Headline = styled.h3`
  font-size: 24px;
  font-weight: 800px;
  margin-bottom: 10px;
`;
