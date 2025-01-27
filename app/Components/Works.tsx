import React from "react";
import worksData from "../../public/assets/data/worksData.js";
import Image from "next/image";

const Works = () => {
  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`card-${index}`);
    const image = card.querySelector(".card-image");
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    image.style.transform = `translateZ(50px) scale(1.1)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`card-${index}`);
    const image = card.querySelector(".card-image");
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) `;
    image.style.transform = `translateZ(0px) scale(1)`;
  };

  return (
    <div className="w-screen h-fit flex items-center justify-center p-12 bg-black">
      <div className="w-fit grid grid-cols-3 gap-20">
        {worksData.map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="w-[500px] bg-gray-900 rounded-md shadow-md p-8 transition-transform duration-300 items-center border-2 border-solid border-gray-300"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="card-image-wrapper"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/assets/image.png"
                alt="img"
                width={450}
                height={200}
                className="card-image transition-transform duration-300 rounded"
                style={{ transform: "translateZ(0px)" }}
              />
            </div>
            <h3 className="text-lg text-text font-bold mb-2 mt-4">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{item.textOverlay}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
