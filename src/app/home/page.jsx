"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { useAuthContext } from "../context/AuthContext";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const home = () => {
  const { user } = useAuthContext();
  const [post, setPost] = useState([]);
  const postCollection = collection(db, "posts");

  const userName = (name) => {
    let text = name;
    let result = text.slice(-10);
    let newString = text.split(result).join("");
    return newString;
  };

  const deletePost = async (id) => {
    const targetedPost = doc(db, "posts", id);
    await deleteDoc(targetedPost);
    setPost((prevPost) => prevPost.filter((p) => p.id !== id));
  };

  useEffect(() => {
    const showPost = async () => {
      const data = await getDocs(postCollection);
      setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    showPost();
  }, []);
  return (
    <div className="h-screen bg-[#e4e3de] ">
      <Navbar />
      <div>
        {post.map((post) => {
          return (
            <div key={post.id} className="m-8">
              <div>{post.title}</div>
              {user
                ? user.email === post.author.name && (
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                  )
                : ""}
              <div>{post.postText}</div>
              <div>{userName(post.author.name)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default home;
