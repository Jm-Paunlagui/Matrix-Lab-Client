import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ACCENT_BUTTON,
  DEFAULT_BUTTON,
  Header,
  ICON_PLACE_SELF_CENTER,
  NoData, SearchBar,
} from "../../../assets/styles/input-types-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import { toReadableName } from "../../../helpers/Helper";

/**
 * @description Lists the courses to read each course's data
 */
export default function ManagementListofDataResponse() {
  const { fileId, read_responses } = useParams();

  const [listOfTaughtCourses, setListOfTaughtCourses] = useState({
    loading: true,
    file_list: [],
  });

  const { loading, file_list } = listOfTaughtCourses;

  const [filteredListOfTaughtCourses, setFilteredListOfTaughtCourses] = useState(file_list);

  /**
   * @description Loads the list of taught courses
   * @param fileId
   * @param read_responses
   */
  const loadListOfTaughtCourses = (fileId, read_responses) => {
    httpClient
      .get(`/data/get-list-of-taught-courses/${fileId}/${read_responses}`)
      .then((response) => {
        setListOfTaughtCourses({
          ...listOfTaughtCourses,
          loading: false,
          file_list: response.data.file_list,
        });
        setFilteredListOfTaughtCourses(response.data.file_list);
      });
  };

  /**
   * @description Filters the list of taught courses
   * @param event
   */
  const handleSearchForCourse = (event) => {
    const searchValue = event.target.value;
    const filteredList = file_list.filter((course) => {
      return course.file_title.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.file_name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredListOfTaughtCourses(filteredList);
  }

  useEffect(() => {
    loadListOfTaughtCourses(fileId, read_responses);
  }, [fileId, read_responses]);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
        <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
          <button className={`text-left ${DEFAULT_BUTTON}`} type={"button"}>
            <Link to={`/admin/management/files/${fileId}`}>
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

              <Header
                body={
                  "View the responses of the file below. You can also download the responses as a CSV file."
                }
                title={`${toReadableName(read_responses)}`}
              />
              <SearchBar
                name="searchValue"
                onChange={(event) => handleSearchForCourse(event)}
                placeholder="Search"
                style={"mt-8"}
                type="text"
              />
              {filteredListOfTaughtCourses.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
                {filteredListOfTaughtCourses.map((file) => (
                  <div
                    className="flex flex-col mb-4 w-full bg-white rounded-lg shadow-md"
                    key={file.id}
                  >
                    <div className="col-span-1 w-full">
                      <div className="flex flex-row w-full p-4">
                        <h1 className="text-md font-bold leading-none text-blue-600">
                          File ID
                        </h1>
                        <h1 className="text-md leading-none text-gray-600 ml-2">
                          {file.id + 1}
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
                          Course Code:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-600">
                          {file.file_title}
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-600">
                          File Name:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-600">
                          {file.file_name}
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
                          <Link to={`${file.file_name}`}>
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faFileCsv}
                            />
                            Read {toReadableName(file.file_title)}
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                  </>
              ) : (
                  <div className={"pt-8"}>{new NoData("No data to display")}</div>
              )}
        </>
      )}
    </div>
  );
}
