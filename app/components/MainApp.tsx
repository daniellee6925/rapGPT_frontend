"use client";
import { useState } from "react";
import Image from "next/image";

export default function MainApp() {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.9);
  const [topP, setTopP] = useState(0.9);
  const [maxLength, setMaxLength] = useState(100);
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.error("Generation error:", error);
      setLyrics("Something went wrong. Please try generating again — it might be a minor glitch.");
    } finally {
      setLoading(false);
    }
  };

 const handlePlayLyrics = async () => {
  setIsPlaying(true); // Set playing status to true
  try {
    const response = await fetch("http://3.145.29.211/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lyrics }),
    });

    if (!response.ok) {
      console.error("TTS generation failed");
      setIsPlaying(false);
      return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.onended = () => setIsPlaying(false); 
    audio.onerror = () => setIsPlaying(false); 

    audio.play();
  } catch (err) {
    console.error("Audio playback error", err);
    setIsPlaying(false);
  }
};

  return (
      <div className="min-h-screen bg-black text-white flex flex-col">
          {/* Title*/}
          <h1 className="text-6xl font-bold text-center py-6">
            I&apos;m Beginnin&apos; to Feel Like a Rap God
          </h1>
          <hr className="mt-3 border-t-2 border-white w-5/6 mx-auto" />

          <div className="flex flex-1">
            <div className="w-1/2 flex items-center justify-center p-4">
              <Image
                src="/Eminem.jpg"
                alt="Rap vibe"
                width={600} // Adjust dimensions as needed
                height={800}
                className="rounded-xl shadow-lg object-contain max-h-[90vh]"
              />
          </div>

        {/* Right Column - Controls */}
        <div className="w-1/2 flex flex-col p-6 pr-12 text-xl gap-y-4">
          <div className="grid grid-cols-3 gap-4 mb-0 mr-30">
            <div>
             <label className="text-lg font-bold flex items-center gap-1 relative group">
                Temperature
                <span className="text-gray-400 cursor-pointer">?</span>

                {/* Tooltip box */}
                <div className="absolute left-15 top-0 z-10 w-60 p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Controls randomness (max 2.0): lower means more predictable, higher means more creative.
                </div>
            </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-30 p-2 rounded bg-white text-black border border-gray-700"
              />
            </div>
            <div>
              <label className="text-lg font-bold flex items-center gap-1 relative group">
                Top P
                <span className="text-gray-400 cursor-pointer">?</span>
                <div className="absolute left-15 top-0 z-10 w-60 p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Limits diversity of output. Lower P means more focused, P = 1 means full variety.
                </div>
              </label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={topP}
                onChange={(e) => setTopP(Number(e.target.value))}
                className="w-30 p-2 rounded bg-white text-black border border-gray-700"
              />
            </div>
            <div>
              <label className="text-lg font-bold flex items-center gap-1 relative group">
                Max Tokens
                <span className="text-gray-400 cursor-pointer">?</span>
                <div className="absolute left-15 top-0 z-10 w-60 p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  The maximum number of tokens to generate (max 120 tokens). 
                </div>
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                className="w-30 p-2 rounded bg-white text-black border border-gray-700"
              />
            </div>
          </div>

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="space-y-4 pr-30">
            <input
              className="w-full p-3 bg-white text-black border border-gray-700 rounded"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Start your flow... (e.g., I'm beginning to feel like a rap god)"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-indigo-200 text-black rounded hover:bg-gray-300 font-bold">
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>

          {/* Status Bar */}
          <div className="mt-4 text-lg text-yellow-400 min-h-[24px] font-semibold">
            {loading && (
              <span className="animate-spin inline-block mr-2">🔄</span>
            )}
            {loading && "Generating Lyrics..."}
          </div>

          {/* Output Box*/}
          <div className="flex-grow p-6 bg-white text-black border border-gray-700 rounded overflow-y-auto max-h-[400px] text-lg mr-30">
            <pre className="whitespace-pre-wrap pr-4">
               {lyrics || (
                <>
                  Lyrics will be outputed here.
                  <br />
                  <span className="text-sm text-gray-500 italic">
                    (Note: This app runs on a CPU-only server <strong>(no GPU)</strong>, so it may take up to 20 seconds to generate 100 tokens. Please be patient!)
                  </span>
                </>
              )}
            </pre>
          </div>

        {/* Play Lyrics*/}
         <button
          onClick={handlePlayLyrics}
          className={`mt-4 py-2 px-4 rounded mr-30 ${
            lyrics ? 'bg-indigo-400 text-white hover:bg-gray-800' : 'bg-indigo-400 text-gray-200 cursor-not-allowed'
          }`}
          disabled={!lyrics}
          title={lyrics ? '' : 'Generate lyrics first'}>
          🔊 Hear This Rap in Eminem&apos;s Voice
        </button>
        {/* Playback Status Bar */}
        {isPlaying && (
          <div className="mt-4 text-green-400 text-lg font-semibold animate-pulse">
            🎤 Playing Rap...
          </div>
        )}
        </div>
        
      </div>
      <footer className="mt-10 border-t pt-6 pb-4 text-center text-md text-white">
          <p>
            Built by Daniel Lee<a href="https://yourwebsite.com" className="ml-2 text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">Visit my site</a> · 
            <a href="https://github.com/daniellee6925/rapGPT2.0" className="ml-2 text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </footer>
      </div>


  );
}


