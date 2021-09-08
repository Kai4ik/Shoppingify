import sectionReducer from "../reducers/sectionReducer";
import itemsReducer from "../reducers/itemsReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  section: sectionReducer,
  items: itemsReducer,
  user: userReducer,
});

export default rootReducer;
