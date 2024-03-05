import React, { Suspense, useEffect, useState } from "react";
import Login from "./Login";
import Browse from "../Browse";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        // ...
      } else {
        // User is signed out
        dispatch(removeUser());

        // ...
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={"loading..."}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/browse"
            element={
              <Suspense fallback={"loading..."}>
                <Browse />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
