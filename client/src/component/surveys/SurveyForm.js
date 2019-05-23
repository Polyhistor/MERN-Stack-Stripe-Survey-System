import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label }, idx) => {
      return (
        <Field
          key={idx}
          component={SurveyField}
          type="text"
          name={name}
          label={label}
        />
      );
    });

    // keeping the commented codes below for educational purpoeses

    // return (
    //   <div>
    //     <Field
    //       // any custom attribute will be automatically forwarded to your custom component as props
    //       label="Survey Title"
    //       type="text"
    //       name="title"
    //       component={SurveyField}
    //     />
    //     <Field
    //       // any custom attribute will be automatically forwarded to your custom component as props
    //       label="Subject Line"
    //       type="text"
    //       name="subject"
    //       component={SurveyField}
    //     />
    //     <Field
    //       // any custom attribute will be automatically forwarded to your custom component as props
    //       label="Email Body"
    //       type="text"
    //       name="body"
    //       component={SurveyField}
    //     />
    //     <Field
    //       // any custom attribute will be automatically forwarded to your custom component as props
    //       label="Recipient List"
    //       type="text"
    //       name="emails"
    //       component={SurveyField}
    //     />
    //   </div>
    // );
  }

  render() {
    return (
      <div>
        {/* // don't get confused, handleSubmit is wired to props by reduxForm */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// the validation function fed to the redux-form takes on argument as values, that argument holds the values
// of all the inputs
const validate = values => {
  const errors = {};
  // if redux-form gets this errors object and it's empty, redux-form says okay! we are good to go.
  // however if errors objects has any property or values inside of it and will assume that the form is invalid!
  errors.recipients = validateEmails(values.recipients || "");

  formFields.map(({ name }) => {
    if (!values[name]) {
      errors[name] = "you must provide a value";
    }
  });

  return errors;
};

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  // keep the form values even after the form is submitted
  destroyOnUnmount: false
})(SurveyForm);
