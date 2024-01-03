"use client";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase-config";
// import { storage } from "./firebase";
import { storage, db } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Link from "next/link";

const CreatePost = () => {
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const postCollection = collection(db, "posts");

  const uploadImage = async () => {
    if (imageUpload == null) return;
    // const imageName = `image/${imageUpload.name + v4()}`
    const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload);
    // await uploadBytes(imageRef, imageUpload).then(() => console.log(imageRef));
    const imageUrl = await getDownloadURL(imageRef);
    setImageLink(imageUrl);
  };

  const submitPost = async () => {
    await addDoc(postCollection, {
      title,
      postText,
      author: { name: user.email, id: user.uid },
      image: imageLink,
    });
    setTitle("");
    setPostText("");
    setImageUpload(null);
    setImageLink("");
  };

  return (
    <div className="bg-[#e4e3de] h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-[2rem] mt-[2rem]">
        <p className="font-semibold text-[17px]">Create Post</p>
        <div className="flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-[15px]">Title:</label>
            <input
              className=" bg-white outline-none p-2 rounded-xl "
              placeholder="Write title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-[15px]">Post:</label>
            <textarea
              className=" bg-white outline-none p-2 rounded-xl"
              placeholder="Write post"
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          </div>
          {/* <label>Add Images</label> */}
          <div className="flex flex-col gap-2">
            <p className="font-medium text-[15px]">Image:</p>
            <input
              className="outline-none  cursor-pointer"
              type="file"
              onChange={(event) => setImageUpload(event.target.files[0])}
            />
            <button className="text-[#00194d] bg-white p-1 rounded-lg" onClick={uploadImage}>
              Upload Image
            </button>
          </div>
          <Link className="bg-[#00194d] hover:bg-[#483285] text-white p-1 rounded-lg text-center font-semibold" href="/home" onClick={submitPost}>
          Post
        </Link>
        </div>
        
      </div>
    </div>
  );
};

export default CreatePost;
