import React from "react";
import Departments from "../Departments/Departments";
import DestaqueCarousel from "./DestaqueCarousel";
import { DestaquesSectionContainer } from "./DestaquesSection.styles";

const DestaquesSection = () => {
  return (
    <DestaquesSectionContainer>
      {/* <Departments /> */}
      <DestaqueCarousel />
    </DestaquesSectionContainer>
  );
};

export default DestaquesSection;
