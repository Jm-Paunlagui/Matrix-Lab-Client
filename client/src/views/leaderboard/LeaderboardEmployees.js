import React, {useEffect, useState} from "react";
import httpClient from "../../http/httpClient";
import LoadingPage from "../../components/loading/LoadingPage";
import {isAuth} from "../../helpers/Auth";

/**
 * @description Handles the admin leaderboard
 */
export default function LeaderboardRanking() {

  const [topProfessors, setTopProfessors] = useState({
    loading: true,
    top_professors: {},
  });

  const user = isAuth()

    const {loading, top_professors} = topProfessors;

    useEffect(() => {
        httpClient.get("/data/get-top-professors").then((response) => {
            console.log(response.data);
            setTopProfessors({
            ...topProfessors,
            loading: false,
            top_professors: response.data.top_professors,
            });
        });
    }, []);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      {loading ? (
          LoadingPage()
      ) : (
          <>
      <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48 lg:h-64">
        <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl lg:text-7xl">
          Top Performing Employees
        </h1>
      </div>

      <div className=" place-content-center">
        {Object.keys(top_professors).map((professor) => (
          <div
            className={`flex flex-col mb-8 w-full bg-white rounded shadow
            ${
                top_professors[professor].id === 0 ? "border-solid border-4 border-yellow-100" :
                    top_professors[professor].id === 1 ? "border-solid border-4 border-gray-100" :
                        top_professors[professor].id === 2 ? "border-solid border-4 border-orange-100" : "border-solid border-4 border-blue-100"
            }`}
            key={top_professors[professor].id}
          >
            <div className={`grid w-full h-full grid-cols-1 rounded ${
                user.role === "admin" || user.role === "user" ? "" : "md:grid-cols-5"
            }`}
            >
              <div
                className={`col-span-1 py-5 items-center justify-center w-full
                ${
                    top_professors[professor].id === 0 ? "bg-yellow-50" :
                        top_professors[professor].id === 1 ? "bg-gray-50" :
                            top_professors[professor].id === 2 ? "bg-orange-50" : "bg-blue-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center w-full p-4">
                  <h1 className="text-5xl font-black leading-none tracking-tight text-gray-700">
                      {user.role === "admin" || user.role ==="user" ? top_professors[professor].professor : top_professors[professor].hidden_professor}
                  </h1>
                </div>
              </div>
              <div className="col-span-4 place-self-center">
                <div className="grid grid-cols-3 gap-8 py-4 md:grid-cols-6 md:gap-20 ">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div
                            className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                top_professors[professor].id === 0 ? "bg-yellow-500" : 
                                top_professors[professor].id === 1 ? "bg-gray-500" :
                                top_professors[professor].id === 2 ? "bg-orange-500" : "bg-blue-500"
                            }`}
                        >
                            <i className={`fas ${
                                top_professors[professor].id === 0 ? "fa-trophy" :
                                top_professors[professor].id === 1 ? "fa-medal" :
                                top_professors[professor].id === 2 ? "fa-award" : "fa-crown"
                            }`}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-500">
                            {top_professors[professor].id + 1}
                        </h1>
                        <h1 className="text-sm font-medium text-gray-500">
                            Rank
                        </h1>
                    </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div
                        className="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-br from-red-500 to-teal-500 rounded"
                    >
                      <i className="fas fa-masks-theater" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-500">
                      {top_professors[professor].overall_sentiment}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Overall
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div
                        className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded"
                    >
                      <i className="fas fa-face-smile-beam" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-500">
                      {top_professors[professor].positive_sentiments_percentage}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Positivity Rate
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div
                        className="flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded"
                    >
                      <i className="fas fa-face-frown" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-500">
                      {top_professors[professor].negative_sentiments_percentage}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Negativity Rate
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div
                        className="flex items-center justify-center w-10 h-10 text-white bg-violet-500 rounded"
                    >
                      <i className="fa-regular fa-comments" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-500">
                      {top_professors[professor].number_of_sentiments}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Responses
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div
                        className="flex items-center justify-center w-10 h-10 text-white bg-black rounded"
                    >
                      <i className="fas fa-share-nodes" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-500">
                      {top_professors[professor].share}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Share
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
          </>
      )}
    </div>
  );
}
