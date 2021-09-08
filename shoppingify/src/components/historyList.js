import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { setCurrentMainSection } from "../actions/sectionActions";
import { format } from "date-fns";
import { checkCategoryOnProductsExistence } from "../helperFunctions/helperFunctions";
import {
  Items,
  Item,
  ItemsGroup,
  ItemTitle,
  ListDate,
  BackBtn,
  Category,
  MainSection,
} from "./reusableElements";

const ListTitle = styled.h3`
  font-size: 30px;
  margin-bottom: 2vh;
`;

const DateSection = styled.div`
  display: flex;
  color: #c1c1c4;
  margin-bottom: 6vh;
`;

const ItemAmount = styled.div`
  color: #f9a10a;
  cursor: default;
`;

export default function HistoryList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.items.categories);
  const listToShow = useSelector((state) => state.user.showHistoryList);

  return (
    <MainSection>
      <BackBtn
        btnWidth="9%"
        onClick={() => dispatch(setCurrentMainSection("history"))}
      >
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
        back
      </BackBtn>
      <ListTitle> {listToShow.listName} </ListTitle>
      <DateSection>
        <FontAwesomeIcon icon={faCalendarAlt} />
        <ListDate>
          {format(new Date(listToShow.date), "EE, yyyy-MM-dd")}
        </ListDate>
      </DateSection>
      {categories.map(
        (category) =>
          checkCategoryOnProductsExistence(
            category,
            listToShow.listProducts
          ) && (
            <ItemsGroup key={`${category}Items`}>
              <Category size="1.2rem"> {category} </Category>
              <Items>
                {listToShow.listProducts.map(
                  (item) =>
                    item.category.toUpperCase() === category.toUpperCase() && (
                      <Item key={`${item.itemName}ID`}>
                        <ItemTitle>{item.itemName}</ItemTitle>
                        <ItemAmount> {item.itemAmount} pcs</ItemAmount>
                      </Item>
                    )
                )}
              </Items>
            </ItemsGroup>
          )
      )}
    </MainSection>
  );
}
