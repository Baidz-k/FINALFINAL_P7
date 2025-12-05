"use client";

import { useEffect } from "react";

export default function AudioLoop() {
  useEffect(() => {
    const audio = new Audio("/audio/ryuk.mp3");
    audio.loop = false;
    audio.volume = 1;

    let cancelled = false;

    const startPlayback = () => {
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("keydown", startPlayback);

      const playCycle = async () => {
        while (!cancelled) {
          try {
            await audio.play();
          } catch {
            // ignore
          }

          // wait for audio to finish
          await new Promise<void>((resolve) => {
            audio.onended = () => resolve();
          });

          // wait 5 seconds
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      };

      playCycle();
    };

    // ✅ Wait for user interaction (required by browsers)
    document.addEventListener("click", startPlayback);
    document.addEventListener("keydown", startPlayback);

    return () => {
      cancelled = true;
      audio.pause();
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("keydown", startPlayback);
    };
  }, []);

  return null;
}