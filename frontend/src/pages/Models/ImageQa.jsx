import React, { useState } from "react";
import six from "../../assets/06.jpg";
import { useTheme } from "../../ThemeContext";

const ImageQa = () => {
  const server_url = `${import.meta.env.VITE_URL}`;

  const [output, setOutput] = useState("");
  const [image, setImage] = useState(null);
  const [buttonStatus, setButtonStatus] = useState("Generate");
  const { darkMode } = useTheme();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) {
      setOutput("Error: Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("context", document.getElementById("context-text").value);

      setButtonStatus("Generating...");
      const response = await fetch(`${server_url}api/image-qa`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.body.questions_and_answers[0]);
        setButtonStatus("Generate");
      } else {
        setOutput("Error: Unable to process the request.");
      }
    } catch (error) {
      setOutput("Error: Unable to make the request.");
    } finally {
      setButtonStatus("Generate");
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
          <img src={six} className="h-full w-full object-cover" alt="" />
        </div>

        <h1 className="mt-2 text-3xl font-bold mb-4">Image QA</h1>
        <p className="text-gray-500 mb-6">
          Compare expected and provided outputs to identify discrepancies and
          ensure accuracy.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-4">Input image:</h2>
          <input
            type="file"
            onChange={handleImageChange}
            placeholder="Select image file"
            accept="image/jpeg, image/png, image/jpg, image/gif"
          />
          <br />
          <br />
          <h2 className="text-xl font-semibold mb-4">Enter context:</h2>
          <textarea
            id="context-text"
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
            {buttonStatus}
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Output:</h3>
            Question: <div
              className={`border rounded-md p-3 mt-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-400"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {output.question || "No output generated yet."}
            </div>
            Answer: <div
              className={`border rounded-md p-3 mt-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-400"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {output.answer || "No output generated yet."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageQa;
