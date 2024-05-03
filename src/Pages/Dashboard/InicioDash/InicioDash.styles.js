import styled from "styled-components";

export const InicioDashContainer = styled.div`
  background-color: #ffff;
  width: 100%;
  height: 100%;
  min-height: 89vh;
  border-radius: 8px;
  padding: 20px 25px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

export const Card = styled.div`
  width: 31%;
  height: 150px;
  border-radius: 8px;
  background-color: ${({ bgColor }) => bgColor};
  padding: 20px;
  margin: 10px;
  transition: 0.2s ease all;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const CardIcon = styled.div`
  margin-right: 10px;
  color: #ffff;
`;

export const CardTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #ffff;
`;

export const CardDesc = styled.p`
  line-height: 1.4;
  color: #ffff;
  font-size: 12px;
  width: 90%;
  margin-bottom: 10px;
`;
