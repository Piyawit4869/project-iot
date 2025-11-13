import { useState, useEffect } from "react";

interface StreamingTextProps {
  text: string;
  speed?: number;
}

export function StreamingText({ text, speed = 50 }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <p className="leading-relaxed whitespace-pre-wrap text-md">
      {displayedText}
      {/* {currentIndex < text.length && (
        <span
          className="inline-block w-1 h-5 ml-1 animate-pulse"
          style={{ backgroundColor: "#FCAE2F" }} // เคอร์เซอร์เหลือง
        ></span>
      )} */}
    </p>
  );
}
