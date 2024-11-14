/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";


const generateUniqueId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export default function Sotu() {
  const [collectedLetters, setCollectedLetters] = useState<{[key: string]: string}>({});

  const generateLetter = () => {
    if (typeof window === "undefined") return "";

    const TWO_MINUTES = 2 * 60 * 60 * 1000;
    const now = Date.now();

    const defaultCounts = {
      lastReset: now,
      letters: {
        S: [],
        O: [],
        T: [],
        U: [],
        "2": [],
        "4": [],
      },
    };

    const stored = localStorage.getItem("sotuCounts");
    const counts = stored ? JSON.parse(stored) : defaultCounts;

    if (!counts || !counts.letters) {
      localStorage.setItem("sotuCounts", JSON.stringify(defaultCounts));
      return "🎮";
    }

    if (now - counts.lastReset > TWO_MINUTES) {
      counts.lastReset = now;
      Object.keys(counts.letters).forEach((key) => {
        counts.letters[key] = [];
      });
    }

    Object.keys(counts.letters).forEach((key) => {
      counts.letters[key] = counts.letters[key].filter(
        (timestamp: number) => now - timestamp < TWO_MINUTES
      );
    });

    const availableLetters = Object.entries(counts.letters)
      .filter(([_, timestamps]) => (timestamps as number[]).length < 4)
      .map(([letter]) => letter);

    if (availableLetters.length === 0) {
      const funMessages = [
        "You think say nah play play 😜",
        "Dey plizzy 😂",
        "Dey play my fan 😅",
        "No be juju be that? 🤔",
        "Oya calm down 😌",
        "Too fast! Take am easy 😏",
        "Wait small nau 😅",
        "2 minutes cooldown ⏰",
        "Loading... ⌛",
        "Try again later 🎮",
      ];
      return funMessages[Math.floor(Math.random() * funMessages.length)];
    }

    if (Math.random() < 0.7) {
      const teasingMessages = [
        "You think say nah play play 😜",
        "Dey plizzy 😂",
        "Dey play my fan 😅",
        "No be juju be that? 🤔",
        "Oya calm down 😌",
        "Too fast! Take am easy 😏",
        "Wait small nau 😅",
        "2 minutes cooldown ⏰",
        "Loading... ⌛",
        "Try again later 🎮",
      ];
      return teasingMessages[
        Math.floor(Math.random() * teasingMessages.length)
      ];
    }

    const selected =
      availableLetters[Math.floor(Math.random() * availableLetters.length)];
    counts.letters[selected].push(now);
    localStorage.setItem("sotuCounts", JSON.stringify(counts));

    if (selected) {
      const uniqueId = `${selected}-${generateUniqueId()}`;
      setCollectedLetters(prev => ({
        ...prev,
        [uniqueId]: selected
      }));
    }

    return selected;
  };

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const letter = generateLetter();
    setDisplayText(letter);
  }, []);

  return (
    <div className="relative h-screen grid items-center place-items-center">
      <h1 className="text-center font-semibold lg:text-[6rem] text-[4.5rem]">
        {displayText}
      </h1>

      <div className="absolute bottom-3">
        <p className="font-mono tracking-wider">
          {Object.entries(collectedLetters)
            .sort(([idA], [idB]) => parseInt(idA.split('-')[1]) - parseInt(idB.split('-')[1]))
            .map(([id, letter]) => letter)
            .join('')}
        </p>
      </div>
    </div>
  );
}
