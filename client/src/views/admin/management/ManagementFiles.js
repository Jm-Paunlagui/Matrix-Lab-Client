import React, { useState, useEffect } from "react";
import {
  DANGER_BUTTON,
  ICON_PLACE_SELF_CENTER,
  LOADING_ANIMATION, NoData,
  PRIMARY_BUTTON,
} from "../../../assets/styles/input-types-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faTrash,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import {toast} from "react-toastify";

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
    items_per_page: "",
    next_page: "",
    prev_page: "",
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
    items_per_page,
    next_page,
    prev_page,
    page,
    total_items,
    total_pages,
  } = fileData;

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
      });
  };

  useEffect(() => {
    loadFiles(page);
  }, [page]);

  const handleDelete = (file) => {
    httpClient
      .delete(`/data/delete-csv-file/${file}`)
      .then((response) => {
        loadFiles(page);
        toast.success(response.data.message);
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    }


  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48">
        <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 md:text-5xl lg:text-7xl">
          File Management
        </h1>
        <p className="text-base font-medium text-gray-500">
          View and Delete files CSV files that have been analyzed by the system.
        </p>
      </div>

      {files.length > 0 ? (
          <>
            <div className="flex flex-col w-full p-4">
              <h1 className="text-start font-medium text-gray-500">
                Page {current_page} of {total_pages}
              </h1>
            </div>
            {loading ? (
                LoadingPage()
            ) : (
                <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
                  {files.map((file) => (
                      <div
                          className="flex flex-col mb-8 w-full bg-white rounded shadow border-solid border-4 border-blue-100"
                          key={file.id}
                      >
                        <div className="grid w-full h-full grid-cols-1 rounded">
                          <div className="col-span-1 w-full bg-blue-50">
                            <div className="flex flex-row w-full p-4">
                              <h1 className="text-xl font-bold leading-none tracking-tight text-gray-700">
                                File ID:
                              </h1>
                              <h1 className="text-xl leading-none tracking-tight text-gray-700 ml-2">
                                {file.id}
                              </h1>
                            </div>
                          </div>
                          <div className="col-span-4 text-start p-4">
                            <div className="flex flex-row w-full py-2">
                              <h1 className="text-base font-bold leading-none tracking-tight text-gray-700">
                                Details
                              </h1>
                            </div>
                            <div className="flex flex-row items-start w-full py-2">
                              <h1 className="text-base font-medium leading-none tracking-tight text-gray-700">
                                School Year:
                              </h1>
                              <h1 className="ml-2 text-base leading-none tracking-tight text-gray-700">
                                {file.school_year}
                              </h1>
                            </div>
                            <div className="flex flex-row items-start w-full py-2">
                              <h1 className="text-base font-medium leading-none tracking-tight text-gray-700">
                                School Semester:
                              </h1>
                              <h1 className="ml-2 text-base leading-none tracking-tight text-gray-700">
                                {file.school_semester}
                              </h1>
                            </div>
                            <div className="flex flex-row items-start w-full py-2">
                              <h1 className="text-base font-medium leading-none tracking-tight text-gray-700">
                                Topic:
                              </h1>
                              <h1 className="ml-2 text-base leading-none tracking-tight text-gray-700">
                                {file.csv_question}
                              </h1>
                            </div>
                          </div>
                          <div className="col-span-1 w-full">
                            <div className="flex flex-row w-full px-4">
                              <h1 className="text-base font-bold leading-none tracking-tight text-gray-700">
                                Actions
                              </h1>
                            </div>
                            <div className="mt-2 p-4 content-end flex flex-col space-y-2 justify-start w-full lg:flex-row lg:space-x-2 lg:space-y-0">
                              <button
                                  className={`px-8 py-1 flex flex-row justify-center w-full ${PRIMARY_BUTTON}`}
                                  type="button"
                              >
                                <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faFileCsv}
                                />
                                View
                              </button>
                              <button
                                  className={`px-8 py-1 flex flex-row justify-center w-full ${DANGER_BUTTON}`}
                                  onClick={() => handleDelete(file.id)}
                                  type="button"
                              >
                                <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faTrash}
                                />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            )}
            <div className="mb-16 flex flex-col space-y-2 justify-end w-full lg:flex-row lg:space-x-2 lg:space-y-0">
              <div className="flex flex-row items-center justify-center w-full lg:w-1/2">
                {/*    Page details*/}
                <div className="flex flex-row items-center justify-center w-full">
                  <h1 className="text-base font-medium leading-none tracking-tight text-gray-700">
                    Showing {files.length} of {total_items} files in total (
                    {total_pages} pages)
                  </h1>
                </div>
              </div>
              <button
                  className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}
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
                  className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}
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
      ) : (NoData("No Files Found"))}
    </div>
  );
}
