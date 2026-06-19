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
    const isTyping = () => {
      const active =
        document.activeElement;

      return (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement
      );
    };

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (isTyping()) return;

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