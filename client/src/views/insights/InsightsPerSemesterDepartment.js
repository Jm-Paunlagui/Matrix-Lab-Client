import React, { useEffect, useState } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";
import { ViewInsightHistory } from "../../forms/CredentialForms";

/**
 * @description Handles the Insights for the department per semester
 */
export default function InsightsPerSemesterDepartment() {
  /**
   * @description The initial state of the data
   */
  const [topDepartmentPerSem, setTopDepartmentPerSem] = useState({
    loading: true,
    top_department_per_sem: [],
    school_year_to_choose: [],
    school_semester_to_choose: [],
    csv_question_to_choose: [],
    school_year: "",
    school_semester: "",
    csv_question: "",
    ok: false,
    error: false,
    errorMessage: "",
    textChange: "View Insights",
  });

  /**
   * @description The destructured data from the state
   */
  const {
    loading,
    top_department_per_sem,
    school_year_to_choose,
    school_semester_to_choose,
    csv_question_to_choose,
    school_year,
    school_semester,
    csv_question,
    ok,
    error,
    errorMessage,
    textChange,
  } = topDepartmentPerSem;

  /**
   * @description Get the top professor per a semester from the backend
   */
  const getTopEmployeePerSem = () => {
    httpClient.get(`/data/options-for-file`).then((response) => {
      setTopDepartmentPerSem({
        ...topDepartmentPerSem,
        loading: false,
        school_year_to_choose: response.data.school_year,
        school_semester_to_choose: response.data.school_semester,
        csv_question_to_choose: response.data.csv_question,
      });
    });
  };

  /**
   * @description Get the value of the file number from the dropdown list.
   */
  const handleSelect = (name) => (value) => {
    setTopDepartmentPerSem({
      ...topDepartmentPerSem,
      [name]: value,
      errorMessage: "",
    });
  };

  /**
   * @description Updates the file number to get the data from the backend.
   */
  useEffect(() => {
    getTopEmployeePerSem();
  }, []);

  /**
   * @description Gets the data from the backend and displays it to the page.
   * @param event
   * @returns {Promise<void>}
   */
  const handleViewFile = async (event) => {
    event.preventDefault();
    setTopDepartmentPerSem({
      ...topDepartmentPerSem,
      ok: true,
      textChange: "Loading...",
      loading: true,
    });
    await httpClient
      .post("/data/get-top-department-by-file", {
        school_year,
        school_semester,
        csv_question,
      })
      .then((response) => {
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          top_department_per_sem: response.data.top_departments,
          title: response.data.title,
          s_y: response.data.s_y,
          ok: false,
          textChange: "View Insights",
        });
      })
      .catch((error) => {
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          error: true,
          errorMessage: error.response.data.message,
          ok: false,
          textChange: "View Insights",
        });
      });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48 lg:h-64">
          <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl lg:text-7xl">
            Sentiment of Departments
          </h1>
        </div>
        <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
          <div className="col-span-1">
            <div className=" place-content-center">
              <div className="grid w-full h-full grid-cols-1 mb-8 rounded outline outline-2 outline-gray-100">
                <div className="items-center justify-center w-full col-span-1 py-5">
                  <div className="flex flex-col items-center justify-center w-full p-4">
                    <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                      {csv_question}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      @{school_year} {school_semester}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-content-center">
              <div
                className={`grid w-full h-full grid-cols-1 p-4 rounded outline outline-2  ${
                  error ? `animate-wiggle` : "outline-gray-100"
                }`}
                onAnimationEnd={() => {
                  setTopDepartmentPerSem({
                    ...topDepartmentPerSem,
                    error: false,
                  });
                }}
              >
                {
                  new ViewInsightHistory(
                    handleViewFile,
                    handleSelect,
                    school_year,
                    school_year_to_choose,
                    school_semester,
                    school_semester_to_choose,
                    csv_question,
                    csv_question_to_choose,
                    errorMessage,
                    ok,
                    textChange,
                  )
                }
              </div>
            </div>
          </div>
          <div className="col-span-2">
            {loading ? (
              LoadingPage()
            ) : (
              <div className=" place-content-center">
                {top_department_per_sem.length > 0 ? (
                  <>
                    {top_department_per_sem.map((department) => (
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
                            <div className="grid grid-cols-3 gap-8 py-4 md:grid-cols-4 md:gap-20">
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
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-40 p-4 border-4 border-red-600 border-double rounded-lg md:h-48 lg:h-64">
                    <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-gray-500 md:text-5xl lg:text-7xl">
                      Select what to view
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
