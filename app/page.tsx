"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.9);
  const [topP, setTopP] = useState(0.9);
  const [maxLength, setMaxLength] = useState(100);
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://3.145.29.211/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          temperature,
          p: topP,
          max_length: maxLength,
        }),
      });
      const data = await res.json();
      setLyrics(data.lyrics);
    } catch (error) {
      setLyrics("Error generating lyrics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">🎤 Rap Lyrics Generator</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4"
      >
        <input
          className="w-full p-2 border rounded"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          required
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm">Temperature</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Top P</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={topP}
              onChange={(e) => setTopP(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Max Length</label>
            <input
              type="number"
              min="1"
              max="500"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {lyrics && (
        <div className="max-w-xl mx-auto mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Generated Lyrics:</h2>
          <pre className="whitespace-pre-wrap">{lyrics}</pre>
        </div>
      )}
    </div>
  );
}
