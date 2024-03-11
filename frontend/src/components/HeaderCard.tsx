import { AvatarIcon,Avatar } from "@nextui-org/react";
import React from "react";

type Props = {};

const HeaderCard = (props: Props) => {
  return (
    <div className="w-[90%] flex justify-around  ml-[5%] items-center">
      <div className="flex flex-col w-[80%]">
        <div className="font-medium font-rubik text-skin text-l">Good Morning</div>
        <div>
          <h1 className="font-medium text-2xl font-rubik text-white">Milind Nair</h1>
        </div>
      </div>
      <div className="w-[20%]">        
        <Avatar  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </div>
    </div>
  );
};

export default HeaderCard;
