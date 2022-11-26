import React, { useState, useEffect } from "react";
import {
  ACCENT_BUTTON,
  Header,
  ICON_PLACE_SELF_CENTER,
  MAIN_BUTTON,
  NoData, SearchBar,
} from "../../../assets/styles/input-types-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faFileCsv,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { Link } from "react-router-dom";

/**
 * @description Handles the files to view and delete
 */
export default function ManagementFiles() {
  const [fileData, setFileData] = useState({
    loading: true,
    files: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page: 1,
    total_items: "",
    total_pages: "",
  });

  const {
    loading,
    files,
    current_page,
    has_next,
    has_prev,
    page,
    total_items,
    total_pages,
  } = fileData;

  const [filteredListOfFiles, setFilteredListOfFiles] = useState(files);

  /**
   * @description Filters the list of files based on the search value
   * @param event
   */
  const handleSearchForFile = (event) => {
    const searchValue = event.target.value;
    const filteredList = files.filter((file) => {
      return file.school_year.toLowerCase().includes(searchValue.toLowerCase()) ||
        file.school_semester.toLowerCase().includes(searchValue.toLowerCase()) ||
        file.csv_question.toLowerCase().includes(searchValue.toLowerCase());
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
      .get(`/data/list-of-csv-files-to-view/${page}`)
      .then((response) => {
        setFileData({
          ...fileData,
          loading: false,
          files: response.data.csv_files,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          items_per_page: response.data.items_per_page,
          next_page: response.data.next_page,
          prev_page: response.data.prev_page,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
        setFilteredListOfFiles(response.data.csv_files);
      });
  };

  useEffect(() => {
    loadFiles(page);
  }, [page]);

  /**
   * @description Handles the delete of a file from the backend
   * @param file
   */
  const handleDelete = (file) => {
    httpClient
      .delete(`/data/delete-csv-file/${file}`)
      .then((response) => {
        loadFiles(page);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  /**
   * @description Handles the download of a file from the backend
   * @param file
   */
  const handleDownload = (file) => {
    httpClient
      .get(`/data/download-csv-file/${file}`, { responseType: "blob" })
      .then((response) => {
        const filename =
          response.headers["content-disposition"].split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <Header
        body={
          "View and Delete files CSV files that have been analyzed by the system."
        }
        title={"File Management"}
      />
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <SearchBar customStyle="mt-8"
                     name="searchValue"
                     onChange={(event) => handleSearchForFile(event)}
                     placeholder="Search"
                     type="text"
          />
          <div className="flex flex-col w-full p-4">
            <h1 className="text-start font-medium text-gray-700">
              Page {current_page} of {total_pages}
            </h1>
          </div>
          {filteredListOfFiles.length > 0 ? (
            <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
              {filteredListOfFiles.map((file) => (
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
                        {file.id}
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
                        School Year:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-600">
                        {file.school_year}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-600">
                        School Semester:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-600">
                        {file.school_semester}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-600">
                        Topic:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-600">
                        {file.csv_question}
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
                        <Link to={`${file.id}`}>
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faFileCsv}
                          />
                          View
                        </Link>
                      </button>
                      <button
                        className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                        onClick={() => handleDownload(file.id)}
                        type="button"
                      >
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faFileArrowDown}
                        />
                        Download
                      </button>
                      <ConfirmModal
                        description="This action cannot be undone. This will permanently delete the file and its associated data from the system."
                        id={file.id}
                        onConfirm={handleDelete}
                        title="Delete File Confirmation"
                        to_delete={file.csv_question}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={"pb-8"}>{new NoData("No Files Found")}</div>
          )}
          <div className="pb-16 flex flex-col space-y-2 justify-end w-full lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex flex-row items-center justify-center w-full lg:w-1/2">
              {/*    Page details*/}
              <div className="flex flex-row items-center justify-center w-full">
                <h1 className="text-base font-medium leading-none t text-gray-700">
                  Showing {files.length} of {total_items} files in total (
                  {total_pages} pages)
                </h1>
              </div>
            </div>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_prev ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_prev}
              onClick={() => setFileData({ ...fileData, page: page - 1 })}
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
              onClick={() => setFileData({ ...fileData, page: page + 1 })}
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
