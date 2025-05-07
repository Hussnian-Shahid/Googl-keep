import React from "react";
import { useStore } from "../store/store"; // named import, NOT default

const Count = () => {
  const { ali, increaseFunction, decreaseFunction, resetFunction } = useStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-3xl font-bold mb-6">Count: {ali}</div>
      <div className="flex gap-4">
        <button
          onClick={increaseFunction}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Increase
        </button>
        <button
          onClick={decreaseFunction}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Decrease
        </button>
        <button
          onClick={resetFunction}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Count;
