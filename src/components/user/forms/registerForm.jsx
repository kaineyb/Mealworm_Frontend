import { Button, Flex, Heading } from "@chakra-ui/react";
import Joi from "joi";
import React from "react";
import { toast } from "react-toastify";
//  Contexts
import UserContext from "../../../context/userContext";
import auth from "../../../services/authService";
import BaseForm from "../../common/baseForm";
// Components
import Input from "../../common/input";
import LogIn from "../actions/logIn";

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
    // console.log("Submit Button Validated and Submitted!");

    const userDetails = {
      email: this.state.data.email,
      username: this.state.data.username,
      password: this.state.data.password,
    };

    const registerResult = await toast.promise(auth.register(userDetails), {
      pending: "Attempting to create an account for you",
      success: `Created an account for you! Welcome to the site ${userDetails.username}`,
      error:
        "Couldn't create an account for you, username or email may already be taken",
    });

    if (registerResult.status === 201) {
      // console.log(`User created ${userDetails.username}`);
      let loginDetails = { ...userDetails };

      delete loginDetails.email;

      const loginResult = await toast.promise(auth.login(userDetails), {
        pending: "Attempting to Log you in!",
        error: "Couldn't log you in, please try to login manually",
      });

      if (loginResult === true) {
        this.context.toggleLoggedIn();
      }
    }
  }

  render() {
    const { errors } = this.state;
    const { loggedIn } = this.props;
    if (loggedIn) return <LogIn user={this.props.user} />;

    return (
      <form>
        <Flex direction={{ base: "column" }} gap={2}>
          <Heading as="h1">Register</Heading>
          <Input
            name="username"
            label="Requested Username"
            placeholder="Enter username"
            autoComplete="username"
            error={errors["username"]}
            onChange={this.handleChange}
          />
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
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            autoComplete="current-password"
            error={errors["password"]}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.validate()}
          >
            Register
          </Button>
        </Flex>
      </form>
    );
  }
}
RegisterForm.contextType = UserContext;
export default RegisterForm;
