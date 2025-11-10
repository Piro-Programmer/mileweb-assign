import { useEffect, useRef, useState } from "react";

export default function useSoundManager() {
  const [enabled, setEnabled] = useState(false);
  const sounds = useRef({});

  useEffect(() => {
    const preload = (name, url, volume = 0.3) => {
      const audio = new Audio(url);
      audio.volume = volume;
      sounds.current[name] = audio;
    };

    preload("hover", "https://assets.codepen.io/7558/click-reverb-001.mp3", 0.15);
    preload("click", "https://assets.codepen.io/7558/shutter-fx-001.mp3");
    preload("textChange", "https://assets.codepen.io/7558/whoosh-fx-001.mp3");
  }, []);

  const enableAudio = () => {
    if (!enabled) setEnabled(true);
  };

  const play = (name, delay = 0) => {
    if (!enabled || !sounds.current[name]) return;
    const sound = sounds.current[name];
    setTimeout(() => {
      sound.currentTime = 0;
      sound.play().catch(() => { });
    }, delay);
  };

  return { enabled, enableAudio, play };
}
