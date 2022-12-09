import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { TEXT_FIELD } from "../../assets/styles/styled-components";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

export default function Paginator({ per_page, per_page_limit, handleSelect }) {
  Paginator.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    per_page: PropTypes.array.isRequired,
    per_page_limit: PropTypes.number.isRequired,
  };
  return (
    <Listbox name={"per_page_limit"} onChange={handleSelect("per_page_limit")} value={per_page_limit}>
      <div className="relative w-full">
        <Listbox.Button className={`${TEXT_FIELD} bg-white`}>
          <span className="block truncate text-start text-gray-500">
            {per_page_limit}
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
            {per_page.map((file) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                  }`
                }
                key={file.id}
                value={file.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {file.value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
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
  );
}
