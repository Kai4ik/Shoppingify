const initialState = {
  categories: [],
  allProducts: [],
  productDetails: {
    itemName: "",
    note: "",
    imageURL: "",
    category: "",
  },
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POPULATE_PRODUCTS_WITH_DB_DATA":
      return {
        ...state,
        allProducts: [...action.payload],
      };
    case "ADD_NEW_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "POPULATE_CATEGORIES":
      return {
        ...state,
        categories: [...action.payload],
      };
    case "ADD_NEW_PRODUCT":
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };
    case "UPDATE_PRODUCT_DETAILS":
      return {
        ...state,
        productDetails: { ...action.payload },
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        allProducts: [...action.payload],
      };
    default:
      return { ...state };
  }
};

export default itemsReducer;
