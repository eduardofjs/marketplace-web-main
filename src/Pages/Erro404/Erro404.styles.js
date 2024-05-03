import styled from "styled-components";
import { MdMarkEmailRead } from "react-icons/md";

export const Erro404Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const RecoverModal = styled.div`
  background-color: #ffff;

  border-radius: 8px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h4 {
    text-align: left;
    margin: 10px 0;
    font-weight: 700;
    color: #115934;
  }

  span {
    line-height: 2;
    color: #242424;
    text-align: center;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  width: 50%;
  justify-content: space-around;
`;

export const SentMsgIcon = styled(MdMarkEmailRead)`
  margin: 10px;
  font-size: 18px;
  color: green;
`;

export const SendEmailContainer = styled.div``;

export const EmailSentContainer = styled.div``;
