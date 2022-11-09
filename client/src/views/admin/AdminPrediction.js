import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  LOADING_ANIMATION,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import httpClient from "../../http/httpClient";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/Auth";
import { importSPKI, jwtVerify } from "jose";
import {
  getNameFromString,
  getNumberFromString,
  MATRIX_RSA_PUBLIC_KEY,
} from "../../helpers/Helper";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

/**
 * @description Handles the admin prediction
 */
export default function AdminPrediction() {
  const user = isAuth();

  const [csv_file_to_view, setCSVFileToView] = useState();

  const [handlers, setHandlers] = useState({
    ok: false,
    errorEffect: false,
    errorMessage: "",
    showButton: true,
    textChange: "View",
    okToAnS: false,
    errorEffectToAnS: false,
    errorMessageToAnS: "",
    showButtonToAnS: true,
    textChangeToAnS: "Analyze and Save",
  });

  const {
    ok,
    errorEffect,
    errorMessage,
    showButton,
    textChange,
    okToAnS,
    errorEffectToAnS,
    errorMessageToAnS,
    showButtonToAnS,
    textChangeToAnS,
  } = handlers;

  const handleChange = (event) => {
    setCSVFileToView(event.target.files[0]);
    setHandlers({
      ...handlers,
      errorMessage: "",
    });
  };

  const [csv_columns, setCSVColumns] = useState({
    show_columns: false,
    csv_file_name: "",
    csv_columns_to_pick: [],
  });

  const { show_columns, csv_file_name, csv_columns_to_pick } = csv_columns;

  const [selectedColumn, setSelectedColumn] =
    useState({
        selected_column_for_sentence: "",
        selected_column_for_evaluatee: "",
        selected_column_for_department: "",
        selected_column_for_course_code: ""
    });

  const {
    selected_column_for_sentence,
    selected_column_for_evaluatee,
    selected_column_for_department,
    selected_column_for_course_code,
    } = selectedColumn;

  // onChange for the select column for sentence listbox headless ui
    const handleSelect = (name) => (value) => {
        setSelectedColumn({
            ...selectedColumn,
            [name]: value,
        })
    }

  const [extras, setExtras] = useState({
    csv_question: "",
    school_year: "",
  });
    const { csv_question, school_year } = extras;

  const handleExtras = (name) => (event) => {
    setExtras({ ...extras, [name]: event.target.value })
  }

  const handleSubmitCSVToView = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      okToView: true,
      textChange: "Viewing...",
    });
    const formData = new FormData();
    formData.append("csv_file_to_view", csv_file_to_view);
    await httpClient
      .post("/data/view-columns", formData)
      .then(async (response) => {
        setHandlers({
          ...handlers,
          okToView: false,
          showButtonToView: false,
          textChangeToView: "Viewed",
        });
        toast.success(response.data.message);
        jwtVerify(
          response.data.token_columns,
          await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"),
        ).then((result) => {
          setCSVColumns({
            ...csv_columns,
            show_columns: true,
            csv_file_name: result.payload.csv_file_name,
            csv_columns_to_pick: result.payload.csv_columns,
          });
        });
      })
      .catch((error) => {
        setHandlers({
          ...handlers,
          ok: false,
          errorEffect: true,
          errorMessage: error.response.data.message,
          textChange: "View",
        }) || toast.error(error.message);
      });
  };

  const handleSubmitToAnalyzeAndSave = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      okToAnS: true,
      textChangeToAnS: "Analyzing and Saving...",
    });
    await httpClient.post("/data/analyze-save-csv", {
        file_name: csv_file_name,
        csv_question: csv_question,
        school_year: school_year,
        selected_column_for_sentence: getNumberFromString(selected_column_for_sentence),
        selected_column_for_evaluatee: getNumberFromString(selected_column_for_evaluatee),
        selected_column_for_department: getNumberFromString(selected_column_for_department),
        selected_column_for_course_code: getNumberFromString(selected_column_for_course_code),
    })
      .then((response) => {
        toast.success(response.data.message);
        setHandlers({
            ...handlers,
            okToAnS: false,
            showButtonToAnS: false,
            textChangeToAnS: "Analyzed and Saved",
        });
      })
      .catch((error) => {
        setHandlers({
          ...handlers,
          okToAnS: false,
          errorEffectToAnS: true,
          errorMessageToAnS: error.response.data.message,
          textChangeToAnS: "Analyze and Save",
        }) || toast.error(error.message);
      });
  }

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Sentiment Analysis
          </h1>
          <h1 className="text-sm font-medium text-gray-500">
            @{user.username}
          </h1>
        </div>
        <div className="col-span-2">
          <div
            className={`flex flex-col w-full mb-48 bg-white rounded outline outline-2 
            ${errorEffect ? `animate-wiggle` : "outline-gray-200"}`}
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
                  Pick a CSV file to view the columns and select the columns to
                  be used for the analysis.
                </p>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <form
                  encType={"multipart/form-data"}
                  onSubmit={handleSubmitCSVToView}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">
                        Some text
                      </h1>
                      <h1 className="text-base font-medium text-gray-500">
                        CSV file
                      </h1>
                      <input
                        className={TEXT_FIELD}
                        name="csv_file_to_view"
                        onChange={handleChange}
                        type="file"
                      />
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
                      {ok ? LOADING_ANIMATION() : null}
                      {textChange}
                    </button>
                  </div>
                </form>
                {show_columns ? (
                  <form onSubmit={handleSubmitToAnalyzeAndSave}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="mb-4 text-xl font-bold text-gray-700">
                          Column Selection
                        </h1>
                      </div>
                      <p className="">
                        Input the number of the column that corresponds to the
                        following:{" "}
                        <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
                          sentence, evaluatee, department and course code.
                        </b>
                      </p>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-gray-500">
                          File Name
                        </h1>
                        <input
                          className={TEXT_FIELD}
                          disabled
                          placeholder="File Name"
                          type="text"
                          value={csv_file_name}
                        />
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-gray-500">
                          Sentence
                        </h1>
                        <Listbox name={"sentence"}
                          onChange={handleSelect("selected_column_for_sentence")}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_sentence ? selected_column_for_sentence : "Select a column"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-400"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {csv_columns_to_pick.map((column) => (
                                  <Listbox.Option
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-blue-100 text-blue-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    key={column.id}
                                    value={`${column.id} - ${column.name}`}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {`${column.id} - ${column.name}`}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-gray-500">
                          Evaluatee
                        </h1>
                        <Listbox name="selected_column_for_evaluatee"
                          onChange={handleSelect("selected_column_for_evaluatee")}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_evaluatee ? selected_column_for_evaluatee : "Select a column"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-400"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {csv_columns_to_pick.map((column) => (
                                  <Listbox.Option
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-blue-100 text-blue-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    key={column.id}
                                    value={`${column.id} - ${column.name}`}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {`${column.id} - ${column.name}`}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-gray-500">
                          Department
                        </h1>
                        <Listbox name="selected_column_for_department"
                          onChange={handleSelect("selected_column_for_department")}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_department ? selected_column_for_department : "Select a column"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-400"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {csv_columns_to_pick.map((column) => (
                                  <Listbox.Option
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-blue-100 text-blue-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    key={column.id}
                                    value={`${column.id} - ${column.name}`}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {`${column.id} - ${column.name}`}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-gray-500">
                          Course Code
                        </h1>
                        <Listbox name="selected_column_for_course_code"
                          onChange={handleSelect("selected_column_for_course_code")}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_course_code ? selected_column_for_course_code : "Select a column"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-400"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {csv_columns_to_pick.map((column) => (
                                  <Listbox.Option
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-blue-100 text-blue-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    key={column.id}
                                    value={`${column.id} - ${column.name}`}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {`${column.id} - ${column.name}`}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="h-5 w-5"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-gray-500">
                          School Year
                        </h1>
                        <input
                            className={`truncate ${TEXT_FIELD}`}
                            name="school_year"
                            onChange={handleExtras("school_year")}
                            placeholder="School Year"
                            type="text"
                            value={school_year}
                        />
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        {selected_column_for_sentence ? (
                        <h1 className="text-base font-medium text-gray-500">
                          Please type {"\""}
                          <b className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500">
                          {getNameFromString(selected_column_for_sentence)}
                          </b>
                          {"\""} to confirm.
                        </h1>
                        ) : (
                        <h1 className="text-base font-medium text-gray-500">
                            Select a column for sentence.
                        </h1>
                        )}
                        <input
                            className={`truncate ${TEXT_FIELD}`}
                            name="csv_question"
                            onChange={handleExtras("csv_question")}
                            placeholder="Question"
                            type="text"
                            value={csv_question}
                        />
                      </div>
                  </div>
                    {/* Error message */}
                    {errorMessageToAnS ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                          {errorMessageToAnS}
                        </div>
                    ) : null}
                    <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
                      <button
                        className={`px-8 py-1 ${PRIMARY_BUTTON}`}
                        type="submit"
                      >
                        Analyze and Save
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
