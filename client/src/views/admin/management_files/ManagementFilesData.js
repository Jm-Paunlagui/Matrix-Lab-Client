import React, { useState, useEffect } from "react";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  NoData,
} from "../../../assets/styles/styled-components";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import {removeBrackets, removeComma} from "../../../helpers/Helper";
import {toast} from "react-toastify";
import BackTo from "../../../components/buttons/BackTo";
import {Header} from "../../../components/headers/Header";
import {SearchBar} from "../../../components/searchbar/SearchBar";

/**
 * @description Handles the lists data of the file department and professor
 */
export default function ManagementFilesData() {
  /**
   * @description Gets the file id from the url to load the data
   * @type {string}
   */
  const fileId = useParams().fileId;

  const [fileInfo, setFileInfo] = useState({
    loading: true,
    data_departments: [],
    data_professors: [],
  });

  const { loading, data_departments, data_professors } = fileInfo;

  const [filteredProfessors, setFilteredProfessors] = useState(data_professors);
  const [filteredDepartments, setFilteredDepartments] =
    useState(data_departments);

  /**
   * @description Loads the data from the backend
   * @param fileId
   */
  const loadAll = (fileId) => {
    setFileInfo({ ...fileInfo, loading: true });

    httpClient
      .get(`/data/view-csv-file/${fileId}`)
      .then((response) => {
        setFileInfo({
          loading: false,
          data_departments: response.data.department_file,
          data_professors: response.data.professor_file,
        });
        setFilteredProfessors(response.data.professor_file);
        setFilteredDepartments(response.data.department_file);
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  /**
   * @description Filters the professors by the search input
   * @param event
   */
  const handleSearchForProfessor = (event) => {
    const value = event.target.value.toLowerCase();
    const result = data_professors.filter((data) => {
      return data.evaluatee_list.toLowerCase().search(value) !== -1;
    });
    setFilteredProfessors(result);
  };

  /**
   * @description Filters the departments by the search input
   * @param event
   */
  const handleSearchForDepartment = (event) => {
    const value = event.target.value.toLowerCase();
    const result = data_departments.filter((data) => {
      return data.department_list.toLowerCase().search(value) !== -1;
    });
    setFilteredDepartments(result);
  };

  useEffect(() => {
    loadAll(fileId);
  }, [fileId]);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <BackTo text="Back" to="/admin/management/files" />
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <Header
            body={"List of departments that detected in the uploaded file."}
            title={"Department Data"}
          />
          <SearchBar customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForDepartment(event)}
            placeholder="Search"
            type="text"
          />
          <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
            {filteredDepartments.length > 0 ? (
              <>
                {filteredDepartments.map((department) => (
                  <div
                    className="flex flex-col mb-4 w-full bg-blue-50 rounded-lg shadow-md"
                    key={department.department_list}
                  >
                    <div className="col-span-1 w-full">
                      <div className="flex flex-row w-full p-4">
                        <h1 className="text-md font-bold leading-none text-blue-500">
                          Department:
                        </h1>
                        <h1 className="text-md leading-none text-gray-500 ml-2">
                          {department.department_list}
                        </h1>
                      </div>
                    </div>
                    <hr className="w-full border-gray-300" />
                    <div className="col-span-4 text-start p-4">
                      <div className="flex flex-row w-full py-2">
                        <h1 className="text-base font-bold leading-none text-blue-500">
                          Details
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          No. of Professors:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_evaluatee}
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          No. of Courses:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_evaluatee_course_code}
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          No. of Responses:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_number_of_sentiments}
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Overall Rating:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_overall_sentiment}%
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Negative Score:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_negative_sentiments_percentage}
                          %
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Positive Score:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_positive_sentiments_percentage}
                          %
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Share of Voice:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {department.department_share}%
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className={"col-span-4"}>
                {new NoData("No Department Found")}
              </div>
            )}
          </div>
          <Header
            body={"List of Professors that detected in the uploaded file."}
            title={"Professor Data"}
          />
          <SearchBar customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForProfessor(event)}
            placeholder="Search"
            type="text"
          />
          <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
            {filteredProfessors.length > 0 ? (
              <>
                {filteredProfessors.map((professor) => (
                  <div
                    className="flex flex-col mb-4 w-full bg-blue-50 rounded-lg shadow-md"
                    key={professor.evaluatee_list}
                  >
                    <div className="col-span-1 w-full">
                      <div className="flex flex-row w-full p-4">
                        <h1 className="text-md font-bold leading-none text-blue-500">
                          Professor:
                        </h1>
                        <h1 className="text-md leading-none text-gray-500 ml-2">
                          {professor.evaluatee_list}
                        </h1>
                      </div>
                    </div>
                    <hr className="w-full border-gray-300" />
                    <div className="col-span-4 text-start p-4">
                      <div className="flex flex-row w-full py-2">
                        <h1 className="text-base font-bold leading-none text-blue-500">
                          Details
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          No. of Responses:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {professor.evaluatee_number_of_sentiments}
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Overall Rating:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {professor.evaluatee_overall_sentiment}%
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Negative Score:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {professor.evaluatee_negative_sentiments_percentage}%
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Positive Score:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {professor.evaluatee_positive_sentiments_percentage}%
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          Share of Voice:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-500">
                          {professor.evaluatee_share}%
                        </h1>
                      </div>
                      <div className="flex flex-row w-full py-2">
                        <h1 className="text-base font-bold leading-none text-blue-500">
                          Subjects Taught
                        </h1>
                      </div>
                      <div className="flex flex-row w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-500">
                          {removeBrackets(professor.evaluatee_course_code)}
                        </h1>
                      </div>
                    </div>
                    <div className="col-span-1 w-full">
                      <div className="flex flex-row w-full px-4">
                        <h1 className="text-base font-bold leading-none text-blue-600">
                          Actions
                        </h1>
                      </div>
                      <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                        <button
                          className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                          type="button"
                        >
                          <Link to={`${removeComma(professor.evaluatee_list)}`}>
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faFileCsv}
                            />
                            Read each response
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className={"col-span-4"}>{new NoData("No Professor Found")}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
