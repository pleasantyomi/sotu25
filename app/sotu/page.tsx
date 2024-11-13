"use client";
import { useState, useEffect } from "react";

export default function Sotu() {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const options = [
      "S",
      "O",
      "T",
      "U",
      "You think say nah play play 😜",
      "Dey plizzy 😂",
      "Dey play my fan 😅",
    ];
    const randomIndex = Math.floor(Math.random() * options.length);
    setDisplayText(options[randomIndex]);
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="h-screen grid items-center place-items-center">
      <h1 className="text-center font-semibold lg:text-[6rem] text-[4.5rem]">
        {displayText}
      </h1>
    </div>
  );
}
