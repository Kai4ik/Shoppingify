import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import LoginPopUp from "./loginPopUp";
import SignUpPopUp from "./signUpPopUp";
import {
  changeProductDetails,
  populateProductsData,
  populateCategories,
} from "../actions/itemsAction";
import {
  setCurrentMainSection,
  setCurrentSection,
} from "../actions/sectionActions";
import {
  findRequiredProductIndex,
  addProductToList,
  updateUser,
} from "../helperFunctions/helperFunctions";
import {
  MainSection,
  Items,
  ItemsGroup,
  Item,
  ItemTitle,
  Category,
} from "./reusableElements";
import axios from "axios";
import Cookies from "js-cookie";
import { useUpdateEffect } from "react-use";

const ItemsSectionTop = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemsSectionHeader = styled.h2`
  font-size: 2rem;
  width: 50%;
  display: inline-block;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1.4rem;
  }
`;

const HeaderTitle = styled.p`
  color: #f9a109;
  display: inline;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 270px;
  margin: 15px 0 0 150px;
  padding-left: 1rem;
  border-radius: 12px;
  background: white;
  color: #34333a;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  @media (max-width: 768px) {
    margin: 25px 0 0 0;
    width: 250px;
  }
`;

const SearchBox = styled.input.attrs({
  type: "search",
  placeholder: "search item",
})`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: inherit;
  outline: none;
  padding: 1.2rem;
`;

const WarningPopUp = styled.div`
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 8px solid #ffa502;
  border-radius: 6px;
  background-color: #feda9c;
  color: #cf8504;
  width: 380px;
  margin: auto;
  opacity: ${(props) => (props.showWarning ? "1" : "0")};
  transition: opacity 0.3s ease-in;
  @media (max-width: 768px) {
    width: 260px;
  }
`;

const WarningSign = styled.div`
  font-size: 24px;
  margin: 0 -20px 0 18px;
  @media (max-width: 768px) {
    margin: 0 14px 0 18px;
  }
`;

const WarningClose = styled.div`
  border-radius: 6px;
  background-color: #fecf83;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
`;

export default function ItemsList() {
  const [showWarning, setShowWarning] = useState(false);
  const [loginMode, setLoginMode] = useState(false);
  const [signUpMode, setSignUpMode] = useState(
    Cookies.get("token") === undefined ? true : false
  );
  const products = useSelector((state) => state.items.allProducts);
  const listProducts = useSelector((state) => state.user.currentListProducts);
  const categories = useSelector((state) => state.items.categories);
  const dispatch = useDispatch();
  const width = window.innerWidth;

  useEffect(() => {
    const populateNewCategories = [];
    axios.get("api/items").then((response) => {
      dispatch(populateProductsData(response.data));
      response.data.map((product) => {
        if (populateNewCategories.indexOf(product.category) === -1)
          populateNewCategories.push(product.category);
      });
      dispatch(populateCategories(populateNewCategories));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    updateUser(listProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProducts]);

  const handleAddToList = (item) => {
    if (findRequiredProductIndex(listProducts, item) === -1)
      addProductToList(dispatch, item);
    else setShowWarning(!showWarning);
  };

  const showProductDetails = (item) => {
    width > 768
      ? dispatch(setCurrentSection("details"))
      : dispatch(setCurrentMainSection("details"));
    const itemDetails = {};
    itemDetails.itemName = item.itemName;
    itemDetails.note = item.note;
    itemDetails.imageURL = item.imageURL;
    itemDetails.category = item.category;
    dispatch(changeProductDetails(itemDetails));
  };

  return (
    <MainSection>
      <LoginPopUp
        loginMode={loginMode}
        setLoginMode={setLoginMode}
        setSignUpMode={setSignUpMode}
      ></LoginPopUp>
      <SignUpPopUp
        signUpMode={signUpMode}
        setSignUpMode={setSignUpMode}
        setLoginMode={setLoginMode}
      ></SignUpPopUp>
      <ItemsSectionTop>
        <ItemsSectionHeader>
          <HeaderTitle>Shoppingify</HeaderTitle> allows you to take your
          shopping list wherever you go
        </ItemsSectionHeader>
        <Search>
          <FontAwesomeIcon icon={faSearch} />
          <SearchBox></SearchBox>
        </Search>
      </ItemsSectionTop>
      {categories.map((category) => (
        <ItemsGroup key={`${category}Items`}>
          <Category size="1.4rem"> {category} </Category>
          <Items>
            {products.map(
              (item) =>
                item.category.toUpperCase() === category.toUpperCase() && (
                  <Item key={`${item.itemName}ID`}>
                    <ItemTitle onClick={() => showProductDetails(item)}>
                      {item.itemName}
                    </ItemTitle>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => handleAddToList(item)}
                    />
                  </Item>
                )
            )}
          </Items>
        </ItemsGroup>
      ))}
      <WarningPopUp showWarning={showWarning}>
        <WarningSign>
          <FontAwesomeIcon icon={faExclamationCircle} />
        </WarningSign>
        This product already in your list
        <WarningClose onClick={() => setShowWarning(!showWarning)}>
          <FontAwesomeIcon icon={faTimes} />
        </WarningClose>
      </WarningPopUp>
    </MainSection>
  );
}
