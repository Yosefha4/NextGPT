"use client";
import React, { useEffect, useState } from "react";

const TypewriterEffect = ({ message, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [message, speed]);

  return <p className="mt-1">{displayedText}</p>;
};

export default TypewriterEffect;
