import React, { useState, useEffect } from "react";
import { Header } from "../../../../components/headers/Header";
import httpClient from "../../../../http/httpClient";
import LoadingPage from "../../../../components/loading/LoadingPage";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import {
  ICON_PLACE_SELF_CENTER,
  MAIN_BUTTON,
  STATUS_GREEN,
  STATUS_RED,
  STATUS_WARNING,
} from "../../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCaretLeft,
  faCaretRight,
  faCircleXmark,
  faLock,
  faRotate, faTrash,
  faUnlock
} from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "../../../../components/modal/ModalConfirm";
import { toast } from "react-toastify";
import Paginator from "../../../../components/paginator/Paginator";
import {NoData} from "../../../../components/warnings/WarningMessages";
import {LoadingAnimation} from "../../../../components/loading/LoadingPage";

/**
 * @description Handles the admin tables
 */
export default function ManagementFilesUsers() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

  const [userDatas, setUserDatas] = useState({
    loading: true,
    users: [],
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
    users,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
    per_page_limit,
  } = userDatas;

  const [filteredListOfUsers, setFilteredListOfUsers] = useState(users);

  const [loadingAnimation, setLoadingAnimation] = useState({
    massActivation: false,
    textChangeActivation: "Activate all",
    massDeactivation: false,
    textChangeDeactivation: "Deactivate all",
    massUnlocked: false,
    textChangeUnlocked: "Unlock all",
    massLocked: false,
    textChangeLocked: "Lock all",
    massRestore: false,
    textChangeRestore: "Restore all",
    massDelete: false,
    textChangeDelete: "Delete all",
  });

  const {
    massActivation,
    textChangeActivation,
    massDeactivation,
    textChangeDeactivation,
    massUnlocked,
    textChangeUnlocked,
    massLocked,
    textChangeLocked,
    massRestore,
    textChangeRestore,
    massDelete,
    textChangeDelete,
  } = loadingAnimation;

  const handleSelect = (name) => (value) => {
    setUserDatas({
      ...userDatas,
      [name]: value,
    });
  };

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

  const loadListOfUsers = (page, per_page_limit) => {
    setUserDatas({
      ...userDatas,
      loading: true,
    });
    httpClient
      .get(`/data/list-of-users-to-view/${page}/${per_page_limit}`)
      .then((response) => {
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
        loadListOfUsers(page_number, per_page_limit);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeactivateUser = async (id) => {
    await httpClient
      .post(`/user/on-click-deactivate/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleLockUser = async (id) => {
    await httpClient
      .post(`/user/lock-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleUnlockUser = async (id) => {
    await httpClient
      .post(`/user/unlock-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteUser = async (id) => {
    await httpClient
      .delete(`/user/delete-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleRestoreUser = async (id) => {
    await httpClient
      .post(`/user/restore-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateAllUsers = async () => {
    setLoadingAnimation({
      ...loadingAnimation,
      massActivation: true,
      textChangeActivation: "Activating...",
    });
    await httpClient
      .post(`/user/mass-create-all`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        setLoadingAnimation({
          ...loadingAnimation,
          massActivation: false,
          textChangeActivation: "Activate all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingAnimation({
          ...loadingAnimation,
          massActivation: false,
          textChangeActivation: "Activate all",
        });
      });
  };

  const handleDeactivateAllUsers = async () => {
    setLoadingAnimation({
      ...loadingAnimation,
      massDeactivation: true,
      textChangeDeactivation: "Deactivating...",
    });
    await httpClient
      .post(`/user/mass-deactivate-all`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        setLoadingAnimation({
          ...loadingAnimation,
          massDeactivation: false,
          textChangeDeactivation: "Deactivate all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingAnimation({
          ...loadingAnimation,
          massDeactivation: false,
          textChangeDeactivation: "Deactivate all",
        });
      });
  };

  const handleLockAllUsers = async () => {
    setLoadingAnimation({
      ...loadingAnimation,
      massLocked: true,
      textChangeLocked: "Locking...",
    });
    await httpClient
      .post(`/user/mass-lock-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        setLoadingAnimation({
          ...loadingAnimation,
          massLocked: false,
          textChangeLocked: "Lock all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingAnimation({
          ...loadingAnimation,
          massLocked: false,
          textChangeLocked: "Lock all",
        });
      });
  };

  const handleUnlockAllUsers = async () => {
    setLoadingAnimation({
      ...loadingAnimation,
      massUnlocked: true,
      textChangeUnlocked: "Unlocking...",
    });
    await httpClient
      .post(`/user/mass-unlock-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        setLoadingAnimation({
          ...loadingAnimation,
          massUnlocked: false,
          textChangeUnlocked: "Unlock all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingAnimation({
          ...loadingAnimation,
          massUnlocked: false,
          textChangeUnlocked: "Unlock all",
        });
      });
  };

  const handleDeleteAllUsers = async () => {
    setLoadingAnimation({
      ...loadingAnimation,
      massDelete: true,
      textChangeDelete: "Deleting...",
    });
    await httpClient
      .delete(`/user/mass-delete-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        setLoadingAnimation({
          ...loadingAnimation,
          massDelete: false,
          textChangeDelete: "Delete all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingAnimation({
          ...loadingAnimation,
          massDelete: false,
          textChangeDelete: "Delete all",
        });
      });
  };

  const handleRestoreAllUsers = async () => {
    setLoadingAnimation({
      ...loadingAnimation,
      massRestore: true,
      textChangeRestore: "Restoring...",
    });
    await httpClient
      .post(`/user/mass-restore-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        setLoadingAnimation({
          ...loadingAnimation,
          massRestore: false,
          textChangeRestore: "Restore all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingAnimation({
          ...loadingAnimation,
          massRestore: false,
          textChangeRestore: "Restore all",
        });
      });
  };

  useEffect(() => {
    loadListOfUsers(page_number, per_page_limit);
  }, [page_number, per_page_limit]);

  return (
    <div className="px-6 mx-auto mt-8 max-w-7xl">
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
            <div className="w-full p-4 mt-8 rounded-lg shadow-md bg-blue-50">
              <div className="flex flex-wrap content-end justify-start w-full gap-2">
                <div className="flex flex-wrap content-end justify-start w-full gap-2">
                  <div className="flex flex-row w-full">
                    <h1 className="text-base font-bold leading-none text-blue-500">
                      Number of records per page
                    </h1>
                  </div>
                  <Paginator
                    handleSelect={handleSelect}
                    per_page={per_page}
                    per_page_limit={per_page_limit}
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-4 mt-8 rounded-lg shadow-md bg-blue-50">
              <div className="flex flex-wrap content-end justify-start w-full gap-2">
                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Mass Actions
                  </h1>
                </div>
                <ModalConfirm
                    body={`Are you sure you want to Activate all users in the system?`}
                    description="This action cannot be undone. All users will able to access the system to view their sentiment scores. This action will also send an email to all users to notify them that their account has been activated."
                    is_manny
                    onConfirm={() => handleCreateAllUsers()}
                    textChange={textChangeActivation}
                    title="Activate All Users"
                >
                  {massActivation ? (
                      <>
                        <LoadingAnimation
                            moreClasses="text-red-600"
                        />
                        {textChangeActivation}
                      </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faBolt}
                        />
                        {textChangeActivation}
                      </>
                  )}
                </ModalConfirm>
                <ModalConfirm
                    body={`Are you sure you want to restore all users authorization to the system?`}
                    description="This action cannot be undone. The user you are trying to Reauthorized access will be able to access the system to view their sentiment scores."
                    is_manny
                    onConfirm={() => handleUnlockAllUsers()}
                    textChange={textChangeUnlocked}
                    title="Restore Authorization"
                >
                  {massUnlocked ? (
                      <>
                        <LoadingAnimation
                            moreClasses="text-teal-600"
                        />
                        {textChangeUnlocked}
                      </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faUnlock}
                        />
                        {textChangeUnlocked}
                      </>
                  )}
                </ModalConfirm>
                <ModalConfirm
                    body={`Are you sure you want to restore all users account to the system?`}
                    description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."
                    is_manny
                    onConfirm={() => handleRestoreAllUsers()}
                    textChange={textChangeRestore}
                    title="Restore Account"
                    type_of_modal="restore"
                >
                  {massRestore ? (
                      <>
                        <LoadingAnimation
                            moreClasses="text-teal-600"
                        />
                        {textChangeRestore}
                      </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faRotate}
                        />
                        {textChangeRestore}
                      </>
                  )}
                </ModalConfirm>

                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Mass Danger Actions
                  </h1>
                </div>
                <ModalConfirm
                  body={`Are you sure you want to deactivate all users?`}
                  description="This action cannot be undone. The users you are trying to Deactivate will not be able to login to the system to view their sentiment scores."
                  is_danger
                  is_manny
                  onConfirm={() => handleDeactivateAllUsers()}
                  textChange={textChangeDeactivation}
                  title="Deactivate all users"
                >
                  {massDeactivation ? (
                      <>
                        <LoadingAnimation
                            moreClasses="text-red-600"
                        />
                        {textChangeDeactivation}
                      </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faCircleXmark}
                        />
                        {textChangeDeactivation}
                      </>
                  )}
                </ModalConfirm>
                <ModalConfirm
                  body={`Are you sure you want to remove all users authorization to the system?`}
                  description="This action cannot be undone. The user you are trying to restrict access will be unable to access the system to view their sentiment scores."
                  is_danger
                  is_manny
                  onConfirm={() => handleLockAllUsers()}
                  textChange={textChangeLocked}
                  title="Remove Authorization"
                >
                  {massLocked ? (
                      <>
                        <LoadingAnimation
                            moreClasses="text-red-600"
                        />
                        {textChangeLocked}
                      </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faLock}
                        />
                        {textChangeLocked}
                      </>
                  )}
                </ModalConfirm>
                <ModalConfirm
                  body={`Are you sure you want to temporarily delete all users account to the system?`}
                  description="This action cannot be undone. This will temporarily delete the users account from the system."
                  is_danger
                  is_manny
                  onConfirm={() => handleDeleteAllUsers()}
                  textChange={textChangeDelete}
                  title="Delete User Confirmation"
                  type_of_modal="delete"
                >
                    {massDelete ? (
                        <>
                            <LoadingAnimation
                                moreClasses="text-red-600"
                            />
                            {textChangeDelete}
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faTrash}
                            />
                            {textChangeDelete}
                        </>
                    )}
                </ModalConfirm>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-4">
            <h1 className="font-medium text-blue-500 text-start">
              Page {current_page} of {total_pages}
            </h1>
          </div>
          {filteredListOfUsers.length > 0 ? (
            <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
              {filteredListOfUsers.map((user) => (
                <div
                  className="flex flex-col w-full mb-4 rounded-lg shadow-md bg-blue-50"
                  key={user.id}
                >
                  <div className="w-full col-span-1">
                    <div className="flex flex-row w-full p-4">
                      <h1 className="font-bold leading-none text-blue-500 text-md">
                        {user.full_name}
                      </h1>
                    </div>
                  </div>
                  <hr className="w-full border-gray-300" />
                  <div className="col-span-4 p-4 text-start">
                    <div className="flex flex-row w-full py-2">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Status
                      </h1>
                    </div>
                    <div className="flex flex-wrap content-end justify-start w-full gap-2">
                      <div
                        className={`p-2 flex flex-row justify-center ${
                          user.is_active ? STATUS_GREEN : STATUS_WARNING
                        }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {user.is_active ? "Activated" : "Deactivated"}
                        </h1>
                      </div>
                      <div
                        className={`p-2 flex flex-row justify-center ${
                          user.is_locked ? STATUS_RED : STATUS_GREEN
                        }`}
                      >
                        <h1 className="text-sm leading-none uppercase">
                          {user.is_locked ? "Locked" : "Unlocked"}
                        </h1>
                      </div>
                      <div
                        className={`p-2 flex flex-row justify-center ${
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
                  <div className="w-full col-span-1">
                    <div className="flex flex-row w-full px-4">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        General
                      </h1>
                    </div>
                    <div className="flex flex-wrap content-end justify-start w-full gap-2 p-4">
                      <ModalConfirm
                        body={`Are you sure you want to Activate the user account of ${user.full_name}?`}
                        description="This action cannot be undone. The user you are trying to Activate will be able to access the system to view their sentiment scores."
                        id={user.id}
                        is_many={false}
                        onConfirm={handleCreateUser}
                        title="Activate User Account"
                      >
                        <>
                            <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faBolt}
                            />
                            Activate
                        </>
                      </ModalConfirm>
                      <ModalConfirm
                          body={`Are you sure you want to unlock the user account of ${user.full_name}?`}
                          description="This action cannot be undone. The user you are trying to unlock will be able to access the system to view their sentiment scores."
                          id={user.id}
                          is_many={false}
                          onConfirm={handleUnlockUser}
                          title="Unlock User Account"
                      >
                        <>
                          <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faUnlock}
                          />
                          Unlock
                        </>
                      </ModalConfirm>
                      <ModalConfirm
                          body={`Are you sure you want to restore the account of ${user.full_name} to the system?`}
                          description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."
                          id={user.id}
                          is_many={false}
                          onConfirm={handleRestoreUser}
                          title="Restore User Account"
                      >
                        <>
                          <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faRotate}
                          />
                          Restore
                        </>
                      </ModalConfirm>
                    </div>
                    <div className="flex flex-row w-full px-4">
                      <h1 className="text-base font-bold leading-none text-blue-500">
                        Danger Zone
                      </h1>
                    </div>
                    <div className="flex flex-wrap content-end justify-start w-full gap-2 p-4">
                      <ModalConfirm
                        body={`Are you sure you want to deactivate the user account of ${user.full_name}?`}
                        description="This action cannot be undone. The user you are trying to deactivate will be unable to access the system to view their sentiment scores."
                        id={user.id}
                        is_danger
                        is_many={false}
                        onConfirm={handleDeactivateUser}
                        title="Deactivate User Account"
                      >
                        <>
                          <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faCircleXmark}
                          />
                            Deactivate
                        </>
                      </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to lock the user account of ${user.full_name}?`}
                          description="This action cannot be undone. The user you are trying to lock will be unable to access the system to view their sentiment scores."
                          id={user.id}
                          is_danger
                          is_many={false}
                          onConfirm={handleLockUser}
                          title="Lock User Account"
                        >
                            <>
                                <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faLock}
                                />
                                Lock
                            </>
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to delete ${user.full_name} from the system?`}
                          description="This action cannot be undone. This will permanently delete the users account from the system."
                          id={user.id}
                          is_danger
                          is_many={false}
                          onConfirm={handleDeleteUser}
                          title="Delete User Account"
                        >
                            <>
                                <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faTrash}
                                />
                                Delete
                            </>
                        </ModalConfirm>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={"pb-8"}>
              <NoData
                  message="Data Unavailable"
              />
            </div>
          )}
          <div className="flex flex-col justify-end w-full pb-16 space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex flex-row items-center justify-center w-full lg:w-1/2">
              {/*    Page details*/}
              <div className="flex flex-row items-center justify-center w-full">
                <h1 className="text-base font-medium leading-none text-blue-500 t">
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
