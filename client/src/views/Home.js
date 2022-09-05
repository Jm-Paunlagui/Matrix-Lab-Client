import Button from "../components/buttons/button.component";
import Eval from "../assets/img/eval.svg";
import React from "react";

/**
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
        <Button
          title="Leaderboard"
          href="/leaderboard"
          moreStyle="w-3/4 px-5 py-3 font-medium tracking-wider text-white bg-teal-900 hover:bg-cyan-800"
        />
        <Button
          isButton={false}
          title="Link"
          href="/login"
          moreStyle="w-3/4 px-5 py-3 tracking-wider hover:bg-gray-100"
        />
      </div>
      <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
        <img src={Eval} alt="mockup" />
      </div>
    </div>
  );
}

export default Home;
