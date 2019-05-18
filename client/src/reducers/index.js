import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // the auth piece of state is being manufactred by the authReducer
  auth: authReducer
});
