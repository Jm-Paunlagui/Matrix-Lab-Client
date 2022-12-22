import React, { useEffect, useState } from "react";

import LoadingPage from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";
import { Header } from "../../components/headers/Header";
import { SearchBar } from "../../components/searchbar/SearchBar";
import { NoData } from "../../components/warnings/WarningMessages";

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

  const [filteredTopDepartment, setFilteredTopDepartment] =
    useState(top_department);

  /**
   * @description Handles the search bar value and filters the data
   * @param event
   */
  const handleSearchForDepartment = (event) => {
    const value = event.target.value.toLowerCase();
    const result = top_department.filter((data) => {
      return data.department.toLowerCase().search(value) !== -1;
    });
    setFilteredTopDepartment(result);
  };

  useEffect(() => {
    httpClient.get("/data/get-top-department-overall").then((response) => {
      setTopDepartment({
        ...topDepartment,
        loading: false,
        top_department: response.data.top_department,
        year: response.data.year,
      });
      setFilteredTopDepartment(response.data.top_department);
    });
  }, []);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8 pb-8">
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <Header
            body={`Overall sentiment of departments in year ${year} based on sentiments of all courses taught by the department.`}
            title="Sentiment of Departments"
          />
          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForDepartment(event)}
            placeholder="Search"
            type="text"
          />
          {filteredTopDepartment.length > 0 ? (
            <div className=" place-content-center pt-8 space-y-8">
              {filteredTopDepartment.map((department) => (
                <div
                  className={`flex flex-col w-full bg-white rounded shadow
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
                        <h1 className="text-5xl font-black leading-none tracking-tight text-gray-500">
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
            <div className={"pt-8 pb-8"}>
              <NoData message="Data Unavailable" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
