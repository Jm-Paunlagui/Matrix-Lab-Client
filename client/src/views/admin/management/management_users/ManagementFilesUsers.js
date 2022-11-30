import React, { useState, useEffect } from "react";
import { Header } from "../../../../components/headers/Header";
import httpClient from "../../../../http/httpClient";
import LoadingPage from "../../../../components/loading/LoadingPage";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  MAIN_BUTTON,
  NoData, STATUS_GREEN, STATUS_RED, STATUS_WARNING,
} from "../../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import DangerConfirmModal from "../../../../components/modal/DangerConfirmModal";
import { toast } from "react-toastify";

/**
 * @description Handles the admin tables
 */
export default function ManagementFilesUsers() {
  const [userDatas, setUserDatas] = useState({
    loading: true,
    users: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page_number: 1,
    total_items: "",
    total_pages: "",
  });

  const {
    loading,
    users,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
  } = userDatas;

  const [filteredListOfUsers, setFilteredListOfUsers] = useState(users);

  const handleSearchForUsers = (event) => {
    const searchValue = event.target.value;
    const filteredList = users.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.department_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfUsers(filteredList);
  };

  const loadListOfUsers = (page) => {
    setUserDatas({
      ...userDatas,
      loading: true,
    });
    httpClient.get(`/data/list-of-users-to-view/${page}`).then((response) => {
      setUserDatas({
        ...userDatas,
        loading: false,
        users: response.data.evaluatees_to_create,
        current_page: response.data.current_page,
        has_next: response.data.has_next,
        has_prev: response.data.has_prev,
        total_items: response.data.total_items,
        total_pages: response.data.total_pages,
      });
      setFilteredListOfUsers(response.data.evaluatees_to_create);
    });
  };

  const handleCreateUser = (id) => {
    httpClient
      .post(`/user/on-click-create/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleLockUser = (id) => {
    httpClient
      .post(`/user/lock-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleUnlockUser = (id) => {
    httpClient
      .post(`/user/unlock-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteUser = (id) => {
    httpClient
      .delete(`/user/delete-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleRestoreUser = (id) => {
    httpClient
      .post(`/user/restore-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    loadListOfUsers(page_number);
  }, [page_number]);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <Header
        body={
          "Create a new user for the system to view and analyze their sentiment scores."
        }
        title={"User Management"}
      />
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForUsers(event)}
            placeholder="Search"
            type="text"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="w-full bg-blue-50 rounded-lg shadow-md p-4 mt-8">
              <div className="content-end flex flex-wrap justify-start w-full gap-2">
                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Mass Actions
                  </h1>
                </div>
                <button
                    className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                    type="button"
                >
                  <FontAwesomeIcon
                      className={`${ICON_PLACE_SELF_CENTER}`}
                      icon={faUserPlus}
                  />
                  Create
                </button>
              </div>
            </div>
            <div className="w-full bg-blue-50 rounded-lg shadow-md p-4 mt-8">
              <div className="content-end flex flex-wrap justify-start w-full gap-2">
                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Mass Danger Actions
                  </h1>
                </div>
                <DangerConfirmModal
                    body={`Are you sure you want to restore the authorization of  to the system?`}
                    description="This action cannot be undone. The user you are trying to Reauthorized access will be able to access the system to view their sentiment scores."

                    title="Restore Authorization"
                    type_of_modal="unlock"
                />

                <DangerConfirmModal
                    body={`Are you sure you want to remove the authorization of  to the system?`}
                    description="This action cannot be undone. The user you are trying to restrict access will be unable to access the system to view their sentiment scores."


                    title="Remove Authorization"
                    type_of_modal="lock"
                />


                <DangerConfirmModal
                    body={`Are you sure you want to restore the account of  to the system?`}
                    description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."

                    title="Restore Account"
                    type_of_modal="restore"
                />

                <DangerConfirmModal
                    body={`Are you sure you want to delete  from the system?`}
                    description="This action cannot be undone. This will permanently delete the users account from the system."

                    title="Delete User Confirmation"
                    type_of_modal="delete"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-4">
            <h1 className="text-start font-medium text-blue-500">
              Page {current_page} of {total_pages}
            </h1>
          </div>
          {filteredListOfUsers.length > 0 ? (
            <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
              {filteredListOfUsers.map((user) => (
                <div
                  className="flex flex-col mb-4 w-full bg-blue-50 rounded-lg shadow-md"
                  key={user.id}
                >
                  <div className="col-span-1 w-full">
                    <div className="flex flex-row w-full p-4">
                      <h1 className="text-md font-bold leading-none text-blue-500">
                        {user.full_name}
                      </h1>
                    </div>
                  </div>
                  <hr className="w-full border-gray-300" />
                  <div className="col-span-4 text-start p-4">
                    <div className="flex flex-row w-full py-2">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Status
                      </h1>
                    </div>
                    <div className="content-end flex flex-wrap justify-start w-full gap-2">
                      <div className={`p-2 flex flex-row justify-center ${
                        user.is_active ? STATUS_GREEN : STATUS_WARNING
                      }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {user.is_active ? "Activated" : "Deactivated"}
                        </h1>
                      </div>
                      <div className={`p-2 flex flex-row justify-center ${
                        user.is_locked ? STATUS_RED : STATUS_GREEN
                      }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {user.is_locked ? "Locked" : "Unlocked"}
                        </h1>
                      </div>
                      <div className={`p-2 flex flex-row justify-center ${
                        user.is_deleted ? STATUS_RED : STATUS_GREEN
                      }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {user.is_deleted ? "Deleted" : "Not Deleted"}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-row w-full py-2">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Details
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        Username:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-600">
                        {user.username}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        Role:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-500">
                        {user.role}
                      </h1>
                    </div>
                    <div className="flex flex-row items-start w-full py-2">
                      <h1 className="text-base font-medium leading-none text-gray-500">
                        Department:
                      </h1>
                      <h1 className="ml-2 text-base leading-none text-gray-500">
                        {user.department_name}
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-1 w-full">
                    <div className="flex flex-row w-full px-4">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        General
                      </h1>
                    </div>
                    <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                      <button
                        className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                        onClick={() => handleCreateUser(user.id)}
                        type="button"
                      >
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faUserPlus}
                        />
                        Create
                      </button>
                    </div>
                    <div className="flex flex-row w-full px-4">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Danger Zone
                      </h1>
                    </div>
                    <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                      {user.is_locked ? (
                        <DangerConfirmModal
                          body={`Are you sure you want to restore the authorization of ${user.full_name} to the system?`}
                          description="This action cannot be undone. The user you are trying to Reauthorized access will be able to access the system to view their sentiment scores."
                          id={user.id}
                          onConfirm={handleUnlockUser}
                          title="Restore Authorization"
                          type_of_modal="unlock"
                        />
                      ) : (
                        <DangerConfirmModal
                          body={`Are you sure you want to remove the authorization of ${user.full_name} to the system?`}
                          description="This action cannot be undone. The user you are trying to restrict access will be unable to access the system to view their sentiment scores."
                          id={user.id}
                          onConfirm={handleLockUser}
                          title="Remove Authorization"
                          type_of_modal="lock"
                        />
                      )}
                        {user.is_deleted ? (
                            <DangerConfirmModal
                                body={`Are you sure you want to restore the account of ${user.full_name} to the system?`}
                                description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."
                                id={user.id}
                                onConfirm={handleRestoreUser}
                                title="Restore Account"
                                type_of_modal="restore"
                            />
                        ) : (
                            <DangerConfirmModal
                                body={`Are you sure you want to delete ${user.full_name} from the system?`}
                                description="This action cannot be undone. This will permanently delete the users account from the system."
                                id={user.id}
                                onConfirm={handleDeleteUser}
                                title="Delete User Confirmation"
                                type_of_modal="delete"
                            />
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={"pb-8"}>{new NoData("No User/s Found")}</div>
          )}
          <div className="pb-16 flex flex-col space-y-2 justify-end w-full lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex flex-row items-center justify-center w-full lg:w-1/2">
              {/*    Page details*/}
              <div className="flex flex-row items-center justify-center w-full">
                <h1 className="text-base font-medium leading-none t text-blue-500">
                  Showing {users.length} of {total_items} Users in total (
                  {total_pages} pages)
                </h1>
              </div>
            </div>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_prev ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_prev}
              onClick={() =>
                setUserDatas({ ...userDatas, page_number: page_number - 1 })
              }
              type="button"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCaretLeft}
              />
              Previous
            </button>
            <button
              className={`px-8 py-1 flex flex-row justify-center ${MAIN_BUTTON}
                  ${has_next ? "" : "cursor-not-allowed opacity-50"}`}
              disabled={!has_next}
              onClick={() =>
                setUserDatas({ ...userDatas, page_number: page_number + 1 })
              }
              type="button"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCaretRight}
              />
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
