import Eval from "../assets/img/eval.svg";
import React from "react";
import {Link} from "react-router-dom";

/**
 * @description Home page component for the application
 */
export default function Home() {
    const buttonStyle = "flex transition-colors duration-700 ease-in-out delay-150 border border-transparent rounded-lg py-4"
  return (
    <div className="flex flex-col items-center max-w-screen-xl min-h-screen  py-8 mx-auto lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat md:pt-28 pt-28">
      <div className=" place-self-center lg:col-span-6">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl xl:text-6xl">
          Evaluation Result Sentiment Analysis
        </h1>
        <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-justify">
          The result can be analyzed by the number of positive, negative, and
          neutral comments and the overall sentiment of the evaluation result
          can be determined by the percentage of positive, negative, and neutral
          comments in the evaluation result.
        </p>
          <Link to={"/leaderboard"} >
              <div className={`w-6/12 justify-center font-medium tracking-wider text-white bg-teal-900 hover:bg-white md:text-xl border-2 hover:border-teal-900 hover:text-teal-900 ${buttonStyle}`}>
                  Leaderboard
              </div>
          </Link>
      </div>
      <div className="mt-4 md:flex md:mt-4 lg:col-span-6 lg:flex">
        <img src={Eval} alt="mockup" />
      </div>
    </div>
  );
}
