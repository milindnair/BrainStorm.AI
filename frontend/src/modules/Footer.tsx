import { Button } from '@nextui-org/button'
import React from 'react'
import {AiFillHome} from 'react-icons/ai';
import {BsSearch} from 'react-icons/bs';
import {MdOutlineLeaderboard} from 'react-icons/md';
import {CiUser} from 'react-icons/ci';

const Footer = () => {
  return (
    <div className='flex justify-between items-center p-2 absolute w-full h-[10%] bottom-0 bg-[white] rounded-2xl drop-shadow-lg '>
        <Button isIconOnly className='bg-inherit'>
            <AiFillHome className='text-3xl'/>
            </Button>
            <Button isIconOnly className='bg-inherit'>
            <BsSearch className='text-3xl'/>
            </Button>
            <Button isIconOnly className='bg-inherit'>
            <MdOutlineLeaderboard className='text-3xl'/>
            </Button>
            <Button isIconOnly className='bg-inherit'>
            <CiUser className='text-3xl'/>
            </Button>
            
        
    </div>
  )
}

export default Footer;