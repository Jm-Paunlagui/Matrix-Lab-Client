import Eval from "../assets/img/eval.svg";
import { Link } from "react-router-dom";
import React from "react";

/**
 * @type {React.FC<{}>}
 * @description Home page component for the application
 */
function Home() {
  return (
    <div className="flex flex-col items-center max-w-screen-xl min-h-screen px-4 py-8 mx-auto lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat md:pt-28 pt-28">
      <div className=" place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl xl:text-6xl">
          Evaluation Result Sentiment Analysis
        </h1>
        <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
          The result can be analyzed by the number of positive, negative, and
          neutral comments and the overall sentiment of the evaluation result
          can be determined by the percentage of positive, negative, and neutral
          comments in the evaluation result.
        </p>

        <Link to="/leaderboard">
          <div className="flex justify-center w-3/4 px-5 py-3 font-medium tracking-wider text-white transition-colors duration-700 ease-in-out delay-150 bg-teal-900 border border-transparent rounded-md hover:bg-cyan-800 md:py-4 md:text-lg md:px-10">
            Leaderboard
          </div>
        </Link>
      </div>
      <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
        <img src={Eval} alt="mockup" />
      </div>
    </div>
  );
}

export default Home;
