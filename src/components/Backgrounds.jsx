import { useEffect, useRef } from "react";
import gsap from "gsap";

// Import your local images
import img1 from "../assets/flame-glow-blur-001.jpg";
import img2 from "../assets/flame-glow-blur-002.jpg";
import img3 from "../assets/flame-glow-blur-003.jpg";
import img4 from "../assets/flame-glow-blur-004.jpg";
import img5 from "../assets/flame-glow-blur-005.jpg";
import img6 from "../assets/flame-glow-blur-006.jpg";
import img7 from "../assets/flame-glow-blur-007.jpg";
import img8 from "../assets/flame-glow-blur-008.jpg";
import img9 from "../assets/flame-glow-blur-009.jpg";
import img10 from "../assets/flame-glow-blur-010.jpg";

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function Backgrounds({ active }) {
  const containerRef = useRef();

  useEffect(() => {
    // fade all images out first
    const imgs = containerRef.current.querySelectorAll(".bg-image");

    gsap.to(imgs, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // fade only the active one in
    gsap.to(imgs[active], {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.1,
    });
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1]"
    >
      {IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`bg-${i}`}
          className="bg-image absolute top-0 left-0 w-full h-full object-cover brightness-90 opacity-0"
        />
      ))}
    </div>
  );
}






// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Import your images explicitly — Vite will handle them correctly
// import img1 from "../assets/flame-glow-blur-001.jpg";
// import img2 from "../assets/flame-glow-blur-002.jpg";
// import img3 from "../assets/flame-glow-blur-003.jpg";
// import img4 from "../assets/flame-glow-blur-004.jpg";
// import img5 from "../assets/flame-glow-blur-005.jpg";
// import img6 from "../assets/flame-glow-blur-006.jpg";
// import img7 from "../assets/flame-glow-blur-007.jpg";
// import img8 from "../assets/flame-glow-blur-008.jpg";
// import img9 from "../assets/flame-glow-blur-009.jpg";
// import img10 from "../assets/flame-glow-blur-010.jpg";

// gsap.registerPlugin(ScrollTrigger);

// export default function Backgrounds() {
//   const containerRef = useRef();

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const images = gsap.utils.toArray(".bg-image");

//       images.forEach((img, i) => {
//         gsap.set(img, { opacity: i === 0 ? 1 : 0 });

//         ScrollTrigger.create({
//           trigger: "#fixed-section",
//           start: `${(i / images.length) * 100}% top`,
//           end: `${((i + 1) / images.length) * 100}% top`,
//           scrub: true,
//           onEnter: () => gsap.to(img, { opacity: 1, duration: 1.2 }),
//           onLeave: () => gsap.to(img, { opacity: 0, duration: 1.2 }),
//           onEnterBack: () => gsap.to(img, { opacity: 1, duration: 1.2 }),
//           onLeaveBack: () => gsap.to(img, { opacity: 0, duration: 1.2 }),
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   // ✅ use direct imports
//   const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

//   return (
//     <div
//       ref={containerRef}
//       className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1]"
//     >
//       {images.map((src, i) => (
//         <img
//           key={i}
//           src={src}
//           alt={`bg-${i}`}
//           className="bg-image absolute top-0 left-0 w-full h-full object-cover brightness-90 opacity-0"
//         />
//       ))}
//     </div>
//   );
// }
