import React, { useEffect, useState } from "react";
import { Header } from "../../../../components/headers/Header";
import LoadingPage from "../../../../components/loading/LoadingPage";
import httpClient from "../../../../http/httpClient";

export default function ManagementFileBin() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

  const [fileData, setFileData] = useState({
    loading: true,
    files_list: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page_number: 1,
    total_items: "",
    total_pages: "",
    per_page_limit: per_page[0].value,
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
    per_page_limit,
  } = fileData;

  const [filteredListOfFiles, setFilteredListOfFiles] = useState(files_list);

  const handleSelect = (name) => (value) => {
    setFileData({
      ...fileData,
      [name]: value,
    });
  };

  const [loadingAnimation, setLoadingAnimation] = useState({
    massDelete: false,
    textChangeDelete: "Permanently Delete",
  });

  const { massDelete, textChangeDelete } = loadingAnimation;

  /**
   * @description Loads the files from the backend
   * @param page
   * @param per_page_limit
   */
  const loadFiles = (page, per_page_limit) => {
    setFileData({
      ...fileData,
      loading: true,
    });
    httpClient
      .get(
        `/data/getting-list-of-temporarily-deleted-csv-files/${page}/${per_page_limit}`,
      )
      .then((response) => {
        setFileData({
          ...fileData,
          loading: false,
          files_list: response.data.csv_files,
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
    loadFiles(page_number, per_page_limit);
  }, [page_number, per_page_limit]);

  return (
    <div className="px-6 mx-auto max-w-7xl mt-8">
      <Header
        body={
          "Permanently delete files from the system that have been deleted temporarily."
        }
        title={"Deleted Files"}
      />
      {loading ? LoadingPage() : <></>}
    </div>
  );
}
