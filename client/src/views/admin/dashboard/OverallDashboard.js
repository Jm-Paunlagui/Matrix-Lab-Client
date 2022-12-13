import React, { useEffect, useState } from "react";

import LoadingPage from "../../../components/loading/LoadingPage";
import httpClient from "../../../http/httpClient";
import { toast } from "react-toastify";

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
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
              <h1 className="py-4 mb-4 text-xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Dashboard
              </h1>
              <h1 className="text-sm font-medium text-gray-500">
                @johnpaunlagui
              </h1>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
              <h1 className="py-4 mb-4 text-xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Dashboard
              </h1>
              <h1 className="text-sm font-medium text-gray-500">
                @johnpaunlagui
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
