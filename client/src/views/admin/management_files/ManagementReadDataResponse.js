import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toReadableName } from "../../../helpers/Helper";
import httpClient from "../../../http/httpClient";
import LoadingPage from "../../../components/loading/LoadingPage";
import BackTo from "../../../components/buttons/BackTo";
import {Header} from "../../../components/headers/Header";

/**
 * @description Displays the sentiment score of the file along with the response
 */
export default function ManagementReadDataResponse() {
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
      });
  };

  useEffect(() => {
    loadReadDataResponse(fileId, read_responses, file_name);
  }, [fileId, read_responses, file_name]);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <BackTo text="Back" to={`/admin/management/files/${fileId}/${read_responses}`} />
      {loading ? (
          LoadingPage()
      ) : (
          <>
            <Header
              body={`Here is the data response for ${toReadableName(file_name)}`}
              title={`${toReadableName(file_name)}`}
            />
            <div className=" place-content-center pt-8 space-y-8">
              {sentiments_list.map((sentiment) => (
                <div
                  className={`flex flex-col mb-8 w-full bg-white rounded shadow`}
                  key={sentiment.id}
                >
                  <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
                    <div
                      className={`col-span-1 py-5 bg-gray-50 items-center justify-center w-full`}
                    >
                      <div className="flex flex-col items-center justify-center w-full">
                        <div
                          className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                            sentiment.sentiment >= 50 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          <i
                            className={`fas ${
                              sentiment.sentiment >= 50
                                ? "fa-face-smile-beam"
                                : "fa-face-frown"
                            }`}
                          />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-500">
                          {sentiment.sentiment}
                        </h1>
                        <h1 className="text-sm font-medium text-gray-500">
                          Sentiment Score
                        </h1>
                      </div>
                    </div>
                    <div className="col-span-4 place-self-center">
                      <div className="grid grid-cols-1 gap-8 p-4 md:gap-20 ">
                        <div className="flex flex-col items-center justify-center w-full">
                          <h1 className="text-2xl font-bold text-gray-500">
                            {sentiment.sentences}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-500">
                            Response
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
      )}
    </div>
  );
}
