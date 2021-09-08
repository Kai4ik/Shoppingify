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
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPopUp(props) {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [readyToLogin, setReadyToLogin] = useState(false);

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

  const login = () => {
    if (formData.email !== "" && formData.password !== "") {
      axios.post("/api/users/login", formData).then((response) => {
        if (response.data.loggedIn) {
          dispatch({
            type: "LOGIN_USER",
            payload: response.data.user,
          });
          props.setLoginMode(false);
          Cookies.set("token", response.data.token, { expires: 0.125 });
        } else {
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
