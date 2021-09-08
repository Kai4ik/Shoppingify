import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHistory,
  faChartBar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentMainSection } from "../actions/sectionActions";

const NavSection = styled.section`
  position: fixed;
  width: 5vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  @media (max-width: 768px) {
    width: 16vw;
    background: white;
  }
`;

const LogoImage = styled.img`
  width: 50%;
  height: 50px;
  @media (max-width: 768px) {
    width: 66%;
  }
`;

const MenuOptions = styled.span`
  color: #454545;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 25px;
  height: 25%;
  width: 100%;
  @media (max-width: 768px) {
    height: 35%;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  background-color: #454545;
  color: #fff;
  text-align: center;
  padding: 2px 20px;
  border-radius: 6px;
  position: absolute;
  left: 80px;
  top: 30%;
  font-size: 12px;
  transition: visibility 0.2s linear;
`;

const MenuOption = styled.span`
  position: relative;
  text-align: center;
  padding: 0.5rem;
  transition: border-left 0.3s linear;
  cursor: pointer;
  &:hover {
    border-left: 10px solid #f9a109;
  }

  &:hover ${Tooltip} {
    visibility: visible;
  }
`;

const ListBtn = styled.div`
  font-size: 20px;
  color: white;
  background: #f9a109;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

export default function Navigation() {
  const dispatch = useDispatch();
  const width = window.innerWidth;

  return (
    <NavSection>
      <LogoImage src={logo} alt="Logo" />
      <MenuOptions>
        <MenuOption>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => dispatch(setCurrentMainSection("itemsList"))}
          />
          <Tooltip> items </Tooltip>
        </MenuOption>
        <MenuOption>
          <FontAwesomeIcon
            icon={faHistory}
            onClick={() => dispatch(setCurrentMainSection("history"))}
          />
          <Tooltip> history </Tooltip>
        </MenuOption>
        <MenuOption>
          <FontAwesomeIcon
            icon={faChartBar}
            onClick={() => dispatch(setCurrentMainSection("statistics"))}
          />
          <Tooltip> statistics </Tooltip>
        </MenuOption>
      </MenuOptions>
      <ListBtn
        onClick={() =>
          width > 768 ? null : dispatch(setCurrentMainSection("shoppingList"))
        }
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </ListBtn>
    </NavSection>
  );
}
