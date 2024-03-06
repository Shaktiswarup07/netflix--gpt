import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
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
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

        // ...
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className=" fixed bg-black bg-opacity-95 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center pr-2">
      <img className="w-56 ml-7" src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-2 items-center mr-4">
          <img alt="user-icon" src={USER_AVATAR} />
          <button
            onClick={handleSignOut}
            className="underline text-white font-semibold text-lg"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
