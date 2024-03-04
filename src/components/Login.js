import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  console.log("render");
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    console.log("Hello");
    if (message) return;

    // Sign in / Sign Up logic
    if (!isSignInForm) {
      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

          // ..
        });
    } else {
      //Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="n-logo"
        />
      </div>
      <form className=" py-10 absolute w-1/3 top-1/4 left-1/3 bg-opacity-70 bg-black">
        <h1 className="font-semibold text-white text-3xl mt-4 mb-8 w-3/4 mx-auto">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div>
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-3 my-3 w-3/4 block mx-auto rounded-md bg-gray-700 text-white"
          />
        </div>
        {!isSignInForm && (
          <div>
            <input
              ref={name}
              type="text"
              placeholder="Full name"
              className="p-3 my-3 w-3/4 block mx-auto rounded-md bg-gray-700 text-white"
            />
          </div>
        )}
        <div>
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="p-3 my-3 w-3/4 block mx-auto rounded-md bg-gray-700 text-white"
          />
        </div>

        {errorMessage && (
          <p className=" py-2 font-semibold text-lg mt-2 w-3/4 mx-auto text-red-500">
            {errorMessage}
          </p>
        )}

        <button
          className="p-3 mt-8 bg-red-600 rounded-sm text-white font-semibold w-3/4 block mx-auto"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-gray-400 py-3 mt-3 w-3/4 mx-auto cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already a user? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
