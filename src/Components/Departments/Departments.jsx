import React from "react";
import { Category, CategoryWrapper, DepartmentsContainer, Title } from "./Departments.styles";

const departamentos = [
  {
    id: 1,
    title: "Açaí",
    path: "/",
  },
  {
    id: 2,
    title: "Castanha da Amazônia",
    path: "/",
  },
  {
    id: 3,
    title: "PANCs",
    path: "/",
  },
  {
    id: 4,
    title: "Óleos",
    path: "/",
  },

  {
    id: 6,
    title: "Sal",
    path: "/",
  },
  {
    id: 7,
    title: "Áçucar",
    path: "/",
  },
  {
    id: 8,
    title: "Madeira",
    path: "/",
  },
];

const Departments = () => {
  return (
    <DepartmentsContainer>
      <Title>Todos Departamentos</Title>
      <CategoryWrapper>
        {departamentos.map((c) => {
          return <Category key={c.id}>{c.title}</Category>;
        })}
      </CategoryWrapper>
    </DepartmentsContainer>
  );
};

export default Departments;
