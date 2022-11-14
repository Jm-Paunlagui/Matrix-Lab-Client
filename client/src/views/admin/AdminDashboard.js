import React, { useState, useEffect } from "react";
import httpClient from "../../http/httpClient";
import LoadingPage from "../../components/loading/LoadingPage";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
/**
 * @description Handles the admin profile
 */
export default function AdminDashboard() {
  const [data, setData] = useState({
    loading: true,
    details: {},
    total_responses: {},
    overall_sentiments: {},
  });

  const { loading, details, total_responses, overall_sentiments } = data;

  useEffect(() => {
    httpClient.get("/data/get-all-data-from-csv").then((response) => {
      console.log(response.data);
      setData({
        ...data,
        loading: false,
        details: response.data.details,
        total_responses: response.data.total_responses,
        overall_sentiments: response.data.overall_sentiments,
      });
    });
  }, []);

  const labels = [
    ...Object.keys(total_responses).map((key) => {
      return (
        total_responses[key].school_year +
        " " +
        total_responses[key].school_semester
      );
    }),
  ];

  console.log(labels);
  // Create the data object for the chart to use to display the total responses
  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: [
          ...Object.keys(total_responses).map((key) => {
            return (
              total_responses[key].school_year +
              " " +
              total_responses[key].school_semester
            );
          }),
        ],
        data: [
          ...Object.keys(total_responses).map((key) => {
            return total_responses[key].total_number_of_responses;
          }),
        ],
        // unique colors for each line
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Responses",
      },
    },
  };

  return (
    <div className="px-6 mx-auto max-w-7xl">
      {loading ? (
        LoadingPage()
      ) : (
          <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
            {Object.keys(details).map((detail) => (
              <div
                className="flex flex-col items-start p-4 bg-white rounded outline outline-2 outline-gray-200"
                key={details[detail].id}
              >
                <div className="flex items-center justify-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                      details[detail].id === 1
                        ? "bg-red-500"
                        : details[detail].id === 2
                        ? "bg-teal-500"
                        : details[detail].id === 3
                        ? "bg-blue-500"
                        : "bg-black"
                    }`}
                  >
                    <i className={details[detail].icon} />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4">
                    <h1 className="pl-2 py-1 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                      {details[detail].value}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      {details[detail].title}
                    </h1>
                  </div>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 lg:col-span-4">
              {/*<Line data={dataForChart} options={options}/>*/}
              <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
                <h1 className="py-4 mb-4 text-xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Dashboard
                </h1>
                <h1 className="text-sm font-medium text-gray-500">
                  @johnpaunlagui
                </h1>
              </div>
            </div>
            {Object.keys(overall_sentiments).map((key) => (
              <div className="lg:col-span-2" key={overall_sentiments[key].id}>
                <div className="flex flex-col items-start justify-center w-full p-4 bg-white rounded outline outline-2 outline-gray-200">
                  <div className="flex items-center justify-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                        overall_sentiments[key].title === "Positive"
                          ? "bg-green-500"
                          : overall_sentiments[key].title === "Negative"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      <i className={`${overall_sentiments[key].icon}`} />
                    </div>
                    <div className="flex flex-col items-start justify-center ml-4">
                      <h1 className="pl-2 py-1 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                        {overall_sentiments[key].percentage} %
                      </h1>
                      <h1 className="text-sm font-medium text-gray-500">
                        with {overall_sentiments[key].value} responses from{" "}
                        {overall_sentiments[key].year}
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
