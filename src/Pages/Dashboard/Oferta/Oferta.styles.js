import styled from "styled-components";
import reactSelect from "react-select";
import { BsInfoLg, BsCloudUpload } from "react-icons/bs";

export const OfertaContainer = styled.div`
  background-color: #ffff;
  width: 100%;
  height: 100%;
  min-height: 89vh;
  border-radius: 8px;
  padding: 20px 25px;
`;

export const OfertaNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 50px;
`;

export const NavItemContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

export const NavDivider = styled.hr`
  width: 100%;
  margin: 0 40px;
`;

export const StepTitle = styled.span`
  font-size: 14px;
  margin: 0 10px;
  transition: 0.3s ease all;
  ${({ isSelected }) => isSelected && "font-weight: 900"};
`;

export const StepIcon = styled.div`
  transition: 0.3s ease all;
  background-color: ${({ isSelected }) =>
    isSelected ? "#438B66" : "darkgray"};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const SectionTitle = styled.h4`
  margin-bottom: 15px;
`;
export const SectionDesc = styled.p``;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const Subsection = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const SubsectionDesc = styled.span`
  font-weight: 900;
  margin: 10px 0;
  color: ${({ naoFoiPreenchido }) => (naoFoiPreenchido ? "tomato" : "#242424")};
`;

export const FlexDiv = styled.div`
  display: flex;

  justify-content: space-evenly;
`;

export const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
`;

export const OfertaFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 5px 10px 0;
`;

export const FieldDesc = styled.span`
  cursor: default;
  font-family: "Work Sans", sans-serif;
  font-size: 16px;
  color: ${({ naoFoiPreenchido }) => (naoFoiPreenchido ? "tomato" : "#8f8f8f")};
`;

export const FieldInfo = styled(BsInfoLg)`
  margin-bottom: 5px;
  margin-left: 10px;
  color: black;
  font-size: 18px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.3);
  }
`;

export const SelectForm = styled.form`
  display: flex;
  ${({ type }) => type === "col" && "flex-direction: column"};
`;

export const InputFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 15px 0;
`;

export const Select = styled.select`
  width: 250px;
  height: 45px;
  margin-right: 20px;
  border-radius: 8px;
  padding: 11.5px 13px;
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

export const DateInput = styled.input`
  width: 300px;

  margin-right: 20px;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  background: none;
  color: #242424;
  &:focus {
    border: 1px solid #115934;
  }
  option {
    color: #242424;
  }
`;
export const Input = styled.input`
  width: ${({ w }) => (w ? `${w}px` : `250px`)};

  margin-right: 20px;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  background: none;
  color: #242424;
  &:focus {
    border: 1px solid #115934;
  }
  option {
    color: #242424;
  }
`;

/*==================STEP 1 - OFERTA INFO===============*/

export const OfertaInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddMoreOfferSpan = styled.span`
  color: darkblue;
  cursor: pointer;
`;

export const OfertaDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

export const CancelOferta = styled.div`
  align-self: flex-end;
  font-size: 30px;
  color: #8f8f8f;
`;

/*==================STEP 2 - OFERTA DETALHES ===============*/

export const OfertaDetalhesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea`
  width: 80%;
  margin-top: 10px;
  margin-right: 20px;
  border-radius: 8px;
  padding: 10px 15px;
  height: 100px;
  font-size: 16px;
  border: 1px solid ${({ error }) => (error ? "tomato" : "#8f8f8f")};
  outline: none;
  transition: 0.2s ease all;
  background: none;
  color: #242424;
  &:focus {
    border: 1px solid #115934;
  }
  option {
    color: #242424;
  }
`;

/*==================STEP 3 - OFERTA LOGISTICA ===============*/

export const OfertaLogContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrigemContainer = styled.div``;

export const TipoLogisticoContainer = styled.div``;

/*==================STEP 4 - OFERTA DETALHES ===============*/
export const OfertaAdicionaisContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoldText = styled.span`
  margin: 0 10px;
  font-weight: 800;
  font-size: 16px;
  color: darkgreen;
`;

export const CertLabel = styled.label`
  color: darkblue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const CertificadoDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerFotos = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 15px;
`;

export const ContainerUploadFotos = styled.div`
  display: flex;
`;
