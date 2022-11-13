import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { TEXT_FIELD } from "../../assets/styles/input-types-styles";
import LoadingPage from "../../components/loading/LoadingPage";
import { getNumberFromString } from "../../helpers/Helper";
import httpClient from "../../http/httpClient";

export default function LeaderboardPerSemesterEmployees() {
  const [topEmployeePerSem, setTopEmployeePerSem] = useState({
    loading: true,
    top_professor_per_sem: {},
    title: "",
    s_y: "",
    page: 1,
    pages_to_choose: {},
    on_page: "",
  });

  const {
    loading,
    top_professor_per_sem,
    title,
    s_y,
    page,
    pages_to_choose,
    on_page,
  } = topEmployeePerSem;

  const getTopEmployeePerSem = (page) => {
    httpClient
      .get(`/data/get-top-professors-by-file/${page}`)
      .then((response) => {
        setTopEmployeePerSem({
          ...topEmployeePerSem,
          loading: false,
          top_professor_per_sem: response.data.top_professor_per_sem,
          title: response.data.question_type,
          s_y: response.data.s_y,
          pages_to_choose: response.data.pages_to_choose,
        });
      });
  };

  const handleSelect = (name) => (value) => {
    setTopEmployeePerSem({
      ...topEmployeePerSem,
      [name]: value,
      page: getNumberFromString(value),
    });
  };

  useEffect(() => {
    getTopEmployeePerSem(page);
  }, [page]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      {loading ? (
        LoadingPage()
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48 lg:h-64">
            <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl lg:text-7xl">
              Sentiment of Professors
            </h1>
          </div>
          {top_professor_per_sem.length > 0 ? (
            <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
              <div className="col-span-1">
                <div className=" place-content-center">
                  <div className="grid w-full h-full grid-cols-1 mb-8 border-4 border-gray-100 border-solid rounded">
                    <div className="items-center justify-center w-full col-span-1 py-5">
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
                  <div className="grid w-full h-full grid-cols-1 p-4 border-4 border-gray-100 border-solid rounded">
                    <div className="flex flex-col w-full space-y-2">
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
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <ChevronUpDownIcon
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-400"
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
                            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {Object.keys(pages_to_choose).map((page) => (
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
                                            className="w-5 h-5"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className=" place-content-center">
                  {Object.keys(top_professor_per_sem).map((professor) => (
                    <div
                      className={`flex flex-col mb-8 w-full bg-white rounded shadow
                                    ${
                                      top_professor_per_sem[professor].id === 0
                                        ? "border-solid border-4 border-yellow-100"
                                        : top_professor_per_sem[professor]
                                            .id === 1
                                        ? "border-solid border-4 border-gray-100"
                                        : top_professor_per_sem[professor]
                                            .id === 2
                                        ? "border-solid border-4 border-orange-100"
                                        : "border-solid border-4 border-blue-100"
                                    }`}
                      key={top_professor_per_sem[professor].id}
                    >
                      <div className="grid w-full h-full grid-cols-1 rounded">
                        <div
                          className={`col-span-1 py-5 items-center justify-center w-full
                                               ${
                                                 top_professor_per_sem[
                                                   professor
                                                 ].id === 0
                                                   ? "bg-yellow-50"
                                                   : top_professor_per_sem[
                                                       professor
                                                     ].id === 1
                                                   ? "bg-gray-50"
                                                   : top_professor_per_sem[
                                                       professor
                                                     ].id === 2
                                                   ? "bg-orange-50"
                                                   : "bg-blue-50"
                                               }`}
                        >
                          <div className="flex flex-col items-center justify-center w-full p-4">
                            <h1 className="text-5xl font-black leading-none tracking-tight text-gray-700">
                              {top_professor_per_sem[professor].professor}
                            </h1>
                          </div>
                        </div>
                        <div className="col-span-4 place-self-center">
                          <div className="grid grid-cols-3 gap-8 py-4 md:grid-cols-4 md:gap-20">
                            <div className="flex flex-col items-center justify-center w-full">
                              <div
                                className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                  top_professor_per_sem[professor].id === 0
                                    ? "bg-yellow-500"
                                    : top_professor_per_sem[professor].id === 1
                                    ? "bg-gray-500"
                                    : top_professor_per_sem[professor].id === 2
                                    ? "bg-orange-500"
                                    : "bg-blue-500"
                                }`}
                              >
                                <i
                                  className={`fas ${
                                    top_professor_per_sem[professor].id === 0
                                      ? "fa-trophy"
                                      : top_professor_per_sem[professor].id ===
                                        1
                                      ? "fa-medal"
                                      : top_professor_per_sem[professor].id ===
                                        2
                                      ? "fa-award"
                                      : "fa-crown"
                                  }`}
                                />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {top_professor_per_sem[professor].id + 1}
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
                                  top_professor_per_sem[professor]
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
                                  top_professor_per_sem[professor]
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
                                  top_professor_per_sem[professor]
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
                                  top_professor_per_sem[professor]
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
                                {top_professor_per_sem[professor].share}
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
