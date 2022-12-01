import React, { Fragment, useState, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ACCENT_BUTTON,
  DANGER_BUTTON,
  ICON_PLACE_SELF_CENTER,
  TEXT_FIELD,
} from "../../assets/styles/styled-components";
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
import {
  faMagnifyingGlassChart,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../../components/headers/Header";
import { useDropzone } from "react-dropzone";
import { LoadingAnimation } from "../../components/loading/LoadingPage";

/**
 * @description Handles the admin prediction
 */
export default function AdminPrediction() {
  const user = isAuth();

  //const inputRef = useRef(null);

  const [csv_file_to_view, setCSVFileToView] = useState();

  const [handlers, setHandlers] = useState({
    ok: false,
    errorEffect: false,
    errorMessage: "",
    textChange: "View",
    okToAnS: false,
    errorEffectToAnS: false,
    errorMessageToAnS: "",
    textChangeToAnS: "Analyze and Save",
  });

  const {
    ok,
    errorEffect,
    errorMessage,
    textChange,
    okToAnS,
    errorEffectToAnS,
    errorMessageToAnS,
    textChangeToAnS,
  } = handlers;

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setCSVFileToView(acceptedFiles[0]);
    setHandlers({
      ...handlers,
      errorMessage: "",
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const removeAll = () => {
    setCSVFileToView(null);
    setHandlers({
      ...handlers,
      errorMessage: "",
    });
    acceptedFiles.splice(0, acceptedFiles.length);
  };

  const [csv_columns, setCSVColumns] = useState({
    show_columns: false,
    csv_file_name: "",
    csv_columns_to_pick: [],
  });

  const { show_columns, csv_file_name, csv_columns_to_pick } = csv_columns;

  const [selectedColumn, setSelectedColumn] = useState({
    selected_column_for_sentence: "",
    selected_column_for_evaluatee: "",
    selected_column_for_department: "",
    selected_column_for_course_code: "",
    selected_semester: "",
  });

  const semester = [
    { name: "1st Semester", id: 1 },
    { name: "2nd Semester", id: 2 },
    { name: "3rd Semester", id: 3 },
    { name: "Summer", id: 4 },
  ];

  const { selected_column_for_sentence, selected_semester } = selectedColumn;

  // onChange for the select column for sentence listbox headless ui
  const handleSelect = (name) => (value) => {
    setSelectedColumn({
      ...selectedColumn,
      [name]: value,
    });
    setHandlers({
      ...handlers,
      errorMessageToAnS: "",
    });
  };

  const [extras, setExtras] = useState({
    csv_question: "",
    school_year: "",
  });
  const { csv_question, school_year } = extras;

  /**
   * @description Gets the input from the user and sets the state
   */
  const handleExtras = (name) => (event) => {
    setExtras({ ...extras, [name]: event.target.value });
    setHandlers({
      ...handlers,
      errorMessageToAnS: "",
    });
  };

  /**
   * @description Handles the view of the csv file and to select the columns
   * @param event
   * @returns {Promise<void>}
   */
  const handleSubmitCSVToView = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      ok: true,
      textChange: "Viewing...",
    });
    const formData = new FormData();
    formData.append("csv_file_to_view", csv_file_to_view);
    await httpClient
      .post("/data/view-columns", formData)
      .then(async (response) => {
        setHandlers({
          ...handlers,
          ok: false,
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
        removeAll();
        setCSVColumns({
          ...csv_columns,
          show_columns: false,
          csv_file_name: "",
        });
        setHandlers({
          ...handlers,
          ok: false,
          errorEffect: true,
          errorMessage: error.response.data.message,
          textChange: "View",
        }) || toast.error(error.message);
      });
  };

  /**
   * @description Handles the analysis and saving of the csv file
   * @param event
   * @returns {Promise<void>}
   */
  const handleSubmitToAnalyzeAndSave = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      okToAnS: true,
      textChangeToAnS: "Analyzing and Saving...",
    });
    if (getNameFromString(selected_column_for_sentence) !== csv_question) {
      setHandlers({
        ...handlers,
        okToAnS: false,
        errorEffectToAnS: true,
        errorMessageToAnS:
          "Question column does not match the selected column for sentence",
        textChangeToAnS: "Analyze and Save",
      });
    } else {
      await httpClient
        .post("/data/analyze-save-csv", {
          file_name: csv_file_name,
          csv_question,
          school_year,
          selected_column_for_sentence: getNumberFromString(
            selected_column_for_sentence,
          ),
          selected_semester,
        })
        .then((response) => {
          toast.success(response.data.message);
          setHandlers({
            ...handlers,
            okToAnS: false,
            showButtonToAnS: false,
            textChangeToAnS: "Analyzed and Saved",
          });
          setExtras({
            ...extras,
            csv_question: "",
            school_year: "",
          });
          setSelectedColumn({
            ...selectedColumn,
            selected_column_for_sentence: "",
            selected_semester: "",
          });
          setCSVColumns({
            ...csv_columns,
            show_columns: false,
            csv_file_name: "",
            csv_columns_to_pick: [],
          });
          // remove the file from the dropzone
          removeAll();
        })
        .catch((error) => {
          removeAll();
          setExtras({
            ...extras,
            csv_question: "",
            school_year: "",
          });
          setSelectedColumn({
            ...selectedColumn,
            selected_column_for_sentence: "",
            selected_semester: "",
          });
          setCSVColumns({
            ...csv_columns,
            show_columns: true,
            csv_file_name: "",
            csv_columns_to_pick: [],
          });
          setHandlers({
            ...handlers,
            textChange: "View",
            okToAnS: false,
            errorEffectToAnS: true,
            errorMessageToAnS: error.response.data.message,
            textChangeToAnS: "Analyze and Save",
          }) || toast.error(error.message);
        });
    }
  };

  /**
   * @description Close the error message
   */
  const handleClose = () => {
    removeAll();
    setCSVColumns({
      ...csv_columns,
      show_columns: false,
      csv_file_name: "",
      csv_columns_to_pick: [],
    });
    setHandlers({
      ...handlers,
      errorEffect: false,
      errorEffectToAnS: false,
      errorMessageToAnS: "",
    });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <Header
        body={
          "Upload a CSV file to analyze and choose the column that contains the responses to analyze. The system will automatically create users but you have to manually send the credentials to them if the results are ready."
        }
        title={"Sentiment Analysis"}
      />
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-8">
        <div className="col-span-1 p-8 rounded-lg bg-blue-50 shadow">
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Right Format of CSV File to Upload
          </h1>
          <p className="mb-4 text-sm text-gray-500 font-medium">
            Your CSV file should contain the following headers:{" "}
            <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
              evaluatee, email, department, course code
            </b>{" "}
            and pick a header for the{" "}
            <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
              sentence
            </b>
            .
          </p>
          <p className="text-sm text-gray-500 font-medium">
            <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
              sentence
            </b>{" "}
            is the header that contains the responses of the students.
          </p>
        </div>
        <div className="col-span-2">
          <div
            className={`flex flex-col w-full bg-blue-50 rounded-lg shadow ${
              errorEffect || errorEffectToAnS
                ? `animate-wiggle outline outline-2`
                : ""
            }`}
            onAnimationEnd={() =>
              setHandlers({
                ...handlers,
                errorEffect: false,
                errorEffectToAnS: false,
              })
            }
          >
            <div className="grid w-full h-full grid-cols-1  md:grid-cols-5">
              <div className="flex flex-col w-full h-full col-span-5 p-8 pb-8 space-y-4">
                <form
                  encType={"multipart/form-data"}
                  onSubmit={handleSubmitCSVToView}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <h1 className="mb-4 text-xl font-bold text-blue-500">
                        Upload CSV File
                      </h1>
                      <div
                        className="flex items-center justify-center w-full"
                        {...getRootProps()}
                      >
                        <label
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ${
                            errorEffect || errorEffectToAnS
                              ? `animate-wiggle border-red-500`
                              : "border-gray-300"
                          }`}
                          htmlFor="dropzone-file"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              CSV files only
                            </p>
                          </div>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p className="text-sm text-gray-500">
                              Drop the files here ...
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Drag &#39;n&#39; drop some files here, or click to
                              select files
                            </p>
                          )}
                          {acceptedFiles.map((file) => (
                            <p
                              className="text-sm text-gray-500"
                              key={file.path}
                            >
                              {file ? `${file.path} - ${file.size} bytes` : ""}
                            </p>
                          ))}
                        </label>
                      </div>
                      <p
                        className="mt-1 text-sm text-gray-500"
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
                      className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
                      type="submit"
                    >
                      {ok ? (
                        <LoadingAnimation moreClasses="text-teal-600" />
                      ) : null}
                      {textChange}
                    </button>
                  </div>
                </form>
                {show_columns ? (
                  <form onSubmit={handleSubmitToAnalyzeAndSave}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="mb-4 text-xl font-bold text-blue-500">
                          Header Selection
                        </h1>
                      </div>
                      <p className="text-gray-500">
                        Select the header that contains the responses to be
                        analyzed. The responses should be in the form of a
                        sentence. For example, &ldquo;I like the teacher&ldquo;.
                      </p>
                      <div className="flex flex-col w-full space-y-2">
                        <h1 className="text-base font-medium text-blue-500">
                          File Name
                        </h1>
                        <input
                          className={`${TEXT_FIELD} cursor-not-allowed text-gray-500 bg-white`}
                          disabled
                          placeholder="File Name"
                          type="text"
                          value={csv_file_name}
                        />
                      </div>
                      <div className="flex flex-col w-full space-y-2">
                        <Listbox
                          name={"sentence"}
                          onChange={handleSelect(
                            "selected_column_for_sentence",
                          )}
                        >
                          <Listbox.Label className="block text-base font-medium text-blue-500">
                            Sentence
                          </Listbox.Label>
                          <div className="relative mt-1">
                            <Listbox.Button
                              className={`${TEXT_FIELD} text-gray-500 bg-white`}
                            >
                              <span className="block truncate text-start">
                                {selected_column_for_sentence
                                  ? selected_column_for_sentence
                                  : "Select a column"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-blue-500"
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
                                          ? "bg-blue-100 text-blue-500"
                                          : "text-gray-500"
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
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
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
                        <h1 className="text-base font-medium text-blue-500">
                          School Year
                        </h1>
                        <input
                          className={`truncate ${TEXT_FIELD} text-gray-500 bg-white`}
                          name="school_year"
                          onChange={handleExtras("school_year")}
                          placeholder="e.g. S.Y. 2020-2021"
                          type="text"
                          value={school_year}
                        />
                        <Listbox
                          name={"semester"}
                          onChange={handleSelect("selected_semester")}
                        >
                          <Listbox.Label className="block text-base font-medium text-blue-500">
                            Semester
                          </Listbox.Label>
                          <div className="relative mt-1">
                            <Listbox.Button
                              className={`${TEXT_FIELD} text-gray-500 bg-white`}
                            >
                              <span className="block truncate text-start">
                                {selected_semester
                                  ? selected_semester
                                  : "Select a semester"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-blue-500"
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
                                {semester.map((sem) => (
                                  <Listbox.Option
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-blue-100 text-blue-500"
                                          : "text-gray-500"
                                      }`
                                    }
                                    key={sem.id}
                                    value={sem.name}
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
                                          {sem.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
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
                        {selected_column_for_sentence ? (
                          <h1 className="text-base font-medium text-blue-500">
                            Please type {'"'}
                            <b className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500">
                              {getNameFromString(selected_column_for_sentence)}
                            </b>
                            {'"'} to confirm.
                          </h1>
                        ) : (
                          <h1 className="text-base font-medium text-blue-500">
                            Select a column for sentence.
                          </h1>
                        )}
                        <input
                          autoComplete={"off"}
                          className={`truncate ${TEXT_FIELD} text-gray-700 bg-white`}
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
                      {errorMessageToAnS ? (
                        <button
                          className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                          onClick={handleClose}
                          type="button"
                        >
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faArrowRotateRight}
                          />
                          Try Again
                        </button>
                      ) : (
                        <button
                          className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
                          type="submit"
                        >
                          {okToAnS ? (
                            <LoadingAnimation moreClasses="text-teal-600" />
                          ) : (
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faMagnifyingGlassChart}
                            />
                          )}
                          {textChangeToAnS}
                        </button>
                      )}
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
