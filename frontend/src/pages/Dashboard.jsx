import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

import one from "../assets/01.jpg";
import two from "../assets/02.jpeg";
import three from "../assets/03.png";
import four from "../assets/04.png";
import five from "../assets/05.png";

const modelCards = [
  {
    id: 1,
    title: "AI Detection",
    description:
      "Analyze and detect AI-generated content to ensure originality and authenticity.",
    route: "/models/ai-detection",
    imageUrl: one,
  },
  {
    id: 2,
    title: "GrammarPro",
    description:
      "Enhance writing quality with advanced grammar, spelling, and style suggestions.",
    route: "/models/grammar-pro",
    imageUrl: two,
  },
  {
    id: 3,
    title: "Output Validator",
    description:
      "Compare expected and provided outputs to identify discrepancies and ensure accuracy.",
    route: "/models/output-validator",
    imageUrl: three,
  },
  {
    id: 4,
    title: "Insights",
    description:
      "Unlock key data-driven insights for improved decision-making and analysis.",
    route: "/models/insights",
    imageUrl: four,
  },
  {
    id: 5,
    title: "Similarity Search",
    description:
      "Identify and retrieve content or data with similar patterns or structures.",
    route: "/models/similarity-search",
    imageUrl: five,
  },
];

const ModelCard = ({ title, description, imageUrl, route, darkMode }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className={`shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl 
        ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
    >
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-gray-900 via-gray-900/20 to-transparent opacity-80"></div>
      </div>
      <div className={`p-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
        <h3
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-blue-300" : "text-blue-400"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <div
      className={`ml-64 p-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className={`text-4xl font-bold mb-2 ${
            darkMode ? "text-blue-300" : "text-blue-800"
          }`}
        >
          Welcome to AI Model Studio
        </h1>
        <p
          className={`text-lg mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Explore our collection of cutting-edge AI models and try them out in
          real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelCards.map((card) => (
            <ModelCard
              key={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              route={card.route}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
