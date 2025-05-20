import React, { useRef, useState } from "react";
import "../css/SignInSignUp.css";
import SocialLogin from "../components/SocialLogin";
import Input from "../components/Input";
import { isValidEmail, showToast, validPassword } from "../utils/validation";
import { useMovieContext } from "../context/MovieContext";
import { signinApi, signupApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigation = useNavigate();
  const { login } = useMovieContext();

  const handleSignUp = async () => {
    const name = nameRef.current.getValue();
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    if (name === "" || email === "" || password === "") {
      showToast("Please fill all the field first!!", "warn");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("Email is invalid!", "error");
      return;
    }
    if (!validPassword(password)) {
      showToast("Password must be greater than 5", "error");
      return;
    }
    setLoading(true);
    const user = {
      name,
      email,
      password,
    };
    try {
      const response = await signupApi(user);
      console.log(response);
      if (response.status_code === 200) {
        showToast("User created Successfully!", "success");
        const userWithToken = {
          name: user.name,
          email: user.email,
          token: response.token,
        };
        localStorage.setItem("user", JSON.stringify(userWithToken));
        login(userWithToken);
        navigation("/");
      } else if (response?.status_code === 409) {
        showToast("User already exists!!", "error");
      } else {
        showToast("Something went wrong", "error");
        console.log("Before catch block");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
      console.log("Inside catch -> ", error);
    } finally {
      setLoading(false);
    }
    nameRef.current.resetValue();
    emailRef.current.resetValue();
    passwordRef.current.resetValue();
    console.log(name + " -> " + email + " -> " + password);
  };

  const handleSignIn = async () => {
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    if (email === "" || password === "") {
      showToast("Please fill all the field first!!", "warn");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("Email is invalid!", "error");
      return;
    }
    if (!validPassword(password)) {
      showToast("Password length must be greater than 5", "error");
      return;
    }
    setLoading(true);
    try {
      const user = {
        email: email,
        password: password,
      };
      const response = await signinApi(user);
      if (response.status_code === 200) {
        showToast("Login Successfull!", "success");
        const userWithToken = {
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        };
        localStorage.setItem("user", JSON.stringify(userWithToken));
        login(userWithToken);
        navigation("/");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.log("Inside catch block", error);
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
    emailRef.current.resetValue();
    passwordRef.current.resetValue();
  };

  return (
    <div className="auth-page-wrapper">
      <div className={`auth-container ${isSignIn ? "sign-in-mode" : ""}`}>
        <div className="left-panel">
          <h2>{isSignIn ? "Hello, Friend!" : "Welcome Back!"}</h2>
          <p>
            {isSignIn
              ? "Enter your details and start your journey"
              : "Enter your personal details to use all of site features"}
          </p>
          <button onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>

        <div className="right-panel">
          {isSignIn ? (
            <div className="form-container">
              <h2>Sign In</h2>
              <Input type="email" placeholder="Email" ref={emailRef} />
              <Input type="password" placeholder="Password" ref={passwordRef} />
              <button className="formContainerButton" onClick={handleSignIn}>
                {loading ? (
                  <Puff
                    visible={true}
                    height="20"
                    width="20"
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "LOGIN"
                )}
              </button>
            </div>
          ) : (
            <div className="form-container">
              <h2>Create Account</h2>
              <SocialLogin />
              <p
                style={{
                  color: "black",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                or use your email for registration
              </p>
              <Input type="text" placeholder="Name" ref={nameRef} />
              <Input type="email" placeholder="Email" ref={emailRef} />
              <Input type="password" placeholder="Password" ref={passwordRef} />
              <button className="formContainerButton" onClick={handleSignUp}>
                {loading ? (
                  <Puff
                    visible={true}
                    height="20"
                    width="20"
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "SIGN UP"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
