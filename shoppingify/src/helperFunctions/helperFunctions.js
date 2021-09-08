import {
  addNewProductToList,
  populateAllListsWithData,
} from "../actions/userActions";
import axios from "axios";
import Cookies from "js-cookie";

export const findRequiredProductIndex = (productArray, product) => {
  return productArray.findIndex((item) => item.itemName === product.itemName);
};

export const addProductToList = (dispatch, product) => {
  dispatch(
    addNewProductToList({
      itemName: product.itemName,
      itemAmount: 1,
      category: product.category,
    })
  );
};

export const checkCategoryOnProductsExistence = (category, products) => {
  const result = products.some((product) => product.category === category);
  return result;
};

export const countTotalItems = (arrayOfElements) => {
  return arrayOfElements.reduce(
    (accumulator, element) => accumulator + element.numberOfItems,
    0
  );
};

export const populateAllHistoryLists = (dispatch) => {
  axios
    .get("http://localhost:5000/api/users/historyLists", {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
    .then((response) =>
      dispatch(populateAllListsWithData(response.data.allUserLists))
    );
};

export const updateUser = (listProducts) => {
  axios({
    url: "http://localhost:5000/api/users/verifyAndUpdate",
    method: "post",
    data: {
      listProducts: listProducts,
    },
    headers: {
      Authorization: Cookies.get("token"),
    },
  });
};
