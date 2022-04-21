import React from "react";
import Joi from "joi";
import auth from "../../../services/authService";

import Input from "../../common/input";
import BaseForm from "../../common/baseForm";

// My Components
import LogIn from "../actions/logIn";

//  Contexts
import UserContext from "../../../context/userContext";

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

    const loginResult = await auth.login(userDetails);

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
        <h1> Login: </h1>

        <Input
          autoFocus
          name="username"
          label="Your Username"
          placeholder="Enter username"
          autoComplete="username"
          error={errors["username"]}
          onChange={this.handleChange}
        />
        <br />

        <Input
          type="password"
          name="password"
          label="Your Password"
          placeholder="Enter Password"
          autoComplete="current-password"
          error={errors["password"]}
          onChange={this.handleChange}
        />
        <br />
        <button
          type="submit"
          onClick={this.handleSubmit}
          disabled={this.validate()}
        >
          Login
        </button>
      </form>
    );
  }
}
LoginForm.contextType = UserContext;
export default LoginForm;
