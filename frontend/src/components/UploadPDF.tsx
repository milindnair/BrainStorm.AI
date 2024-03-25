import React, { useRef, useState } from "react";
import axios from 'axios';
import { FileDrop } from "react-file-drop";
import { Progress } from "@nextui-org/react";
import { TickCircle } from "iconsax-react";

const UploadPDF = () => {
  const fileInputRef = useRef(null);
  const [uploadedPDF, setUploadedPDF] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [text, setText] = useState('');

  const onFileInputChange = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      setUploadedPDF(files[0].name);
      uploadFile(files[0]);
    }
  };

  const onTargetClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileHandler = (files) => {
    if (files.length > 0) {
      setUploadedPDF(files[0].name);
      uploadFile(files[0]);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:8000/api/text/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });

      setText(response.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[90%] bg-red-500 h-[50vh] p-3 bg-white">
      <p className="text-center font-Montserrat text-2xl">UPLOAD PDF</p>
      <div className="h-[20%] flex justify-center items-center">
        <svg
          className="icon file-icon file-icon--pdf w-12 h-12 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.607 24"
        >
          {/* SVG Paths for PDF icon */}
        </svg>
        {uploadedPDF && (
          <div className="flex flex-col items-center h-full justify-center gap-3 mt-4 w-full ">
            <div>
              <h2 className="font-Monterrat">
                {uploadedPDF ? `${uploadedPDF}` : "Progress"}
              </h2>
              <TickCircle size="32" color="#FF8A65" variant="Bold" />
            </div>
            <Progress value={uploadProgress} size="md" />
          </div>
        )}
      </div>
      <FileDrop onTargetClick={onTargetClick} onDrop={(f) => fileHandler(f)}>
        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          className="hidden"
        />
        <div
          className="border border-dotted flex flex-col items-center justify-center h-full"
          style={{ height: "30vh" }}
        >
          <h2 className="font-Montserrat text-xl font-light">DRAG FILE HERE</h2>
          <h2 className="font-Montserrat text-xl font-light">
            OR
            <span className="text-[blue]"> BROWSE</span>
          </h2>
        </div>
      </FileDrop>
      {text && (
        <div>
          <h2>Extracted Text:</h2>
          <div className="text-container">{text}</div>
        </div>
      )}
    </div>
  );
};

export default UploadPDF;
