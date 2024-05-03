import styled from "styled-components";

export const LPSectionContainer = styled.div`
  margin: 1.8rem auto;
`;

export const SelectCategoryContainer = styled.div`
  display: flex;
`;

export const Category = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  margin: 10px 0;
  text-transform: uppercase;
  color: #242424;
  ${({ id, currentSelected }) =>
    id === currentSelected && "border-bottom: 3px solid green"};
  @media only screen and (max-width: 1025px) {
    padding: 10px;
    font-size: 16px;
  }
`;

export const ProductShowcase = styled.div`
  display: flex;
  flex-wrap: wrap;
  //animation
  animation: slide-down 700ms ease-out forwards;
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

export const Product = styled.div`
  border-radius: 12px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  @media only screen and (max-width: 1025px) {
    width: 100%;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CategoriaTag = styled.div`
  padding: 5px 15px;
  background-color: ${({ categoria }) => (categoria ? "green" : "red")};
  color: #ffffff;
  text-transform: uppercase;
  border-radius: 12px;
  margin: 10px;
  font-size: 14px;
  cursor: default;
`;

export const ExtraTag = styled.div`
  padding: 5px 15px;
  background-color: orange;
  color: #ffffff;
  text-transform: uppercase;
  border-radius: 12px;
  margin: 10px;
  font-size: 14px;
  cursor: default;
`;

export const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ProdImg = styled.img`
  width: 275px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const ProductCode = styled.span`
  color: gray;
  font-style: italic;
`;

export const ProductName = styled.span`
  color: #242424;
  margin: 10px 0;
  text-align: center;
`;

export const InfoWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 5px 0;
`;

export const InfoTitle = styled.span`
  color: #115934;
`;

export const InfoValue = styled.span`
  color: #242424;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 290px;
  font-size: 14px;
`;

export const DetailsBtn = styled.button`
  background-color: white;
  padding: 8px 12px;
  color: #115934;
  border: none;
  border-radius: 10px;
  width: 130px;
  transition: 0.2s ease all;
  &:hover {
    color: #ffffff;
    background-color: #115934;
  }
`;

export const NegociarBtn = styled.button`
  background-color: #115934;
  padding: 8px 12px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  width: 110px;
  &:hover {
    background-color: #0c3d23;
  }
`;

export const ProductNotFound = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: center;
  align-items: center;
`;
