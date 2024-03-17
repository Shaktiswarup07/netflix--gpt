import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  console.log("render");
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });

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
          navigate("/browse");
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
          className="absolute bg-repeat h-screen object-cover md:w-screen"
          src={BG_URL}
          alt="n-logo"
        />
      </div>
      <form className=" py-10 absolute w-full top-20 left-0 md:w-1/3 md:top-1/4 md:left-1/3 bg-opacity-70 bg-black">
        <h1 className="font-semibold text-white text-2xl md:text-3xl mt-4 mb-8 w-3/4 mx-auto">
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
