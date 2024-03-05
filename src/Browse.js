import React from "react";
import Header from "./components/Header";
import { auth } from "./utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute bg-gradient-to-b from-black z-10 w-full flex justify-between items-center pr-2">
      <img
        className="w-56"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      <div className="flex gap-2 items-center">
        <img
          alt="user-icon"
          src="https://occ-0-4995-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
        />
        <button
          onClick={handleSignOut}
          className="underline text-white font-semibold text-lg"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Browse;
