import { AvatarIcon,Avatar } from "@nextui-org/react";
import React from "react";

type Props = {
  usrname: String
};

const HeaderCard = (props: Props) => {
  return (
    <div className="w-[90%] flex justify-around  ml-[5%] items-center">
      <div className="flex flex-col w-[80%]">
        <div className="font-medium font-rubik text-skin text-l">Welcome</div>
        <div>
          <h1 className="font-medium text-2xl font-rubik text-white">{props.usrname}</h1>
        </div>
      </div>
      <div className="w-[20%]">        
        <Avatar  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="h-14 w-14" />
      </div>
    </div>
  );
};

export default HeaderCard;
