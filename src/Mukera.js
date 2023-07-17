import { useState,useEffect } from "react";
import handleUpload from "./util/uploadFile";

function Mukera() {
    const [file, setFile] = useState(null);
    const [percent, setPercent] = useState(0);

    const handleUploadClick = () => {
        handleUpload(file, setPercent);
    };

    function handleChange(event) {
        setFile(event.target.files[0]);
        setPercent(0);
    }

    useEffect(() => {
        handleUpload(file, setPercent);
    }, [file]);

    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUploadClick}>Upload to Firebase</button>
            <div>{percent} % done</div>
        </div>
    );
}

export default Mukera;
