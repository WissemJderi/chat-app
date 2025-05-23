import React, { useEffect, useState } from "react";
import "./ProfileUpdate.css";
import { onAuthStateChanged } from "firebase/auth";
import assets from "../../assets/assets";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Upload your profile image");
      }
      const docRef = doc(db, "uusers", uid);
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, { avatar: imgUrl, bio: bio, name: name });
      } else {
        await updateDoc(docRef, { bio: bio, name: name });
      }
    } catch (error) {}
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpej"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            Upload Profile Image
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Your Name"
            required
          />
          <textarea
            onChange={(e) => {
              setBio(e.target.bio);
            }}
            value={bio}
            placeholder="Write Your Profile Boi"
            required
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          className="profile-pic"
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
