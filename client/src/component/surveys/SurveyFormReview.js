import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }, idx) => {
    return (
      <div key={idx}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green white-text btn-flat right"
      >
        <i className="material-icons right">email</i>Send Survey
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  // the magic of redux, it handles all the state management of the form for us
  return { formValues: state.form.surveyForm.values };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyReview));
