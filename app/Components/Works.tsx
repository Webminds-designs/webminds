import React, { useState } from "react";
import worksData from "../../public/assets/data/worksData.js";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import { usePathname, useRouter } from "next/navigation";
import ImageModal from "./ImageModal";

interface WorkItem {
  id: number;
  name: string;
  textOverlay: string;
}

const Works: React.FC = () => {
  const [hovering, setHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
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
        image.style.transform = `translateZ(60px) scale(1.2)`;
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
    setHovering(false); // Hide cursor
  };

  const handleImageClick = (imageUrl: string, projectId: number) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);

    setTimeout(() => {
      router.push(`/projects/${projectId}`); // ✅ Correct navigation for App Router
    }, 3000);
  };

  const handleMouseEnter = () => setHovering(true); // Show cursor

  return (
    <div className="relative w-screen h-fit flex items-center justify-center p-12 bg-black">
      {/* Custom Cursor */}
      <CustomCursor hovering={hovering} />

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        imageUrl={selectedImage || ""}
        onClose={() => setModalOpen(false)}
      />

      <div className="w-fit grid grid-cols-4 gap-20">
        {worksData.map((item: WorkItem, index: number) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="w-[320px] h-fit bg-gray-900 rounded-md shadow-md p-8 flex flex-col transition-transform duration-150 items-center"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseEnter={handleMouseEnter}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
          >
            <div
              className="card-image-wrapper"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-lg text-white font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-8">{item.textOverlay}</p>

              {/* Image with cursor effect */}
              <div
                className="relative"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <Image
                  src="/assets/image.png"
                  alt="img"
                  width={400}
                  height={300}
                  className="card-image transition-transform duration-150 rounded cursor-none"
                  onClick={() => handleImageClick("/assets/image.png", item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
