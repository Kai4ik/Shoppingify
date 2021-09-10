export const addNewCategory = (newCategory) => {
  return {
    type: "ADD_NEW_CATEGORY",
    payload: newCategory,
  };
};

export const populateCategories = (categories) => {
  return {
    type: "POPULATE_CATEGORIES",
    payload: categories,
  };
};

// used to populate items with initial data fetched from database
export const populateProductsData = (products) => {
  return {
    type: "POPULATE_PRODUCTS_WITH_DB_DATA",
    payload: products,
  };
};

export const addNewProduct = (newProduct) => {
  return {
    type: "ADD_NEW_PRODUCT",
    payload: newProduct,
  };
};

export const changeProductDetails = (newProductDetails) => {
  return {
    type: "UPDATE_PRODUCT_DETAILS",
    payload: newProductDetails,
  };
};

export const deleteProduct = (productToDelete) => {
  return {
    type: "DELETE_PRODUCT",
    payload: productToDelete,
  };
};
