"use client";

import MainSearchBar from "@/components/MainSearchBar";

const Home = () => {

  return (
    // Empty search results: show the bar in the center
    <div className="flex flex-col items-center justify-start min-h-screen pt-64">
        <div className="w-full max-w-xl">
        <p
            style={{ fontFamily: "Pacifico, cursive" }}
            className="flex text-8xl flex-col items-center justify-center p-8 cursor-pointer"
        >
            Nuddle
        </p>
        <MainSearchBar />
        </div>
    </div>
  );
};

export default Home;
