import React from "react";
import { CloseBtn, ConfirmBtn, InputMsg, ModalBody, ModalContainer, ModalHeader, Overlay } from "./ContactModal.styles";

const ContactModal = ({ onModalHandler }) => {
  return (
    <>
      <ModalContainer>
        <ModalHeader>
          <span>Contato</span>
          <CloseBtn onClick={() => onModalHandler(false)} />
        </ModalHeader>
        <ModalBody>
          <span>Envie uma mensagem.</span>
          <InputMsg rows="4" cols="50"></InputMsg>
          <ConfirmBtn>Enviar mensagem</ConfirmBtn>
        </ModalBody>
      </ModalContainer>
      <Overlay />
    </>
  );
};

export default ContactModal;
