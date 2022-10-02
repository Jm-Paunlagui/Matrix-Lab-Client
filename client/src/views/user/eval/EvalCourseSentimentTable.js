import React from 'react'

export default function EvalCourseSentimentTable() {
    return (
        <div className="px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
                <div className="md:col-span-2 lg:col-span-4">
                    <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
                        <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            Sentiment Analysis for Course-Code
                        </h1>
                        <h1 className="text-sm font-medium text-gray-500">
                            Coleen Trinidad
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full bg-white rounded outline outline-2 outline-gray-200">
                    <div className="justify-start w-full bg-gradient-to-r from-teal-500 to-sky-500 p-4">
                        {/*  Course code*/}
                        <h1 className="text-xl font-extrabold leading-none tracking-tight text-left text-white ">
                            Course Code
                        </h1>
                        {/* Total students who evaluated the course*/}
                        <h1 className="text-sm font-medium text-white">
                            10 feedbacks
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
