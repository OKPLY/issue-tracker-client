import { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig";

function handleUpload(file, setPercent, setUrl) {
  const setThisUrl = (url) => {
    setUrl(url);
  };
  if (!file) {
    console.log("Please upload a file first!");
    return;
  }

  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setPercent(percent);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setThisUrl(url);
      });
    }
  );
}

export default handleUpload;
