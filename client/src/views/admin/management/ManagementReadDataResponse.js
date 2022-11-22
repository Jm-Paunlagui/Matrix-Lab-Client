import React from "react";
import {Link, useParams} from "react-router-dom";
import {DEFAULT_BUTTON, Header, ICON_PLACE_SELF_CENTER} from "../../../assets/styles/input-types-styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function ManagementReadDataResponse() {
    const {fileId, read_responses} = useParams();

    const toReadableName = (name) => {
        return name.replace(/_/g, " ");
    };
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
          <Header
              body={"View the responses of the file below. You can also download the responses as a CSV file."}
              title={`${toReadableName(read_responses)}`}
          />
      </div>
  );
}