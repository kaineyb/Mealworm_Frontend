import { Button, Flex, Heading } from "@chakra-ui/react";
import Joi from "joi";
import { toast } from "react-toastify";
//  Contexts
import UserContext from "../../../context/userContext";
import auth from "../../../services/authService";
import { en } from "../../../services/textService";
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

    try {
      const registerResult = await toast.promise(auth.register(userDetails), {
        pending: en.registerForm.resultPromise.pending,
        success: en.registerForm.resultPromise.success(userDetails.username),
        error: en.registerForm.error,
      });

      console.log(registerResult);

      if (registerResult.status === 201) {
        // console.log(`User created ${userDetails.username}`);
        let loginDetails = { ...userDetails };

        delete loginDetails.email;

        const loginResult = await toast.promise(auth.login(userDetails), {
          pending: en.registerForm.loginPromise.pending,
          error: en.registerForm.loginPromise.error,
        });

        if (loginResult === true) {
          this.context.setLoggedIn(true);
        }
      }
    } catch (error) {
      if (error.response.data.email) {
        const errors = { ...this.state.errors };
        errors["email"] = error.response.data.email;
        this.setState({ errors });
      }
      if (error.response.data.username) {
        const errors = { ...this.state.errors };
        errors["username"] = error.response.data.username;
        this.setState({ errors });
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
            label={en.registerForm.requestedUsername}
            placeholder={en.user.enterUsername}
            autoComplete="username"
            error={errors["username"]}
            onChange={this.handleChange}
          />
          <Input
            name="email"
            type="email"
            label={en.user.yourEmail}
            placeholder={en.user.enterEmail}
            autoComplete="email"
            error={errors["email"]}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            type="password"
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
            {en.user.register}
          </Button>
        </Flex>
      </form>
    );
  }
}
RegisterForm.contextType = UserContext;
export default RegisterForm;
