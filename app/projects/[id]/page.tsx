"use client";

import React from "react";
import worksData from "../../../public/assets/data/worksData"; // ✅ Corrected import path
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
  description: string;
  imageUrl: string;
  technology: {
    frontendDevelopment?: string[];
    backendDevelopment?: string[];
    databaseManagement?: string[];
    designTools?: string[];
  };
  services: string[];
}

const ProjectPage = () => {
  const params = useParams(); // Get project ID from URL
  const projectId = Number(params.id);

  // Find project by ID
  const project: WorkItem | undefined = worksData.find(
    (p) => p.id === projectId
  );

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Project not found.
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Project Title */}
      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>

      {/* Project Image */}
      <motion.div
        className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={project.imageUrl} // ✅ Fixed image source
          alt={project.name}
          width={800}
          height={500}
          className="rounded-lg"
        />
      </motion.div>

      {/* Project Description */}
      <p className="mt-6 text-lg text-gray-300 max-w-3xl text-center">
        {project.description}
      </p>

      {/* Technologies Used */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Technologies Used:</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(project.technology).map(([category, techList]) => (
            <div key={category}>
              <h4 className="text-md font-semibold text-gray-400 mb-1">
                {category.replace(/([A-Z])/g, " $1").trim()}{" "}
                {/* Format category names */}
              </h4>
              <div className="flex gap-2 flex-wrap">
                {techList?.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-[#393CEC] bg-opacity-80 rounded-md text-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Services:</h3>
        <ul className="list-disc list-inside text-gray-300">
          {project.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Back to Projects Button */}
      <button
        className="mt-8 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition"
        onClick={() => window.history.back()}
      >
        Back to Projects
      </button>
    </motion.div>
  );
};

export default ProjectPage;
