import React from 'react'
import Eval from '../assets/img/eval.svg'

const Home = () => {
    return (
        <div class="items-center lg:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat md:pt-28 pt-28 flex flex-col min-h-screen">
            <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold text-gray-700 tracking-tight leading-none md:text-5xl xl:text-6xl">Evaluation Result Sentiment Analysis</h1>
                <p class="max-w-2xl mb-6  text-gray-500 lg:mb-8 md:text-lg lg:text-xl">The result can be analyzed by the number of positive, negative, and neutral comments and the overall sentiment of the evaluation result can be determined by the percentage of positive, negative, and neutral comments in the evaluation result.</p>
                <a
                    href="/leaderboard"
                    className="flex items-center justify-center w-3/4 px-5 py-3 font-medium tracking-wider text-white bg-teal-900 border border-transparent rounded-md hover:bg-cyan-800 md:py-4 md:text-lg md:px-10"
                >
                    Leaderboard
                </a>
            </div>
            <div class="hidden md:flex md:mt-4 lg:mt-2 lg:col-span-5 lg:flex">
                <img src={Eval} alt="mockup"/>
            </div>                
        </div>
    )
}

export default Home