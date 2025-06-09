import React, { useState } from "react";
import SkipCard from "../components/SkipCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSkipData from "../hooks/useSkipData";

const SkipSelection = ({
  postcode = "NR32",
  area = "Lowestoft",
  onSkipSelect,
}) => {
  const { skips, loading, error, calculateFinalPrice, retry } = useSkipData(
    postcode,
    area
  );
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSkipSelect = (skip) => {
    const newSelectedId = selectedSkipId === skip.id ? null : skip.id;
    setSelectedSkipId(newSelectedId);
    if (onSkipSelect) {
      onSkipSelect(newSelectedId ? skip : null);
    }
  };

  const normalizeSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    const numberMap = {
      one: "1",
      two: "2",
      three: "3",
      four: "4",
      five: "5",
      six: "6",
      seven: "7",
      eight: "8",
      nine: "9",
      ten: "10",
      twelve: "12",
      fourteen: "14",
    };
    let normalized = lowerQuery.replace(/\b(yard|yd)s?\b/gi, "").trim();
    Object.entries(numberMap).forEach(([word, num]) => {
      normalized = normalized.replace(new RegExp(`\\b${word}\\b`, "gi"), num);
    });
    const match = normalized.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const filteredSkips = skips.filter((skip) => {
    if (!searchQuery) return true;
    const searchSize = normalizeSearch(searchQuery);
    return searchSize ? skip.size === searchSize : true;
  });

  const totalItems = filteredSkips.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkips = filteredSkips.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const selectedSkip = skips.find((s) => s.id === selectedSkipId);
  const finalPrice = selectedSkip
    ? calculateFinalPrice(selectedSkip.price_before_vat, selectedSkip.vat)
    : 0;

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 text-lg mb-6">{error}</p>
          <button
            onClick={retry}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (skips.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-6xl mb-6">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Skips Available
          </h2>
          <p className="text-gray-600 text-lg">
            No skip options are currently available for your location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E5E5E5] py-4 px-4 pb-20">
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 mt-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Select the perfect skip size for your project. All prices include
            VAT and {skips[0]?.hire_period_days || 14}-day hire period.
          </p>
        </div>

        <div className="mb-4 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by yard size (e.g., 4, four, 4 yard)"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-700"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {filteredSkips.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No skips match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedSkips.map((skip, index) => (
              <div
                key={skip.id}
                className="transform hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SkipCard
                  skip={skip}
                  finalPrice={calculateFinalPrice(
                    skip.price_before_vat,
                    skip.vat
                  )}
                  onSelect={handleSkipSelect}
                  isSelected={selectedSkipId === skip.id}
                />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-end">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      <Footer
        skip={selectedSkip}
        finalPrice={finalPrice}
        onProceed={() => console.log("Proceed to pay with skip:", selectedSkip)}
      />
    </div>
  );
};

export default SkipSelection;
