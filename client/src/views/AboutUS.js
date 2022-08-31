import React from 'react'

import AboutUs from '../assets/img/aboutus.svg'
import { FaUserTie } from 'react-icons/fa'

const AboutUsDetails = [
    {
        name: 'John Moises Paunlagui',
        title: 'Deep Learning Engineer, Web Developer',
        description: 'John is a deep learning engineer and data scientist who is passionate about building and deploying intelligent systems. He is currently working at Google as a Data Scientist and Web Developer.',
        image: 'https://s.gravatar.com/avatar/24dd27ffab5c8b19a4414f8ab6217fae?s=200',
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

const AboutUS = () => {
    return (
        <>
            <div className="flex-col grid items-center max-w-screen-xl min-h-screen px-4 mx-auto lg:grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 font-Montserrat pt-28">
                <div className="place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl xl:text-6xl">About Us</h1>
                    <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">This project is a web application that can be used to analyze the sentiment of the evaluation result of the School</p>
                </div>
                <div className="mt-4 md:flex md:mt-4 lg:col-span-5 lg:flex">
                    <img src={AboutUs} alt="mockup"/>
                </div>                
            </div>
            <hr/>
            <div className="items-center w-full h-full min-h-screen font-Montserrat">
                <div className="py-20 mx-auto mb-20 max-w-7xl sm:px-6 lg:px-8 font-Montserrat text-gray-200 justify-items-center">
                    <h1 className="text-4xl font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:text-5xl xl:text-6xl text-center pb-16">Creators of Matrix Lab</h1>
                    <div className="flex flex-wrap mb-6 items-top">
                        {AboutUsDetails.map((aboutUs, index) => (
                            <div key={index} className='w-full px-2 md:px-20 md:w-1/2 place-content-center mt-24'>
                                <div className="bg-slate-700 flex flex-col w-full min-w-0 mb-6 break-words  border-0 rounded-xl shadow-lg place-items-center">
                                    <div className="p-1 mb-0 justify-center bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl -mt-10">
                                        {aboutUs.image ? <img src={aboutUs.image} alt={aboutUs.name} className="w-28 h-28 rounded-3xl object-contain md:w-34 md:h-34 lg:w-48 lg:h-48" /> : 
                                        <div className="w-28 h-28 rounded-full object-contain md:w-34 md:h-34 lg:w-48 lg:h-48 p-5">
                                            <FaUserTie className="text-white text-center w-20 h-20 lg:w-40 lg:h-40" />    
                                        </div>}
                                    </div>
                                    <div className='p-4 text-center'>
                                        <h1 className="font-bold tracking-widest text-xl md:text-lg lg:text-2xl mt-2 lg:mt-4">{aboutUs.name}</h1>
                                        <h2 className="font-medium text-md md:text-base">{aboutUs.title ? aboutUs.title : '--'}</h2>
                                        
                                        <div className="mt-4 flex justify-center space-x-4">
                                            {Object.keys(aboutUs.social).map((social, index) => (
                                                <div key={index} className="flex items-center">
                                                    {aboutUs.social[social] !== '' ?
                                                        <div className="flex items-center justify-center h-12 w-12">
                                                            <a href={aboutUs.social[social]} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                                                                <i className={`fab fa-${social??''} text-2xl`}> </i>
                                                            </a>
                                                        </div>
                                                        :
                                                        <div className="flex items-center justify-center h-12 w-12">
                                                            --
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                        </div>    
                                    </div> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

        
    )
}

export default AboutUS