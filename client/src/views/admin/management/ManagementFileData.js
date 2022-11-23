import React, {useState, useEffect} from "react";
import {
    ACCENT_BUTTON,
    DEFAULT_BUTTON,
    Header,
    ICON_PLACE_SELF_CENTER, NoData,
} from "../../../assets/styles/input-types-styles";
import {Link, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faFileCsv} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";

export default function ManagementFileData() {

    const fileId = useParams().fileId;

    const [fileInfo, setFileInfo] = useState({
        loading: true,
        data_departments: [],
        data_professors: [],
    });

    const {loading, data_departments, data_professors} = fileInfo;

    const loadAll = (fileId) => {
        setFileInfo({...fileInfo, loading: true});

        httpClient.get(`/data/view-csv-file/${fileId}`)
            .then((response) => {
                setFileInfo({
                    loading: false,
                    data_departments: response.data.department_file,
                    data_professors: response.data.professor_file,
                });
            }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        loadAll(fileId);
    }, [fileId]);
    
    // Remove the [] and '' from the string in professor.evaluatee_course_code
    const removeBrackets = (str) => {
        return str.replace(/[[\]']+/g, '');
    }

    // Remove the [] and '' from the string in professor.evaluatee_list
    const removeComma = (str) => {
        return str.replace(/[, ]+/g, '_')
    }
    
  return (
      <div className="px-6 mx-auto max-w-7xl pt-8">
          <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
              <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                  <button className={`text-left ${DEFAULT_BUTTON}`} type={"button"}>
                      <Link to={"/admin/management/files"}>
                          <h1 className="px-5 py-3">
                              <FontAwesomeIcon
                                  className={`${ICON_PLACE_SELF_CENTER}`}
                                  icon={faArrowLeft}
                              />
                              Back
                          </h1>
                      </Link>
                  </button>
              </div>
          </div>
          {loading ? (
              LoadingPage()
          ) : (
              <>
                  {data_departments.length > 0 && data_professors.length > 0 ? (
                      <>
                          <Header
                              body={"Data of the Departments"}
                              title={"Department Data"}
                          />
                          <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
                              {data_departments.map((department) => (
                                  <div
                                      className="flex flex-col mb-4 w-full bg-white rounded-lg shadow-md"
                                      key={department.department_list}
                                  >
                                      <div className="col-span-1 w-full">
                                          <div className="flex flex-row w-full p-4">
                                              <h1 className="text-md font-bold leading-none text-blue-600">
                                                  Department:
                                              </h1>
                                              <h1 className="text-md leading-none text-gray-600 ml-2">
                                                  {department.department_list}
                                              </h1>
                                          </div>
                                      </div>
                                      <hr className="w-full border-gray-300" />
                                      <div className="col-span-4 text-start p-4">
                                          <div className="flex flex-row w-full py-2">
                                              <h1 className="text-base font-bold leading-none text-blue-600">
                                                  Details
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  No. of Professors:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_evaluatee}
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  No. of Courses:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_evaluatee_course_code}
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  No. of Responses:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_number_of_sentiments}
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Overall Rating:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_overall_sentiment}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Negative Score:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_negative_sentiments_percentage}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Positive Score:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_positive_sentiments_percentage}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Share of Voice:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {department.department_share}%
                                              </h1>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          <Header
                              body={"Data of the Professors"}
                              title={"Professor Data"}
                          />
                          <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
                              {data_professors.map((professor) => (
                                  <div
                                      className="flex flex-col mb-4 w-full bg-white rounded-lg shadow-md"
                                      key={professor.evaluatee_list}
                                  >
                                      <div className="col-span-1 w-full">
                                          <div className="flex flex-row w-full p-4">
                                              <h1 className="text-md font-bold leading-none text-blue-600">
                                                  Professor:
                                              </h1>
                                              <h1 className="text-md leading-none text-gray-600 ml-2">
                                                  {professor.evaluatee_list}
                                              </h1>
                                          </div>
                                      </div>
                                      <hr className="w-full border-gray-300" />
                                      <div className="col-span-4 text-start p-4">
                                          <div className="flex flex-row w-full py-2">
                                              <h1 className="text-base font-bold leading-none text-blue-600">
                                                  Details
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  No. of Responses:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {professor.evaluatee_number_of_sentiments}
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Overall Rating:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {professor.evaluatee_overall_sentiment}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Negative Score:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {professor.evaluatee_negative_sentiments_percentage}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Positive Score:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {professor.evaluatee_positive_sentiments_percentage}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row items-start w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
                                                  Share of Voice:
                                              </h1>
                                              <h1 className="ml-2 text-base leading-none text-gray-600">
                                                  {professor.evaluatee_share}%
                                              </h1>
                                          </div>
                                          <div className="flex flex-row w-full py-2">
                                              <h1 className="text-base font-bold leading-none text-blue-600">
                                                  Subjects Taught
                                              </h1>
                                          </div>
                                          <div className="flex flex-row w-full py-2">
                                              <h1 className="text-base font-medium leading-none text-gray-600">
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
                          </div>
                      </>
                  ) : (
                      <div className={"pt-8"}>
                          {NoData("No Files Found")}
                      </div>
                  )}
              </>
          )}
      </div>
  );
}