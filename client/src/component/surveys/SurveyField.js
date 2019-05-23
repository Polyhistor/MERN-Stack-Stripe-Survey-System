import React from "react";

// this is nested destrucring
export default ({ input, label, meta }) => {
  return (
    <div>
      <label>{label}</label>
      {/* // copying all the event handlers using {...input} */}
      <input {...input} style={{ marginBottom: "5px" }} />
      {/* meta is an object handled by redux-form that assigns the property error, 
      so we can first fill the relevant property's error and then display it anywhere that we desire! */}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
};
