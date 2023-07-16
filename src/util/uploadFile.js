import { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig";

// function useUploadFile(file)  {
//     const [percent, setPercent] = useState(0);
//     if (!file) {
//         console.log("Please upload a file first!");
//     }

//     const storageRef = ref(storage, `/files/${file.name}`);

//     // progress can be paused and resumed. It also exposes progress updates.
//     // Receives the storage reference and the file to upload.
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );

//             // update progress
//             setPercent(percent);
//         },
//         (err) => console.log(err),
//         () => {
//             // download url
//             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                 console.log(url);
//             });
//         }
//     );
//     return percent
// };
// export default useUploadFile;
function handleUpload(file, setPercent) {
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
                console.log(url);
            });
        }
    );
}

export default handleUpload;




