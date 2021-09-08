export const changeListName = (newListName) => {
  return {
    type: "UPDATE_LIST_NAME",
    payload: newListName,
  };
};

export const changeListToShow = (specificList) => {
  return {
    type: "UPDATE_LIST_TO_SHOW",
    payload: specificList,
  };
};

export const addNewProductToList = (newProduct) => {
  return {
    type: "ADD_NEW_PRODUCT_TO_LIST",
    payload: newProduct,
  };
};

export const changeProductQty = (newListOfProducts) => {
  return {
    type: "UPDATE_PRODUCT_QTY",
    payload: newListOfProducts,
  };
};

export const addList = (newList) => {
  return {
    type: "ADD_NEW_LIST",
    payload: newList,
  };
};

export const createUser = (newUser) => {
  return {
    type: "CREATE_USER",
    payload: newUser,
  };
};

export const populateListWithData = (listProducts) => {
  return {
    type: "POPULATE_LIST_WITH_DB_DATA",
    payload: listProducts,
  };
};

export const populateAllListsWithData = (allLists) => {
  return {
    type: "POPULATE_ALL_LISTS_WITH_DB_DATA",
    payload: allLists,
  };
};
