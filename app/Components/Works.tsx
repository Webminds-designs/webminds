"use client";

import React, { useState } from "react";
import worksData from "../../public/assets/data/worksData.js";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import { useRouter } from "next/navigation";
import ImageModal from "./ImageModal";

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

const Works: React.FC<WorksProps> = ({ bgcolor, setNavigationAnimation }) => {
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageClick = (imageUrl: string, projectId: number) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
    setTimeout(() => {
      setNavigationAnimation(true);
    }, 1000);

    setTimeout(() => {
      router.push(`/projects/${projectId}`);
    }, 1000);
  };

  return (
    <div
      className={`relative w-screen min-h-screen flex items-center justify-center py-4 px-4 md:px-8 md:py-8 lg:px-12 lg:py-12 ${bgcolor} `}
    >
      <CustomCursor hovering={hovering} />

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        imageUrl={selectedImage || ""}
        onClose={() => setModalOpen(false)}
      />

      <div className="w-full max-w-[1920px] h-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 cursor-none">
        {worksData.map((item: WorkItem, index: number) => (
          <div
            key={item.id}
            className="flex flex-col"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Card with Image */}
            <div
              id={`card-${index}`}
              className="w-full aspect-[3/4] rounded-md shadow-md p-0 overflow-hidden bg-[#0a0a0a] flex flex-col transition-transform duration-150 cursor-none"
            >
              <div
                className="relative w-full h-full cursor-none"
                onClick={() => handleImageClick(item.imgPor, item.id)}
              >
                <Image
                  src={item.imgPor}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-150 cursor-none"
                />
              </div>
            </div>

            {/* Text Below Image */}
            <div className="bg-black bg-opacity-40 py-2 flex flex-col justify-end cursor-none">
              <h3 className="text-white text-base md:text-sm lg:text font-bold">
                {item.name}
              </h3>
              <p className="text-sm md:text-base text-gray-300">
                {item.textOverlay}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
