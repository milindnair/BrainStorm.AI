import { Button } from "@nextui-org/button";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AddCircle, Home, Profile, Rank, SearchNormal1 } from "iconsax-react";
import { MdAdd } from "react-icons/md"; // Import the add icon
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    // <div className="flex justify-between items-center  absolute w-full h-[10%] bottom-0 bg-[white] rounded-t-2xl drop-shadow-lg ">
    //   <Button isIconOnly className="bg-inherit">
    //     <Home size="32" color="#FF8A65" />
    //   </Button>
    //   <Button isIconOnly className="bg-inherit">
    //     <SearchNormal1 size="32" color="#FF8A65" />
    //   </Button>
    //   <Button isIconOnly className="bg-black" style={{ zIndex: 1 }}>
    //     {/* Custom button with inner radius */}
    //     <div className="relative ">
    //       <div className="absolute inset-0 flex items-center justify-center ">
    //         <MdAdd size="32" color="#FF8A65" />
    //       </div>
    //     </div>
    //   </Button>
    //   <Button isIconOnly className="bg-inherit">
    //     <Rank size="32" color="#FF8A65" />
    //   </Button>
    //   <Button isIconOnly className="bg-inherit">
    //     <Profile size="32" color="#FF8A65" />
    //   </Button>
    // </div>
    <div className="flex flex-row">
      <div className="absolute bg-[white] h-[8%] top-[92%] w-[20%] rounded-tl-2xl flex items-center justify-center">
        <Button isIconOnly className="bg-inherit">
          <Home size="25" color="#8796a1" />
        </Button>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[20%] flex items-center justify-center rounded-tr-lg">
        <Button isIconOnly className="bg-inherit">
          <SearchNormal1 size="25" color="#8796a1" />
        </Button>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[40%] container ">
        <div className="z-1 absolute left-[18%] top-[-25px] ">
          <AddCircle size="49" color="#ffff" variant="Bold"  onClick={()=> navigate('/create-quiz')}/>
        </div>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[60%] flex items-center justify-center rounded-tl-lg">
        <Button isIconOnly className="bg-inherit">
          <Rank size="25" color="#8796a1" />
        </Button>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[80%] rounded-tr-2xl flex items-center justify-center">
        <Button isIconOnly className="bg-inherit">
          <Profile size="25" color="#8796a1" />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
