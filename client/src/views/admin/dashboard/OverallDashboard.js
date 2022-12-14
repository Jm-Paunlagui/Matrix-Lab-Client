import React, { useEffect, useState } from "react";

import LoadingPage from "../../../components/loading/LoadingPage";
import httpClient from "../../../http/httpClient";
import { toast } from "react-toastify";
import {ViewInsightHistory} from "../../../components/forms/CredentialForms";
import Boxplot, { computeBoxplotStats } from 'react-boxplot'

/**
 * @description Handles the admin profile
 */
export default function OverallDashboard() {
  const [data, setData] = useState({
    loading: true,
    details: [],
    total_responses: [],
    overall_sentiments: [],
  });

  const { loading, details, total_responses, overall_sentiments } = data;

  const [options, setOptions] = useState({
    school_year_to_choose: [],
    school_semester_to_choose: [],
    csv_question_to_choose: [],
  });
    const { school_year_to_choose, school_semester_to_choose, csv_question_to_choose } = options;

  const optionsForPVS = () => {
    httpClient.get(`/data/options-for-file`).then((response) => {
      setOptions({
        ...options,
        school_year_to_choose: response.data.school_year,
        school_semester_to_choose: response.data.school_semester,
        csv_question_to_choose: response.data.csv_question,
      })
    });
  };

  const [polarityVsentiment, setPolarityVsentiment] = useState({
    loadingPV: true,
    x_axis: [],
    y_axis: [],
    svp: [],
    school_year: "",
    school_semester: "",
    csv_question: "",
    ok: false,
    error: false,
    errorMessage: "",
    textChange: "Check Analysis",
  });

    const { loadingPV, x_axis, y_axis, svp, school_year, school_semester, csv_question, ok, error, errorMessage, textChange } = polarityVsentiment;

  const handleSelect = (name) => (value) => {
    setPolarityVsentiment({
        ...polarityVsentiment,
      [name]: value,
      errorMessage: "",
    });
  };

  useEffect(() => {
    optionsForPVS();
  }, []);

  useEffect(() => {
    httpClient
      .get("/data/get-all-data-from-csv")
      .then((response) => {
        setData({
          ...data,
          loading: false,
          details: response.data.details,
          total_responses: response.data.total_responses,
          overall_sentiments: response.data.overall_sentiments,
        });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized Access");
            window.location.href = "/unauthorized-access";
            break;
          case 440:
            toast.error("Session Expired");
            window.location.href = "/login-timeout";
            break;
          default:
            toast.error("Something went wrong");
            window.location.href = "/page-not-found";
        }
      });
  }, []);

  const handleViewFile = async (event) => {
    event.preventDefault();
    setPolarityVsentiment({
        ...polarityVsentiment,
        loadingPV: true,
        ok: true,
        textChangePV: "Loading...",
    });
    await httpClient
        .post("/analysis/sentiment_vs_polarity", {
          school_year,
          school_semester,
          csv_question,
        })
        .then((response) => {
          console.log(response.data);
          // setPolarityVsentiment({
          //   ...polarityVsentiment,
          //   x_axis: response.data.x_axis,
          //   y_axis: response.data.y_axis,
          //   svp: response.data.sentiment_vs_polarity,
          //   ok: false,
          //   textChangePV: "Senti-Polarity",
          // });
        })
        .catch((error) => {
          setPolarityVsentiment({
            ...polarityVsentiment,
            errorPV: true,
            errorMessagePV: error.response.data.message,
            ok: false,
            textChangePV: "Senti-Polarity",
          });
        });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl">
      {loading ? (
        LoadingPage()
      ) : (
        <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
          {details.map((detail) => (
            <div
              className="flex flex-col items-start p-4 bg-blue-50 rounded-lg shadow"
              key={detail.id}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                    detail.id === 1
                      ? "bg-red-500"
                      : detail.id === 2
                      ? "bg-teal-500"
                      : detail.id === 3
                      ? "bg-blue-500"
                      : "bg-black"
                  }`}
                >
                  <i className={detail.icon} />
                </div>
                <div className="flex flex-col items-start justify-center ml-4">
                  <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                    {detail.value}
                  </h1>
                  <h1 className="text-sm font-medium text-gray-500">
                    {detail.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-4">
            <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
              <h1 className="py-4 mb-4 text-xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Dashboard
              </h1>
              <h1 className="text-sm font-medium text-gray-500">
                @johnpaunlagui
              </h1>
            </div>
          </div>
          {overall_sentiments.map((overall) => (
            <div className="lg:col-span-2" key={overall.id}>
              <div className="flex flex-col items-start justify-center w-full p-4 bg-blue-50 rounded-lg shadow">
                <div className="flex items-center justify-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                      overall.title === "Positive  Sentiments"
                        ? "bg-green-500"
                        : overall.title === "Negative Sentiments"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    <i className={`${overall.icon}`} />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4">
                    <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                      {overall.percentage} %
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      with {overall.value} responses from {overall.year}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="place-content-center">
            <div
                className={`grid w-full h-full grid-cols-1 p-4 bg-blue-50 rounded outline outline-2  ${
                    error ? `animate-wiggle` : "outline-gray-100"
                }`}
                onAnimationEnd={() => {
                  setPolarityVsentiment({
                    ...polarityVsentiment,
                    error: false,
                  });
                }}
            >
              {
                <ViewInsightHistory
                    csv_question={csv_question}
                    csv_question_to_choose={csv_question_to_choose}
                    errorMessage={errorMessage}
                    handleSelect={handleSelect}
                    handleViewFile={handleViewFile}
                    ok={ok}
                    school_semester={school_semester}
                    school_semester_to_choose={school_semester_to_choose}
                    school_year={school_year}
                    school_year_to_choose={school_year_to_choose}
                    textChange={textChange}
                >
                  <h1 className="mb-4 text-xl font-bold text-blue-500">
                    Analysis Result For {school_year} {school_semester}
                  </h1>
                  <p className="mb-4 text-sm text-gray-500">
                    This is the result of the analysis of the data you have
                    analyzed. You can view the result of the analysis by choosing
                    the year and semester of the data you want to analyze.
                  </p>
                </ViewInsightHistory>
              }
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col items-center justify-center w-full p-4 bg-white rounded outline outline-2 outline-gray-200">

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
