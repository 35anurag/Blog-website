"use client";
import React, { useEffect, useId, useState } from "react";
import Navbar from "../components/Navbar";
import { FaHeart } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";

import { useAuthContext } from "../context/AuthContext";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref } from "firebase/storage";
import Link from "next/link";

const home = () => {
  const { user } = useAuthContext();
  const [post, setPost] = useState([]);
  const postCollection = collection(db, "posts");
  const [inputComment, setInputComment] = useState("");
  // const [commentArray, setCommentArray] = useState([]);

  const fetchPosts = async () => {
    const data = await getDocs(postCollection);
    const fetchedPost = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const postWithImage = await Promise.all(
      fetchedPost.map(async (post) => {
        const imageUrl = await getImageUrl(post.image);
        return { ...post, imageUrl };
      })
    );
    setPost(postWithImage);
  };

  const getImageUrl = async (imageName) => {
    if (!imageName) return null;
    const imageRef = ref(storage, `image/${imageName}`);
    try {
      const url = await imageRef.getDownloadURL();
      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  const handleLike = async (postId, userId) => {
    const postRef = doc(db, "posts", postId);
    const postToUpdate = post.find((p)=>p.id === postId);

    if (postToUpdate.likes && postToUpdate.likes.includes(userId)) {
      console.log("You've already liked this post!");
      return;
    }
    else{
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
      });
    }
    
    setPost((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: [...post.likes, useId] } : post
      )
    )

    // const updatedPost = await fetchPosts();
    // setPost(updatedPost);
  };

  const handleDislike = async (postId, userId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });

    setPost((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes.filter((id) => id !== userId) }
          : post
      )
    );
  };

  const handleComment = async (postId) => {
    // const newCommentArray = [...commentArray, inputComment];

    const postRef = doc(db, "posts", postId);
    const currentPost = post.find((p) => p.id === postId);
    const existingComments = currentPost.comments || [];
    const updatedComments = [...existingComments, inputComment];
    await updateDoc(postRef, {
      comments: updatedComments,
    });

    const updatedPost = post.map((p) => {
      if (p.id === postId) {
        // const updatedComments  = p.comments ? [...p.comments, inputComment]:[inputComment]
        return { ...p, comments: updatedComments };
      }
      return p;
    });
    setPost(updatedPost);
  };

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
    <div className=" bg-[#e4e3de] ">
      <Navbar />
      <div className="">
        {post && post.length > 0 ? (
          post.map((post) => {
            return (
              <div
                key={post.id}
                className="flex flex-row items-center justify-center py-[3rem]"
              >
                <div className="bg-white p-4 pr-[5rem]">
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-[18px] font-medium flex gap-2">
                      <span>Author:</span>
                      {userName(post.author.name)}
                    </div>

                    {user
                      ? user.email === post.author.name && (
                          <button onClick={() => deletePost(post.id)}>
                            <MdDeleteOutline className="text-[22px]" />
                          </button>
                        )
                      : ""}
                  </div>
                  <div className="text-[18px] font-medium flex gap-2 opacity-75">
                    <span>Title:</span>
                    {post.title}
                  </div>

                  <div className="opacity-75">{post.postText}</div>
                  <div className="my-4">
                    {user ? (
                      <div className="flex flex-row items-center gap-2 my-2">
                        <button onClick={() => handleLike(post.id, user.email)}>
                          <FaHeart />
                        </button>
                        <p>{post.likes ? post.likes.length : 0}</p>
                        <button
                          onClick={() => handleDislike(post.id, user.email)}
                        >
                          Dislike
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center gap-2 my-2">
                        <Link href="/login">
                          <FaHeart />
                        </Link>
                        <p>{post.likes ? post.likes.length : 0}</p>
                        <Link href="/login">Dislike</Link>
                      </div>
                    )}

                    <div className="flex gap-2 items-center my-1">
                      <input
                        type="text"
                        onChange={(event) =>
                          setInputComment(event.target.value)
                        }
                        placeholder="write a comment"
                        className="pl-2 p-1 rounded-xl w-[15rem] outline-none bg-[#e4e3de]"
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="w-auto h-auto px-3 pb-1 text-center rounded-xl bg-[#e4e3de] flex justify-center font-medium text-sm"
                      >
                        post
                      </button>
                    </div>
                    <div>
                      <p className="underline">Comments</p>
                      {post.comments &&
                        post.comments.map((comment, index) => (
                          <div key={index} className="mt-1">
                            {comment}
                          </div>
                        ))}
                    </div>
                  </div>
                  </div>
                

                {post.image && (
                  <Image
                    width={200}
                    height={200}
                    src={post.image}
                    alt="image"
                    className="absolute z-50 ml-[500px]"
                  />
                )}
                
              </div>
            );
          })
        ) : (
          <p className="flex items-center justify-center">no post Available</p>
        )}
      </div>
    </div>
  );
};

export default home;
