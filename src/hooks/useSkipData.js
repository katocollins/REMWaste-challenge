import { useState, useEffect } from "react";

const useSkipData = (postcode = "NR32", area = "Lowestoft") => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Sort skips by size for better user experience
      const sortedSkips = data.sort((a, b) => a.size - b.size);
      setSkips(sortedSkips);
    } catch (err) {
      console.error("Error fetching skips:", err);
      setError(err.message || "Failed to load skip options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, [postcode, area]);

  const calculateFinalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const getSkipsBySize = () => {
    return skips.reduce((acc, skip) => {
      const size = skip.size;
      if (!acc[size]) {
        acc[size] = [];
      }
      acc[size].push(skip);
      return acc;
    }, {});
  };

  const getAvailableSkipSizes = () => {
    return [...new Set(skips.map((skip) => skip.size))].sort((a, b) => a - b);
  };

  const retry = () => {
    fetchSkips();
  };

  return {
    skips,
    loading,
    error,
    calculateFinalPrice,
    getSkipsBySize,
    getAvailableSkipSizes,
    retry,
  };
};

export default useSkipData;
