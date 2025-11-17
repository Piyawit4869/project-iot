import { useState, useEffect, useRef } from "react";

interface StreamingTextProps {
  text: string;
  speed?: number;
  onDone?: () => void;
}

export function StreamingText({
  text,
  speed = 50,
  onDone,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTextRef = useRef(text);

  useEffect(() => {
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      setDisplayedText("");
      setCurrentIndex(0);
    }
  }, [text]);

  useEffect(() => {
    if (!text) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      onDone?.();
    }
  }, [currentIndex, text, speed, onDone]);

  return (
    <p className="leading-relaxed whitespace-pre-wrap text-md">
      {displayedText}
    </p>
  );
}
