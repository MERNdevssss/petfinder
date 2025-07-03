import React from "react";

const HomePage = () => {
  return (
    <div className="max-w-3xl mx-auto text-center py-16 px-6">
      <h1 className="text-4xl font-bold text-teal-700 mb-4">
        Welcome to Pet Marketplace Platform 🐕🐈🐇
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Discover your perfect pet companion using AI! Click on "AI Suggestion"
        in the navbar to begin.
      </p>
      <img
        src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
        alt="Cute pets"
        className="w-full max-h-[300px] object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default HomePage;
