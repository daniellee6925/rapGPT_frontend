"use client";

import { useState } from "react";
import MainApp from "./components/MainApp";

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">🎤 Welcome to EminemGPT.com</h1>
        <p className="text-lg mb-6 max-w-2xl">
          Generate AI-powered rap lyrics and have them performed in Eminem’s voice.
        </p>
        <button
          onClick={() => setShowLanding(false)}
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          🚀 Get Started
        </button>
      </div>
    );
  }

  return <MainApp />;
}
