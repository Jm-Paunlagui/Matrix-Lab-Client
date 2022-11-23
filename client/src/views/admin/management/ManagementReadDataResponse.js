import React, { useState, useEffect } from "react";
import {
  DEFAULT_BUTTON,
  Header,
  ICON_PLACE_SELF_CENTER,
} from "../../../assets/styles/input-types-styles";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toReadableName } from "../../../helpers/Helper";
import httpClient from "../../../http/httpClient";

export default function ManagementReadDataResponse() {
  const { fileId, read_responses, file_name } = useParams();

  const [readDataResponse, setReadDataResponse] = useState({
    loading: true,
    sentiments_list: [],
  });

  const { loading, sentiments_list } = readDataResponse;

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
      <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
        <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
          <button className={`text-left ${DEFAULT_BUTTON}`} type={"button"}>
            <Link to={`/admin/management/files/${fileId}/${read_responses}`}>
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
    </div>
  );
}
