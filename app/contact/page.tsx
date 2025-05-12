// Contact.tsx
"use client";

import React, { useState, useRef } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
// import Footer from "../Components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    subject: "",
    message: "",
  });

  // Refs for the container and the H1
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Your default glow
  const defaultShadow = `
    16px 4px 20px rgba(45, 95, 157,0.8),
    0px 0px 40px rgba(45, 95, 157,0.3)
  `;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  // Update text-shadow on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !headingRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // coords relative to center of container
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const maxOffset = 40; // max px from center
    const offsetX = (x / (rect.width / 2)) * maxOffset;
    const offsetY = (y / (rect.height / 2)) * maxOffset;

    // apply dynamic glow
    headingRef.current.style.textShadow = `
      ${-offsetX}px ${-offsetY}px 20px rgba(45, 95, 157,0.8),
      ${offsetX * 0.5}px ${offsetY * 0.5}px 40px rgba(45, 95, 157,0.3)
    `;
  };

  // Snap back to default glow on leave
  const handleMouseLeave = () => {
    if (headingRef.current) {
      headingRef.current.style.textShadow = defaultShadow;
    }
  };

  return (
    <>
      <Nav bgColor="#212121" />

      <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#010B19] text-white p-10 flex flex-col md:flex-row items-center justify-center font-poppins">
        {/* Left Panel */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 p-4 flex flex-col items-start text-left relative overflow-visible cursor-move"
        >
          <h1
            ref={headingRef}
            style={{ textShadow: defaultShadow }}
            className="relative z-10 text-[200px] md:text-[300px] font-bold text-[rgb(248,251,254)] leading-none font-Poppins"
          >
            Hey
          </h1>
          <p className="relative z-10 mt-12 font-thin font-Poppins pr-32 text-4xl text-[#ded9cf] pl-6">
            Let’s start something great together!
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-4 space-y-8 font-Poppins"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-5">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name here"
              className="w-full px-4 py-2 text-[#E2E2E2]  bg-transparent border-b border-b-gray-400 text-sm outline-none"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-5">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number here"
              className="w-full px-4 py-2 text-[#E2E2E2]  bg-transparent border-b border-b-gray-400 text-sm outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-5">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="w-full px-4 py-2 text-[#E2E2E2]  bg-transparent border-b border-b-gray-400 text-sm outline-none"
            />
          </div>

          {/* Message */}
          <div className="relative w-full">
            <label className="block mb-5">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us more about what you need?"
              className="w-full px-4 pt-4 pb-2 bg-transparent border-b border-b-gray-400 text-sm  outline-none placeholder-transparent resize-none"
            />
            <span className="absolute bottom-4 left-4 text-[#E2E2E2] text-sm pointer-events-none ">
              {formData.message === "" && "Tell us more about what you need?"}
            </span>
          </div>

          <div className="flex items-center justify-end mt-8">
            {/* Submit Button */}

            <button
              type="submit"
              className="bg-[#ded9cf] text-black px-6 py-2 rounded hover:opacity-80 transition-all "
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <Footer
        bgColorBottom="#02214d"
        bgColorTop="#040719"
        bgColorMid="#07101E"
      />
    </>
  );
};

export default Contact;
