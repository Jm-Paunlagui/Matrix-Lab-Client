import React from 'react'

import AboutUs from '../assets/img/aboutus.svg'

const AboutUS = () => {
    return (
        <div class="items-center lg:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat md:pt-28 pt-28 flex flex-col min-h-screen">
            <div class=" place-self-center lg:col-span-7 ">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold text-gray-700 tracking-tight leading-none md:text-5xl xl:text-6xl">About Us</h1>
                <p class="max-w-2xl mb-6  text-gray-500 lg:mb-8 md:text-lg lg:text-xl">This project is a web application that can be used to analyze the sentiment of the evaluation result of the School</p>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
                            The project is made by the following developers:
                                <ul className="pl-5 list-disc">
                                    <li className="mt-2">John Moises Paunlagui</li>
                                    <li className="mt-2">Rysel Pelipada</li>
                                    <li className="mt-2">Dwight Torres</li>
                                    <li className="mt-2">Nathanael Bueno</li>
                                </ul>
                            </p>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
                            The project is made with the following technologies:
                                <ul className="pl-5 list-disc">
                                    <li className="mt-2">React</li>
                                    <li className="mt-2">React-Router-Dom</li>
                                    <li className="mt-2">Axios</li>
                                    <li className="mt-2">Tailwind CSS</li>
                                    <li className="mt-2">React icons</li>
                                    <li className="mt-2">Fontawesome</li>
                                    <li className="mt-2">Flask</li>
                                    <li className="mt-2">MySQL</li>
                                </ul>
                            </p>
            </div>
            <div class="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
                <img src={AboutUs} alt="mockup"/>
            </div>                
        </div>
    )
}

export default AboutUS