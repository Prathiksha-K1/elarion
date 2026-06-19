"use client";

import { useEffect } from "react";

interface Props {
  text: string;
  show: boolean;
  onHide: () => void;
}

export default function SignalPopup({
  text,
  show,
  onHide,
}: Props) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onHide();
    }, 1800);

    return () => clearTimeout(timer);
  }, [show, onHide]);

  if (!show) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 40,
          left: "50%",
          transform: "translateX(-50%)",

          zIndex: 999999,

          minWidth: 320,

          background:
            "rgba(15,23,42,0.92)",

          backdropFilter: "blur(18px)",

          border:
            "1px solid rgba(124,58,237,0.35)",

          boxShadow:
            "0 0 40px rgba(124,58,237,0.25)",

          color: "white",

          padding: "18px 26px",

          borderRadius: 18,

          animation:
            "elarionPopup 1.8s ease forwards",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 2,
            opacity: 0.6,
            marginBottom: 6,
          }}
        >
          ELARION NETWORK
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {text}
        </div>
      </div>

      <style jsx>{`
        @keyframes elarionPopup {
          0% {
            opacity: 0;
            transform:
              translateX(-50%)
              translateY(-20px)
              scale(0.95);
          }

          15% {
            opacity: 1;
            transform:
              translateX(-50%)
              translateY(0)
              scale(1);
          }

          80% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              translateX(-50%)
              translateY(-30px)
              scale(0.98);
          }
        }
      `}</style>
    </>
  );
}