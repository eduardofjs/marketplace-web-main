import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

export const ModalContainer = styled.div`
  border-radius: 4px;
  overflow: hidden;
  z-index: 99999;
  position: fixed;
  width: 500px;
  height: 320px;
  top: 50%;
  left: 50%;
  margin-top: -160px; /* Negative half of height. */
  margin-left: -250px; /* Negative half of width. */
`;

export const ModalHeader = styled.div`
  background-color: #438b66;
  height: 50px;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalBody = styled.div`
  padding: 20px 25px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

export const InputMsg = styled.textarea`
  width: 100%;
  margin-top: 10px;
  padding: 10px 15px;
  resize: none;
`;

export const ConfirmBtn = styled.button`
  background-color: #115934;
  padding: 8px 12px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  width: 100%;
  &:hover {
    background-color: #0c3d23;
  }
`;

export const CloseBtn = styled(AiOutlineClose)`
  cursor: pointer;
  font-size: 22px;
  &:hover {
    transform: scale(1.1);
  }
`;
