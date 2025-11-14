import React from "react";
import favicon from "@/app/favicon.ico";
import Image from "next/image"; 
import {House,
        Search,
        Compass
       } from "lucide-react";


export default function navbar() {
  return (
  <nav className=" text-white mx-4 rounded-sm">
    <div className=" flex items-center justify-between">
        <div className="">
          <Image 
            src={favicon} 
            alt="Logo" 
            width={48} 
            height={48}
          />
        </div>
        <div className="flex flex-row">
        <div className=" group mx-2 bg-[#2a2a2a] p-2.5 rounded-full ">
          <House 
            className="text-gray-500 group-hover:text-white"
          />
        </div>
        <div className="flex flex-row justify-center items-center bg-[#2a2a2a] rounded-3xl">
          <form action="">
          <div className=" group flex flex-row justify-center items-center">
        <div className="mx-4">
          <Search
          className="text-gray-500 group-hover:text-white"/>
        </div>
        <div className="mx-2">
          <label htmlFor="Searchbar">
          </label>
          <input 
          type="text"
          className="
            w-full 
            bg-transparent 
            outline-none 
            text-sm md:text-base 
            text-white "
          placeholder="Search.." />
          
        </div>
          </div>
          </form>
        <div className="group mx-4 border-l-2 border-gray-600 pl-4">
          <Compass
           className="text-gray-500 group-hover:text-white"/>
        </div>
        </div>
        </div>
        <div>
          p
        </div>
      </div>
  </nav>
  );
}
