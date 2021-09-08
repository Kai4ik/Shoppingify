const initialState = {
  currentSection: "shoppingList",
  currentMainSection: "itemsList",
};

const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_SECTION":
      return { ...state, currentSection: action.payload };
    case "SET_CURRENT_MAIN_SECTION":
      return { ...state, currentMainSection: action.payload };
    default:
      return { ...state };
  }
};

export default sectionReducer;
