"use client";
import { useState, useEffect } from "react";

export default function Sotu() {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const options = ["S", "O", "T", "U", "SIKE"];
    const randomIndex = Math.floor(Math.random() * options.length);
    setDisplayText(options[randomIndex]);
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="flex min-h-screen items-center justify-center text-6xl font-bold">
      {displayText}
    </div>
  );
}
