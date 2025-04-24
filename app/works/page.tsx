"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import worksData from "../../public/assets/data/worksData";
import Image from "next/image";
import CustomCursor from "../Components/CustomCursor";
import { usePathname, useRouter } from "next/navigation";
import ImageModal from "../Components/ImageModal";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  imgPor: string;
}

const Workspage = () => {
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;

    const image = card.querySelector(".card-image") as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * -20;

    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (image) {
        image.style.transform = `translateZ(60px) scale(1.3)`;
      }
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;

    const image = card.querySelector(".card-image") as HTMLElement;
    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      if (image) {
        image.style.transform = `translateZ(0px) scale(1)`;
      }
    });
    setHovering(false);
  };

  const handleImageClick = (imageUrl: string, projectId: number) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);

    setTimeout(() => {
      router.push(`/projects/${projectId}`);
    }, 500); // Match with animation duration
  };

  const pageVariants = {
    initial: {
      y: "40%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <Nav />
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div className="w-screen h-fit md:h-fit pt-20 md:pl-16 flex justify-center items-start md:items-center">
          <div className="text-5xl w-full md:text-[100px] lg:text-[180px] opacity-80 font-AlbertSans_Bold text-start text-white mt-20 md:mt-0">
            Works
          </div>
        </div>

        <div
          className={`relative w-screen min-h-screen flex items-center justify-center py-4 px-4 md:px-8 md:py-8 lg:px-12 lg:py-12 `}
        >
          <CustomCursor hovering={hovering} />

          <div className="w-full max-w-[1920px] h-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 cursor-none">
            {worksData.map((item: WorkItem, index: number) => (
              <motion.div
                key={item.id}
                className="flex flex-col justify-center items-center w-full max-w-[410px] mx-auto transition-transform duration-150 cursor-none"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              >
                {/* Card with Image */}
                <div
                  id={`card-${index}`}
                  className="rounded-md shadow-md overflow-hidden w-fit flex flex-col transition-transform duration-150 cursor-none"
                >
                  <div
                    className="relative cursor-none hover:scale-105 transition-transform duration-450"
                    onClick={() => handleImageClick(item.imgPor, item.id)}
                  >
                    <Image
                      src={item.imgPor}
                      alt={item.name}
                      width={400}
                      height={600}
                      className="object-cover cursor-none"
                    />
                    <div className="absolute inset-0 bg-white bg-opacity-10 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                      <div className="text-black text-2xl font-bold cursor-none h-12 w-12 bg-white rounded-full text-center flex justify-center items-center">
                        <span className="text-lg">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer bgColor="bg-black" />
      </motion.div>
    </>
  );
};

export default Workspage;
