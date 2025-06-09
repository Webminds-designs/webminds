"use client";

import React, { useRef, useState } from "react";
import worksData from "../../../public/assets/data/worksData";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/app/Components/Nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/app/Components/Footer";
import CustomCursor2 from "@/app/Components/CustomCursor2";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  description: string;
  img: string;
  imgPor?: string;
  technology: {
    frontendDevelopment?: string[];
    backendDevelopment?: string[];
    databaseManagement?: string[];
    designTools?: string[];
  };
  services: string[];
  navBgColor: string;
  footerBgColor?: string;
  navTextColor?: string;
  link?: string;
}

const ProjectPage = () => {
  const params = useParams();
  const projectId = Number(params.id);

  const project: WorkItem | undefined = worksData.find(
    (p) => p.id === projectId
  );

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isHoverImage, setIsHoverImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track image loading state

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text text-xl">
        Project not found.
      </div>
    );
  }

  const handleMouseEnter = () => setIsHoverImage(true);
  const handleMouseLeave = () => setIsHoverImage(false);

  return (
    <>
      <Nav bgColor={project.navBgColor} navTextColor={project.navTextColor} />

      <motion.div
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-start bg-[#0F0F0F] absolute top-0 text-text overflow-hidden"
        initial={{ opacity: 1, y: "10%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image section */}
        <div className="w-fit h-fit relative top-0">
          <motion.div
            ref={imageRef}
            className="w-screen h-screen overflow-hidden shadow-lg cursor-none relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Smooth animated custom cursor */}
            <AnimatePresence>
              {isHoverImage && (
                <motion.div
                  key="custom-cursor"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none fixed z-50"
                >
                  <CustomCursor2 hovering={true} />
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href={project.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              {/* Spinner while image loads */}
              {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Landscape for larger screens */}
              <Image
                key={`${project.id}-landscape`}
                src={project.img}
                alt={`${project.name} Landscape`}
                width={1920}
                height={1080}
                className={`hidden md:block w-full h-screen object-cover cursor-none transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
                placeholder="blur"
                blurDataURL={project.img}
                onLoad={() => setIsLoading(false)}
              />

              {/* Portrait for small screens */}
              <Image
                key={`${project.id}-portrait`}
                src={project.img}
                alt={`${project.name} Portrait`}
                width={1080}
                height={1920}
                className={`block md:hidden w-full h-screen object-cover object-bottom cursor-pointer transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
                onLoad={() => setIsLoading(false)}
              />
            </Link>
          </motion.div>
        </div>

        {/* Description and Tech */}
        <div className="w-screen md:h-screen h-full flex flex-col md:flex-row bg-[#0a0a0a]">
          {/* Description */}
          <div className="w-full md:w-2/3 h-full flex flex-col justify-center items-center p-6 md:p-12 lg:p-24">
            <div className="w-full h-fit flex justify-center items-center text-start">
              <p className="mt-6 text-xl md:text-2xl lg:text-4xl text-text font-AlbertSans_Regular leading-loose">
                {project.description}
              </p>
            </div>
            {/* Visit live button */}
            <div className="w-full flex justify-start items-center mt-10">
              <Link
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#333] text-white rounded-md hover:bg-[#444] transition-colors duration-300"
              >
                Visit Live
              </Link>
            </div>
          </div>

          {/* Tech and Services */}
          <div className="w-full md:w-1/3 bg-[#212121] md:p-12 p-6 flex justify-center items-center">
            <div className="w-full flex flex-col justify-start items-center font-AlbertSans_Regular gap-8">
              {/* Technologies */}
              <div className="w-full max-w-3xl">
                <h3 className="text-xl font-bold mb-2">Technologies Used:</h3>
                <div className="flex flex-col pl-4 gap-4">
                  {Object.entries(project.technology).map(
                    ([category, techList]) => (
                      <div key={category}>
                        <h4 className="text-md font-semibold text-gray-400 mb-1">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techList?.map((tech, index) => (
                            <motion.span
                              key={index}
                              className="px-4 py-2 bg-opacity-80 rounded-md text-sm bg-[#333]"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.2 + index * 0.1,
                                duration: 0.3,
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Services */}
              <div className="w-full max-w-3xl">
                <h3 className="text-xl font-bold mb-2">Services:</h3>
                <ul className="list-none flex flex-col pl-4 text-gray-300 gap-2">
                  {project.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer
          bgColorBottom={project.footerBgColor || "#1e222b"}
          bgColorMid="#0a0a0a"
          bgColorTop="#0a0a0a"
        />
      </motion.div>
    </>
  );
};

export default ProjectPage;
