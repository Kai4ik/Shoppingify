import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMainSection,
  setCurrentSection,
} from "../actions/sectionActions";
import { addNewProduct, addNewCategory } from "../actions/itemsAction";
import { Button } from "./reusableElements";
import axios from "axios";

const AddItemSection = styled.section`
  width: 27vw;
  background: #fafafe;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px 0;
  @media (max-width: 768px) {
    position: absolute;
    right: 0;
    width: 84vw;
    padding: 30px 0 2rem 1.6rem;
    min-height: 100vh;
  }
`;

const AddItemTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 30px;
`;

const FormField = styled.div`
  width: 66%;
  margin-bottom: 14px;
  @media (max-width: 768px) {
    width: 74%;
  }
`;

const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #34333a;
`;

let FieldInput = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder,
}))`
  height: 60px;
  width: 120%;
  border: 2px solid ${(props) => (props.dataStatus ? "#bdbdbd" : "#f44336")};
  border-radius: 12px;
  outline: none;
  margin-top: 6px;
  padding: 1rem;
  font-size: 18px;
  background: #fafafe;
  transition: border-color 0.3s linear;
  &:focus {
    border: 2px solid #f9a109;
  }
`;

const FieldTextarea = styled(FieldInput).attrs({
  as: "textarea",
})`
  border: 2px solid #bdbdbd;
  height: 120px;
  font-family: "Quicksand", sans-serif;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  padding: 0 10px;
  margin: 10px 0;
  transition: opacity 0.3s ease-out;
  opacity: ${(props) => (props.showError ? 0 : 1)};
`;

const OptionsList = styled.ul`
  width: 120%;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
`;

const Option = styled.li`
  color: #828282;
  font-weight: 500;
  font-size: 18px;
  list-style: none;
  padding: 10px 30px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s linear;
  &:hover {
    background: #f2f2f2;
  }
  @media (max-width: 768px) {
    padding: 10px 16px;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 20px;
  }
`;

export default function AddItem() {
  const [dataStatus, setDataStatus] = useState({
    nameStatus: true,
    imageStatus: true,
    categoryStatus: true,
  });
  const [newItemData, setNewItemData] = useState({
    itemName: "",
    note: "",
    imageURL: "",
    category: "",
  });
  const width = window.innerWidth;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.items.categories);

  const chooseCategory = (e) =>
    setNewItemData({ ...newItemData, category: e.target.innerText });

  const handleChange = (e) => {
    let itemData = { ...newItemData };
    if (e.target.name === "itemName")
      e.target.value =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    itemData[e.target.name] = e.target.value;
    setNewItemData(itemData);
  };

  const handleSubmitForm = () => {
    if (
      newItemData.itemName === "" ||
      newItemData.category === "" ||
      newItemData.imageURL === ""
    ) {
      const tempDataStatus = { ...dataStatus };
      tempDataStatus.nameStatus = newItemData.itemName === "" ? false : true;
      tempDataStatus.imageStatus = newItemData.imageURL === "" ? false : true;
      tempDataStatus.categoryStatus =
        newItemData.category === "" ? false : true;
      setDataStatus(tempDataStatus);
    } else {
      axios
        .post("http://localhost:5000/api/items", newItemData)
        .then((response) => {
          if (response.data.success) dispatch(addNewProduct(newItemData));
          if (categories.indexOf(newItemData.category) === -1)
            dispatch(addNewCategory(newItemData.category));
        });
      dispatch(
        width > 768
          ? setCurrentSection("shoppingList")
          : setCurrentMainSection("itemsList")
      );
    }
  };

  return (
    <AddItemSection>
      <AddItemTitle>Add a new item </AddItemTitle>
      <FormField>
        <FieldLabel> Name </FieldLabel>
        <FieldInput
          name="itemName"
          value={newItemData.itemName}
          onChange={handleChange}
          placeholder="Enter a name"
          dataStatus={dataStatus.nameStatus}
          autoComplete="off"
        />
        <ErrorMessage showError={dataStatus.nameStatus}>
          Please fill out this field!
        </ErrorMessage>
      </FormField>
      <FormField>
        <FieldLabel> Note (optional) </FieldLabel>
        <FieldTextarea
          name="note"
          value={newItemData.note}
          onChange={handleChange}
          placeholder="Enter a note"
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <FieldLabel> Image </FieldLabel>
        <FieldInput
          name="imageURL"
          value={newItemData.imageURL}
          onChange={handleChange}
          placeholder="Enter a url"
          dataStatus={dataStatus.imageStatus}
          autoComplete="off"
        />
        <ErrorMessage showError={dataStatus.imageStatus}>
          Please fill out this field!
        </ErrorMessage>
      </FormField>
      <FormField>
        <FieldLabel> Category</FieldLabel>
        <FieldInput
          name="category"
          placeholder="Enter a category"
          value={newItemData.category}
          onChange={handleChange}
          dataStatus={dataStatus.categoryStatus}
          autoComplete="off"
        />
        <ErrorMessage showError={dataStatus.categoryStatus}>
          Please fill out this field!
        </ErrorMessage>
        <OptionsList>
          {categories.map((category) => (
            <Option onClick={chooseCategory} key={`${category}ID`}>
              {category}
            </Option>
          ))}
        </OptionsList>
      </FormField>
      <Buttons>
        <Button
          color="black"
          backgroundColor="transparent"
          btnWidth="90px"
          onClick={() =>
            dispatch(
              width > 768
                ? setCurrentSection("shoppingList")
                : setCurrentMainSection("shoppingList")
            )
          }
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmitForm}
          color="white"
          backgroundColor="#f9a109"
          btnWidth="90px"
        >
          Save
        </Button>
      </Buttons>
    </AddItemSection>
  );
}
