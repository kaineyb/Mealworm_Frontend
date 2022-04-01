import React, { Component } from "react";
import Joi from "joi";

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
    };

    this.schema = {};
  }

  validate = () => {
    const schema = Joi.object(this.schema);
    const options = { abortEarly: false };

    const { error } = schema.validate(this.state.data, options);

    // const happy = !error ? "Validate: Happy" : "Validate: Sad";
    // console.log(happy);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ id, value }) => {
    const schema = Joi.object({ [id]: this.schema[id] });
    const obj = { [id]: value };
    const { error } = schema.validate(obj);

    // Test Toot.
    // const happy = !error ? "ValidateProperty: Happy" : "ValidateProperty: Sad";
    // console.log(happy);
    // if (error) {
    //   console.log("ValidateProperty:", error.details[0].message);
    // }

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.id] = errorMessage;
    else delete errors[input.id];

    const data = { ...this.state.data };
    data[input.id] = input.value;

    this.setState({ data, errors });
  };
}

export default BaseForm;
