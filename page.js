"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [joke, setJoke] = useState("");

  const fetchJoke = async () => {
    const { data } = await axios.get("https://v2.jokeapi.dev/joke/Dark");
    setJoke(
      data.type === "twopart" ? `${data.setup} - ${data.delivery}` : data.joke
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => (setIsOpen(true), fetchJoke())}
      >
        Open Jokes
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Dark Joke</h2>
            <p className="mb-4">{joke || "Loading..."}</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-700 rounded"
                onClick={fetchJoke}
              >
                New Joke
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
