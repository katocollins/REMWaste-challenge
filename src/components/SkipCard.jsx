import React, { useState, useEffect } from "react";
import skipImage from "../assets/skip.jpg";

const SkipCard = ({ skip, finalPrice, onSelect, isSelected = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(skip);
    }
  };

  return (
    <div className="relative group">
      <div
        onClick={handleCardClick}
        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden cursor-pointer transform hover:scale-[1.02] ${
          isSelected
            ? "border-4 border-blue-500 ring-4 ring-blue-100"
            : "border border-gray-100 hover:border-blue-200"
        }`}
      >
        <div className="absolute -top-3 -right-3 z-20">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
              <span className="text-lg font-bold">£{finalPrice}</span>
            </div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-800 rounded-full opacity-20"></div>
          </div>
        </div>

        <div className="relative mb-4">
          <div className="w-full h-36 relative">
            <div className="w-full h-28 relative rounded-lg overflow-hidden shadow-inner bg-white">
              <img
                src={skipImage}
                alt="Skip"
                className="object-contain w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-10">
                <div className="text-3xl font-bold text-black mb-1">
                  {skip.size}
                </div>
                <div className="text-sm font-medium text-white">Yard Skip</div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div
                className={`w-1 bg-gradient-to-b from-blue-600 to-blue-400 transition-all duration-[3000ms] ease-out ${
                  showDetails ? "h-20" : "h-0"
                }`}
              />
              <div
                className={`w-3 h-3 bg-blue-600 rounded-full transition-all duration-[3000ms] ease-out delay-[2500ms] ${
                  showDetails ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            </div>
          </div>

          <div
            className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-xs transition-all duration-500 ease-out ${
              showDetails
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mx-2 relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
              <h3 className="font-semibold text-gray-800 mb-3 text-center">
                Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hire Period:</span>
                  <span className="font-medium text-gray-800">
                    {skip.hire_period_days} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Road Placement:</span>
                  <span
                    className={`font-medium flex items-center ${
                      skip.allowed_on_road ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        skip.allowed_on_road ? "bg-green-600" : "bg-red-400"
                      }`}
                    ></span>
                    {skip.allowed_on_road ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Heavy Waste:</span>
                  <span
                    className={`font-medium flex items-center ${
                      skip.allows_heavy_waste
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        skip.allows_heavy_waste ? "bg-green-600" : "bg-red-400"
                      }`}
                    ></span>
                    {skip.allows_heavy_waste ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-4">
          <div
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-center ${
              isSelected
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isSelected ? "Selected" : "Select This Skip"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
