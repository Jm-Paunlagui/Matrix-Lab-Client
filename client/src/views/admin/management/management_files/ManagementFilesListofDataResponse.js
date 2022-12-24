import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
} from "../../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../../http/httpClient";
import {LoadingPageSkeletonText} from "../../../../components/loading/LoadingPage";
import { toReadableName } from "../../../../helpers/Helper";
import BackTo from "../../../../components/buttons/BackTo";
import { Header } from "../../../../components/headers/Header";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import { NoData } from "../../../../components/warnings/WarningMessages";
import { toast } from "react-toastify";

/**
 * @description Lists the courses to read each course's data
 */
export default function ManagementFilesListofDataResponse() {
  const { fileId, read_responses } = useParams();

  const [listOfTaughtCourses, setListOfTaughtCourses] = useState({
    loading: true,
    file_list: [],
    topic: "",
    school_year: "",
    school_semester: "",
  });

  const { loading, file_list, topic, school_year, school_semester } =
    listOfTaughtCourses;

  const [filteredListOfTaughtCourses, setFilteredListOfTaughtCourses] =
    useState(file_list);

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
          topic: response.data.topic,
          school_year: response.data.school_year,
          school_semester: response.data.school_semester,
        });
        setFilteredListOfTaughtCourses(response.data.file_list);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
  };

  /**
   * @description Filters the list of taught courses
   * @param event
   */
  const handleSearchForCourse = (event) => {
    const searchValue = event.target.value;
    const filteredList = file_list.filter((course) => {
      return (
        course.file_title.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.file_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfTaughtCourses(filteredList);
  };

  useEffect(() => {
    loadListOfTaughtCourses(fileId, read_responses);
  }, [fileId, read_responses]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <BackTo text="Back" to={`/admin/management/files/data/${fileId}`} />
          <Header
            body={`Sentiment Analysis Evaluation Results for the School Year ${school_year} and School Semester ${school_semester}`}
            title={`${topic}`}
          />
          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForCourse(event)}
            placeholder="Search"
            type="text"
          />
      <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
        {loading ? (
            <>
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
            </>
        ) : filteredListOfTaughtCourses.length > 0 ? (
            filteredListOfTaughtCourses.map((file) => (
                <div
                    className="flex flex-col mb-4 w-full bg-blue-50 rounded-lg shadow-md"
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
            ))
        ) : (
            <div className={"col-span-full"}>
              <NoData message="Data Unavailable" />
            </div>
        )}
      </div>
    </div>
  );
}
