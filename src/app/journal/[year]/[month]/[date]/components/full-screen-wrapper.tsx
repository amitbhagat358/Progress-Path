"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullscreenWrapperProps {
  children: React.ReactNode;
}

export default function FullscreenWrapper({
  children,
}: FullscreenWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f" && e.ctrlKey) {
        e.preventDefault();
        toggleFullscreen();
      }

      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div
      className={`transition-all ease-linear duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background py-0 overflow-auto"
          : "w-full"
      }`}
    >
      <div className="fixed top-[90svh] right-10 z-10 flex justify-end mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <X className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>
      </div>
      {children}
    </div>
  );
}
