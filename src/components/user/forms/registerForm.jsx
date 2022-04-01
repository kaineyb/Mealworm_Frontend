import React from "react";
import Joi from "joi";
import Input from "../../common/input";
import BaseForm from "../../common/baseForm";
import auth from "../../../services/authService";

class RegisterForm extends BaseForm {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", username: "", password: "" },
      errors: {},
    };
    this.schema = {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
  }

  async doSubmit() {
    console.log("Submit Button Validated and Submitted!");

    const userDetails = {
      email: this.state.data.email,
      username: this.state.data.username,
      password: this.state.data.password,
    };
    console.log(userDetails);
    // await auth.register(userDetails);
  }

  render() {
    const { errors } = this.state;
    return (
      <form>
        <h1> Register: </h1>
        <Input
          name="email"
          type="email"
          label="Your Email Address"
          placeholder="Enter Email"
          autoComplete="email"
          error={errors["email"]}
          onChange={this.handleChange}
        />
        <Input
          name="username"
          label="Requested Username"
          placeholder="Enter username"
          autoComplete="username"
          error={errors["username"]}
          onChange={this.handleChange}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          autoComplete="current-password"
          error={errors["password"]}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={this.handleSubmit}
          disabled={this.validate()}
        >
          Register
        </button>
      </form>
    );
  }
}

export default RegisterForm;
