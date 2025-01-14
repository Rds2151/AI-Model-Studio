import React, { useState, useEffect } from "react";
import one from "../../assets/01.jpg";

const AIDetection = () => {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    setOutput(`Processed output for: "${inputText}"`);
  };

  return (
    <div className="h-[70vh] w-[80vw] px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 pt-2">
        <div className="bg-cover h-[30vh]">
          <img src={one} className="h-full w-full object-cover" alt="" />
        </div>

        <h1 className="mt-2 text-3xl font-bold mb-4">AI Detection</h1>
        <p className="text-gray-700 mb-6">
          Analyze and detect AI-generated content to ensure originality and
          authenticity.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>AI content recognition</li>
            <li>Plagiarism check for generated text</li>
            <li>Detailed authenticity scoring</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Enter text:</h2>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            placeholder="Enter your input here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          ></textarea>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleGenerate}
          >
            Generate
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Output:</h3>
            <div className="border border-gray-300 rounded-md p-3 bg-gray-50 mt-2">
              {output || "No output generated yet."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDetection;
