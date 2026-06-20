"use client";

import { useEffect, useState } from "react";

export default function useKeyboard() {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    e: false,
  });

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      const key =
        e.key.toLowerCase();

      setKeys((prev) => ({
        ...prev,
        [key]: true,
      }));
    };

    const handleKeyUp = (
      e: KeyboardEvent
    ) => {
      const key =
        e.key.toLowerCase();

      setKeys((prev) => ({
        ...prev,
        [key]: false,
      }));
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );
    };
  }, []);

  return keys;
}