import styled from "styled-components";

export const LoadingDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 700;
  }
`;

export const PesquisaDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const OfertaRow = styled.tr`
  cursor: pointer;
  td {
    text-align: center;
  }
`;

export const ListaDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DetalhesDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetalhesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderTitle = styled.h4`
  margin: 0;
  padding: 0;
`;

export const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldWrapper = styled.div`
  font-size: 18px;
  display: flex;

  flex-direction: ${({ status }) => {
    return status ? "column" : "row";
  }};
  align-items: ${({ status }) => {
    return status ? "left" : "center";
  }};
  margin-right: 10px;
  padding: 6px;
`;

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 6px;
  font-size: 18px;
  p {
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 10px;
    width: 70%;
  }
`;

export const FieldTitle = styled.span`
  font-weight: 700;
  margin-right: 5px;
  padding: 2px;
`;

export const DadosOfertaDiv = styled.div`
  display: flex;

  flex-wrap: wrap;
`;
export const DadosEmpresaDiv = styled.div`
  display: flex;

  flex-wrap: wrap;
`;

export const SectionTitle = styled.h5`
  margin-bottom: 20px;
  padding: 0;
`;
