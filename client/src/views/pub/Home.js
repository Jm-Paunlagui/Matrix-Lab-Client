import Eval from "../../assets/img/eval.svg";
import { Link } from "react-router-dom";
import { PRIMARY_LINK, SECONDARY_LINK } from "../../assets/styles/input-types-styles";
import React from "react";

/**
 * @description Home page component for the application
 */
export default function Home() {

  return (
    <div className="flex flex-col items-center max-w-screen-xl min-h-screen py-8 mx-auto lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat md:pt-28 pt-28">
      <div className=" place-self-center lg:col-span-6">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl xl:text-6xl">
          Evaluation Result Sentiment Analysis
        </h1>
        <p className="max-w-2xl mb-4 text-justify text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
          The result can be analyzed by the number of positive, negative, and
          neutral comments and the overall sentiment of the evaluation result
          can be determined by the percentage of positive, negative, and neutral
          comments in the evaluation result.
        </p>
          <div className="inline-flex mb-8 sm:flex-row sm:justify-center space-x-4">
          <button className={`${PRIMARY_LINK}`}>
            <Link to={"/leaderboard"}>
              <h1 className="px-5 py-3">Leaderboard</h1>
            </Link>
          </button>
          <button className={` ${SECONDARY_LINK}`}>
            <Link to={"/ranking"}>
              <h1 className="px-5 py-3">Ranking</h1>
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-4 md:flex md:mt-4 lg:col-span-6 lg:flex">
        <img  src={Eval} alt="mockup" />
      </div>
    </div>
  );
}
