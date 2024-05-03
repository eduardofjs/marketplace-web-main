import styled from "styled-components";
import headerBg from "../../Assets/cadastro-header.png";
import { BsArrowLeft } from "react-icons/bs";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
  MdAddAPhoto,
} from "react-icons/md";
import { RiCheckDoubleFill } from "react-icons/ri";

export const CadastroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CadastroHeaderBg = styled.div`
  width: 100vw;

  /* background-image: url(${headerBg});
  background-repeat: no-repeat;
  background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DirecttoLogo = styled.img`
  margin-bottom: 10px;
`;

export const InputCep = styled.input`
  width: ${({ w }) => (w ? `${w}%` : "250px")};
  border-radius: 8px;
  padding: 10px 15px;

  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  margin-right: 5px;

  &:focus {
    border: 1px solid ${({ error }) => (error ? "red" : "#115934")};
  }
`;

export const CloseBtn = styled(BsArrowLeft)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  color: #434343;
  cursor: pointer;
  transition: 0.2s ease all;
  font-size: 30px;
  position: fixed;
  &:hover {
    transform: scale(1.3);
  }
`;

export const ErrorMsg = styled.span`
  font-size: 15px;
  color: red;
  margin: 10px 0;
`;
export const CadastroJson = styled.div`
  margin: 5px;
  h6 {
    color: red;
    font-weight: 800;
  }
  max-height: 90vh;
  padding: 10px;
  font-size: 16px;
  width: 420px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 999;
  word-break: break-all;
  white-space: normal;
  overflow: scroll;
`;

export const EnderecoFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const EnderecoRowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const FieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2px;
  width: 80%;
  transition: 0.2s ease all;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const SwitchLangDiv = styled.div`
  padding: 10px 15px;
  border-radius: 50px;
  background-color: white;
  color: black;
  display: flex;
  cursor: pointer;
  transition: 0.2s ease all;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 15px;
  right: 10px;
  width: 150px;
  z-index: 9999999999;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #115934;
    color: white;
    transform: scale(1.05);
  }
`;

export const CadastroFormContainer = styled.div`
  display: flex;
  border-radius: 16px;
  box-shadow: 0px 4px 8px 4px rgba(17, 89, 52, 0.04);
  overflow: hidden;
  width: 80vw;
  margin-bottom: 50px;

  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  min-height: 70vh;
  transition: 0.5s ease all;

  //animation
  animation: slide-up 500ms ease-out forwards;
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(4rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    width: 95vw;
  }
`;

export const FormNavigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #115934;
  color: white;
  flex: 1;
  padding-top: 50px;
  padding-left: 30px;
  h4 {
    font-weight: 800;
  }
  @media only screen and (max-width: 1024px) {
    padding: 20px;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding-right: 20px;
  width: 100%;
  @media only screen and (max-width: 1024px) {
    margin: 10px 0;
  }
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ selected }) => selected && "color: orange"};
  cursor: pointer;
  span {
    margin-left: 10px;
    transition: 0.4s ease all;
    &:hover {
      letter-spacing: 1px;
    }
  }
  transition: 0.3s ease all;
`;

export const StepTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const FinishedStep = styled(RiCheckDoubleFill)`
  color: green;
  font-size: 25px;
`;

export const Checked = styled(MdOutlineRadioButtonChecked)`
  color: orange;
`;
export const Unchecked = styled(MdOutlineRadioButtonUnchecked)`
  color: orange;
`;

export const StepDivider = styled.div`
  border-left: 1px dashed orange;
  height: 20px;
  margin-left: 6px;
`;

export const FormMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px 30px;
  background-color: white;
  color: #434343;
  flex: 3;
`;

export const CurrentStepDisplay = styled.div``;

export const ButtonDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

/////////////////////////////////////////////////////

export const StepInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  p {
    text-align: left;
    line-height: 1.7;
    margin-right: 50px;
  }
  //////////////////
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h4 {
    font-weight: 800;
    font-size: 22px;
  }
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
`;

export const HorizontalLogo = styled.img`
  margin-top: 10px;
  self-align: center;
  filter: grayscale(100%);
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PwdReq = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;

  color: ${({ error }) => (error ? "tomato" : "green")};
  transition: 0.3s ease all;
`;

export const ReqDone = styled(RiCheckDoubleFill)`
  font-size: 20px;
  margin-right: 5px;
`;

export const Section = styled.div`
  margin: 15px 0;
  transition: 0.5s ease;
  display: ${({ hide }) => (hide ? "none" : "flex")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SmsCodeDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const SmsCodeInput = styled.input`
  width: 50px;
  border-radius: 8px;
  text-align: center;
  font-size: 30px;
  padding: 5px 10px;
  margin: 10px 0;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  margin-right: 5px;
  &:focus {
    border: 1px solid #115934;
  }
`;

export const UploadImageDiv = styled.div`
  border: 1px dashed darkgreen;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  self-align: center;
  padding: 5px;
`;

export const PhotoIcon = styled(MdAddAPhoto)`
  font-size: 20px;
  padding: 30px;
  color: black;
`;

export const PhotoImg = styled.img`
  padding: 45px;
`;

export const UploadedDocumentsUl = styled.ul`
  margin-top: 20px;
  list-style: none;
  text-align: left;
`;

export const DocumentUploadProgress = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  flex-direction: column;
  width: 50%;
  margin: 10px 0;
`;

export const Hr = styled.hr`
  width: 100%;
  margin: 10px 0;
`;

export const InfoWrapper = styled.div`
  display: flex;
`;

export const InfoTitle = styled.span`
  font-weight: 800;
  margin-right: 5px;
`;

export const BoldTag = styled.span`
  font-weight: 800;
`;

export const ConfirmRegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 150px;
  h4 {
    margin-top: 30px;
  }
  p {
    margin: 20px 0;
  }
  @media only screen and (max-width: 1024px) {
    margin: 0px 20px;
  }
`;

export const LoadingNextStepDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
`;

export const Select = styled.select`
  width: 90%;
  height: 42px;
  margin-right: 20px;
  border-radius: 8px;
  padding: 9px 13px;
  font-size: 18px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  background: none;
  color: #242424;
  &:focus {
    border: 1px solid #115934;
  }
`;

export const Icon = styled.i`
  transform: translate(-40px, 15px);
`;

export const FieldIcon = styled.div`
  display: flex;
  width: 100%;
`;