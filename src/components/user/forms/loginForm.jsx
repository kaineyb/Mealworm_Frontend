import { Button, Flex, Heading } from "@chakra-ui/react";
import Joi from "joi";
import React from "react";
import { toast } from "react-toastify";
//  Contexts
import UserContext from "../../../context/userContext";
import auth from "../../../services/authService";
import BaseForm from "../../common/baseForm";
import Input from "../../common/input";
// My Components
import LogIn from "../actions/logIn";

class LoginForm extends BaseForm {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {},
    };
    this.schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
  }

  componentDidMount() {}

  async doSubmit() {
    const userDetails = {
      username: this.state.data.username,
      password: this.state.data.password,
    };

    const loginResult = await toast.promise(auth.login(userDetails), {
      pending:
        "If you see this, then the backend is offline or asleep, please wait :)",
      error: "Couldn't log you in, username or password incorrect.",
    });

    if (loginResult === true) {
      this.context.toggleLoggedIn();
    }
  }

  render() {
    const { errors } = this.state;
    const { loggedIn } = this.props;
    // console.log("render-errors", errors);
    if (loggedIn) return <LogIn user={this.props.user} />;

    return (
      <form>
        <Flex direction={{ base: "column" }} gap={2}>
          <Heading as="h1">Login</Heading>

          <Input
            autoFocus
            name="username"
            label="Your Username"
            placeholder="Enter username"
            autoComplete="username"
            error={errors["username"]}
            onChange={this.handleChange}
          />

          <Input
            type="password"
            name="password"
            label="Your Password"
            placeholder="Enter Password"
            autoComplete="current-password"
            error={errors["password"]}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.validate()}
          >
            Login
          </Button>
        </Flex>
      </form>
    );
  }
}
LoginForm.contextType = UserContext;
export default LoginForm;
