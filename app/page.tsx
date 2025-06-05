"use client";

import { useState } from "react";
import MainApp from "./components/MainApp";

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to EminemGPT.com</h1>
        <p className="text-lg mb-6 max-w-3xl">
          <strong>RapGPT</strong> is a pre-trained & fine-tuned GPT-2 model designed to generate original rap lyrics similar to Eminem&apos;s Lyric style based on user prompts. 
        </p>

        <p className="text-gray-800 font-semibold mb-6">
          ⚠️ Disclaimer: This model may generate inappropriate content. Intended for educational and experimental use only.
        </p>

        <h2 className="text-2xl font-bold mb-4">How to Use:</h2>
        <ol className="list-decimal list-inside text-base mb-6 space-y-2">
          <li>Enter a prompt — “I&apos;m beginning to feel like a rap god...”</li>
          <li>Adjust creativity settings (temperature, top-p, max length)</li>
          <li>Generate and optionally <strong>hear</strong> the output in Eminem’s voice</li>
        </ol>
        <button
          onClick={() => setShowLanding(false)}
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-400 transition"
        >
          🚀 Get Started
        </button>
      </div>
    );
  }

  return <MainApp />;
}
