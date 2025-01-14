import React, { useState } from "react";
import one from "../../assets/01.jpg";
import { useTheme } from "../../ThemeContext";

const AIDetection = () => {
  const server_url = `${import.meta.env.VITE_URL}`;

  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const { darkMode } = useTheme();

  const handleGenerate = async () => {
    try {
      const response = await fetch(`${server_url}api/detect-ai-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput((data.output.toFixed(2)*100)+"% Ai Detected");
      } else {
        setOutput("Error: Unable to process the text.");
      }
    } catch (error) {
      setOutput("Error: Unable to make the request.");
    }
  };

  return (
    <div
      className={`min-h-screen pt-10 ml-64 px-4 pt-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto shadow-md rounded-lg p-6 pt-2 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="bg-cover h-[30vh]">
          <img src={one} className="h-full w-full object-cover" alt="" />
        </div>

        <h1 className="mt-2 text-3xl font-bold mb-4">AI Detection</h1>
        <p className="text-gray-500 mb-6">
          AI content recognition, Plagiarism check for generated text, Detailed
          authenticity scoring.
        </p>

        {/* <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-500">
            AI content recognition, Plagiarism check for generated text,
            Detailed authenticity scoring.
          </ul>
        </div> */}

        <div>
          <h2 className="text-xl font-semibold mb-4">Enter text:</h2>
          <textarea
            className={`w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            rows="3"
            placeholder="Enter your input here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          ></textarea>
          <button
            className={`${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-md`}
            onClick={handleGenerate}
            type="submit"
          >
            Generate
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Output:</h3>
            <div
              className={`border rounded-md p-3 mt-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-400"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {output || "No output generated yet."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDetection;
