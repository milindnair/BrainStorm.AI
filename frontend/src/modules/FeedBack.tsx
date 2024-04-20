import { Card, CardBody, CardFooter, Textarea, Button } from "@nextui-org/react"
import { db } from "../utils/Firebaseconfig";
import { addDoc, collection, setDoc,doc} from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  name : string
}

function FeedBack(props: Props) {

  const handleSubmit = async (text:string) => {
    if(props.name) {
      await setDoc(doc(db, "feedback", props.name), {
        userId: props.name,
        comments: text
      })
    }
  } 



  const [comment, setComment] = useState("")

  return (
    <div className="w-[96vw] mx-auto p-3">
        <Card>
            <CardBody>
                <Textarea
                label="Feedback"
                className="font-rubik"
                classNames={{
                  label: "text-xl"
                }}
                variant="underlined"
                minRows={0}
                value={comment}
                onChange={(e:any) => {
                  setComment(comment => e.target.value)
                }}
                />
            </CardBody>
            <CardFooter>
              <Button onClick={() => {handleSubmit(comment)}}>
                Submit Feedback
              </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default FeedBack