import React, { useState } from "react";
import one from "../../assets/05.png";
import { useTheme } from "../../ThemeContext";
import { marked } from "marked";

const SimilaritySearch = () => {
  const server_url = `${import.meta.env.VITE_URL}`;

  const [inputText, setInputText] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Generate");
  const [output, setOutput] = useState("");
  const { darkMode } = useTheme();

  const handleGenerate = async () => {
    try {
      setButtonStatus("Generating...");
      const response = await fetch(`${server_url}api/similarity-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.body.summary);
        setButtonStatus("Generate");
      } else {
        setOutput("Error: Unable to process the text.");
      }
    } catch (error) {
      setOutput("Error: Unable to make the request.");
    } finally {
      setButtonStatus("Generate");
    }
  };

  return (
    <div
      className={`min-h-screen ml-64 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto shadow-md rounded-lg p-6 pt-2 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="bg-cover h-[30vh] mt-5">
          <img src={one} className="h-full w-full object-cover" alt="" />
        </div>

        <h1 className="mt-2 text-3xl font-bold mb-4">Similarity Search</h1>
        <p className="text-gray-500 mb-6">
          Identify and retrieve content or data with similar patterns or
          structures.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-500">
            <ul className="list-disc list-inside text-gray-500">
              <li>
                AI-powered content recognition for accurate similarity detection
              </li>
              <li>
                Detailed authenticity scoring to evaluate content similarity
              </li>
              <li>
                Customizable search parameters for tailored similarity detection
              </li>
            </ul>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Enter text:</h2>
          <input
            type="number"
            className={`w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            placeholder="Enter your input here... e.g. 592764"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          ></input>
          <button
            className={`${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-md`}
            onClick={handleGenerate}
            type="submit"
            disabled={buttonStatus == 'Generate' ? false : true}
          >
            {buttonStatus}
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
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(output || "No output generated yet."),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilaritySearch;
