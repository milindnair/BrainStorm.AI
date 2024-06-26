import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { Progress } from "@nextui-org/react";
import { TickCircle } from "iconsax-react";
import pdfIcon from "../assets/pdf-icon.svg";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
// import pdfParse from 'pdf-parse';



const UploadPDF = (props) => {
  const fileInputRef = useRef(null);
 const [uploadedPDF, setUploadedPDF] = useState(null);
 const [uploadProgress, setUploadProgress] = useState(0);

 const navigate = useNavigate();

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
  props.onLoadingStart();
  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/text/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      }
    );

    props.setText(response.data.text);
    props.setSummary(response.data.summary);
    props.onLoadingEnd();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="w-full bg-red-500 h-[25vh] bg-white">
      <p className="text-center font-Montserrat text-2xl bg-gray-300">UPLOAD PDF</p>

      {uploadedPDF && (
        <div className="h-[20%] flex justify-center items-center">
          <img src={pdfIcon} alt="" className="h-[50px] w-[50px]" />
          <div className="flex flex-col items-center h-full justify-center gap-3 mt-4 w-full ">
            <div className="flex gap-2 items-center">
              <h2 className="font-Monterrat">
                {uploadedPDF ? `${uploadedPDF}` : "Progress"}
              </h2>
              <TickCircle size="32" color="#FF8A65" variant="Bold" />
            </div>
            <Progress value={uploadProgress} size="md" />
          </div>
        </div>
      )}

      <FileDrop onTargetClick={onTargetClick} onDrop={(f) => fileHandler(f)}>
        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          className="hidden"
        />
        <div
          className="border border-dotted flex flex-col items-center justify-center"
          style={{ height: "20vh" }}
        >
          <h2 className="font-Montserrat text-xl font-light">DRAG FILE HERE</h2>
          <h2 className="font-Montserrat text-xl font-light">
            OR
            <span className="text-[blue]"> BROWSE</span>
          </h2>
        </div>
      </FileDrop>
      {/* {
        text.length > 0 && (
          <div className="mt-5">
            <p className="font-Montserrat text-xl">Extracted Text</p>
            <p className="font-Montserrat text-lg">{text}</p>
          </div>
        )
      } */}
      
      
    </div>
  );
};

export default UploadPDF;
