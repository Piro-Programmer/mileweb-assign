import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingOverlay({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 3 + 1;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(() => {
          gsap.to(".loading-counter", { opacity: 0, y: -20, duration: 0.6 });
          gsap.to("#loading-overlay", {
            y: "-100%",
            duration: 1.2,
            ease: "power3.inOut",
            delay: 0.5,
            onComplete,
          });
        }, 200);
      }
      setCount(Math.floor(value));
    }, 30);
  }, [onComplete]);

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 bg-white flex items-center justify-center text-black text-2xl font-primary z-[9999]"
    >
      Loading <span className="loading-counter ml-2">[{count.toString().padStart(2, "0")}]</span>
    </div>
  );
}
