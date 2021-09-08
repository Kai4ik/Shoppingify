const initialState = {
  userEmail: "",
  userPassword: "",
  allUserLists: [],
  currentListName: "Shopping List",
  currentListProducts: [],
  showHistoryList: {
    listName: "",
    date: new Date(),
    status: false,
    listProducts: [],
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_LIST_NAME":
      return {
        ...state,
        currentListName: action.payload,
      };
    case "UPDATE_LIST_TO_SHOW":
      return {
        ...state,
        showHistoryList: { ...action.payload },
      };
    case "ADD_NEW_LIST":
      return {
        ...state,
        allUserLists: [...state.allUserLists, action.payload],
      };
    case "POPULATE_ALL_LISTS_WITH_DB_DATA":
      return {
        ...state,
        allUserLists: [...action.payload],
      };
    case "POPULATE_LIST_WITH_DB_DATA":
      return {
        ...state,
        currentListProducts: [...action.payload],
      };
    case "ADD_NEW_PRODUCT_TO_LIST":
      return {
        ...state,
        currentListProducts: [...state.currentListProducts, action.payload],
      };
    case "UPDATE_PRODUCT_QTY":
      return {
        ...state,
        currentListProducts: [...action.payload],
      };
    case "CREATE_USER":
      return {
        ...state,
        allUserLists: action.payload.allUserLists,
      };
    case "LOGIN_USER":
      return {
        ...state,
        allUserLists: action.payload.allUserLists,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
