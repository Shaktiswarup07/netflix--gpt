import React, { Suspense } from "react";
import Login from "./Login";
import Browse from "../Browse";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Body = () => {
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
