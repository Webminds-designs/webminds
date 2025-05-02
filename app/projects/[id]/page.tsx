"use client";

import React, { useRef } from "react";
import worksData from "../../../public/assets/data/worksData";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/app/Components/Nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/app/Components/Footer";

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  description: string;
  img: string;
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
}

const ProjectPage = () => {
  const params = useParams();
  const projectId = Number(params.id);

  // Find project by ID
  const project: WorkItem | undefined = worksData.find(
    (p) => p.id === projectId
  );

  // Refs for elements
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text text-xl">
        Project not found.
      </div>
    );
  }

  console.log("Project bg color:", project.navBgColor);

  return (
    <>
      <Nav bgColor={project.navBgColor} navTextColor={project.navTextColor} />
      <motion.div
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-start bg-black absolute top-0 text-text overflow-hidden"
        initial={{ opacity: 1, y: "10%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Project Title & Text Overlay with GSAP Parallax */}
        <div className="w-fit h-fit relative top-0">
          {/* Project Image with GSAP Parallax Effect */}
          <motion.div
            ref={imageRef}
            className="w-screen h-screen overflow-hidden shadow-lg"
          >
            <Image
              key={project.id}
              src={project.img}
              alt={project.name}
              width={0}
              height={0}
              sizes="100%"
              className="w-full h-screen md:h-full object-cover object-right md:object-cover md:object-bottom"
              loading="lazy" // ✅ Remove index check, load eagerly
              placeholder="blur" // Optional: Blur effect before loading
              blurDataURL="/placeholder.jpg" // Placeholder image (low-quality version)
            />
          </motion.div>
        </div>
        <div className="w-screen h-screen flex">
          {/* Project Description */}
          <div className="w-2/3 h-screen flex justify-center items-center text-start p-6  md:p-12 lg:p-24">
            <p className="mt-6 text-xl md:text-2xl lg:text-4xl text-text  text-start font-AlbertSans_Regular leading-loose">
              {project.description}
            </p>
          </div>
          <div className="w-1/3 h-screen bg-[#212121] md:p-12 flex justify-between items-center">
            <div className="w-full h-full flex flex-col justify-center items-center font-AlbertSans_Regular">
              {/* Technologies Used */}
              <div className="mt-6 w-full flex-col justify-between items-center max-w-3xl ">
                <h3 className="text-xl font-bold mb-2">Technologies Used:</h3>
                <div className="flex flex-col  pl-4 gap-3">
                  {Object.entries(project.technology).map(
                    ([category, techList]) => (
                      <div key={category}>
                        <h4 className="text-md font-semibold text-gray-400 mb-1">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <div className="flex flex-warp gap-2 ">
                          {techList?.map((tech, index) => (
                            <motion.span
                              key={index}
                              className="px-4 py-2  bg-opacity-80 rounded-md text-sm"
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
              <div className="mt-6 w-full max-w-3xl">
                <h3 className="text-xl font-bold mb-2">Services:</h3>
                <ul className="list-none flex flex-col pl-4 list-inside text-gray-300 gap-2">
                  {project.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer bgColor={" bg-green-950"} />
      </motion.div>
    </>
  );
};

export default ProjectPage;
