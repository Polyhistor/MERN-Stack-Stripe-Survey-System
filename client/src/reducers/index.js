import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxForm } from "redux-form";
import surveyReducer from "./surveysReducers";

export default combineReducers({
  // the auth piece of state is being manufactred by the authReducer
  auth: authReducer,
  // the key should be name 'form', this is the string that redux-form understands
  form: reduxForm,
  surveys: surveyReducer
});
