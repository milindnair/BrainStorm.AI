import { Button } from "@nextui-org/button";
import { AddCircle, Home, Profile, Rank, SearchNormal1 } from "iconsax-react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row footer">
      <div className="absolute bg-[white] h-[8%] top-[92%] w-[20%] rounded-tl-2xl flex items-center justify-center">
        <Button isIconOnly className="bg-inherit" onClick={() => navigate('/home')}>
          <Home size="25" color="#8796a1" />
        </Button>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[20%] flex items-center justify-center rounded-tr-lg">
        <Button isIconOnly className="bg-inherit" onClick={() => navigate('/search')}>
          <SearchNormal1 size="25" color="#8796a1" />
        </Button>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[40%] container ">
        <div className="z-1 absolute left-[18%] top-[-25px] ">
          <AddCircle size="49" color="#ffff" variant="Bold"  onClick={()=> navigate('/create-quiz')}/>
        </div>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[60%] flex items-center justify-center rounded-tl-lg">
        <Button isIconOnly className="bg-inherit" onClick={() => {navigate('/leaderboard')}}>
          <Rank size="25" color="#8796a1" />
        </Button>
      </div>
      <div className="absolute bg-[white] h-[8%] w-[20%] top-[92%] left-[80%] rounded-tr-2xl flex items-center justify-center">
        <Button isIconOnly className="bg-inherit" onClick={()=> navigate('/profile')}>
          <Profile size="25" color="#8796a1" />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
