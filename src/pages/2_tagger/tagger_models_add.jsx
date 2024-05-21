import DesktopMenu from "../../components/2_tagger/desktop_menu";
import MobileMenu from "../../components/2_tagger/mobile_menu";
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
import { api_root, keep_json_data, keep_json_data_model } from "../../api/api_variables";
import { handleDeleteCookie } from "../../api/delete_cookie";
// import { Close } from "@mui/icons-material";
import { CircularProgress, MenuItem, Select } from "@mui/material";


export default function TaggerModelsAdd(){
    const [mobileMenu, setMobileMenu]= useState(false);

    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }
    

    const [model_value, set_model_value]= useState('');
    const [description, setDescription]= useState("");
 
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
        if (login_role !== "admin"){
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


    const [picture_text, set_picture_text]= useState("Choose a picture file or drag & drop it here");
    const [pick_picture, set_pick_picture]= useState(null);
    const pick_picture_ = (e) => {
        if (!pick_picture) {
            const file_picked= e.target.files[0];
            set_pick_picture(file_picked);
            
            try{set_picture_text(file_picked.name);}
            catch{set_picture_text('Choose a picture file or drag & drop it here'); set_pick_picture(null);}
        }

        else{
            set_pick_picture(null);
            set_picture_text('Choose a picture file or drag & drop it here');
        }

        set_validation_text("")
    }


    const [model_text, set_model_text]= useState("Choose a model file or drag & drop it here");
    const [pick_model, set_pick_model]= useState(null);
    const pick_model_ = (e) => {
        if (!pick_model) {
            const file_picked= e.target.files[0];
            set_pick_model(file_picked);
            
            try{set_model_text(file_picked.name);}
            catch{set_model_text('Choose a model file or drag & drop it here'); set_pick_picture(null);}
        }

        else{
            set_pick_model(null);
            set_model_text('Choose a model file or drag & drop it here');
        }

        set_validation_text("")
    }
    






    const post_request= (formData, string_json_upload) => {
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
                    data: formData,
                    maxBodyLength: Infinity,
                    url: api_root + `admin/add-model?id=${string_json_upload.id}&description_model=${string_json_upload.description_model}`,
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            .then((response) => {
                setshowProcessing(false);
                keep_json_data_model.length= 0;
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
        
        const m_name= model_value.trim();
        const m_description= description.trim();

        if (m_name.length === 0){
            return set_validation_text("Enter model name");
        }

        if (m_description === "set user description"){
            return set_validation_text("Please write a user description");
        }

        if (!pick_model) {
            // alert('Please add a picture file');
            set_validation_text("Please pick a model file")
            return;
        }

        if (!pick_picture) {
            // alert('Please add a picture file');
            set_validation_text("Please pick a picture file")
            return;
        }



        const formData= new FormData();
        formData.append("picture_cover", pick_picture);
        formData.append("model_object", pick_model);

        const new_model= {"id":m_name, "description_model":m_description};
        
        post_request(formData, new_model);
    }



    return(
        <div className="lg:grid lg:grid-cols-5 relative flex w-screen h-screen overflow-hidden">
            {/* ++++++++++++++++++ FULLSCREEN NAV +++++++++++++++++ */}
            <DesktopMenu sendActive= {"models"}/>

            {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
            <div className="relative lg:col-span-4 flex flex-col w-full h-screen">

                <div className=' py-4 absolute left-0 right-0 top-12 bottom-0 flex mx-auto justify-center items-center h-screen'>
                    <div className='overflow-y-scroll h-screen space-y-4 bg-white rounded-2xl shadow-md shadow-gray-500 pt-16 pb-20 mb-2 flex flex-col w-full md:px-[23%] sm:px-[10%] px-[5%]'>
                        <div>
                            <h1 className='font-bold sm:text-3xl text-2xl text-center '>
                                Add New Model
                            </h1>

                        </div>

                        <div className='pt-4 text-gray-700 flex flex-col gap-y-4' >
                            {/* ++++++++++++++ EMAIL ++++++++++++++++++++ */}
                            <div className='flex flex-col'>
                                <label className='font-bold pl-2'>
                                    Model Name
                                </label>
                                <input value={model_value} onChange={e => set_model_value(e.target.value)} type='text' placeholder='Enter the name of your model here' className='shadow-md py-3 px-2 border rounded-xl'/>
                            </div>


                            <div className='flex flex-col'>
                                <label className='font-bold pl-2'>
                                    Description
                                </label>

                                <input value={description} onChange={e => setDescription(e.target.value)} type='text' placeholder='Enter the description of the model here' className='shadow-md py-3 px-2 border rounded-xl'/>

                            </div>




                            {/* ++++++++++++++ MODEL AND PROFILE PICTURE ++++++++++ */}
                            <div className={`cursor-pointer relative hover:bg-black/60 hover:border-white hover:text-white ${pick_model !== null ? "bg-green-500 hover:bg-green-400 text-white" : "bg-gray-200"} sm:mt-2 flex flex-col w-full justify-center items-center gap-y-4 border-2 border-gray-400 border-dashed py-8 px-2 rounded-2xl`}>
                                <BsBoxArrowInUp className="size-10"/>
                                
                                <div className="flex flex-col gap-y-2 items-center">
                                    <h1 className="font-bold text-center">{model_text}</h1>
                                    <h1 className="italic text-sm"> {pick_model ? "( Click to remove )" : "( .zip, .gltf, .glb, .fbx, .dae, .stl, .obj )"}</h1>
                                </div>

                                {
                                    !pick_model 
                                    ?   <input  onChange={e => pick_model_(e)}  type="file" accept=".zip, .gltf, .glb, .fbx, .dae, .stl, .obj" className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                                    : <div  onClick= {e => pick_model_(e)}  className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                                }

                            </div>

                            {/* ++++++++ PROFILE PICTURE +++++++ */}
                            <div className={`cursor-pointer relative hover:bg-black/60 hover:border-white hover:text-white ${pick_picture !== null ? "bg-green-500 hover:bg-green-400 text-white" : "bg-gray-200"} sm:mt-2 flex flex-col w-full justify-center items-center gap-y-4 border-2 border-gray-400 border-dashed py-8 px-2 rounded-2xl`}>
                                <BsBoxArrowInUp className="size-10"/>
                                
                                <div className="flex flex-col gap-y-2 items-center">
                                    <h1 className="font-bold text-center">{picture_text}</h1>
                                    <h1 className="italic text-sm"> {pick_picture ? "( Click to remove )" : "( .jpg, .png, .webp )"}</h1>
                                </div>

                                {
                                    !pick_picture 
                                    ?   <input  onChange={e => pick_picture_(e)}  type="file" accept=".jpg, .png, .webp" className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                                    : <div  onClick= {e => pick_picture_(e)}  className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                                }

                            </div>


                            {/* +++++++++++++ VALIDATION TEXT +++++++++ */}
                            <div className={` ${validation_text === "" ? "hidden" : "font-bold text-red-700 mt-4 -mb-6 text-center underline"}`}>{validation_text}</div>


                            {/* ++++++++++++ API ERROR TEXT +++++++++ */}
                            <div className={`${api_error_disp === "" ? "hidden" : "text-red-600 font-medium underline mt-4 -mb-10 mx-auto" }`}>{api_error_disp}</div>


                            {/* +++++++++++ BUTTON +++++++++++++++++ */}
                            <button onClick={form_data} className={`${showProcessing ? 'pointer-events-none opacity-85' : ''} my-button-style my-shadow-style mt-6`}>

                            {
                                showProcessing 
                                    ? 

                                        <div>
                                        <div className='my-circular-progress'>
                                                <CircularProgress className="mr-6" />
                                            </div>

                                        </div>
                                        
                                    
                                    : ""
                            }

                                Upload Model
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
                                            Model Uploaded Successfully
                                    </h1>

                                    {/* <Close onClick={(e) => {setshowProcessed(true)}} className="my-hover-circle absolute top-0 right-0 m-4 rounded-full bg-white text-red-700 my-shadow-style"/> */}
                                </div>
                            {/* </button> */}
                        </div>

                        : ""
                }

                <NavHeader navTitle= {"Models"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

            </div>


            <MobileMenu mobileMenu= {mobileMenu} sendActive= {"models"} />

        </div>
    );
}