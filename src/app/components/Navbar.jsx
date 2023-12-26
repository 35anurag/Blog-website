"use client";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const Navbar = () => {
  const { user, setUser } = useAuthContext();

  const userName = (name) => {
    if (name) {
      let text = name;
      let result = text.slice(-10);
      let newString = text.split(result).join("");
      return newString;
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="mx-[4rem] flex justify-center">
      <div className="flex flex-row items-center gap-5">
        <Link href="/home" className="font-semibold text-[30px] text-black mr-[4rem]">
          Blog
        </Link>
        <Link href="/home" className="font-medium">Home</Link>
        {user ? (
          <div className="flex flex-row items-center gap-7">
            <Link className="font-medium" href="/createpost">
              Create Post
            </Link>
            <div className="font-medium">{userName(user.email)}</div>
            <button className="font-medium" onClick={logout}>
              Signout
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-7 items-center">
            <Link href="/login" className="font-medium">Create Post</Link>
            <Link href="/login" className="font-medium">Login</Link>
            <Link href="/signin" className="font-medium">Signin</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
