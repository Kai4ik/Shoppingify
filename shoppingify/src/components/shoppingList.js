import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../images/source.svg";
import shopLogo from "../images/shoppingList.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faMinus,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMainSection,
  setCurrentSection,
} from "../actions/sectionActions";
import {
  changeListName,
  addList,
  changeProductQty,
  populateListWithData,
} from "../actions/userActions";
import {
  findRequiredProductIndex,
  checkCategoryOnProductsExistence,
} from "../helperFunctions/helperFunctions";
import {
  Button,
  NotificationBackground,
  PopUpWindow,
  ClosePopUp,
} from "./reusableElements";
import axios from "axios";
import Cookies from "js-cookie";
import { useUpdateEffect } from "react-use";

const ShoppingListSection = styled.section`
  position: fixed;
  right: 0;
  width: 27vw;
  height: 100vh;
  overflow: hidden;
  background: #fff0de;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 84vw;
  }
`;

const ShoppingListMain = styled.section`
  height: 85vh;
  overflow-y: scroll;
  padding: 0 2.4rem 2rem 2.4rem;
  width: 100%;
  @media (max-width: 768px) {
    padding: 0 1.4rem 2rem 1.4rem;
  }
`;

const AddItemSection = styled.div`
  display: flex;
  align-items: center;
  height: 120px;
  margin: 50px 2rem 0 2rem;
  background: #80485b;
  border-radius: 24px;
  @media (max-width: 768px) {
    margin: 30px 0.5rem 40px 0.5rem;
  }
`;

const SourceImg = styled.img`
  width: 30%;
  height: 130px;
  position: relative;
  bottom: 20px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  margin-left: 20px;
  color: #fff;
`;

const AddButton = styled.button`
  background: #fff;
  font-weight: 600;
  font-size: 14px;
  color: #34333a;
  border: none;
  outline: none;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  height: 34px;
  width: 70%;
  cursor: pointer;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  color: #34333a;
  cursor: pointer;
`;

const ListTitle = styled.h3`
  font-size: 24px;
`;

const Categories = styled.h4`
  color: #828282;
  font-weight: 500;
  font-size: 14px;
  align-self: flex-start;
  margin-top: 2rem;
`;

const ItemSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
`;

const ItemName = styled.p`
  font-weight: 600;
  font-size: 18px;
  width: 45%;
`;

const ItemAmount = styled.div`
  border: 2px solid #f9a109;
  border-radius: 24px;
  padding: 2px 10px;
  color: #f9a10a;
  cursor: default;
`;

const ChangeQtyBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #f9a109;
  background: white;
  border-radius: 12px;
  transition: all 0.3s linear;
  padding-right: ${(props) => props.paddingRight};
  cursor: pointer;
  font-size: 0.8rem;
`;

const DeleteItem = styled.div`
  background: #f9a109;
  color: white;
  border-radius: 12px;
  padding: 12px;
`;

const EnterSection = styled.div`
  width: 100%;
  background: white;
  padding: 2rem 4rem;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const EnterItemField = styled.div`
  display: flex;
`;

const InputBox = styled.input.attrs({
  type: "text",
  placeholder: "Enter a name",
})`
  height: 100%;
  width: 100%;
  border: 2px solid #f9a109;
  border-radius: 12px;
  outline: none;
  padding: 1.3rem;
  padding-right: 7rem;
  font-size: 18px;
`;

const CheckProduct = styled.input.attrs({
  type: "checkbox",
})`
  margin-right: ${(props) => props.marginRight};
  width: 16px;
  height: 20px;
`;

const SaveBtn = styled.button`
  position: absolute;
  right: 4rem;
  padding: 1.5rem 2rem;
  background: #f9a109;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: white;
  @media (max-width: 768px) {
    right: 1.6rem;
  }
`;

const EmptySection = styled.div`
  width: 100%;
  height: 79%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const EmptyList = styled.div`
  margin-top: 70%;
  color: #34333a;
  font-size: 24px;
  font-weight: 600;
`;

const ShopLogo = styled.img`
  width: 80%;
`;

const CancelNotificationText = styled.p`
  font-size: 24px;
  color: #34333a;
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 0px 20px;
    margin-top: -10px;
  }
`;

const CancelBtn = styled.div`
  display: flex;
  margin-top: 10%;
  margin-left: 50%;
`;

export default function ShoppingList() {
  const [currentListName, setCurrentListName] = useState(
    useSelector((state) => state.user.currentListName)
  );
  const [editMode, setEditMode] = useState(false);
  const [cancelMode, setCancelMode] = useState(false);
  const [completeProducts, setCompleteProducts] = useState([]);
  let products = useSelector((state) => state.user.currentListProducts);
  const categories = useSelector((state) => state.items.categories);
  const allLists = useSelector((state) => state.user.allUserLists);
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const changeQty = (measurement, product) => {
    const foundProduct = findRequiredProductIndex(products, product);
    measurement === "+"
      ? products[foundProduct].itemAmount++
      : products[foundProduct].itemAmount > 1
      ? products[foundProduct].itemAmount--
      : (products[foundProduct].itemAmount = 1);
    dispatch(changeProductQty(products));
  };

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((response) =>
        dispatch(populateListWithData(response.data.listProducts))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    axios({
      url: "/api/users/verifyAndUpdate",
      method: "post",
      data: {
        listProducts: products,
      },
      headers: {
        Authorization: Cookies.get("token"),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useUpdateEffect(() => {
    axios({
      url: "/api/users/verifyAndUpdate",
      method: "post",
      data: {
        allUserLists: allLists,
      },
      headers: {
        Authorization: Cookies.get("token"),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLists]);

  const deleteItemFromList = (product) => {
    const foundProduct = findRequiredProductIndex(products, product);
    products.splice(foundProduct, 1);
    dispatch(changeProductQty(products));
  };

  const NoCancelConfirmation = () => {
    setCancelMode(false);
    setEditMode(false);
  };

  const CancelConfirmation = () => {
    setCancelMode(false);
    setEditMode(false);
    const newList = {
      listName: currentListName,
      date: new Date(),
      status: false,
      listProducts: [...products],
    };
    products.splice(0, products.length);
    dispatch(changeProductQty(products));
    dispatch(addList(newList));
  };

  const checkProduct = (e, item) => {
    if (e.target.checked) {
      completeProducts.push(item);
    } else {
      const foundProduct = findRequiredProductIndex(completeProducts, item);
      completeProducts.splice(foundProduct, 1);
    }
  };

  const completeList = () => {
    setEditMode(false);
    const newList = {
      listName: currentListName,
      date: new Date(),
      status: true,
      listProducts: [...completeProducts],
    };
    products = products.filter(
      (product) => !completeProducts.includes(product)
    );
    dispatch(changeProductQty(products));
    dispatch(addList(newList));
    setCompleteProducts([]);
  };

  return (
    <>
      <ShoppingListSection>
        <NotificationBackground
          displayNotification={cancelMode ? "block;" : "none;"}
        ></NotificationBackground>
        <PopUpWindow
          showPopUp={cancelMode ? "block;" : "none;"}
          popUpTop="35%"
          popUpHeight="220px"
          popUpWidth="480px"
        >
          <ClosePopUp onClick={() => setCancelMode(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </ClosePopUp>
          <CancelNotificationText>
            Are you sure that you want to cancel this list ?
          </CancelNotificationText>
          <CancelBtn>
            <Button
              color="#34333A;"
              backgroundColor="transparent;"
              btnWidth="80px"
              onClick={() => NoCancelConfirmation()}
            >
              cancel
            </Button>
            <Button
              color="white"
              backgroundColor="#EB5757;"
              btnWidth="80px"
              onClick={() => CancelConfirmation()}
            >
              Yes
            </Button>
          </CancelBtn>
        </PopUpWindow>
        <ShoppingListMain>
          <AddItemSection>
            <SourceImg src={logo} alt="Logo" />
            <TextSection>
              <h4> Didn't find what you need ? </h4>
              <AddButton
                onClick={() =>
                  dispatch(
                    width > 768
                      ? setCurrentSection("addItemSection")
                      : setCurrentMainSection("addItemSection")
                  )
                }
              >
                Add item
              </AddButton>
            </TextSection>
          </AddItemSection>
          {products.length > 0 ? (
            <>
              <TitleSection>
                <ListTitle> {currentListName} </ListTitle>
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => setEditMode(true)}
                />
              </TitleSection>
              {categories.map(
                (category) =>
                  checkCategoryOnProductsExistence(category, products) && (
                    <div key={`${category}Items`}>
                      <Categories>{category}</Categories>
                      {products.map(
                        (item) =>
                          item.category.toUpperCase() ===
                            category.toUpperCase() && (
                            <ItemSection key={`${item.itemName}ID`}>
                              {editMode && (
                                <CheckProduct
                                  marginRight={editMode ? "-55px" : "5px"}
                                  onChange={(e) => checkProduct(e, item)}
                                ></CheckProduct>
                              )}
                              <ItemName>{item.itemName}</ItemName>
                              <ChangeQtyBtn
                                paddingRight={editMode ? "0px" : "15px"}
                              >
                                {!editMode && (
                                  <DeleteItem
                                    onClick={() => deleteItemFromList(item)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </DeleteItem>
                                )}
                                {!editMode && (
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    onClick={() => changeQty("-", item)}
                                  />
                                )}
                                <ItemAmount>
                                  {item.itemAmount} {width > 768 && "pcs"}
                                </ItemAmount>
                                {!editMode && (
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() => changeQty("+", item)}
                                  />
                                )}
                              </ChangeQtyBtn>
                            </ItemSection>
                          )
                      )}
                    </div>
                  )
              )}
            </>
          ) : (
            <EmptySection>
              <EmptyList> No items </EmptyList>
              <ShopLogo src={shopLogo} alt="ShopLogo" />
            </EmptySection>
          )}
        </ShoppingListMain>
        <EnterSection>
          <EnterItemField>
            {editMode ? (
              <>
                <Button
                  color="black"
                  backgroundColor="transparent"
                  btnWidth="120px"
                  onClick={() => setCancelMode(true)}
                >
                  cancel
                </Button>
                <Button
                  color="white"
                  backgroundColor="#56CCF2;"
                  btnWidth="120px"
                  onClick={() => completeList()}
                >
                  Complete
                </Button>
              </>
            ) : (
              <>
                <InputBox
                  value={currentListName}
                  onChange={(e) => setCurrentListName(e.target.value)}
                />
                <SaveBtn
                  onClick={() => dispatch(changeListName(currentListName))}
                >
                  Save
                </SaveBtn>
              </>
            )}
          </EnterItemField>
        </EnterSection>
      </ShoppingListSection>
    </>
  );
}
