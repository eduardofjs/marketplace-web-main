import styled from "styled-components";

export const EmpresasSectionContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);

  margin-top: 40px;
`;

export const EmpresasTopbar = styled.div`
  background-color: #ebebeb;
  max-height: 35px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const EmpresasList = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  @media only screen and (max-width: 1025px) {
    flex-wrap: wrap;
  }
`;

export const EmpresasTitle = styled.span`
  text-transform: uppercase;
  color: #ffffff;
  background: #115934;
  height: 45px;
  padding: 15px;
  position: relative;
  bottom: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
`;

export const EmpresaItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
  img {
    width: 150px;
  }
`;
