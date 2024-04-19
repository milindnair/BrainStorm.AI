import { Card, CardBody, CardFooter, Divider, Textarea } from "@nextui-org/react"
import { db } from "../utils/Firebaseconfig";
import { addDoc, collection, setDoc,doc} from "firebase/firestore";


function FeedBack() {



  return (
    <div className="w-[96vw] mx-auto p-3">
        <Card>
            <CardBody>
                <Textarea
                label="Feedback"
                className="font-rubik"
                variant="underlined"
                minRows={2}
                >
                </Textarea>
            </CardBody>

        </Card>
    </div>
  )
}

export default FeedBack