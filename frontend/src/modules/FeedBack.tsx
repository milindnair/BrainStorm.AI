import { Card, CardBody, CardHeader, Divider, Textarea } from "@nextui-org/react"

function FeedBack() {
  return (
    <div className="w-[96vw] mx-auto p-3">
        <Card>
            <CardBody>
                <Textarea
                label="Feedback"
                className=""
                variant="underlined"
                minRows={0}
                >
                </Textarea>
            </CardBody>
        </Card>
    </div>
  )
}

export default FeedBack