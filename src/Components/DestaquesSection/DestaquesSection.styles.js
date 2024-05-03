import styled from "styled-components";

export const DestaquesSectionContainer = styled.div`
  margin-top: 50px;
  display: flex;
  @media only screen and (max-width: 1025px) {
    margin-top: 20px;
    flex-direction: column-reverse;
  }
`;
