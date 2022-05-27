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
import { en } from "./../../../services/textService";

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
      pending: en.loginForm.resultPromise.pending,
      error: en.loginForm.resultPromise.error,
    });

    if (loginResult === true) {
      this.context.setLoggedIn(true);
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
          <Heading as="h1">{en.user.logIn}</Heading>

          <Input
            autoFocus
            name="username"
            label={en.user.yourUsername}
            placeholder={en.user.enterUsername}
            autoComplete="username"
            error={errors["username"]}
            onChange={this.handleChange}
          />

          <Input
            type="password"
            name="password"
            label={en.user.yourPassword}
            placeholder={en.user.enterPassword}
            autoComplete="current-password"
            error={errors["password"]}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.validate()}
          >
            {en.user.logIn}
          </Button>
        </Flex>
      </form>
    );
  }
}
LoginForm.contextType = UserContext;
export default LoginForm;
