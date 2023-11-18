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
    <div className="flex flex-row gap-5">
      <Link href="/home">Home</Link>
      {user ? (
        <Link className="pr-6" href="/createpost">
          Create Post
        </Link>
      ) : (
        <Link className="pr-6" href="/login">
          Create Post
        </Link>
      )}
      {user ? (
        <div>{user ? userName(user.email) : ""}</div>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <button className="pl-6" onClick={logout}>
        Signout
      </button>
    </div>
  );
};

export default Navbar;
