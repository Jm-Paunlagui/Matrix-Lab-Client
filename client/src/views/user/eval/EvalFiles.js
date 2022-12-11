import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Header } from "../../../components/headers/Header";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import { SearchBar } from "../../../components/searchbar/SearchBar";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  MAIN_BUTTON,
} from "../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import { isAuth } from "../../../helpers/Auth";
import {NoData} from "../../../components/warnings/WarningMessages";

/**
 * @description Handles evaluation pages for the application
 */
export default function EvalFiles() {
  const fullname = isAuth().full_name;

  // Converts the fullname to UPPERCASE and replaces the space with an underscore
  const folderName = fullname.toUpperCase().replace(" ", "_");

  const [fileData, setFileData] = useState({
    loading: true,
    files_list: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page_number: 1,
    total_items: "",
    total_pages: "",
  });

  const {
    loading,
    files_list,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
  } = fileData;

  const [filteredListOfFiles, setFilteredListOfFiles] = useState(files_list);

  const handleSearchForFile = (event) => {
    const searchValue = event.target.value;
    const filteredList = files_list.filter((file) => {
      return (
        file.school_year.toLowerCase().includes(searchValue.toLowerCase()) ||
        file.school_semester
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        file.csv_question.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfFiles(filteredList);
  };

  /**
   * @description Loads the files from the backend
   * @param page
   */
  const loadFiles = (page) => {
    setFileData({
      ...fileData,
      loading: true,
    });
    httpClient
      .get(`/data/list-of-csv-files-to-view-collections/${page}`)
      .then((response) => {
        setFileData({
          ...fileData,
          loading: false,
          files: response.data.csv_files,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
        setFilteredListOfFiles(response.data.csv_files);
      });
  };

  useEffect(() => {
    loadFiles(page_number);
  }, [page_number]);

  return (
    <div className="px-6 mx-auto max-w-7xl mt-8">
      <Header
        body={
          "Files that have been uploaded by the admin. You can download the files and view the data."
        }
        title="File Results"
      />
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForFile(event)}
            placeholder="Search"
            type="text"
          />
          <div className="flex flex-col w-full p-4">
            <h1 className="text-start font-medium text-blue-500">
              Page {current_page} of {total_pages}
            </h1>
          </div>
          {filteredListOfFiles.length > 0 ? (
            <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
              {filteredListOfFiles.map((file) => (
                <div
                  className="flex flex-col mb-4 w-full bg-blue-50 rounded-lg shadow-md"
                  key={file.id}
                >
                  <div className="col-span-1 w-full">
                    <div className="flex flex-row w-full p-4">
                      <h1 className="text-md font-bold leading-none text-blue-600">
                        File ID
                      </h1>
                      <h1 className="text-md leading-none text-gray-500 ml-2">
                        {file.id}
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
                        School Year:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-600">
                        {file.school_year}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        School Semester:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-500">
                        {file.school_semester}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        Topic:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-500">
                        {file.csv_question}
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-1 w-full">
                    <div className="flex flex-row w-full px-4">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Actions
                      </h1>
                    </div>
                    <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                      <button
                        className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                        type="button"
                      >
                        <Link to={`${file.id}/${folderName}`}>
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faFileCsv}
                          />
                          View
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={"pb-8"}>
              <NoData
                message="Data Unavailable"
              />
            </div>
          )}
          <div className="pb-16 flex flex-col space-y-2 justify-end w-full lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex flex-row items-center justify-center w-full lg:w-1/2">
              {/*    Page details*/}
              <div className="flex flex-row items-center justify-center w-full">
                <h1 className="text-base font-medium leading-none t text-blue-500">
                  Showing {files_list.length} of {total_items} files in total (
                  {total_pages} pages)
                </h1>
              </div>
            </div>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_prev ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_prev}
              onClick={() =>
                setFileData({ ...fileData, page_number: page_number - 1 })
              }
              type="button"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCaretLeft}
              />
              Newer
            </button>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_next ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_next}
              onClick={() =>
                setFileData({ ...fileData, page_number: page_number + 1 })
              }
              type="button"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCaretRight}
              />
              Older
            </button>
          </div>
        </>
      )}
    </div>
  );
}
