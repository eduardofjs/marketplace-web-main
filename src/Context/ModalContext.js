import { createContext } from "react";

const ModalCtx = createContext({
  display: false,
  title: "Título",
  headline: null,
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, eaque.",
  icon: null,
  modalWithBtn: false,
  confirmBtnTxt: "Confirmar",
  cancelBtnTxt: "Cancelar",
  cancelHandler: null,
  confirmHandler: null,
  modalIsLoading: false,
});

export default ModalCtx;
