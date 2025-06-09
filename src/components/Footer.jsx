import React from "react";

const Footer = ({ skip, finalPrice, onProceed }) => {
  if (!skip) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-xl transition-transform transform translate-y-0 duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-gray-800">
          <p className="font-semibold text-lg">{skip.size} Yard Skip</p>
          <p className="text-sm text-gray-600">Total: £{finalPrice}</p>
        </div>
        <button
          onClick={onProceed}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Footer;

