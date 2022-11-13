import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";

export default function LeaderboardPerSemesterDepartment() {
  const [topDepartmentPerSem, setTopDepartmentPerSem] = useState({
    loading: true,
    top_department_per_sem: {},
    title: "",
    s_y: "",
    next_page: "",
    previous_page: "",
    total_pages: "",
    pages_to_choose: {},
    on_page: "",
  });

  const {
    loading,
    top_department_per_sem,
    title,
    s_y,
    next_page,
    previous_page,
    total_pages,
    pages_to_choose,
    on_page,
  } = topDepartmentPerSem;

  const page = useParams();

  const handleSelect = (name) => (value) => {
    setTopDepartmentPerSem({ ...topDepartmentPerSem, [name]: value });
  };

  useEffect(() => {
    httpClient
      .get(`/data/get-top-department-by-file/${page.page}`)
      .then((response) => {
        console.log(response.data);
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          loading: false,
          top_department_per_sem: response.data.top_department_per_sem,
          title: response.data.question_type,
          s_y: response.data.s_y,
          next_page: response.data.next_page,
          previous_page: response.data.previous_page,
          total_pages: response.data.total_pages,
          pages_to_choose: response.data.pages_to_choose,
        });
      });
  }, []);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48 lg:h-64">
            <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl lg:text-7xl">
              Sentiment of Departments
            </h1>
          </div>
          {top_department_per_sem.length > 0 ? (
            <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
              <div className="col-span-1">
                <div className=" place-content-center">
                  <div className="grid w-full h-full mb-8 grid-cols-1 rounded border-solid border-4 border-gray-100">
                    <div className="col-span-1 py-5 items-center justify-center w-full bg-gray-50">
                      <div className="flex flex-col items-center justify-center w-full p-4">
                        <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                          {title}
                        </h1>
                        <h1 className="text-sm font-medium text-gray-500">
                          @{s_y}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" place-content-center">
                  <div className="grid w-full h-full grid-cols-1 rounded border-solid border-4 border-gray-100">
                    <div className=" px-4 py-5 items-center justify-center w-full bg-gray-50">
                      <div className="flex flex-col items-start">
                        <h1 className="text-base font-medium text-gray-500">
                          View by:
                        </h1>
                        <Listbox
                          name={"on_page"}
                          onChange={handleSelect("on_page")}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate text-start">
                                {on_page
                                  ? on_page
                                  : "Select School Year and Semester"}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-400"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {Object.keys(pages_to_choose).map(
                                  (page) => (
                                    console.log(pages_to_choose[page].page),
                                    (
                                      <Listbox.Option
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                              ? "bg-blue-100 text-blue-900"
                                              : "text-gray-900"
                                          }`
                                        }
                                        key={page}
                                        value={`${pages_to_choose[page].page} - ${pages_to_choose[page].school_year} - ${pages_to_choose[page].school_semester}`}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {`${pages_to_choose[page].page} - ${pages_to_choose[page].school_year} - ${pages_to_choose[page].school_semester}`}
                                            </span>
                                            {selected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                <CheckIcon
                                                  aria-hidden="true"
                                                  className="h-5 w-5"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    )
                                  ),
                                )}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className=" place-content-center">
                  {Object.keys(top_department_per_sem).map((department) => (
                    <div
                      className={`flex flex-col mb-8 w-full bg-white rounded shadow
                                    ${
                                      top_department_per_sem[department].id ===
                                      0
                                        ? "border-solid border-4 border-yellow-100"
                                        : top_department_per_sem[department]
                                            .id === 1
                                        ? "border-solid border-4 border-gray-100"
                                        : top_department_per_sem[department]
                                            .id === 2
                                        ? "border-solid border-4 border-orange-100"
                                        : "border-solid border-4 border-blue-100"
                                    }`}
                      key={top_department_per_sem[department].id}
                    >
                      <div className="grid w-full h-full grid-cols-1 rounded">
                        <div
                          className={`col-span-1 py-5 items-center justify-center w-full
                                               ${
                                                 top_department_per_sem[
                                                   department
                                                 ].id === 0
                                                   ? "bg-yellow-50"
                                                   : top_department_per_sem[
                                                       department
                                                     ].id === 1
                                                   ? "bg-gray-50"
                                                   : top_department_per_sem[
                                                       department
                                                     ].id === 2
                                                   ? "bg-orange-50"
                                                   : "bg-blue-50"
                                               }`}
                        >
                          <div className="flex flex-col items-center justify-center w-full p-4">
                            <h1 className="text-5xl font-black leading-none tracking-tight text-gray-700">
                              {top_department_per_sem[department].department}
                            </h1>
                          </div>
                        </div>
                        <div className="col-span-4 place-self-center">
                          <div className="grid grid-cols-3 gap-8 py-4 md:grid-cols-4 md:gap-20">
                            <div className="flex flex-col items-center justify-center w-full">
                              <div
                                className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                  top_department_per_sem[department].id === 0
                                    ? "bg-yellow-500"
                                    : top_department_per_sem[department].id ===
                                      1
                                    ? "bg-gray-500"
                                    : top_department_per_sem[department].id ===
                                      2
                                    ? "bg-orange-500"
                                    : "bg-blue-500"
                                }`}
                              >
                                <i
                                  className={`fas ${
                                    top_department_per_sem[department].id === 0
                                      ? "fa-trophy"
                                      : top_department_per_sem[department]
                                          .id === 1
                                      ? "fa-medal"
                                      : top_department_per_sem[department]
                                          .id === 2
                                      ? "fa-award"
                                      : "fa-crown"
                                  }`}
                                />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {top_department_per_sem[department].id + 1}
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Rank
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-gradient-to-br from-red-500 to-teal-500">
                                <i className="fas fa-masks-theater" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {
                                  top_department_per_sem[department]
                                    .overall_sentiment
                                }
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Overall
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded">
                                <i className="fas fa-face-smile-beam" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {
                                  top_department_per_sem[department]
                                    .positive_sentiments_percentage
                                }
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Positivity Rate
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded">
                                <i className="fas fa-face-frown" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {
                                  top_department_per_sem[department]
                                    .negative_sentiments_percentage
                                }
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Negativity Rate
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-violet-500">
                                <i className="fa-regular fa-comments" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {
                                  top_department_per_sem[department]
                                    .number_of_sentiments
                                }
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Responses
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white bg-black rounded">
                                <i className="fas fa-share-nodes" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {top_department_per_sem[department].share}
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Share
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-40 p-4 border-4 border-red-600 border-double rounded-lg md:h-48 lg:h-64">
              <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-gray-500 md:text-5xl lg:text-7xl">
                No Data Available
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
