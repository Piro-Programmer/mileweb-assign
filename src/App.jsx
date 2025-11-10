import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import useSoundManager from "./hooks/useSoundManager";
import LoadingOverlay from "./components/LoadingOverlay";
import Backgrounds from "./components/Backgrounds";
import Columns from "./components/Columns";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import SoundToggle from "./components/SoundToggle";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { enabled, enableAudio, play } = useSoundManager();
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const lenisRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);

  const artists = [
    "Silence",
    "Meditation",
    "Intuition",
    "Authenticity",
    "Presence",
    "Listening",
    "Curiosity",
    "Patience",
    "Surrender",
    "Simplicity",
  ];

  const categories = [
    "Reduction",
    "Essence",
    "Space",
    "Resonance",
    "Truth",
    "Feeling",
    "Clarity",
    "Emptiness",
    "Awareness",
    "Minimalism",
  ];

  // keep ref in sync with state for callbacks
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!loaded) return;

    // Initialize Lenis (smooth scroll)
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      direction: "vertical",
      gestureDirection: "vertical",
      touchMultiplier: 2,
    });

    lenisRef.current.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenisRef.current.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // Create a ScrollTrigger that pins the fixed container and drives progress
    scrollTriggerInstanceRef.current = ScrollTrigger.create({
      trigger: "#fixed-section",
      start: "top top",
      end: "bottom bottom",
      pin: "#fixed-container",
      pinSpacing: true,
      onUpdate: (self) => {
        // determine section from progress
        const newSection = Math.min(9, Math.floor(self.progress * 10));
        if (newSection !== currentRef.current) {
          // update state and play sound
          setCurrent(newSection);
          play("textChange", 250);
        }
      },
    });

    // Cleanup on unmount
    return () => {
      if (scrollTriggerInstanceRef.current) {
        scrollTriggerInstanceRef.current.kill();
        scrollTriggerInstanceRef.current = null;
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (lenisRef.current) {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // ignore
        }
        lenisRef.current = null;
      }
      gsap.ticker.remove((t) => lenisRef.current?.raf(t * 1000));
    };
    // only run once after `loaded` becomes true
  }, [loaded, play]);

  return (
    <div className="relative bg-black text-white overflow-x-hidden min-h-screen">
      {!loaded && <LoadingOverlay onComplete={() => setLoaded(true)} />}
      <SoundToggle enabled={enabled} onToggle={enableAudio} />

      <div id="scroll-container" className="relative">
        {/* This long container creates scroll length for the pin effect */}
        <div id="fixed-section" className="relative h-[1100vh]">
          {/* This container is pinned to viewport */}
          <div
            id="fixed-container"
            className="sticky top-0 left-0 w-full h-screen overflow-hidden"
          >

            {/* Backgrounds are absolute and behind the grid content */}
            <Backgrounds active={current} />
            <div className="absolute inset-0 bg-black/30 z-[2] pointer-events-none"></div>

            {/* Grid wrapper for text and other content, placed above backgrounds */}
            <div className="relative z-[3] grid grid-cols-12 gap-4 px-8 h-full">
              {/* Header (spans across) */}
              <div className="col-span-12 text-center text-[10vw] leading-[0.8] pt-[5vh] text-[rgba(245,245,245,0.9)] font-primary">
                <div>The Creative</div>
                <div>Process</div>
              </div>

              {/* Content (left + center + right) - absolutely centered vertically */}
              <div className="col-span-12 absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
                {/* Left column and right column are positioned inside Columns component */}
                <Columns
                  artists={artists}
                  categories={categories}
                  current={current}
                  onClick={(i) => {
                    enableAudio();
                    play("click");
                    // snap to section by setting state; primary snapping handled by ScrollTrigger/Lenis logic
                    setCurrent(i);
                  }}
                  onHover={() => {
                    enableAudio();
                    play("hover");
                  }}
                />
                {/* Featured sits at center — pointer events enabled so interactive text can respond */}
                <div className="pointer-events-auto">
                  <Featured current={current} />
                </div>
              </div>

              {/* Footer area at bottom of the grid (visual only) */}
              <div className="col-span-12 self-end">
                <Footer current={current} />
              </div>
            </div>
          </div>

          {/* End / unpin section — when scrolling reaches here, the pin will release */}
          <div className="end-section h-screen flex items-center justify-center bg-white text-black">
            <p className="rotate-90">fin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
