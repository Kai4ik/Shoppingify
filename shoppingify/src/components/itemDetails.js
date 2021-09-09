import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMainSection,
  setCurrentSection,
} from "../actions/sectionActions";
import { deleteProduct } from "../actions/itemsAction";
import { populateListWithData } from "../actions/userActions";
import {
  addProductToList,
  updateUser,
} from "../helperFunctions/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { findRequiredProductIndex } from "../helperFunctions/helperFunctions";
import { BackBtn, Button } from "./reusableElements";
import axios from "axios";
import Cookies from "js-cookie";

const Details = styled.section`
  position: fixed;
  right: 0;
  width: 27vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 3.5rem 3rem 3.5rem;
  overflow: hidden;
  background: white;
  overflow-y: scroll;
  @media (max-width: 768px) {
    position: absolute;
    width: 84vw;
    padding: 2rem;
    background: #fafafe;
  }
`;

const ProductImg = styled.img`
  width: 100%;
  max-height: 300px;
  border-radius: 29px;
`;

const ItemInfo = styled.p`
  font-size: 14px;
  color: #c1c1c4;
  margin: 40px 0 10px 0;
  padding-left: 10px;
`;

const ItemInfoContent = styled.p`
  font-size: ${(props) => props.size};
  padding-left: 10px;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 5vh;
`;

export default function ItemDetails() {
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const itemDetails = useSelector((state) => state.items.productDetails);
  const listProducts = useSelector((state) => state.user.currentListProducts);
  const allProducts = useSelector((state) => state.items.allProducts);

  useEffect(() => {
    axios
      .get("api/users", {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((response) =>
        dispatch(populateListWithData(response.data.listProducts))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCurrentProductToList = () => {
    if (findRequiredProductIndex(listProducts, itemDetails) === -1) {
      addProductToList(dispatch, itemDetails);
      listProducts.push({
        itemName: itemDetails.itemName,
        itemAmount: 1,
        category: itemDetails.category,
      });
      updateUser(listProducts);
    }

    dispatch(
      width > 768
        ? setCurrentSection("shoppingList")
        : setCurrentMainSection("itemsList")
    );
  };

  const deleteCurrentProduct = () => {
    const foundProduct = findRequiredProductIndex(allProducts, itemDetails);
    allProducts.splice(foundProduct, 1);
    axios
      .delete("http://localhost:5000/api/items", {
        data: { itemName: itemDetails.itemName },
      })
      .then((response) => {
        if (response.data.deleted) dispatch(deleteProduct(allProducts));
      });
    dispatch(
      width > 768
        ? setCurrentSection("shoppingList")
        : setCurrentMainSection("itemsList")
    );
  };

  return (
    <Details>
      <BackBtn
        btnWidth="25%"
        onClick={() =>
          dispatch(
            width > 768
              ? setCurrentSection("shoppingList")
              : setCurrentMainSection("itemsList")
          )
        }
      >
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
        back
      </BackBtn>
      <ProductImg src={itemDetails.imageURL} alt="Product Image" />
      <ItemInfo> name </ItemInfo>
      <ItemInfoContent size="22px"> {itemDetails.itemName} </ItemInfoContent>
      <ItemInfo> category </ItemInfo>
      <ItemInfoContent size="18px"> {itemDetails.category} </ItemInfoContent>
      <ItemInfo> note </ItemInfo>
      <ItemInfoContent size="18px"> {itemDetails.note} </ItemInfoContent>
      <Buttons>
        <Button
          color="black"
          backgroundColor="transparent"
          btnWidth="120px"
          onClick={() => deleteCurrentProduct()}
        >
          delete
        </Button>
        <Button
          color="white"
          backgroundColor="#f9a109"
          btnWidth="120px"
          onClick={() => addCurrentProductToList()}
        >
          Add to list
        </Button>
      </Buttons>
    </Details>
  );
}
