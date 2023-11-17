import React, { useState, useEffect } from "react";

interface TypewriterProps {
  texts: string[];
  delay?: number; // Optional delay between texts in milliseconds
}

export const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  delay = 1000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => {
      if (isTyping) {
        setCurrentText((prevText) => {
          if (prevText === texts[currentIndex]) {
            setIsTyping(false);
            setTimeout(() => {
              setIsTyping(true);
              setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
              setCurrentText("");
            }, delay); // Wait for the specified delay before typing the next one
          }
          return texts[currentIndex].substring(0, prevText.length + 1);
        });
      } else {
        setCurrentText((prevText) => {
          if (prevText === "") {
            setIsTyping(true);
          } else {
            setTimeout(() => {
              setCurrentText("");
              setIsTyping(true);
            }, delay / 6); // Wait for half of the specified delay after backspacing
          }
          return prevText.substring(0, prevText.length - 1);
        });
      }
    }, 100); // Typing speed (adjust as needed)

    return () => clearInterval(textInterval);
  }, [currentText, currentIndex, isTyping, texts, delay]);

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "100px",
        color: "#fff",
        fontSize: "24px",
      }}
    >
      {currentText}
    </div>
  );
};
