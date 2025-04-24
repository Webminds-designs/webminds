"use client";

import React, { useState } from "react";
import worksData from "../../public/assets/data/worksData.js";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import { useRouter } from "next/navigation";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  imgPor: string;
}

interface WorksProps {
  bgcolor: string;
  setNavigationAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Works: React.FC<WorksProps> = ({ bgcolor }) => {
  const [hovering, setHovering] = useState(false);
  const router = useRouter();
  //handleImageClick function to naviagete
  const handleImageClick = (img: string, id: number) => {
    setHovering(false);

    router.push(`/projects/${id}`);
    // Adjust the delay as needed
  };

  return (
    <div
      className={`relative w-screen min-h-screen flex items-center justify-center py-4 px-4 md:px-8 md:py-8 lg:px-12 lg:py-12 ${bgcolor}`}
    >
      <CustomCursor hovering={hovering} />

      <div className="w-full max-w-[1920px] h-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 cursor-none  ">
        {worksData.map((item: WorkItem, index: number) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center w-full max-w-[410px] mx-auto transition-transform duration-150 cursor-none"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Card with Image */}
            <div
              id={`card-${index}`}
              className="rounded-md shadow-md overflow-hidden w-fit  flex flex-col transition-transform duration-150 cursor-none"
            >
              <div
                className="relative cursor-none hover:scale-105 transition-transform duration-450"
                onClick={() => handleImageClick(item.imgPor, item.id)}
              >
                <Image
                  src={item.imgPor}
                  alt={item.name}
                  width={400} // or auto-controlled width
                  height={600}
                  className="object-cover cursor-none"
                />
                <div className="absolute inset-0 bg-white  bg-opacity-10 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <div className="text-black text-2xl font-bold cursor-none h-12 w-12 bg-white rounded-full text-center flex justify-center items-center">
                    <span className="text-lg">+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Below Image */}
            {/* <div className="bg-black bg-opacity-40 py-2 flex flex-col justify-end w-full p-2 cursor-none">
              <h3 className="text-white text-base md:text-sm lg:text font-bold">
                {item.name}
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                {item.textOverlay}
              </p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
