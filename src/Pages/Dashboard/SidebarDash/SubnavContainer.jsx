import React, { useState } from "react";
import styled from "styled-components";

export const SubnavContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubnavContainer = ({ children }) => {
  const [showChildren, setShowChildren] = useState(true);

  return (
    <SubnavContainerDiv
      onClick={() => {
        setShowChildren(!showChildren);
      }}
    >
      {showChildren && children}
    </SubnavContainerDiv>
  );
};

export default SubnavContainer;
