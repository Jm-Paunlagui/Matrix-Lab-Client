import React from 'react'

import AboutUs from '../assets/img/aboutus.svg'

const AboutUsDetails = [
    {
        name: 'John Moises Paunlagui',
        title: 'Deep Learning Engineer, Web Developer',
        description: 'John is a deep learning engineer and data scientist who is passionate about building and deploying intelligent systems. He is currently working at Google as a Data Scientist and Web Developer.',
        image: 'https://s.gravatar.com/avatar/24dd27ffab5c8b19a4414f8ab6217fae?s=600',
        social: {
            github: 'https://github.com/Jm-Paunlagui',
            linkedin: 'https://www.linkedin.com/in/john-moises-paunlagui-2b6b31186',
            twitter: 'https://twitter.com/itsJm51',
            facebook: 'https://www.facebook.com/JmPaunlagui',
            instagram: 'https://www.instagram.com/jmpaunlagui/',
        }
    },
    {
        name: 'Rysel Pelipada',
        title: 'Chef, Financial Expert',
        description: 'Rysel is the chief money laundere of the group and also controbutes as a chef that cooks bespoke instant noodle recipes for the group. He is also a finance expert and a financial advisor to the group.',
        image: '',
        social: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
        }
    },
    {
        name: 'Dwight Torres',
        title: '',
        description: '',
        image: '',
        social: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
        }
    },
    {
        name: 'Nathanael Bueno',
        title: '',
        description: '',
        image: '',
        social: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
        }
    }
]

// React, TailwindCSS, React-Router-Dom, React-Icons, Font Awesome, React Toastify, Google Fonts,
// TensorFlow, Keras, Numpy, Pandas, Matplotlib, Seaborn, Scikit-Learn, Flask, MySQL,
// Visual Studio Code, PyCharm Professional Edition, XAMPP, Git, GitHub, Visual Studio 2022 Desktop Development with C++, Github Copilot, Postman,
const Technologies = [
    {
        name: 'Frontend',
        details: [
            {
                name: 'React',
                logo: 'https://cdn.worldvectorlogo.com/logos/react.svg',
                link: 'https://reactjs.org/',
                decription: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.'
            },
            {
                name: 'TailwindCSS',
                logo: 'https://tailwindcss.com/img/logo.svg',
                link: 'https://tailwindcss.com/',
                decription: 'TailwindCSS is a utility-first CSS framework for quickly building custom, high-fidelity, fully responsive designs with minimal effort.'
            },
            {
                name: 'React-Router-Dom',
                logo: 'https://cdn.worldvectorlogo.com/logos/react-router-dom.svg',
                link: 'https://reacttraining.com/react-router/web/guides/quick-start',
                decription: 'React Router is a routing library for React. It is used to make single-page applications with the minimal effort required.'
            },
            {
                name: 'React-Icons',
                logo: 'https://cdn.worldvectorlogo.com/logos/react-icons.svg',
                link: 'https://react-icons.netlify.com/',
                decription: 'React Icons is a collection of icons for React. It is used to make single-page applications with the minimal effort required.'
            },
            {
                name: 'Font Awesome',
                logo: 'https://cdn.worldvectorlogo.com/logos/fontawesome.svg',
                link: 'https://fontawesome.com/',
                decription: 'Font Awesome is a community of developers and designers who create and maintain free and open source icons.'
            },
            {
                name: 'React Toastify',
                logo: 'https://cdn.worldvectorlogo.com/logos/react-toastify.svg',
                link: 'https://react-toastify.js.org/',
                decription: 'React Toastify is a library for React that makes it easy to display toast messages.'
            },
            {
                name: 'Google Fonts',
                logo: 'https://cdn.worldvectorlogo.com/logos/google-fonts.svg',
                link: 'https://fonts.google.com/',
                decription: 'Google Fonts is a webfont service that allows you to select from over 1,000 web fonts.'
            }
        ]
    },
    {
        name: 'Backend',
        details: [
            {
                name: 'TensorFlow',
                logo: 'https://cdn.worldvectorlogo.com/logos/tensorflow.svg',
                link: 'https://www.tensorflow.org/',
                decription: 'TensorFlow is an open source machine learning platform for everyone. It is used to build and train neural networks.'
            },
            {
                name: 'Keras',
                logo: 'https://cdn.worldvectorlogo.com/logos/keras.svg',
                link: 'https://keras.io/',
                decription: 'Keras is a high-level neural network library for the Python programming language. '
            },
            {
                name: 'Numpy',
                logo: 'https://cdn.worldvectorlogo.com/logos/numpy.svg',
                link: 'https://www.numpy.org/',
                decription: 'Numpy is a Python package for general-purpose array-processing. '
            },
            {
                name: 'Pandas',
                logo: 'https://cdn.worldvectorlogo.com/logos/pandas.svg',   
                link: 'https://pandas.pydata.org/',
                decription: 'Pandas is a Python library providing fast, flexible, and easy-to-use data structures designed to make working with data easy.'
            },
            {
                name: 'Matplotlib',
                logo: 'https://cdn.worldvectorlogo.com/logos/matplotlib.svg',
                link: 'https://matplotlib.org/',
                decription: 'Matplotlib is a Python 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments across platforms.'
            },
            {
                name: 'Seaborn',
                logo: 'https://cdn.worldvectorlogo.com/logos/seaborn.svg',
                link: 'https://seaborn.pydata.org/',
                decription: 'Seaborn is a Python data visualization library based on matplotlib. It provides a high-level interface for drawing attractive statistical graphics.'
            },
            {
                name: 'Scikit-Learn',
                logo: 'https://cdn.worldvectorlogo.com/logos/scikit-learn.svg',
                link: 'https://scikit-learn.org/stable/',
                decription: 'Scikit-learn is an open-source machine learning library for Python. It provides a unified interface for machine learning algorithms.'
            },
            {
                name: 'Flask',
                logo: 'https://cdn.worldvectorlogo.com/logos/flask.svg',
                link: 'https://flask.palletsprojects.com/en/1.1.x/',
                decription: 'Flask is a microframework for Python based on Werkzeug and Jinja2. It is designed to be as simple as possible while still being powerful enough to be useful.'
            },
            {
                name: 'MySQL',
                logo: 'https://cdn.worldvectorlogo.com/logos/mysql.svg',
                link: 'https://www.mysql.com/',
                decription: 'MySQL is a relational database management system (RDBMS) based on the SQL language. '
            }
        ]
    },
    {
        name: 'IDE and Tools',
        details: [
            {
                name: 'Visual Studio Code',
                logo: 'https://cdn.worldvectorlogo.com/logos/visual-studio-code.svg',
                link: 'https://code.visualstudio.com/',
                decription: 'Visual Studio Code is a free and open-source code editor for the Microsoft Windows platform. '
            },
            {
                name: 'PyCharm Professional Edition',
                logo: 'https://cdn.worldvectorlogo.com/logos/pycharm.svg',
                link: 'https://www.jetbrains.com/pycharm/',
                decription: 'PyCharm is a free and open-source IDE for the Python programming language. '
            },
            {
                name: 'XAMPP',
                logo: 'https://cdn.worldvectorlogo.com/logos/xampp.svg',
                link: 'https://www.apachefriends.org/en/xampp.html',
                decription: 'XAMPP is a free web server software package that allows you to develop and test your web applications without installing any software on your computer.'
            },
            {
                name: 'Git',
                logo: 'https://cdn.worldvectorlogo.com/logos/git.svg',
                link: 'https://git-scm.com/',
                decription: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. '
            },
            {
                name: 'GitHub',
                logo: 'https://cdn.worldvectorlogo.com/logos/github.svg',
                link: 'https://github.com/',
                decription: 'GitHub is a web-based hosting service for version control using Git.'
            },
            {
                name: 'Visual Studio 2022 Desktop Development with C++',
                logo: 'https://cdn.worldvectorlogo.com/logos/visual-studio-code.svg',
                link: 'https://www.microsoft.com/en-us/download/details.aspx?id=50000',
                decription: 'Visual Studio is a free and open-source software development platform designed to make it easier to create, manage, and share software projects. '
            },
            {
                name: 'Github Copilot',
                logo: 'https://cdn.worldvectorlogo.com/logos/github.svg',
                link: 'https://github.com/features/copilot',
                decription: 'GitHub Copilot is a AI-powered software development platform that helps developers build software faster and with less effort. '
            },
            {
                name: 'Postman',
                logo: 'https://cdn.worldvectorlogo.com/logos/postman.svg',
                link: 'https://www.getpostman.com/',
                decription: 'Postman is a web application that allows you to create and manage RESTful APIs in a single place and share them with anyone.'
            },
            {
                name: 'CUDA and cuDNN',
                logo: 'https://cdn.worldvectorlogo.com/logos/cuda.svg',
                link: 'https://developer.nvidia.com/cuda-toolkit',
                decription: 'CUDA is a parallel computing platform and runtime library developed by NVIDIA to accelerate computing in general and deep learning in particular.'
            }
        ]
    }
]


const AboutUS = () => {
    return (
        <>
            <div className="flex-col grid items-center max-w-screen-xl min-h-screen px-4 mx-auto lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat pt-28">
                <div className="place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl xl:text-6xl">About Us</h1>
                    <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">A group of Computer Science students who are passionate about documenting, building and deploying deep learning systems. The Creators are currently studying at the City College of Calamba and looking forward to finish their studies and work in the field of deep learning and data science.</p>
                </div>
                <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
                    <img src={AboutUs} alt="mockup"/>
                </div>                
            </div>
            <hr/>
            <div className="items-center w-full h-full min-h-screen font-Montserrat">
                <div className="mx-auto mb-20 max-w-7xl sm:px-6 lg:px-8 font-Montserrat text-gray-200 justify-items-center">
                    <h1 className="text-4xl font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl xl:text-6xl text-center py-16">Creators of Matrix Lab</h1>
                    <div className="flex flex-wrap mb-44 items-top justify-center">
                        {AboutUsDetails.map((aboutUs, index) => (
                            <div key={index} className='w-full p-2 md:w-1/2 lg:w-6/12 place-content-center'>
                                <div className="w-full h-32 p-1 mb-0 justify-center bg-gradient-to-b from-blue-500 to-purple-500 rounded-t-xl"/>
                                <div className="bg-white flex flex-col w-full min-w-0 break-words  border-0 rounded-b-xl shadow-lg place-items-center">
                                    {aboutUs.image ? 
                                        <img src={aboutUs.image} alt={aboutUs.name} className="rounded-xl -mt-20 shadow-xl w-48 h-48" /> 
                                        : 
                                        <div className="w-48 h-48 p-1 mb-0 justify-center bg-gradient-to-br from-white to-sky-500 rounded-xl -mt-20"/>
                                    }
                                    <div className='p-4 text-center container text-stone-700'>
                                        <h1 className="font-bold tracking-widest text-xl md:text-lg lg:text-2xl mt-2 lg:mt-4">{aboutUs.name}</h1>
                                        <h2 className="font-medium text-md md:text-base">{aboutUs.title ? aboutUs.title : <div className='h-6'/>}</h2>
                                        
                                        <div className="mt-4 flex justify-center">
                                            {Object.keys(aboutUs.social).map((social, index) => (
                                                <div key={index} className="flex items-center">
                                                    {aboutUs.social[social] !== '' ?
                                                        <div className="flex items-center justify-center h-12 w-12">
                                                            <a href={aboutUs.social[social]} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                                                                <i className={`fab fa-${social??''} text-3xl transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110`}> </i>
                                                            </a>
                                                        </div>
                                                        :
                                                        <div className="h-12 w-12"/>
                                                    }
                                                </div>
                                            ))}
                                        </div>    
                                    </div> 
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr/>
                    <h1 className="text-4xl font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500  md:text-5xl xl:text-6xl text-center py-16">Technologies Used in Matrix Lab</h1>
                    <div className="flex flex-wrap mb-44 items-top justify-center">
                        
                    </div>    
                </div>
            </div>
        </>
    )
}

export default AboutUS