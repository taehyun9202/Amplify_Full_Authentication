import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import "../configureAmplify";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ConfirmSignUp from "../components/ConfirmSignUp";
import ForgotPasswordSubmit from "../components/ForgotPasswordSubmit";
import VerifyForgotPassword from "../components/VerifyForgotPassword";

const initialState = { email: "", password: "", authCode: "" };

const Profile = () => {
  const [uiState, setUiState] = useState("null");
  const [formState, setFormState] = useState(initialState);
  const [user, setUser] = useState(null);
  const { email, password, authCode, username } = formState;
  useEffect(() => {
    checkUser();
  }, []);

  console.log(user);
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      setUiState("signedIn");
    } catch (err) {
      console.log(err);
      setUiState("signIn");
    }
  };

  const signUp = async () => {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      setUiState("confirmSignUp");
    } catch (err) {
      console.log(err);
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authCode);
      setUiState("signedIn");
      signIn();
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async () => {
    try {
      await Auth.signIn(email, password);
      setUiState("signedIn");
      checkUser();
    } catch (err) {
      console.log(err);
    }
  };

  const forgotPasswordSubmit = async () => {
    try {
      await Auth.forgotPassword(email);
      setUiState("verifyPW");
    } catch (err) {
      console.log(err);
    }
  };

  const verifyForgotPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password);
      setUiState("signIn");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center">
      {uiState === "signUp" && (
        <SignUp
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          signUp={signUp}
        />
      )}

      {uiState === "confirmSignUp" && (
        <ConfirmSignUp
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          confirmSignUp={confirmSignUp}
        />
      )}

      {uiState === "signIn" && (
        <SignIn
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          signIn={signIn}
        />
      )}

      {uiState === "forgotPW" && (
        <ForgotPasswordSubmit
          onChangeHandler={onChangeHandler}
          setUiState={setUiState}
          forgotPasswordSubmit={forgotPasswordSubmit}
        />
      )}

      {uiState === "verifyPW" && (
        <VerifyForgotPassword
          onChangeHandler={onChangeHandler}
          verifyForgotPassword={verifyForgotPassword}
        />
      )}

      {uiState === "signedIn" && user && (
        <div className="flex flex-col justify-center items-center min-h-screen max-w-7xl">
          <p className="text-xl">Welcome, {user.username}</p>
          <p>{user.attributes.email}</p>
          <button
            className="text-white w-80 mt-10 bg-pink-400 p-3 rounded"
            onClick={() => {
              Auth.signOut();
              setUiState("signIn");
              setUser(null);
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
