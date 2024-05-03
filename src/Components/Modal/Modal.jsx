import React, { useContext } from "react";
import ModalCtx from "../../Context/ModalContext";
import {
  Button,
  ButtonWrapper,
  CloseModalBtn,
  ModalBody,
  ModalContainer,
  BodyContainer,
  ModalHeader,
  ModalTitle,
  Overlay,
  Text,
  Icon,
  Headline,
} from "./Modal.styles";
import ReactLoading from "react-loading";
import { CenterContentDiv } from "../../globalStyle";

const Modal = ({ text, title, headline, icon, modalWithBtn, confirmBtnTxt, cancelBtnTxt, onCancel, onConfirm }) => {
  const { modalState } = useContext(ModalCtx);
  return (
    <>
      <ModalContainer modalWithBtn={modalWithBtn}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {!modalState.modalIsLoading && <CloseModalBtn onClick={onCancel} />}
        </ModalHeader>

        {modalState.modalIsLoading ? (
          <CenterContentDiv>
            <ReactLoading type={"spin"} color={"green"} height={80} width={80} />
          </CenterContentDiv>
        ) : (
          <>
            {" "}
            <BodyContainer modalWithBtn={modalWithBtn}>
              <ModalBody>
                {icon && <Icon src={icon} />}
                {headline && <Headline>{headline}</Headline>}
                <Text>{text}</Text>
              </ModalBody>
            </BodyContainer>
            {modalWithBtn && (
              <ButtonWrapper>
                <Button type="danger" onClick={onCancel} width={"200px"}>
                  {cancelBtnTxt ? cancelBtnTxt : "Cancelar"}
                </Button>
                <Button type="success" onClick={onConfirm} width={"200px"}>
                  {confirmBtnTxt ? confirmBtnTxt : "Confirmar"}
                </Button>
              </ButtonWrapper>
            )}
          </>
        )}
      </ModalContainer>
      <Overlay onClick={onCancel} />
    </>
  );
};

export default Modal;
