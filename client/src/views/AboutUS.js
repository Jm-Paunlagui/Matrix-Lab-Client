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
                    <div className="flex flex-wrap mb-6 items-top justify-center">
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
                                        <h2 className="font-medium text-md md:text-base">{aboutUs.title ? aboutUs.title : '--'}</h2>
                                        
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
                                                        <div className="flex items-center justify-center h-12 w-12 lg:text-2xl">
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