import { Card, CardBody, CardFooter, Textarea, Button } from "@nextui-org/react"
import { db } from "../utils/Firebaseconfig";
import { addDoc, collection, setDoc,doc} from "firebase/firestore";
import { useEffect, useState } from "react";



function FeedBack({ name }) {

  const handleSubmit = async (text) => {
    await setDoc(doc(db, "feedback", name), {
      userId: name,
      comments: text
    })
  } 

  const [comment, setComment] = useState("")

  return (
    <div className="w-[96vw] mx-auto p-3">
        <Card>
            <CardBody>
                <Textarea
                label="Feedback"
                className="font-rubik"
                variant="underlined"
                minRows={2}
                value={comment}
                onChange={(e:any) => {
                  setComment(comment => e.target.value)
                }}
                />
            </CardBody>
            <CardFooter>
              <Button>

              </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default FeedBack