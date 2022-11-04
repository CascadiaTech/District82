import "tailwindcss-elevation";
import React, { useEffect, useState } from "react";
import { animated } from "react-spring";
import { useSpring } from "react-spring/web";
import ScrollpositionAnimation from "../../hooks/OnScroll";
export default function MintCardComponent() {
  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }
  //md:clip-path-clipsides border-t-4 border-b-4
  return (
    <div className="h-96 mt-56 js-show-on-scroll relative justify-self-auto w-full md:absolute justify-self-end  pr-10 md:mt-80 z-index-50 content-start justify-start items-right mb-60 bg-transparent shadow-md hover:bg-white-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-row items-right justify-end w-screen">
        <div className="invisible sm:invisible md:visible w-1/3 lg:visible justify-self-end content-end justify-right bg-white h-2 rounded-full w-1/2"></div>
      </div>
      <h5
        style={{ fontFamily: "Cinzel, serif" }}
        className="mt-12 text-2xl sm:text-3xl mb:mb-2 text-4xl font-bold text-right mr-12 tracking-tight text-gray-100 dark:text-white"
      >
        RuneStone NFT
      </h5>
      <button
        style={{ fontFamily: "Cinzel, serif" }}
        type="button"
        className="w-screen elevation-10 hover:elevation-50 md:w-96 h-24 clip-path-mycorners justify-self-start mt-10
        text-gray-100 bg-blue-700 transition ease-in-out duration-700 hover:scale-105 bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-4xl px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800 text-4xl"
      >
        Mint
      </button>
      <p className="sm:mr-16 mt-10 text-right font-normal text-white dark:text-gray-400">
        You can ony mint 1 NFT per wallet
      </p>
      <div className="flex flex-row items-right mt-10 justify-end w-screen">
        <div className="w-screen invisible sm:invisible md:visible w-1/2 lg:visible justify-self-end content-end justify-right bg-white h-2 rounded-full w-3/4 "></div>
      </div>
    </div>
  );
}
