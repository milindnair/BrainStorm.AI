import { Divider } from "@nextui-org/react"

function ContactUs() {
  return (
    <div className='text-white font-rubik font-small'>
      <Divider className="bg-white mt-40" />
      <h1 className="pl-3 pt-2">Contact Us</h1>
      <div className="pl-3 pt-2 flex text-small w-full">
        <h3 className="w-1/3">Shivom Karnad</h3>
        <Divider orientation="vertical" />
        <h3 className="text-right w-2/3">shivom.k@somaiya.edu</h3>
      </div>
      <div className="pl-3 pt-2 flex text-small w-full">
        <h3 className="w-1/3">Milind Nair</h3>
        <Divider orientation="vertical" />
        <h3 className="text-right w-2/3">milind.nair@somaiya.edu</h3>
      </div>
    </div>
  )
}

export default ContactUs