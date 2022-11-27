import React from "react";
import {Header} from "../../../../components/headers/Header";

/**
 * @description Handles the admin tables
 */
export default function ManagementFilesUsers() {
  return (
      <div className="px-6 mx-auto max-w-7xl pt-8">
        <Header
            body={
              "Create a new user for the system to view and analyze their sentiment scores."
            }
            title={"User Management"}
        />
      </div>
  );
}
