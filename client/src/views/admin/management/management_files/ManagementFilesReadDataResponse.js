import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toReadableName } from "../../../../helpers/Helper";
import httpClient from "../../../../http/httpClient";
import { LoadingPageSkeletonText } from "../../../../components/loading/LoadingPage";
import BackTo from "../../../../components/buttons/BackTo";
import { Header } from "../../../../components/headers/Header";
import { GridItemResponse } from "../../../../components/grid/GridItem";
import { toast } from "react-toastify";
import { NoData } from "../../../../components/warnings/WarningMessages";

/**
 * @description Displays the sentiment score of the file along with the response
 */
export default function ManagementFilesReadDataResponse() {
  /**
   * @description Gets the information from the url
   */
  const { fileId, read_responses, file_name } = useParams();

  const [readDataResponse, setReadDataResponse] = useState({
    loading: true,
    sentiments_list: [],
  });

  const { loading, sentiments_list } = readDataResponse;

  /**
   * @description Loads the sentiment score of the file along with the response
   * @param fileId
   * @param read_responses
   * @param file_name
   */
  const loadReadDataResponse = (fileId, read_responses, file_name) => {
    httpClient
      .get(`/data/read-data-response/${fileId}/${read_responses}/${file_name}`)
      .then((response) => {
        setReadDataResponse({
          ...readDataResponse,
          loading: false,
          sentiments_list: response.data.sentiments_list,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
  };

  useEffect(() => {
    loadReadDataResponse(fileId, read_responses, file_name);
  }, [fileId, read_responses, file_name]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <BackTo
        text="Back"
        to={`/admin/management/files/data/${fileId}/${read_responses}`}
      />
      <Header
        body={`Here is the data response for ${toReadableName(file_name)}`}
        title={`${toReadableName(file_name)}`}
      />
      <div className=" place-content-center pt-8 space-y-8">
        <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
          {loading ? (
            <>
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
            </>
          ) : sentiments_list.length > 0 ? (
            sentiments_list.map((sentiment) => (
              <div
                className={`flex flex-col p-8 rounded-lg shadow ${
                  sentiment.sentiment >= 50 ? "bg-green-50" : "bg-red-50"
                }`}
                key={sentiment.id}
              >
                <GridItemResponse key={sentiment.id} sentiment={sentiment} />
              </div>
            ))
          ) : (
            <div className={"col-span-full"}>
              <NoData message="Data Unavailable" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
