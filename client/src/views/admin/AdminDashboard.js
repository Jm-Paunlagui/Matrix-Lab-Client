import React, {useState, useEffect} from "react";
import httpClient from "../../http/httpClient";

/**
 * @description Handles the admin profile
 */
export default function AdminDashboard() {

  const [data, setData] = useState({
    details: {},
  });

  const {details} = data;

    useEffect(() => {
        httpClient.get("/data/get-all-data-from-csv").then((response) => {
          console.log(response.data.details);
            setData({
                ...data,
                details: response.data.details,
            });
        });
    }, []);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">

        {/* Map through the data and display it */}
        {Object.keys(details).map((detail) => (
            <div
                className="flex flex-col items-start p-4 bg-white rounded outline outline-2 outline-gray-200"
                key={details[detail].id}
            >
              <div className="flex items-center justify-center">
                <div className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                    details[detail].id === 1 ? "bg-red-500" : details[detail].id === 2 ? "bg-green-500" : details[detail].id === 3 ? "bg-blue-500" : "bg-black"
                }`}
                >
                  <i className={details[detail].icon} />
                </div>
                <div className="flex flex-col items-start justify-center ml-4">

                <h1 className="pl-2 py-1 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                  {details[detail].value}
                </h1>
                <h1 className="text-sm font-medium text-gray-500">{details[detail].title}</h1>
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
    </div>
  );
}
