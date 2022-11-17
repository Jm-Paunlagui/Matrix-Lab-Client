import React, { useEffect, useState } from "react";

import LoadingPage from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";

/**
 * @description Handles the Insights for the department
 */
export default function InsightsDepartment() {
  const [topDepartment, setTopDepartment] = useState({
    loading: true,
    top_department: [],
    year: "",
  });

  const { loading, top_department, year } = topDepartment;

  useEffect(() => {
    httpClient.get("/data/get-top-department-overall").then((response) => {
      setTopDepartment({
        ...topDepartment,
        loading: false,
        top_department: response.data.top_department,
        year: response.data.year,
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
              Sentiment of Departments
            </h1>
            <p className="text-base font-medium text-gray-500">
              Overall sentiment of departments in year {year} based on
              sentiments of all professors in the department.
            </p>
          </div>
          {top_department.length > 0 ? (
            <div className=" place-content-center">
              {top_department.map((department) => (
                <div
                  className={`flex flex-col mb-8 w-full bg-white rounded shadow
                ${
                  department.id === 0
                    ? "border-solid border-4 border-yellow-100"
                    : department.id === 1
                    ? "border-solid border-4 border-gray-100"
                    : department.id === 2
                    ? "border-solid border-4 border-orange-100"
                    : "border-solid border-4 border-blue-100"
                }`}
                  key={department.id}
                >
                  <div className="grid w-full h-full grid-cols-1 rounded">
                    <div
                      className={`col-span-1 py-5 items-center justify-center w-full
                    ${
                      department.id === 0
                        ? "bg-yellow-50"
                        : department.id === 1
                        ? "bg-gray-50"
                        : department.id === 2
                        ? "bg-orange-50"
                        : "bg-blue-50"
                    }`}
                    >
                      <div className="flex flex-col items-center justify-center w-full p-4">
                        <h1 className="text-5xl font-black leading-none tracking-tight text-gray-700">
                          {department.department}
                        </h1>
                      </div>
                    </div>
                    <div className="col-span-4 place-self-center">
                      <div className="grid grid-cols-3 gap-8 py-4 md:grid-cols-6 md:gap-20">
                        <div className="flex flex-col items-center justify-center w-full">
                          <div
                            className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                              department.id === 0
                                ? "bg-yellow-500"
                                : department.id === 1
                                ? "bg-gray-500"
                                : department.id === 2
                                ? "bg-orange-500"
                                : "bg-blue-500"
                            }`}
                          >
                            <i
                              className={`fas ${
                                department.id === 0
                                  ? "fa-trophy"
                                  : department.id === 1
                                  ? "fa-medal"
                                  : department.id === 2
                                  ? "fa-award"
                                  : "fa-crown"
                              }`}
                            />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-500">
                            {department.id + 1}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-500">
                            Rank
                          </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-gradient-to-br from-red-500 to-teal-500">
                            <i className="fas fa-masks-theater" />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-500">
                            {department.overall_sentiment}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-500">
                            Overall
                          </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded">
                            <i className="fas fa-face-smile-beam" />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-500">
                            {department.positive_sentiments_percentage}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-500">
                            Positivity Rate
                          </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded">
                            <i className="fas fa-face-frown" />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-500">
                            {department.negative_sentiments_percentage}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-500">
                            Negativity Rate
                          </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-violet-500">
                            <i className="fa-regular fa-comments" />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-500">
                            {department.number_of_sentiments}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-500">
                            Responses
                          </h1>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <div className="flex items-center justify-center w-10 h-10 text-white bg-black rounded">
                            <i className="fas fa-share-nodes" />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-500">
                            {department.share}
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
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-40 p-4 border-4 border-red-600 border-double rounded-lg md:h-48 lg:h-64">
              <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-gray-500 md:text-5xl lg:text-7xl">
                No Data Available
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
