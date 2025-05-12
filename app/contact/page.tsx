"use client";

import React, { useState } from "react";
import Nav from "../Components/Nav";
// import Footer from "../Components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // 🔄 Replace with your API call or logic
  };

  return (
    <>
      <Nav bgColor="#212121" />
      <div className="min-h-screen bg-gradient-to-b from-[#131313] to-[#0E101C] text-white p-10 flex flex-col md:flex-row items-center justify-center font-AlbertSans_Regular">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-[200px] md:text-[350px] font-bold text-[#b8d0ff] leading-none">
            Hey
          </h1>
          <p className="mt-4 text-lg text-[#ded9cf]">
            Let’s start something great together!
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-4 space-y-12"
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
              className="w-full px-4 py-2 bg-transparent border-b border-b-gray-400 text-base outline-none"
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
              className="w-full px-4 py-2 bg-transparent border-b border-b-gray-400 text-base outline-none"
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
              className="w-full px-4 py-2 bg-transparent border-b border-b-gray-400 text-base outline-none"
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
              className="w-full px-4 pt-4 pb-2 bg-transparent border-b border-b-gray-400 text-base outline-none text-white placeholder-transparent resize-none"
              placeholder="Tell us more about what you need?"
            />
            <span className="absolute bottom-4 left-4 text-gray-400 pointer-events-none text-base">
              {formData.message === "" && "Tell us more about what you need?"}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#ded9cf] text-black px-6 py-2 rounded hover:opacity-80 transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
