import {
    ICON_PLACE_SELF_CENTER,
    LOADING_ANIMATION,
    PRIMARY_BUTTON,
    TEXT_FIELD
} from "../../assets/styles/input-types-styles";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import React, {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlassChart} from "@fortawesome/free-solid-svg-icons";

<div
    className={`flex flex-col w-full mb-48 bg-white rounded outline outline-2 
            ${
        errorEffect || errorEffectToAnS
            ? `animate-wiggle`
            : "outline-gray-200"
    }`}
    onAnimationEnd={() =>
        setHandlers({
            ...handlers,
            errorEffect: false,
            errorEffectToAnS: false,
        })
    }
>
    <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
        <div className="col-span-2 p-8 bg-gray-50">
            <h1 className="mb-4 text-xl font-bold text-gray-700">
                Reformat CSV File
            </h1>
            <p className="mb-4 text-sm">
                Pick a CSV file to view the headers and select the columns required for the analysis.
            </p>
        </div>
        <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
            <form
                encType={"multipart/form-data"}
                onSubmit={handleSubmitCSVToView}
            >
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col w-full space-y-2">
                        <h1 className="mb-4 text-xl font-bold text-gray-700">
                            Upload CSV File
                        </h1>
                        <h1 className="text-base font-medium text-gray-500">
                            CSV file
                        </h1>
                        <input
                            className={TEXT_FIELD}
                            name="csv_file_to_view"
                            onChange={handleChange}
                            type="file"
                        />
                        <p
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="file_input_help"
                        >
                            The file must be a .csv file.
                        </p>
                    </div>
                </div>
                {/* Error message */}
                {errorMessage ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                        {errorMessage}
                    </div>
                ) : null}
                <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
                    <div className="p-1" />
                    <button
                        className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                        type="submit"
                    >
                        {ok ? LOADING_ANIMATION() : null}
                        {textChange}
                    </button>
                </div>
            </form>
            {show_columns ? (
                <form onSubmit={handleSubmitToAnalyzeAndSave}>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col w-full space-y-2">
                            <h1 className="mb-4 text-xl font-bold text-gray-700">
                                Column Selection
                            </h1>
                        </div>
                        <p className="">
                            Input the number of the column that corresponds to the
                            following:{" "}
                            <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
                                sentence, evaluatee, department and course code.
                            </b>
                        </p>
                        <div className="flex flex-col w-full space-y-2">
                            <h1 className="text-base font-medium text-gray-500">
                                File Name
                            </h1>
                            <input
                                className={TEXT_FIELD}
                                disabled
                                placeholder="File Name"
                                type="text"
                                value={csv_file_name}
                            />
                        </div>
                        <div className="flex flex-col w-full space-y-2">
                            <h1 className="text-base font-medium text-gray-500">
                                Sentence
                            </h1>
                            <Listbox
                                name={"sentence"}
                                onChange={handleSelect(
                                    "selected_column_for_sentence",
                                )}
                            >
                                <div className="relative mt-1">
                                    <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_sentence
                                    ? selected_column_for_sentence
                                    : "Select a column"}
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
                                            {csv_columns_to_pick.map((column) => (
                                                <Listbox.Option
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active
                                                                ? "bg-blue-100 text-blue-900"
                                                                : "text-gray-900"
                                                        }`
                                                    }
                                                    key={column.id}
                                                    value={`${column.id} - ${column.name}`}
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
                                          {`${column.id} - ${column.name}`}
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
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div className="flex flex-col w-full space-y-2">
                            <h1 className="text-base font-medium text-gray-500">
                                Evaluatee
                            </h1>
                            <Listbox
                                name="selected_column_for_evaluatee"
                                onChange={handleSelect(
                                    "selected_column_for_evaluatee",
                                )}
                            >
                                <div className="relative mt-1">
                                    <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_evaluatee
                                    ? selected_column_for_evaluatee
                                    : "Select a column"}
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
                                            {csv_columns_to_pick.map((column) => (
                                                <Listbox.Option
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active
                                                                ? "bg-blue-100 text-blue-900"
                                                                : "text-gray-900"
                                                        }`
                                                    }
                                                    key={column.id}
                                                    value={`${column.id} - ${column.name}`}
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
                                          {`${column.id} - ${column.name}`}
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
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div className="flex flex-col w-full space-y-2">
                            <h1 className="text-base font-medium text-gray-500">
                                Department
                            </h1>
                            <Listbox
                                name="selected_column_for_department"
                                onChange={handleSelect(
                                    "selected_column_for_department",
                                )}
                            >
                                <div className="relative mt-1">
                                    <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_department
                                    ? selected_column_for_department
                                    : "Select a column"}
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
                                            {csv_columns_to_pick.map((column) => (
                                                <Listbox.Option
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active
                                                                ? "bg-blue-100 text-blue-900"
                                                                : "text-gray-900"
                                                        }`
                                                    }
                                                    key={column.id}
                                                    value={`${column.id} - ${column.name}`}
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
                                          {`${column.id} - ${column.name}`}
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
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div className="flex flex-col w-full space-y-2">
                            <h1 className="text-base font-medium text-gray-500">
                                Course Code
                            </h1>
                            <Listbox
                                name="selected_column_for_course_code"
                                onChange={handleSelect(
                                    "selected_column_for_course_code",
                                )}
                            >
                                <div className="relative mt-1">
                                    <Listbox.Button className={TEXT_FIELD}>
                              <span className="block truncate">
                                {selected_column_for_course_code
                                    ? selected_column_for_course_code
                                    : "Select a column"}
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
                                            {csv_columns_to_pick.map((column) => (
                                                <Listbox.Option
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active
                                                                ? "bg-blue-100 text-blue-900"
                                                                : "text-gray-900"
                                                        }`
                                                    }
                                                    key={column.id}
                                                    value={`${column.id} - ${column.name}`}
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
                                          {`${column.id} - ${column.name}`}
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
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>

                    </div>
                    {/* Error message */}
                    {errorMessageToAnS ? (
                        <div className="mt-2 text-sm font-semibold text-red-500">
                            {errorMessageToAnS}
                        </div>
                    ) : null}
                    <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
                        <button
                            className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                            type="submit"
                        >
                            {okToAnS ? (
                                LOADING_ANIMATION()
                            ) : (
                                <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faMagnifyingGlassChart}
                                    size={"lg"}
                                />
                            )}
                            Analyze and Save
                        </button>
                    </div>
                </form>
            ) : null}
        </div>
    </div>
</div>