import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
// import { RiEyeCloseLine } from "react-icons/ri";
// import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_root, reset_on_login } from "../api/api_variables";
import { handleDeleteCookie } from "../api/delete_cookie";

import login_background from "../assets/images/login-background.webp";
import emapping from "../assets/images/emapping.png";



export default function LoginScreen() {
  // const LazyComponent = React.lazy(() => import('./LazyComponent'));

   const [username_value, set_username_value]= useState('');
   const [password_value, set_password_value]= useState('');

   const [hidePassword, setHidePassword]= useState(false);
   const [rememberMe, setRememberMe]= useState(false);
   const [showProcessing, setshowProcessing]= useState(false);


   const navigate= useNavigate();

   var access_token;

   const getCookie = (name) => {
     const cookies = document.cookie.split(';');

     for (const cookie of cookies) {
         const [cookieName, cookieValue] = cookie.trim().split('=');

         if (cookieName === name) {
         return decodeURIComponent(cookieValue);
         }
     }
     return null;
   };

   const handleGetCookie = () => {
       // Retrieve the value of the "exampleCookie" cookie
       access_token = getCookie('access_token');
   };









   var bearer_token= null;

   const setCookie = (name, value, days) => {
     const expirationDate = new Date();
     expirationDate.setDate(expirationDate.getDate() + days);

     const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');

     document.cookie = `${name}=${cookieValue}; path=/`;
   };




   const [bg_Image, set_BgImage]= useState(false);

   const [error_disp, set_error_disp]= useState(false);
   const error_disp_= () => {
     set_error_disp(!error_disp);
   }

   const [api_error_disp, set_api_error_disp]= useState('');
   const api_error_disp_= (e) => {
     try{
       set_api_error_disp(e.response.data.detail);
     }
     catch(e){
       set_api_error_disp(" something went wrong");
     } 
     setshowProcessing(false);
   }



   useEffect(() => {
    reset_on_login();

    const getUsername= localStorage.getItem('username');
    const getPassword= localStorage.getItem('password');

    if (getUsername != null) {
        set_username_value(getUsername);
    }

    if (getPassword != null) {
        set_password_value(getPassword);
    }

   }, [])

   
   function loginPostRes(res){
    bearer_token= res.data.token_type + " " + res.data.access_token;
    axios.get(api_root + 'admin/manual_verify_user', {
        headers: {
            'Authorization': bearer_token,
            'Content-Type': 'application/json', // Add other headers if needed
          },
    }).then(res => {

        handleDeleteCookie();
        // localStorage.removeItem('username');
        // localStorage.removeItem('password');

        setCookie('access_token', bearer_token, 1);
        setCookie("login_role", res.data, 1);

        if (rememberMe){
            localStorage.setItem("username", username_value);
            localStorage.setItem("password", password_value);
        }

      

        if (res.data === "user"){navigate("/reviewer-model", {relative: true})}
        else if (res.data === "admin"){navigate("/tagger-management", {relative: true});}
        else if (res.data === "superuser"){navigate("/admin-super-management", {relative: true})}
        else{
            navigate("/", {relative: true})
        }
    })
    .catch(e => {
      if (e.response.status === 404){
        api_error_disp_(e)
      }

      else if (e.message === "Network Error"){
        api_error_disp_(e)
      }

      else{
        api_error_disp_("Sorry, Something went wrong");
      }

    });

    setshowProcessing(false);
    
  }

  function loginPost(){

    const username= username_value.toLowerCase().trim();
    const password= password_value;

    if (username.length=== 0 || password.length=== 0){
      return error_disp_();
    }

    const json_data= {'username': username,'password': password}
    
    setshowProcessing(true);
    axios.post(
      api_root + 'login',
      json_data,
      {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // withCredentials: true
      }
    ).then(res => loginPostRes(res))
    .catch(e => {

      if (e.response.status === 404){
        api_error_disp_(e)
      }

      else if (e.message === "Network Error"){
        api_error_disp_(e)
      }

      else{
        api_error_disp_("Sorry, Something went wrong");
      }
      setshowProcessing(false);
    });
    // setLoggedIn(true);
  }



    
  return (
    <div className='relative flex h-screen w-screen'>
        <div className='absolute top-0 bottom-0 left-0 right-0 grid grid-cols-2 w-screen h-screen bg-white overflow-hidden'>
            <div className='bg-white'></div>
            {/* <div className='flex h-screen items-center'>
              <img onLoad={(e) => {set_BgImage(true)}} alt='background image' src={emapping} className='opacity-55 bg-black'/>
            </div> */}

            <img onLoad={(e) => {set_BgImage(true)}} alt='background image' src={login_background} className='flex object-cover h-screen w-screen'/>
        </div>



        {
          bg_Image 
          ? 
          <div className='md:scale-[85%] scale-90 absolute left-0 right-0 top-0 bottom-0 flex mx-auto justify-center items-center h-screen'>
              <div className='space-y-4 bg-white rounded-2xl shadow-md shadow-gray-500 py-12 px-6 w-[490px]'>
                  <h1 className='font-bold text-3xl text-center '>
                      Welcome Back!
                  </h1>

                  <h1 className='text-center text-gray-500 py-2'>
                      Please enter your details.
                  </h1>

                  <div className='pt-4 text-gray-700 flex flex-col'>
                      {/* ++++++++++++++ EMAIL ++++++++++++++++++++ */}
                      <div className='flex flex-col'>
                          <label className='font-bold pl-2 pb-2'>
                              Username
                          </label>
                          <input value={username_value} onChange={e => set_username_value(e.target.value)} type='email' placeholder='Enter your email' className='shadow-md py-3 px-2 border rounded-xl'/>
                      </div>

                      {/* +++++++++++++++++++ PASSWORD ++++++++++++++++++++++ */}
                      <div className='flex flex-col'>
                          <label className='font-bold mt-4 pl-2 pb-2'>
                              Password
                          </label>

                          <div className='flex relative items-center mt-6'>
                              <input value={password_value} onChange={e => set_password_value(e.target.value)} type={`${hidePassword ? 'text' : 'password'}`} placeholder='Enter your password' className='absolute left-0 right-0 shadow-md py-3 px-2 border rounded-xl'/>

                              {
                                  !hidePassword 
                                      ? <FaEyeSlash onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                      
                                      :  <FaEye onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                              }
                          </div>
                      </div>

                      <div  className='flex'>
                          {!error_disp 
                              ? <div className="text-red-100 hidden"> Please all the fields must be filled</div>
                              
                              : <div className="text-red-100"> Please all the fields must be filled</div>
                          }

                          <div className="text-red-600 font-medium underline mt-8 -mb-10 mx-auto">{api_error_disp}</div>
                      </div>

                      {/* ++++++++++++++++++ HELPERS +++++++++++++++++++ */}
                      <div className='flex flex-row justify-between mx-2 mt-12'>
                          <div onClick={ (e) => {setRememberMe(!rememberMe)}} className='cursor-pointer mt-4 flex space-x-2'>
                              <input checked= {rememberMe} type='checkbox' className='border border-gray-400'/>
                              <h1 className='text-sm font-bold'>Remember me</h1>
                          </div>

                          <div className='pointer-events-none opacity-30 cursor-pointer mt-4 flex space-x-2'>
                              <h1 className='text-sm font-bold underline'>Forgot password?</h1>
                          </div>
                      </div>

                      {/* +++++++++++ BUTTON +++++++++++++++++ */}
                      <button onClick={loginPost} className={`${showProcessing ? 'pointer-events-none animate-pulse' : ''} my-button-style my-shadow-style`}>
                          {/* <svg class="h-6 w-6 mr-3 rounded-full border-[3px] border-l-0 border-t-0 border-e-0" viewBox="0 0 24 24"> */}
                          {
                              showProcessing 
                                  ? 
                                      // <svg class="animate-spin h-6 w-6 mr-5 rounded-full border-[2px] border-t-0 border-e-0" viewBox="0 0 24 24">
                                      // </svg>
                                      <div>
                                        <div className='my-circular-progress'>
                                              <CircularProgress className="mr-6" />
                                          </div>

                                      </div>
                                      
                                  
                                  : ""
                          }

                          Sign in
                      </button>
                  </div>
              </div>
          </div>

            : <div className='absolute left-0 right-0 top-0 bottom-0 h-screen w-screen flex items-center justify-center bg-white'>
                <CircularProgress />
              </div>
          }
    </div>
  );
}
