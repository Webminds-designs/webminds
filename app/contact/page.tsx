// Contact.tsx
"use client";

import React, { useState, useRef } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Mouse‐move glow setup (unchanged)
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const defaultShadow = `
    16px 4px 20px rgba(45, 95, 157,0.8),
    0px 0px 40px rgba(45, 95, 157,0.3)
  `;
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !headingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const maxOffset = 40;
    const offsetX = (x / (rect.width / 2)) * maxOffset;
    const offsetY = (y / (rect.height / 2)) * maxOffset;
    headingRef.current.style.textShadow = `
      ${-offsetX}px ${-offsetY}px 20px rgba(45, 95, 157,0.8),
      ${offsetX * 0.5}px ${offsetY * 0.5}px 40px rgba(45, 95, 157,0.3)
    `;
  };
  const handleMouseLeave = () => {
    if (headingRef.current) {
      headingRef.current.style.textShadow = defaultShadow;
    }
  };

  // Input handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // EmailJS submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <Nav bgColor="#212121" />

      <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#010B19] text-white md:px-10 md:py-10 px-4 py-10 flex flex-col md:flex-row items-center justify-center font-poppins">
        {/* Left Panel with Glow Effect */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 md:p-4 p-1 flex flex-col items-start text-left relative overflow-visible cursor-move"
        >
          <h1
            ref={headingRef}
            style={{ textShadow: defaultShadow }}
            className="relative  text-[150px] md:text-[300px] font-bold text-[rgb(248,251,254)] leading-none"
          >
            Hey
          </h1>
          <p className="relative mt-12 font-thin md:pr-32 text-4xl text-[#ded9cf] md:pl-6 pl-3">
            Let’s start something great together!
          </p>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 md:px-4 md:py-4 py-8 px-3  space-y-8"
        >
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-600 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email address"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-600 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              placeholder="Your mobile number"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-600 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-600 outline-none"
            />
          </div>
          <div className="relative">
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-600 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end items-center space-x-4">
            {status === "sending" && <span>Sending…</span>}
            {status === "sent" && <span className="text-green-400">Sent!</span>}
            {status === "error" && (
              <span className="text-red-400">Failed.</span>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#ded9cf] text-black px-6 py-2 rounded hover:opacity-80 transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <Footer
        bgColorBottom="#02214d"
        bgColorMid="#07101E"
        bgColorTop="#040719"
      />
    </>
  );
};

export default Contact;
