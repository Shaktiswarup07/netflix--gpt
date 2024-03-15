import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changePageLanguage } from "../utils/languageSlice";

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
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };
  const handleSelectLanguage = (e) => {
    console.log(e.target.value);
    dispatch(changePageLanguage(e.target.value));
  };

  return (
    <div className=" fixed bg-black bg-opacity-95 bg-gradient-to-b from-black z-20 w-full flex justify-between items-center pr-2 ">
      <img className="w-56 ml-7" src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-2 items-center mr-4">
          {showGPTSearch && (
            <select
              onChange={(e) => handleSelectLanguage(e)}
              className="px-3 py-1 bg-black text-white border border-white rounded-sm"
            >
              {SUPPORTED_LANGUAGES.map((lang) => {
                return (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                );
              })}
            </select>
          )}
          <button
            className="text-white bg-purple-700 px-4 py-2 rounded-xl hover:bg-purple-500 mx-4 "
            onClick={handleGPTSearchClick}
          >
            {!showGPTSearch ? "Try GPT Search" : "Back to home"}
          </button>
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
