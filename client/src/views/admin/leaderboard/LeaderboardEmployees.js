import React from "react";

/**
 * @description Handles the admin leaderboard
 */
export default function LeaderboardRanking() {
  /**
   * @description Sample data for the leaderboard
   * @type {*[]}
   */
  const leaderboard = [
    {
      id: 1,
      department: "Coleen",
      positivity_rate: "93",
      total_evaluations: "100",
    },
    {
      id: 2,
      department: "Heart",
      positivity_rate: "79",
      total_evaluations: "100",
    },
    {
      id: 3,
      department: "Dexie",
      positivity_rate: "86",
      total_evaluations: "100",
    },
    {
      id: 4,
      department: "Tzuyu",
      positivity_rate: "91",
      total_evaluations: "100",
    },
  ];

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48 lg:h-64">
        <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl lg:text-7xl">
          Top Performing Employees
        </h1>
      </div>

      <div className=" place-content-center">
        {leaderboard.map((item) => (
          <div className={`flex flex-col mb-8 w-full bg-white rounded shadow`}
            key={item.id}

          >
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div
                className={`col-span-2 py-5 bg-gray-50 items-center justify-center w-full`}
              >
                <div className="flex flex-col items-center justify-center w-full p-4">
                  <h1 className="text-5xl font-black leading-none tracking-tight text-gray-700">
                    {item.department}
                  </h1>
                </div>
              </div>
              <div className="col-span-3 place-self-center">
                <div className="grid grid-cols-2 gap-8 py-4 md:grid-cols-3 md:gap-20 ">
                  <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-2xl font-bold text-gray-500">
                      {item.positivity_rate}%
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Positivity Rate
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-2xl font-bold text-gray-500">
                      {item.positivity_rate}%
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Positivity Rate
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-2xl font-bold text-gray-500">
                      {item.positivity_rate}%
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      Positivity Rate
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
