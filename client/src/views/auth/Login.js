import React, { useEffect, useState} from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye} from "react-icons/ai";

import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/img/android-chrome-192x192.png';

const Login = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        textChange: "Sign In"
    })

    // Get token from local storage
    const tokenAuth = localStorage.getItem("access_token");
    
    useEffect(() => {
        if (tokenAuth) {
            navigate("/admin");
        }else{
            navigate("/auth");
        }
    }, [tokenAuth, navigate]);

    const { username, password, textChange } = formData;
    
    const handleChange = text => e => {
        e.preventDefault();
        setFormData({ ...formData, [text]: e.target.value });
    }
    
    // Sign in user with form validation
    const handleSubmit = e => {
        e.preventDefault();
        if (username === "" || password === "") {
            toast.error("Please fill in all fields");
        } else {
            setFormData({ ...formData, textChange: "Loading..." });
                axios.post("http://127.0.0.1:8080/auth", { username, password, textChange})
                .then(res => {
                    // Save token to local storage
                    localStorage.setItem("access_token", res.data.access_token);
                    // welcome the user with its name
                    toast.success(`${res.data.name}, Welcome back!`);
                    // Set token to Auth header
                    setFormData({ ...formData, textChange: "Signed In" });
                    navigate("/admin");
                })
                .catch(err => {
                    setFormData({ ...formData, textChange: "Sign In" });
                    toast.error(err.response.data.error);
                })
        }    
    }
    
    // show and hide password
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <div className="container h-full mx-auto font-Montserrat">
                <div className="flex items-center content-center justify-center h-full">
                    <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
                        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
                            <div className="px-6 py-6 mb-0 rounded-t">
                                <Link to="/">
                                    <div className="flex items-center px-3 py-2 text-gray-800 hover:backdrop-blur-md hover:bg-blue-50 hover:rounded-md">
                                        <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
                                        <h1 className="ml-3 font-extrabold tracking-widest text-md">MATRIX LAB</h1>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                                <div className="mb-3 text-start">
                                    <h6 className="text-lg font-bold text-gray-500">
                                        Sign in to your account 
                                    </h6>
                                </div>
                                
                                <form className="relative mx-auto mt-6 mb-6 max-w-screen" onSubmit={handleSubmit}>
                                    <input className="w-full p-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="username"
                                        placeholder="ID"
                                        onChange={handleChange("username")}
                                        value={username}/>
                                    <div className="relative">
                                        <input className="w-full px-4 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            onChange={handleChange("password")}
                                            value={password}/>
                                        <label className='absolute px-2 text-2xl rounded py-9 right-2'>
                                            {(showPassword === false) ? 
                                                <AiFillEyeInvisible onClick={toggleShowPassword} className="text-gray-400" /> : 
                                                <AiFillEye onClick={toggleShowPassword} className="text-gray-400" />
                                            }
                                        </label>
                                    </div>
                                    <button type="submit"
                                        className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-teal-700 rounded-lg hover:bg-blue-900 focus:shadow-outline focus:outline-none">
                                        <i className="fas fa-sign-in-alt w-6-ml-2" />
                                        <span className="ml-3">Sign In</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container h-full mx-auto">
                <div className="flex items-center content-center justify-center h-full">
                    <div className="w-5/6 md:w-6/12 lg:w-4/12 xl:w-3/12">
                        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
                            <div className="px-6 py-6 mb-0 rounded-t">
                                <div className="flex items-center px-3 py-2 text-gray-800 ">                                          
                                    <Link to="/forgot-password" className="ml-3 font-medium tracking-widest text-md">Forgot Password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login