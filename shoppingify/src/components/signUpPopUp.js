import React, { useEffect, useState } from "react";
import {
  NotificationBackground,
  PopUpWindow,
  PopUpTitle,
  FormField,
  FieldInput,
  SubmitButton,
  SignUpLink,
  SignUpText,
  ErrorMessage,
} from "./reusableElements";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

export default function SignUpPopUp(props) {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setPasswordMatchError(
      formData.password === formData.confirmPassword ? true : false
    );
  }, [formData]);

  const handleChange = (e) => {
    let newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const showLoginPopUp = () => {
    props.setSignUpMode(false);
    props.setLoginMode(true);
  };

  const signUp = () => {
    if (
      formData.email !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== ""
    ) {
      if (formData.password === formData.confirmPassword) {
        const newUser = {
          userEmail: formData.email,
          userPassword: formData.password,
          allUserLists: [],
          currentListProducts: [],
        };
        axios.post("api/users", newUser).then((response) => {
          if (response.data.created) {
            dispatch({
              type: "CREATE_USER",
              payload: newUser,
            });
            props.setSignUpMode(false);
            Cookies.set("token", response.data.token, { expires: 0.125 });
          } else {
            setEmailError(false);
          }
        });
      }
    }
  };

  return (
    <NotificationBackground
      displayNotification={props.signUpMode ? "block;" : "none;"}
    >
      <PopUpWindow
        popUpWidth="580px"
        showPopUp={props.signUpMode ? "block;" : "none;"}
      >
        <PopUpTitle>
          Welcome to Shoppingify! Let's start by creating an account for you
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
            Account with such email already exists!
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
        <FormField>
          <FieldInput
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            autoComplete="off"
          />
          <ErrorMessage showError={passwordMatchError}>
            It should match original password
          </ErrorMessage>
        </FormField>
        <SubmitButton
          makeClickable={passwordMatchError}
          onClick={() => signUp()}
        >
          Join now
        </SubmitButton>
        <SignUpText>
          Already have an account?
          <SignUpLink onClick={() => showLoginPopUp()}>Login here</SignUpLink>
        </SignUpText>
      </PopUpWindow>
    </NotificationBackground>
  );
}
