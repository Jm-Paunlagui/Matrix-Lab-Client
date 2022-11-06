import React, {useState} from "react";

import {
  DANGER_BUTTON, LOADING_ANIMATION,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import httpClient from "../../http/httpClient";
import {toast} from "react-toastify";

/**
 * @description Handles the admin prediction
 */
export default function AdminPrediction() {

  const [csv_file, setCSVFile] = useState(null);
  const [handlers, setHandlers] = useState({
    ok: false,
    errorEffect: false,
    errorMessage: "",
    showButton: true,
    textChange: "Save",
  });

  const { ok, errorEffect, errorMessage, showButton, textChange } = handlers;

  const handleChange = (event) => {
    setCSVFile(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  const handleSubmitCSV = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      ok: true,
      textChange: "Saving...",
    });
    const formData = new FormData();
    formData.append("csv_file", csv_file);
    await httpClient.post("/data/upload_csv", formData).then(
        (response) => {
            setHandlers({
                ...handlers,
                ok: false,
                showButton: false,
                textChange: "Saved",
            });
            toast.success(response.data.message);
        }
    ).catch((error) => {
        setHandlers({
            ...handlers,
            ok: false,
            errorEffect: true,
            errorMessage: error.response.data.message,
            textChange: "Save",

        })
    })

  }

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Sentiment Analysis
          </h1>
          <h1 className="text-sm font-medium text-gray-500">@johnpaunlagui</h1>
        </div>
        <div className="col-span-2">
          <div className={`flex flex-col w-full mb-8 bg-white rounded outline outline-2 
            ${
              errorEffect ? `animate-wiggle` : "outline-gray-200"
          }`}
               onAnimationEnd={() =>
                     setHandlers({ ...handlers, errorEffect: false })
               }
          >
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  from CSV file
                </h1>
                <p className="mb-4 text-sm">
                  Your CSV file should contain the following columns:{" "}
                  <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
                    sentence, evaluatee, department and course code.
                  </b>
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form encType={"multipart/form-data"} onSubmit={handleSubmitCSV}>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">
                        Some text
                      </h1>
                      <h1 className="text-base font-medium text-gray-500">
                        CSV file
                      </h1>
                      <input className={TEXT_FIELD} name="csv_file" onChange={handleChange} type="file"/>
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        The file must be a .csv file.
                      </p>
                    </div>
                  </div>
                  {/* Error message */}
                  {errorMessage ? (
                      <div className="mt-2 text-sm font-semibold text-red-500">
                        {errorMessage}
                      </div>
                  ) : null}
                  <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
                    <div className="p-1" />
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                      type="submit"
                    >
                      {ok ? (
                          LOADING_ANIMATION()
                        ) :
                            null
                        }
                      {textChange}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-8 bg-white rounded outline outline-2 outline-gray-200">
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Reading the CSV file
                </h1>
                <p className="mb-4 text-sm">
                  All of the entries in the CSV file will be read and the system will predict the sentiment of each entry.
                  The result will be saved in the database.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">
                        DB Credentials
                      </h1>
                      <h1 className="text-base font-medium text-gray-500">
                        Host
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Host"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        User
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="User"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Password
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Database
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Database"
                        type="text"
                      />
                    </div>
                    <h1 className="text-xl font-bold text-gray-700">
                      Column Selection
                    </h1>
                    <p className="">
                      Theses are the columns that will be used for the analysis.
                    </p>
                    {/* Note to self: Make this dynamic */}

                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Table Name
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Table"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Data Source
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Data Source"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Evaluatee
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Evaluatee"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Department
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Department"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        Course Code
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="Course Code"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="text-base font-medium text-gray-500">
                        School Year and Semester
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        placeholder="School Year and Semester"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
                    <button
                      className={`px-8 py-1 ${DANGER_BUTTON}`}
                      type="button"
                    >
                      Cancel
                    </button>
                    <div className="p-1" />
                    <button
                      className={`px-8 py-1 ${PRIMARY_BUTTON}`}
                      type="button"
                    >
                      Analyze and Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
