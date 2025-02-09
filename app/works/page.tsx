"use client";

import React from "react";
import { motion } from "framer-motion";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Works from "../Components/Works";

const Workspage = () => {
  return (
    <>
      <Nav />
      <div className=" w-screen h-fit md:h-96  flex justify-center items-start md:items-center ">
        <div
          className="text-5xl md:text-[100px] lg:text-[250px]  opacity-80 "
          style={{
            display: "inline-block",
            fontFamily: "eight, sans-serif",
          }}
        >
          Careers .
        </div>
      </div>
      <motion.div
        className=" bg-black md:w-screen mt-10 h-fit"
        initial={{ opacity: 1, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Works bgcolor="bg-[#0A0A0A]" />
      </motion.div>
      <Footer bgColor="bg-black" />
    </>
  );
};

export default Workspage;
