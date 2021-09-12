import React, { useState, useEffect } from "react";
import {
  NotificationBackground,
  PopUpWindow,
  PopUpTitle,
  FormField,
  FieldInput,
  SignUpLink,
  SignUpText,
  SubmitButton,
  ErrorMessage,
} from "./reusableElements";
import { loginUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPopUp(props) {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [readyToLogin, setReadyToLogin] = useState(false);

  // enables user to click "login" button in case both fields are filled out
  useEffect(() => {
    setReadyToLogin(
      formData.password !== "" && formData.email !== "" ? true : false
    );
  }, [formData]);

  const handleChange = (e) => {
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const showSignUpPopUp = () => {
    props.setLoginMode(false);
    props.setSignUpMode(true);
  };

  /* 
  makes post request to the server:
  - if user with such emails exists and has provided correct password, logs him in and creates "token" cookie using token that was created on the server side and send with the response 
  - otherwise, server sends back response that contains info about what type of error occurred: whether user with given email does not exist or provided by user password is wrong
  in both cases, error message will be displayed
  */
  const login = () => {
    if (formData.email !== "" && formData.password !== "") {
      axios.post("api/users/login", formData).then((response) => {
        if (response.data.loggedIn) {
          dispatch(loginUser(response.data.user));
          props.setLoginMode(false);
          Cookies.set("token", response.data.token, { expires: 0.125 });
        } else {
          if (response.data.emailError) setEmailError(false);
          if (response.data.passwordError) {
            setEmailError(true);
            setPasswordError(false);
          }
        }
      });
    }
  };

  return (
    <>
      <NotificationBackground
        displayNotification={props.loginMode ? "block;" : "none;"}
      ></NotificationBackground>
      <PopUpWindow
        popUpWidth="580px"
        showPopUp={props.loginMode ? "block;" : "none;"}
      >
        <PopUpTitle>
          Welcome! Before you start using Shoppingify, we ask you to login.
        </PopUpTitle>
        <FormField>
          <FieldInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="text"
            placeholder="Enter email"
            autoComplete="off"
          />
          <ErrorMessage showError={emailError}>
            Account with such email does not exist!
          </ErrorMessage>
        </FormField>
        <FormField>
          <FieldInput
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="off"
          />
          <ErrorMessage showError={passwordError}>
            Provided password is incorrect!
          </ErrorMessage>
        </FormField>
        <SubmitButton makeClickable={readyToLogin} onClick={() => login()}>
          Login
        </SubmitButton>
        <SignUpText>
          Not a member?
          <SignUpLink onClick={() => showSignUpPopUp()}>Sign Up now</SignUpLink>
        </SignUpText>
      </PopUpWindow>
    </>
  );
}
