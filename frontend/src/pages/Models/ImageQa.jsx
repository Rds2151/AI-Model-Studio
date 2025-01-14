import React, { useState } from "react";
import three from "../../assets/03.png";
import { useTheme } from "../../ThemeContext";

const ImageQa = () => {
  const server_url = `${import.meta.env.VITE_URL}`;

  const [output, setOutput] = useState("");
  const { darkMode } = useTheme();

  const handleGenerate = async () => {
    try {
      const response = await fetch(`${server_url}api/output-validator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data);
      } else {
        setOutput("Error: Unable to process the text.");
      }
    } catch (error) {
      setOutput("Error: Unable to make the request.");
    }
  };

  return (
    <div
      className={`min-h-screen ml-64 pt-4 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto shadow-md rounded-lg p-6 pt-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="bg-cover h-[30vh]">
          <img src={three} className="h-full w-full object-cover" alt="" />
        </div>

        <h1 className="mt-2 text-3xl font-bold mb-4">Image QA</h1>
        <p className="text-gray-500 mb-6">
          Compare expected and provided outputs to identify discrepancies and
          ensure accuracy.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-4">Input image:</h2>
          <input type="file" placeholder="Select image file" />
          <br />
          <br />
          <h2 className="text-xl font-semibold mb-4">Enter context:</h2>
          <textarea
            className={`w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            rows="3"
            placeholder="Enter context for the image here..."
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
            Check
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

export default ImageQa;
