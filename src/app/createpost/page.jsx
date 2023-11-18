"use client";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Link from "next/link";


const createPost = () => {
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollection = collection(db, "posts");

  const submitPost = async () => {
    await addDoc(postCollection, {
      title,
      postText,
      author: { name: user.email, id: user.uid },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <p>Create Post</p>
        <div className="">
          <label>Title:</label>
          <input
            className=" bg-gray-300"
            placeholder="Write title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label>Post:</label>
          <textarea
            className=" bg-gray-300"
            placeholder="Write post"
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <Link href="/home" onClick={submitPost}>Post</Link>
      </div>
    </div>
  );
};

export default createPost;
