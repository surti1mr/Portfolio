"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const current = strings[currentIndex];

    if (isPaused) return;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        setDisplayText(current.slice(0, displayText.length + 1));
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(current.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % strings.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, isPaused, strings, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return { displayText, isTyping: !isDeleting && displayText.length < strings[currentIndex]?.length };
}
