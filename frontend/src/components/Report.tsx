import React, { useState } from "react";
import {
  Modal,
  Checkbox,
  Textarea,
  Button,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/Firebaseconfig";
import { useSnackbar } from "notistack";

const Report = ({ isOpen, onClose, quiz, question }) => {
  const [reportReason, setReportReason] = useState("");
  const [wrongQuestion, setWrongQuestion] = useState(false);
  const [wrongOption, setWrongOption] = useState(false);
  const [otherReason, setOtherReason] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the report object
    const report = {
      reasons: {
        wrongQuestion: wrongQuestion ? "Wrong Question" : "",
        wrongOption: wrongOption ? "Wrong Option" : "",
        otherReason: otherReason ? "Other" : "",
      },
      otherReasonText: otherReason ? reportReason : "",
      question: question, 
    };

    try {

        const docRef = await addDoc(collection(db, "reports"), report);
        console.log("Report submitted successfully:", report);
        console.log("Document written with ID: ", docRef.id);
        enqueueSnackbar('Report submitted successfully!', { variant: 'success', autoHideDuration: 2000 });
     } catch (error) {
        console.error("Error submitting report:", error);
        enqueueSnackbar('Error submitting report.', { variant: 'error', autoHideDuration: 2000 });
     }

    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Report Reason</ModalHeader>
      <ModalContent>
        <form onSubmit={handleSubmit} className="flex flex-col p-3">
          <Checkbox
            checked={wrongQuestion}
            onChange={() => setWrongQuestion(!wrongQuestion)}
            className="font-rubik"
          >
            Wrong Question
          </Checkbox>
          <Checkbox
            checked={wrongOption}
            onChange={() => setWrongOption(!wrongOption)}
            className="font-rubik"
          >
            Wrong Option
          </Checkbox>
          <Checkbox
            checked={otherReason}
            onChange={() => setOtherReason(!otherReason)}
            className="font-rubik"
          >
            Other (Please specify)
          </Checkbox>
          {otherReason && (
            <Textarea
              placeholder="Please specify the reason"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="mt-2"
            />
          )}
          <Button type="submit" color="primary" className="mt-4">
            Submit
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Report;
