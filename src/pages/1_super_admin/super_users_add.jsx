import DesktopMenu from "../../components/1_super_admin/desktop_menu";
import MobileMenu from "../../components/1_super_admin/mobile_menu";
import NavHeader from "../nav_header";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';
// import { RiEyeCloseLine } from "react-icons/ri";
// import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { BsBoxArrowInUp, BsOption } from "react-icons/bs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import Box from '@mui/material/Box';
// import { Option } from '@mui/base/Option';
// or
import { Option } from '@mui/base';
import LinearProgress from '@mui/material/LinearProgress';

import axios from "axios";
import { api_root, keep_json_data } from "../../api/api_variables";
import { handleDeleteCookie } from "../../api/delete_cookie";
// import { Close } from "@mui/icons-material";
import { CircularProgress, MenuItem, Select } from "@mui/material";


export default function SuperUsersAdd(){
    const [mobileMenu, setMobileMenu]= useState(false);

    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }
    

    const [username_value, set_username_value]= useState('');
    const [role, setRole]= useState("Reviewer");
    const [password1, set_password1]= useState('');
    const [password2, set_password2]= useState('');
    let password_validator= "";
 
    const [hidePassword, setHidePassword]= useState(false);
    const [rememberMe, setRememberMe]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);

    const [showProcessed, setshowProcessed]= useState(false);
 
 
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
 
 
 
 
    useEffect(() => {
        access_token = getCookie('access_token');
        const login_role = getCookie('login_role');
        if (access_token === null){
            navigate('/', {relative: true});
            }
        if (login_role !== "superuser"){
            navigate(-1);
        }


    }, []); 
 
 
 
 
 
    var bearer_token= null;
 
    const setCookie = (name, value, days) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
 
      const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
 
      document.cookie = `${name}=${cookieValue}; path=/`;
    };
 
 
 
 
    const [error_disp, set_error_disp]= useState(false);
    const error_disp_= () => {
      set_error_disp(!error_disp);
    }
 
    const [api_error_disp, set_api_error_disp]= useState("");
    const api_error_disp_= (e) => {
      try{
        set_api_error_disp(e.response.data.detail);
      }
      catch(e){
        set_api_error_disp(" something went wrong or please check your internet connection");
      } 
      setshowProcessing(false);
    }
 
 
 
    const [validation_text, set_validation_text]= useState("");


    const [picture_text, set_picture_text]= useState("Choose a file or drag & drop it here");
    const [pick_picture, set_pick_picture]= useState(null);
    const pick_picture_ = (e) => {
        if (!pick_picture) {
            const file_picked= e.target.files[0];
            set_pick_picture(file_picked);
            
            try{set_picture_text(file_picked.name);}
            catch{set_picture_text('Choose a file or drag & drop it here'); set_pick_picture(null);}
        }

        else{
            set_pick_picture(null);
            set_picture_text('Choose a file or drag & drop it here');
        }

        set_validation_text("")
    }
    

    const password1_= (e) => {
        if (password1.trim().length === 0){
            set_validation_text("");
        }

        set_password1(e.target.value);
    }


    const password2_= (e) => {
        set_password2(e.target.value);
        password_validator += e.target.value;
        const p_trim= password_validator.trim();
        if (p_trim.length === 0){
            set_validation_text("");
        }

        if (password1.trim() !== p_trim){
          return set_validation_text("Password 1 and 2 do not match");
        }
        else{set_validation_text("")}
    }




    const post_request= (profile_pic, string_json_upload) => {
        setshowProcessing(true);
        handleGetCookie();
        if (access_token === null){
            setshowProcessing(false);
            navigate('/', {relative: true});
        }
        
        else{
            axios.request(
                {
                    method: 'post',
                    data: profile_pic,
                    maxBodyLength: Infinity,
                    url: api_root + `admin/register?username=${string_json_upload.username}&role=${string_json_upload.role}&password=${string_json_upload.password}`,
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            .then((response) => {
                setshowProcessing(false);
                keep_json_data.length= 0;
                setshowProcessed(true);
                // console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                try{
                    set_api_error_disp(error.response.data.detail);
                }
                catch(e){
                    set_api_error_disp("Sorry, something went wrong or check your internet");
                }
                setshowProcessing(false);
            });
        }
    }


    const form_data= () => {
        set_api_error_disp("");
        set_validation_text("");
        
        const m_name= username_value.trim();
        const m_password1= password1.trim();
        const m_password2= password2.trim();

        if (m_name.length === 0){
            return set_validation_text("Enter username");
        }

        if (role === "set user role"){
            return set_validation_text("Please set a user role");
        }

        if (!pick_picture) {
            // alert('Please add a picture file');
            set_validation_text("Please pick a picture file")
            return;
        }

        if (m_password1.length === 0){
            return set_validation_text("Enter password 1");
        }

        if (m_password2.length === 0){
            return set_validation_text("Confirm your password");
        }


        const formData= new FormData();
        formData.append("picture_cover", pick_picture);

        const new_user= {'username': m_name, 'role': role, 'password':m_password1};
        
        post_request(formData, new_user);
    }



    return(
        <div className="lg:grid lg:grid-cols-5 relative flex w-screen h-screen overflow-hidden">
            {/* ++++++++++++++++++ FULLSCREEN NAV +++++++++++++++++ */}
            <DesktopMenu sendActive= {"users"}/>

            {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
            <div className="relative lg:col-span-4 flex flex-col w-full h-screen">

                <div className=' py-4 absolute left-0 right-0 top-12 bottom-0 flex mx-auto justify-center items-center h-screen'>
                    <div className='overflow-y-scroll h-screen space-y-4 bg-white rounded-2xl shadow-md shadow-gray-500 pt-16 pb-20 mb-2 flex flex-col w-full md:px-[23%] sm:px-[10%] px-[5%]'>
                        <div>
                            <h1 className='font-bold sm:text-3xl text-2xl text-center '>
                                Add New User
                            </h1>

                            <h1 className='text-center text-gray-500 py-2 '>
                                Please enter new user details.
                            </h1>
                        </div>

                        <div className='pt-4 text-gray-700 flex flex-col gap-y-4' >
                            {/* ++++++++++++++ EMAIL ++++++++++++++++++++ */}
                            <div className='flex flex-col'>
                                <label className='font-bold pl-2'>
                                    Username
                                </label>
                                <input value={username_value} onChange={e => set_username_value(e.target.value)} type='email' placeholder='Enter a username' className='shadow-md py-3 px-2 border rounded-xl'/>
                            </div>


                            <div className='sm:shadow-none shadow flex sm:flex-col sm:items-start sm:border-none border sm:py-0 py-2  sm:pr-0 pr-2 items-center sm:gap-x-0 gap-x-5'>
                                <label className='font-bold pl-2'>
                                    User Role
                                </label>

                                <select value={role} onChange={e => {setRole(e.target.value)}} className="cursor-pointer py-3 sm:pl-6 sm:pr-0 pl-2 pr-2 border border-gray-300 rounded-2xl text-[12px] sm:w-full w-fit">
                                    
                                    <option>Tagger</option>
                                    <option>Reviewer</option>
                                    
                                </select>

                                

                                {/* <div className="shadow flex w-full border rounded-xl">
                                    <Select
                                        // label= "User Role"
                                        value={role}
                                        onChange={e => {setRole(e.target.value)}}
                                        className="w-full"
                                        sx={{
                                            '& .MuiSelect-select':{},
                                            boxShadow: "none",
                                            '.MuiOutlinedInput-notchedOutline': { border: 'none', boxShadow: "none"},
                                        }}

                                        // slotProps={{
                                        //     borderColor: {className: ""}
                                        // }}
                                    >

                                        <MenuItem value={"Tagger"}>Tagger</MenuItem>
                                        <MenuItem value={"Reviewer"}>Reviewer</MenuItem>
                                    </Select>
                                </div> */}
                            </div>




                            {/* ++++++++++++++ PROFILE PICTURE ++++++++++ */}
                            <div className={`cursor-pointer relative hover:bg-black/60 hover:border-white hover:text-white ${pick_picture !== null ? "bg-green-500 hover:bg-green-400 text-white" : "bg-gray-200"} sm:mt-8 mb-6 flex flex-col w-full justify-center items-center gap-y-4 border-2 border-gray-400 border-dashed py-8 px-2 rounded-2xl`}>
                                <BsBoxArrowInUp className="size-10"/>
                                
                                <div className="flex flex-col gap-y-2 items-center">
                                    <h1 className="font-bold text-center">{picture_text}</h1>
                                    <h1 className="italic"> {pick_picture ? "( Click to remove )" : "( .jpg, .png, .webp )"}</h1>
                                </div>

                                {
                                    !pick_picture 
                                    ?   <input  onChange={e => pick_picture_(e)}  type="file" accept=".jpg, .png, .webp" className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                                    : <div  onClick= {e => pick_picture_(e)}  className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                                }

                            </div>


                            {/* +++++++++++++++++++ PASSWORD ++++++++++++++++++++++ */}
                            <div className='flex flex-col'>
                                <label className='font-bold pl-2 pb-2'>
                                    Password
                                </label>

                                <div className='flex relative items-center mt-6'>
                                    <input value={password1} onChange={e => password1_(e)} type={`${hidePassword ? 'text' : 'password'}`} placeholder='Enter a password' className='absolute left-0 right-0 shadow-md py-3 px-2 border rounded-xl'/>

                                    {
                                        !hidePassword 
                                            ? <FaEyeSlash onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                            
                                            :  <FaEye onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                    }
                                </div>
                            </div>


                            <div className='flex flex-col'>
                                <label className='font-bold mt-4 pl-2 pb-2'>
                                    Re-type Password
                                </label>

                                <div className='flex relative items-center mt-6'>
                                    <input value={password2} onChange={e => password2_(e)} type={`${hidePassword ? 'text' : 'password'}`} placeholder='Confirm the your password' className='absolute left-0 right-0 shadow-md py-3 px-2 border rounded-xl'/>

                                    {
                                        !hidePassword 
                                            ? <FaEyeSlash onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                            
                                            :  <FaEye onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                    }
                                </div>
                            </div>



                            {/* +++++++++++++ VALIDATION TEXT +++++++++ */}
                            <div className={` ${validation_text === "" ? "hidden" : "font-bold text-red-700 mt-8 -mb-6 text-center underline"}`}>{validation_text}</div>


                            {/* ++++++++++++ API ERROR TEXT +++++++++ */}
                            <div className={`${api_error_disp === "" ? "hidden" : "text-red-600 font-medium underline mt-8 -mb-10 mx-auto" }`}>{api_error_disp}</div>


                            {/* +++++++++++ BUTTON +++++++++++++++++ */}
                            <button onClick={form_data} className={`${showProcessing ? 'pointer-events-none opacity-85' : ''} my-button-style my-shadow-style mt-8`}>
                                {/* <svg class="h-6 w-6 mr-3 rounded-full border-[3px] border-l-0 border-t-0 border-e-0" viewBox="0 0 24 24"> */}
                                {/* {
                                    showProcessing 
                                        ? 
                                            <svg class="animate-spin h-6 w-6 mr-5 rounded-full border-[2px] border-t-0 border-e-0" viewBox="0 0 24 24">
                                            </svg>
                                        
                                        : ""
                                } */}


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

                                Create Account
                            </button>
                        </div>
                    </div>
                </div>


                            {/* ++++++++ SUCCESSFULLY ADDED +++++++ */}
            {/* <div className="fixed flex flex-col items-center justify-center mx-auto bg-black/75 w-full h-full">
                <h1 className="font-medium">Account Created Successfully</h1>
            </div> */}



                {/* +++++++++++ LINEAR PROGRESS BAR ++++++++ */}
                <div className={`${showProcessing ? "absolute bg-black/50 top-0 bottom-0 left-0 right-0" : ""}`} />
                    {
                        showProcessing 
                            ? 
                            <Box sx= {{width: "100%"}}>
                                <LinearProgress />
                            </Box>
                        : ""
                    }



                {/* +++++++++++++++++ UPLOADED SUCCESFULLY ++++++++ */}
                {
                    showProcessed 
                        ? 

                        <div id="shadow_id" onClick={(e) => {if(e.target.id === "shadow_id"){setshowProcessed(false);}}} className="cursor-pointer pointer-events-auto bg-black/55 absolute top-0 bottom-0 left-0 right-0">
                            {/* onBlur={(e) => {setshowProcessed(true)}} */}
                            {/* <button>  */}
                                <div onClick={(e) => {}} className="flex flex-col gap-y-3 items-center justify-center absolute bg-white sm:top-20 top-40 bottom-0 left-0 right-0 sm:h-[70%] h-[50%] md:w-[400px] sm:w-[300px] w-[80%] px-2 mt-[50px] mx-auto my-shadow-style">
                                    <IoCheckmarkDoneCircleOutline className="size-[100px] text-green-600"/>

                                    <h1 className="text-center text-black sm:text-2xl text-base">
                                            Account Created Successfully
                                    </h1>

                                    {/* <Close onClick={(e) => {setshowProcessed(true)}} className="my-hover-circle absolute top-0 right-0 m-4 rounded-full bg-white text-red-700 my-shadow-style"/> */}
                                </div>
                            {/* </button> */}
                        </div>

                        : ""
                }

                <NavHeader navTitle= {"Users"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

            </div>


            <MobileMenu mobileMenu= {mobileMenu} sendActive= {"users"} />

        </div>
    );
}