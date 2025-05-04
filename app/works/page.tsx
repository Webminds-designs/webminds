"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import worksData from "../../public/assets/data/worksData";
import Image from "next/image";
import CustomCursor from "../Components/CustomCursor";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Workspage = () => {
  const [hovering, setHovering] = useState(false);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string>("Show All");

  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredWorks =
    selectedTag === "Show All"
      ? worksData
      : worksData.filter((item) => item.tag?.includes(selectedTag));

  const tags = [
    "Show All",
    "Web Development",
    "Social Media",
    "Digital Marketing",
    "Branding & Desing",
  ];

  const handleImageClick = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Page reveal from bottom
    if (pageRef.current) {
      tl.fromTo(
        pageRef.current,
        { y: "30vh", opacity: 0 },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        }
      );
    }

    // 2. Title letter reveal
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll(".gsap-letter");

      tl.to(
        letters,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.8" // overlap slightly with page reveal
      );
    }

    // 3. Tags fade in and slide up
    tl.fromTo(
      ".gsap-tag",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // 4. Scroll triggers for cards
    tl.call(() => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".gsap-card");

      cards.forEach((card, i) => {
        if (card.dataset.animated) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            delay: i * 0.05,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
            onComplete: () => {
              card.setAttribute("data-animated", "true");
            },
          }
        );
      });
    });
  }, []);

  return (
    <>
      <Nav />
      <div ref={pageRef}>
        <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
          {/* Title */}
          <div className="w-screen pt-20 pl-4 md:pl-16 flex justify-center items-start">
            <div
              ref={titleRef}
              className="text-8xl w-full md:text-[100px] lg:text-[220px] opacity-80 font-AlbertSans_Bold text-start mt-6 md:mt-10 text-text flex"
            >
              {"Work".split("").map((char, index) => (
                <span
                  key={char + index}
                  className="gsap-letter inline-block opacity-0 -translate-x-[100px]"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="w-screen pt-8 md:pt-16 px-4 md:px-16 flex flex-wrap gap-2 font-AlbertSans_Medium">
            {tags.map((tag) => (
              <div
                key={tag}
                className={`gsap-tag w-fit h-fit px-4 md:px-8 py-1 rounded-full cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? "bg-white text-black"
                    : "bg-white bg-opacity-20 text-white"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-screen pt-10 md:px-16 flex justify-center md:mt-14 md:mb-14">
            <hr className="w-full opacity-50" />
          </div>

          {/* Cards */}
          <div className="relative w-screen min-h-screen flex items-center justify-center py-4 px-4 md:px-8 lg:px-12">
            <CustomCursor hovering={hovering} />
            <div
              className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              ref={cardsRef}
            >
              {filteredWorks.map((item) => (
                <div key={item.id} className="gsap-card">
                  <div
                    className="flex flex-col justify-center items-center w-full max-w-[410px] mx-auto transition-transform duration-150"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    <div className="rounded-md shadow-md overflow-hidden w-fit flex flex-col transition-transform duration-150">
                      <div
                        className="relative hover:scale-105 transition-transform duration-450"
                        onClick={() => handleImageClick(item.id)}
                      >
                        <Image
                          src={item.imgPor}
                          alt={item.name}
                          width={400}
                          height={600}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                          <div className="text-black text-2xl font-bold h-12 w-12 bg-white rounded-full text-center flex justify-center items-center">
                            <span className="text-lg">+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Footer bgColor="bg-gradient-to-t from-[#1e222b] via-[#0a0a0a] to-[#0e0e0f]" />
        </div>
      </div>
    </>
  );
};

export default Workspage;
