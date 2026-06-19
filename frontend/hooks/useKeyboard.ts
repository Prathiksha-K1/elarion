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
    console.log("Keyboard Hook Mounted");

    const isTyping = () => {
      const active = document.activeElement;

      return (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement
      );
    };

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      console.log("KEY DOWN:", e.key);

      if (isTyping()) {
        console.log("Typing detected");
        return;
      }

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
      console.log("KEY UP:", e.key);

      const key =
        e.key.toLowerCase();

      setKeys((prev) => ({
        ...prev,
        [key]: false,
      }));
    };

    const resetKeys = () => {
      setKeys({
        w: false,
        a: false,
        s: false,
        d: false,
        shift: false,
        e: false,
      });
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    window.addEventListener(
      "blur",
      resetKeys
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

      window.removeEventListener(
        "blur",
        resetKeys
      );
    };
  }, []);

  return keys;
}