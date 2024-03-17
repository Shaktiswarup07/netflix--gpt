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
    <div className=" fixed bg-black py-1 bg-opacity-70 bg-gradient-to-b from-black z-20 w-full flex flex-col md:flex-row  justify-between pr-2 ">
      <img className=" w-44 md:w-56 ml-1" src={LOGO} alt="logo" />

      {user && (
        <div className="flex  gap-2 items-center mr-4 w-full justify-between">
          <div className="flex flex-col md:flex-row mx-2 ">
            {showGPTSearch && (
              <select
                onChange={(e) => handleSelectLanguage(e)}
                className="ml-4 px-3 py-1 bg-black text-white border border-white rounded-sm w-32 hover:bg-white hover:text-black"
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
              className="text-white text-md md:text-lg  border px-4 py-2 rounded-sm w-32 md:w-32 hover:bg-white hover:text-black mx-4 "
              onClick={handleGPTSearchClick}
            >
              {!showGPTSearch ? "GPT Search" : "Home"}
            </button>
          </div>
          <div className="flex gap-4">
            <img alt="user-icon" src={USER_AVATAR} />
            <button
              onClick={handleSignOut}
              className="underline text-white font-semibold text-md md:text-lg"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
