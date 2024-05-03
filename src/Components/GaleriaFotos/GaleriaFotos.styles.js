import styled from "styled-components";

export const GaleriaFotosContainer = styled.div`
  background-color: #ffffff;

  border-radius: 16px;
  margin: 15px 0;
  padding: 25px 45px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
`;

export const FotosDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 15px 0;
`;

export const Foto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  &:hover {
    transform: scale(1.1);
  }
  margin: 0 5px;
  transition: 0.3s;
`;
