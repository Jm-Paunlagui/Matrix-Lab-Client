import AboutUs from "../assets/img/aboutus.svg";
import { Icon } from "@iconify/react";
import React from "react";

/**
 * @description Json array of the about us page
 */
const AboutUsDetails = [
  {
    name: "John Moises Paunlagui",
    title: "Deep Learning Engineer, Web Developer",
    description:
      "John is a deep learning engineer and data scientist who is passionate about building and deploying intelligent systems. He is currently working at Google as a Data Scientist and Web Developer.",
    image:
      "https://s.gravatar.com/avatar/24dd27ffab5c8b19a4414f8ab6217fae?s=600",
    social: {
      github: "https://github.com/Jm-Paunlagui",
      linkedin: "https://www.linkedin.com/in/john-moises-paunlagui-2b6b31186",
      twitter: "https://twitter.com/itsJm51",
      facebook: "https://www.facebook.com/JmPaunlagui",
      instagram: "https://www.instagram.com/jmpaunlagui/",
    },
  },
  {
    name: "Rysel Pelipada",
    title: "Chef, Financial Expert",
    description:
      "Rysel is the chief money laundere of the group and also contributes as a chef that cooks bespoke instant noodle recipes for the group. He is also a finance expert and a financial advisor to the group.",
    image: "",
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  },
  {
    name: "Dwight Torres",
    title: "",
    description: "",
    image: "",
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  },
  {
    name: "Nathanael Bueno",
    title: "",
    description: "",
    image: "",
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  },
];

/**
 * @type {Array}
 * @description Json array of the technologies used in the application
 */
const Technologies = [
  {
    name: "Node.js",
    version: "16.17.0",
    color: "#24292e",
    logo: "logos:nodejs",
    link: "https://nodejs.org/en/",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
  },
  {
    name: "React",
    version: "^18.2.0",
    color: "#61dafb",
    logo: "logos:react",
    link: "https://reactjs.org/",
    description:
      "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.",
  },
  {
    name: "Axios",
    version: "^0.27.2",
    color: "#61dafb",
    logo: "logos:axios",
    link: "https://www.axios.com/",
    description:
      "Axios is a Promise based HTTP client for the browser and node.js. Axios is a Promise based HTTP client for the browser and node.js. Axios is a Promise based HTTP client for the browser and node.js.",
  },
  {
    name: "React-Router-Dom",
    version: "^6.3.0",
    color: "#61dafb",
    logo: "logos:react-router",
    link: "https://reacttraining.com/react-router/web/guides/quick-start",
    description:
      "React Router is a routing library for React. It is used to make single-page applications with the minimal effort required.",
  },
  {
    name: "React-Icons",
    version: "^4.4.0",
    color: "#61dafb",
    logo: "logos:react",
    link: "https://react-icons.netlify.com/",
    description:
      "React Icons is a collection of icons for React. It is used to make single-page applications with the minimal effort required.",
  },
  {
    name: "TailwindCSS",
    version: "^3.1.8",
    color: "#61dafb",
    logo: "logos:tailwindcss-icon",
    link: "https://tailwindcss.com/",
    description:
      "TailwindCSS is a utility-first CSS framework for quickly building custom, high-fidelity, fully responsive designs with minimal effort.",
  },
  {
    name: "Postcss",
    version: "^8.4.16",
    color: "#61dafb",
    logo: "logos:postcss",
    link: "https://postcss.org/",
    description:
      "PostCSS is a tool for transforming CSS with JavaScript plugins and extending CSS syntax.",
  },
  {
    name: "Headlessui",
    version: "^1.6.6",
    color: "#61dafb",
    logo: "logos:headlessui",
    link: "https://headlessui.com/",
    description:
      "Headlessui is a collection of components and utilities for React that help you build beautiful, performant, and accessible user interfaces.",
  },
  {
    name: "Font Awesome",
    version: "6.2.0",
    color: "#61dafb",
    logo: "logos:font-awesome",
    link: "https://fontawesome.com/",
    description:
      "Font Awesome is a community of developers and designers who create and maintain free and open source icons.",
  },
  {
    name: "React Toastify",
    version: "^9.0.8",
    color: "#61dafb",
    logo: "logos:react",
    link: "https://react-toastify.js.org/",
    description:
      "React Toastify is a library for React that makes it easy to display toast messages.",
  },
  {
    name: "Google Fonts",
    version: "^2.0.0",
    color: "#1A73E8",
    logo: "simple-icons:googlefonts",
    link: "https://fonts.google.com/",
    description:
      "Google Fonts is a webfont service that allows you to select from over 1,000 web fonts.",
  },
  {
    name: "Iconify",
    version: "^3.2.2",
    color: "#000000",
    logo: "simple-icons:iconify",
    link: "https://iconify.design/",
    description:
      "Iconify is a free, open-source icon library that lets you easily create beautiful icons and vector graphics.",
  },
  {
    name: "Jwt-decode",
    version: "^3.1.2",
    color: "#000000",
    logo: "logos:jwt-icon",
    link: "https://www.npmjs.com/package/jwt-decode",
    description:
      "JWT Decode is a JavaScript library that decodes JWT tokens into an object.",
  },
  {
    name: "JavaScript",
    version: "ES6",
    color: "#000000",
    logo: "logos:javascript",
    link: "https://www.javascript.com/",
    description:
      "JavaScript is a high-level, dynamic, untyped, and interpreted programming language. It is often characterized by first-class functions, dynamic typing, and automatic garbage collection.",
  },
  {
    name: "Python",
    version: "3.10.5",
    color: "#000000",
    logo: "logos:python",
    link: "https://www.python.org/",
    description:
      "Python is a programming language that lets you work quickly and integrate systems more effectively. Python is easy to learn and has a large body of libraries and tools that let you create your own applications.",
  },
  {
    name: "TensorFlow",
    version: "2.9.1",
    color: "#61dafb",
    logo: "logos:tensorflow",
    link: "https://www.tensorflow.org/",
    description:
      "TensorFlow is an open source machine learning platform for everyone. It is used to build and train neural networks.",
  },
  {
    name: "Keras",
    version: "2.9.0",
    color: "#d00000",
    logo: "simple-icons:keras",
    link: "https://keras.io/",
    description:
      "Keras is a high-level neural network library for the Python programming language. ",
  },
  {
    name: "Flask",
    version: "2.1.2",
    color: "#61dafb",
    logo: "logos:flask",
    link: "https://flask.palletsprojects.com/en/1.1.x/",
    description:
      "Flask is a microframework for Python based on Werkzeug and Jinja2. It is designed to be as simple as possible while still being powerful enough to be useful.",
  },
  {
    name: "MariaDB",
    version: "10.4.24",
    color: "#61dafb",
    logo: "logos:mariadb-icon",
    link: "https://mariadb.org/",
    description:
      "MariaDB is a free and open-source relational database management system (RDBMS) based on the MySQL server. ",
  },
  {
    name: "MySQL",
    version: "5.0.37",
    color: "#61dafb",
    logo: "logos:mysql-icon",
    link: "https://www.mysql.com/",
    description:
      "MySQL is a relational database management system (RDBMS) that is used to create, manage, and administer databases.",
  },
  {
    name: "phpMyAdmin",
    version: "5.2.0",
    color: "#F89C0E",
    logo: "simple-icons:phpmyadmin",
    link: "https://www.phpmyadmin.net/",
    description:
      "phpMyAdmin is a free software web application for MySQL and MariaDB. It is a fully featured, easy to use, and fully standards-compliant web based MySQL database management system (DBMS) with a focus on ease of use and user friendlyness.",
  },
  {
    name: "Visual Studio Code",
    version: "1.70.2",
    color: "#61dafb",
    logo: "logos:visual-studio-code",
    link: "https://code.visualstudio.com/",
    description:
      "Visual Studio Code is a free and open-source code editor for the Microsoft Windows platform. ",
  },
  {
    name: "PyCharm Professional Edition",
    version: "2022.2.1",
    color: "#61dafb",
    logo: "logos:pycharm",
    link: "https://www.jetbrains.com/pycharm/",
    description:
      "PyCharm is a free and open-source IDE for the Python programming language. ",
  },
  {
    name: "XAMPP",
    version: "8.1.6",
    color: "#61dafb",
    logo: "logos:xampp",
    link: "https://www.apachefriends.org/en/xampp.html",
    description:
      "XAMPP is a free web server software package that allows you to develop and test your web applications without installing any software on your computer.",
  },
  {
    name: "Git",
    version: "2.37.3",
    color: "#61dafb",
    logo: "logos:git",
    link: "https://git-scm.com/",
    description:
      "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. ",
  },
  {
    name: "GitHub",
    version: "",
    color: "#61dafb",
    logo: "logos:github-icon",
    link: "https://github.com/",
    description:
      "GitHub is a web-based hosting service for version control using Git.",
  },
  {
    name: "Visual Studio 2022 Desktop Development with C++",
    version: "17.3.3",
    color: "#AA7CDF",
    logo: "simple-icons:visualstudio",
    link: "https://www.microsoft.com/en-us/download/details.aspx?id=50000",
    description:
      "Visual Studio is a free and open-source software development platform designed to make it easier to create, manage, and share software projects. ",
  },
  {
    name: "Github Copilot",
    version: "",
    color: "#61dafb",
    logo: "logos:github-copilot",
    link: "https://github.com/features/copilot",
    description:
      "GitHub Copilot is a AI-powered software development platform that helps developers build software faster and with less effort, supported on many Text Editors and IDEs.",
  },
  {
    name: "Postman",
    version: "9.30.1",
    color: "#61dafb",
    logo: "logos:postman-icon",
    link: "https://www.getpostman.com/",
    description:
      "Postman is a web application that allows you to create and manage RESTful APIs in a single place and share them with anyone.",
  },
  {
    name: "CUDA",
    version: "11.7.1",
    color: "#61dafb",
    logo: "logos:nvidia",
    link: "https://developer.nvidia.com/cuda-toolkit",
    description:
      "CUDA is a parallel computing platform and runtime library developed by NVIDIA to accelerate computing in general and deep learning in particular.",
  },
  {
    name: "cuDNN",
    version: "8.4.1",
    color: "#61dafb",
    logo: "logos:nvidia",
    link: "https://developer.nvidia.com/cudnn",
    description:
      "cuDNN is a library that provides high-performance, memory-efficient convolutional neural network libraries, accelerates the performance of deep neural networks.",
  },
];

/**
 * @description The about page component
 */
function AboutUS() {
  return (
    <>
      <div className="grid flex-col items-center max-w-screen-xl min-h-screen px-4 mx-auto lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat pt-28">
        <div className="place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl xl:text-6xl">
            About Us
          </h1>
          <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            A group of Computer Science students who are passionate about
            documenting, building and deploying deep learning systems. The
            Creators are currently studying at the City College of Calamba and
            looking forward to finish their studies and work in the field of
            deep learning and data science.
          </p>
        </div>
        <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
          <img src={AboutUs} alt="mockup" />
        </div>
      </div>
      <hr />
      <div className="items-center w-full h-full min-h-screen font-Montserrat">
        <div className="mx-auto text-gray-200 max-w-7xl sm:px-6 lg:px-8 font-Montserrat justify-items-center">
          <h1 className="py-16 text-4xl font-extrabold leading-none tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl xl:text-6xl">
            Creators of Matrix Lab
          </h1>
          <div className="flex flex-wrap justify-center mb-44 items-top">
            {AboutUsDetails.map((aboutUs) => (
              <div
                key={aboutUs.name}
                className="w-full p-2 md:w-1/2 lg:w-6/12 place-content-center"
              >
                <div className="justify-center w-full h-32 p-1 mb-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-t-xl" />
                <div className="flex flex-col w-full min-w-0 break-words bg-white border-0 shadow-lg rounded-b-xl place-items-center">
                  {aboutUs.image ? (
                    <img
                      src={aboutUs.image}
                      alt={aboutUs.name}
                      className="w-48 h-48 -mt-20 shadow-xl rounded-xl"
                    />
                  ) : (
                    <div className="justify-center w-48 h-48 p-1 mb-0 -mt-20 bg-gradient-to-br from-white to-sky-500 rounded-xl" />
                  )}
                  <div className="container p-4 text-center text-stone-700">
                    <h1 className="mt-2 text-xl font-bold tracking-widest md:text-lg lg:text-2xl lg:mt-4">
                      {aboutUs.name}
                    </h1>
                    <h2 className="font-medium text-md md:text-base">
                      {aboutUs.title ? aboutUs.title : <div className="h-6" />}
                    </h2>

                    <div className="flex justify-center mt-4">
                      {Object.keys(aboutUs.social).map((social) => (
                        <div key={social} className="flex items-center">
                          {aboutUs.social[social] !== "" ? (
                            <div className="flex items-center justify-center w-12 h-12">
                              <a
                                href={aboutUs.social[social]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 hover:text-indigo-700"
                              >
                                <i
                                  className={`fab fa-${
                                    social ?? ""
                                  } text-3xl transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110`}
                                >
                                  {" "}
                                </i>
                              </a>
                            </div>
                          ) : (
                            <div className="w-12 h-12" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <h1 className="py-16 text-4xl font-extrabold leading-none tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl xl:text-6xl">
            Technologies used in Matrix Lab
          </h1>
          <p className="px-8 mx-auto mb-8 text-sm font-medium text-justify text-gray-500 max-w-7xl place-self-center lg:mb-16 md:text-base">
            The following technologies and tools are used in the development of
            the Matrix Lab website, starting from the frontend to the backend as
            well as its deep learning model. We are using the latest
            technologies to ensure that the website is fast, secure and
            reliable. We are also using the latest deep learning technologies to
            ensure that the deep learning model is fast, accurate and reliable.
          </p>
          {/* Grid layout */}
          <div className="flex flex-wrap justify-center items-top">
            <div className="grid grid-cols-1 gap-1 mb-24 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {Technologies.map((technology) => (
                <div
                  key={technology.name}
                  className="hover:bg-teal-500 p-0.5 rounded transition-colors delay-150 duration-1000 ease-in-out"
                >
                  <div className="flex flex-col w-full h-full min-w-0 p-6 break-words bg-white border-0 rounded shadow auto-cols-max auto-rows-max place-items-center">
                    {technology.logo ? (
                      <div className="mt-4">
                        <Icon
                          icon={technology.logo}
                          color={technology.color}
                          height="96"
                          width="96"
                        />
                      </div>
                    ) : (
                      <div className="justify-center w-48 h-48 p-1 mb-0 rounded-xl " />
                    )}
                    <h1 className="py-8 text-xl font-bold leading-none text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
                      {technology.name}{" "}
                      {technology.version ? `v${technology.version}` : null}
                    </h1>
                    <h2 className="w-full mb-4 font-medium text-left text-gray-800 text-md">
                      About
                    </h2>
                    <blockquote className="mb-6 text-sm text-left text-gray-500 md:text-base">
                      <p>{technology.description}</p>
                    </blockquote>
                    <h1 className="mb-4 font-medium text-transparent transition-colors duration-300 ease-in-out delay-150 place-self-start bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text hover:text-indigo-700">
                      <a
                        href={technology.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn more <i className="fa-solid fa-caret-right" />
                      </a>
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUS;
