import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  //animation
  animation: slide-down 700ms ease-out forwards;
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
`;

export const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ErrorMsg = styled.span`
  cursor: default;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-size: 14px;
`;

export const DirecttoLogo = styled.img``;

export const LoginTitle = styled.span`
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const InputDesc = styled.span`
  font-family: "Work Sans", sans-serif;
  font-size: 12px;

  color: ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  margin-left: 15px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 368px;
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#ebebeb")};
  outline: none;
  transition: 0.2s ease all;
  &:focus {
    border: 1px solid #115934;
  }
`;

export const LoginBtn = styled.button`
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

export const LinkSpan = styled.span`
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  text-decoration: underline;
  color: #115934;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  &:hover {
    color: #0c3d23;
  }
`;

export const Version = styled.span`
  font-family: "Work Sans", sans-serif;
  font-size: 15px;
  color: darkgray;
  margin: 0 5px;
`;
export const SwitchLang = styled.span`
  font-family: "Work Sans", sans-serif;
  font-size: 15px;

  color: darkgray;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    color: #242424;
  }
`;

export const CriarEsquecerContaDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseLoginPage = styled(AiOutlineClose)`
  cursor: pointer;
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  color: rgba(0, 0, 0, 0.3);
  font-size: 35px;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

export const LoginFooter = styled.div`
  position: fixed;
  bottom: -150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
