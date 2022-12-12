import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import { Header } from "../../../components/headers/Header";
import { toReadableName } from "../../../helpers/Helper";
import BackTo from "../../../components/buttons/BackTo";
import { GridItemResponse } from "../../../components/grid/GridItem";
import { isAuth } from "../../../helpers/Auth";
import { NoData } from "../../../components/warnings/WarningMessages";
import { toast } from "react-toastify";

/**
 * @description Displays the sentiment score of the file along with the response
 */
export default function EvalReadCourseSentiment() {
  /**
   * @description Gets the information from the url
   */
  const { fileId, folderName, fileName } = useParams();

  const fullname = isAuth().full_name;

  // Converts the fullname to UPPERCASE and replaces the space with an underscore
  const folderNameV = fullname.toUpperCase().replace(" ", "_");

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
        window.location.href = "/unauthorized-access";
      });
  };

  useEffect(() => {
    loadReadDataResponse(fileId, folderName, fileName);
  }, [fileId, folderName, fileName]);

  return folderNameV === folderName ? (
    <div className="px-6 mx-auto max-w-7xl">
      <BackTo
        text="Back"
        to={`/user/evaluation-results/files/${fileId}/${folderName}`}
      />
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <Header
            body={`Here is the data response for ${toReadableName(fileName)}`}
            title={`${toReadableName(fileName)}`}
          />
          <div className=" place-content-center pt-8 space-y-8">
            {sentiments_list.length > 0 ? (
              <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
                {sentiments_list.map((sentiment) => (
                  <div
                    className={`flex flex-col p-8 rounded-lg shadow ${
                      sentiment.sentiment >= 50 ? "bg-green-50" : "bg-red-50"
                    }`}
                    key={sentiment.id}
                  >
                    <GridItemResponse
                      key={sentiment.id}
                      sentiment={sentiment}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <NoData message="Data Unavailable" />
            )}
          </div>
        </>
      )}
    </div>
  ) : (
    <Navigate to="/unauthorized-access" />
  );
}
