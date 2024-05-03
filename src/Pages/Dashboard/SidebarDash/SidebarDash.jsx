import React, { useState, useContext } from "react";
import {
  NavMenu,
  NavList,
  NavLogo,
  SearchBtn,
  SearchContainer,
  SearchInput,
  SidebarContainer,
  SidebarContent,
  SidebarNavigation,
  Content,
  AlertSpan,
  UserTagContainer,
  UserTag,
  InfoDiv,
  EmpresaTag,
  EmpresaNome,
  UsuarioNome,
} from "./SidebarDash.styles";
import {
  RiHomeLine,
  RiUserSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { FiBell, FiFileText, FiDownload, FiUpload } from "react-icons/fi";

import { BiCog } from "react-icons/bi";
import logo from "../../../Assets/directto_logo.png";
import { GoSearch } from "react-icons/go";
import { IoGridOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBoxSeam, BsShop, BsPinMap } from "react-icons/bs";
import { BiBox } from "react-icons/bi";
import NavItem from "./NavItem";
import LoginCtx from "../../../Context/LoginContext";
import ModalCtx from "../../../Context/ModalContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import GlobalDataCtx from "../../../Context/GlobalDataContext";

const SidebarDash = () => {
  let navigate = useNavigate();

  //conteudo sendo exibido no menu lateral direito (content)
  const [sidebarContent, setSidebarContent] = useState(1);

  const { state, dispatch } = useContext(LoginCtx);
  const { modalDispatch } = useContext(ModalCtx);
  const { globalCtx, globalCtxDispatch } = useContext(GlobalDataCtx);

  const stringLogoutMsg = globalCtx.idioma
    ? "Você se desconectou. Agora está como visitante."
    : "You are now connected as visitor.";

  const empresaLogada = globalCtx?.listaEmpresas?.find(
    (emp) => emp.EMP_Id === state.empresaId
  );

  const loginStateHandler = () => {
    modalDispatch({
      type: "CONFIG_MODAL",
      value: {
        display: true,
        title: "Logout",
        text: globalCtx.idioma
          ? `Você está conectado como: ${state.userLoggedIn}. Deseja desconectar?`
          : `Connected as: ${state.userLoggedIn}. Do you want to logout?`,
        modalWithBtn: true,
        confirmBtnTxt: globalCtx.idioma ? "Desconectar" : "Logout",
        cancelBtnTxt: globalCtx.idioma ? "Cancelar" : "Cancel",
        cancelHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
        },
        confirmHandler: () => {
          modalDispatch({ type: "SET_DISPLAY", value: false });
          navigate("/", { replace: true });
          dispatch({ type: "LOGOUT" });
          toast.info(stringLogoutMsg);
        },
      },
    });
  };

  const navData = {
    //menu de navegação
    navMenu: [
      {
        title: globalCtx.idioma ? "Início" : "Home",
        id: 1,
        icon: <RiHomeLine />,
        navItems: [
          {
            title: "Dashboard",
            id: Math.random(),
            icon: <IoGridOutline />,
            accessLevels: [1, 17, 18, 23],
            hasSubNav: false,
            subNavItems: [],
            path: "/dashboard",
          },
          {
            title: globalCtx.idioma ? "Negociações" : "Deals",
            id: Math.random(),
            accessLevels: [1, 17, 18, 23],
            icon: <TbReportMoney />,
            path: "negociacoes",
          },
          {
            title: globalCtx.idioma ? "Gerenciamento" : "Management",
            id: Math.random(),
            accessLevels: [1, 17],
            icon: <VscGraph />,
            hasSubNav: true,
            subNavItems: [
              // {
              //   id: Math.random(),
              //   title: globalCtx.idioma ? "Categorias" : "Categories",
              //   icon: <AiOutlineUnorderedList />,
              //   path: "",
              // },
              // {
              //   id: Math.random(),
              //   title: globalCtx.idioma ? "Produtos" : "Products",
              //   icon: <BsBoxSeam />,
              //   path: "",
              // },

              {
                id: Math.random(),
                title: globalCtx.idioma ? "Fornecedores" : "Suppliers",
                icon: <BsShop />,
                path: "gerenciamento/fornecedores",
              },
              {
                id: Math.random(),
                title: globalCtx.idioma ? "Ofertas" : "Offers",
                icon: <BsBoxSeam />,
                path: "gerenciamento/ofertas",
              },
            ],
            path: "",
          },
          // {
          //   title: globalCtx.idioma ? "Armazenagem" : "Storage",
          //   id: Math.random(),
          //   icon: <BiBox />,
          //   accessLevels: [1, 17],
          //   hasSubNav: true,
          //   subNavItems: [
          //     {
          //       id: Math.random(),
          //       title: globalCtx.idioma ? "Localização" : "Localization",
          //       icon: <BsPinMap />,
          //       path: "",
          //     },
          //     {
          //       id: Math.random(),
          //       title: globalCtx.idioma ? "Receber" : "Receive",
          //       icon: <FiDownload />,
          //       path: "",
          //     },
          //     {
          //       id: Math.random(),
          //       title: globalCtx.idioma ? "Entregar" : "Deliver",
          //       icon: <FiUpload />,
          //       path: "",
          //     },
          //   ],
          //   path: "",
          // },
        ],
      },
      // {
      //   title: globalCtx.idioma ? "Notificações" : "Notifications",
      //   id: 2,
      //   navItems: [],
      //   icon: <FiBell />,
      // },
      // {
      //   title: globalCtx.idioma ? "Configurações de Usuário" : "User Settings",
      //   id: 3,
      //   icon: <RiUserSettingsLine />,
      //   navItems: [],
      // },
      // {
      //   title: globalCtx.idioma ? "Configurações Gerais" : "General Settings",
      //   id: 4,
      //   icon: <BiCog />,
      //   navItems: [],
      // },
    ],
  };
  return (
    <>
      <SidebarContainer>
        <SidebarNavigation>
          <NavList>
            <NavLogo
              src={logo}
              onClick={() => {
                navigate("/", { replace: true });
              }}
            />
            {navData.navMenu.map((nav) => {
              return (
                <NavMenu
                  key={nav.id}
                  data-tip={nav.title}
                  onClick={() => {
                    navigate("/", { replace: true });
                  }}
                >
                  {nav.icon}
                </NavMenu>
              );
            })}
            <NavMenu onClick={loginStateHandler}>
              <RiLogoutBoxLine />
            </NavMenu>
          </NavList>
        </SidebarNavigation>
        <SidebarContent>
          <UserTagContainer>
            <UserTag />
            <InfoDiv>
              <UsuarioNome>{state.userLoggedIn}</UsuarioNome>
            </InfoDiv>
          </UserTagContainer>
          <UserTagContainer>
            <InfoDiv>
              <EmpresaNome>{empresaLogada?.EMP_RazaoSocial}</EmpresaNome>
            </InfoDiv>
          </UserTagContainer>
          {/* <SearchContainer>
            <SearchInput
              type="text"
              placeholder={globalCtx.idioma ? "Procurar..." : "Search"}
            />
            <SearchBtn>
              <GoSearch />
            </SearchBtn>
          </SearchContainer> */}
          <Content>
            {/* ====== INICIO ======= */}
            {sidebarContent === 1 &&
              navData.navMenu[0].navItems.map((nav) => {
                if (nav.accessLevels.includes(state.perfilUsuario)) {
                  return (
                    <NavItem
                      key={nav.id}
                      icon={nav.icon}
                      title={nav.title}
                      hasSubnav={nav.hasSubNav}
                      navItem={nav}
                    />
                  );
                }
              })}
            {/* ====== NOTIFICAÇOES ======= */}
            {sidebarContent === 2 && (
              <AlertSpan>Aba NOTIFICAÇÕES em desenvolvimento</AlertSpan>
            )}
            {/* ====== USER CONFIG ======= */}
            {sidebarContent === 3 && (
              <AlertSpan>Aba CONFIG DE USUÁRIO em desenvolvimento</AlertSpan>
            )}
            {/* ======  CONFIG ======= */}
            {sidebarContent === 4 && (
              <AlertSpan>Aba CONFIG GERAL em desenvolvimento</AlertSpan>
            )}
          </Content>
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default SidebarDash;
