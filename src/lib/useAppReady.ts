"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __appReady?: boolean;
  }
}

/**
 * Returns true once the preloader curtain has lifted. Reads a global flag first
 * so it can't miss the event when the preloader resolves synchronously (e.g.
 * under reduced-motion), with a timeout as a final safety net.
 */
export function useAppReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.__appReady) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("preloaderComplete", on);
    const fallback = window.setTimeout(() => setReady(true), 4000);
    return () => {
      window.removeEventListener("preloaderComplete", on);
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}
