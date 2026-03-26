"use client";

import { useEffect, useState } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText({
  text,
  className,
  delay = 0,
  start = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  start?: boolean;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!start) return;
    let timeout: NodeJS.Timeout;
    let iteration = 0;

    const startScramble = () => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Controls speed of reveal
      }, 30);
    };

    timeout = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay, start]);

  return <span className={className}>{displayText}</span>;
}
