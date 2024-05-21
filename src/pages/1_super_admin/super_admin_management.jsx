import { IoSearchSharp } from "react-icons/io5";
import profile_pic1 from "../../assets/images/profile_pic1.jpeg";
import profile_pic2 from "../../assets/images/profile_pic2.jpeg";
import profile_pic3 from "../../assets/images/profile_pic3.jpeg";
import model_room from "../../assets/images/model_room.jpeg";
import model_room2 from "../../assets/images/room_model2.jpeg";

import p1 from "../../assets/images/p1.jpeg";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import MobileMenu from "../../components/1_super_admin/mobile_menu";
import NavHeader from "../nav_header";
import { api_root, bearer_token, keep_json_data } from "../../api/api_variables";
import SessionExpired from "../../components/1_super_admin/session_expired";
import { handleDeleteCookie } from "../../api/delete_cookie";
import DesktopMenu from "../../components/1_super_admin/desktop_menu";
import PieChartSuperAdmin from "../../components/1_super_admin/pie_chart_super_admin";
import HistogramChartSuperAdmin from "../../components/1_super_admin/histogram_chart_super_admin";
import { getCookie } from "../../api/cookies_logic";




export let selected_models= [];

export default function SuperAdminManagement() {
    var access_token;

    const [mobileMenu, setMobileMenu]= useState(false);
    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }


    const [is_expired, set_is_expired]= useState(false);
    const is_expired_ = (e) => {
        if (e.code === "ERR_BAD_REQUEST"){
            handleDeleteCookie();
            set_is_expired(true)
        }
        else{set_is_expired(false)}
    }




    const navigate= useNavigate();
    const handleLogout= () => {
        handleDeleteCookie();
        navigate('/user-login', {relative: true});
    }


    function model_add_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/super-admin-add-model', {relative: true});
    }

    function view_admin_(event){
        navigate('/view-admin', {relative: true});
    }

    function report_page(event){
        navigate('/admin-super-report', {relative: true});
    }

    function dashboard_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/admin-model-management', {relative: true});
    }

    function home_page_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/', {relative: true});
    }




    const [is_model_delete, set_is_model_delete]= useState(false);
    const [model_json_data, set_model_json_data]= useState([]);
    const model_json_data_= (res) => {
        keep_json_data.length= 0;
        keep_json_data.push(res.data);
        set_model_json_data(res.data);
    };

    

    useEffect(() => {
        selected_models=[];

        access_token = getCookie('access_token');
        const login_role = getCookie('login_role');
        if (access_token === null){
            navigate('/', {relative: true});
            }
        if (login_role !== "superuser"){
            navigate(-1);
        }


    }, [is_model_delete]); //the empty array is very important at the back, which means we are saying the effect does not depends on anything so as to prevent it from autorefiring by itself after first run of the page loading, even if there is any varibale or thing that changes in it



    function allow_search(){
        document.getElementById('search_input').focus();
    }

    const [cancel_delete, setDelete]= useState(false);
    const cancel_delete_= () => {
        setDelete(!cancel_delete);
    }

    const [continue_delete, setContinueDelete]= useState(false);
    const continue_delete_= () => {
        // console.log(selected_models);
        // setContinueDelete(!continue_delete);


        setContinueDelete(!continue_delete);

        access_token = getCookie('access_token');
        if (access_token === null){
            navigate('/', {relative: true});
        }
        
        else{
            axios.request(
                {
                    method: 'delete',
                    url: api_root + `admin/delete-model-super-admin?id=[${selected_models}]`,
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'application/json'
                    },

                    data: selected_models
                    // params: {
                    //     id: selected_models
                    // },
                }
            )
            .then((response) => {
                setContinueDelete(false);
                cancel_delete_();
                
                set_is_model_delete(!is_model_delete);
            })
            .catch((error) => {
                console.log(error);
                setContinueDelete(false);
                cancel_delete_();
            });

        }
    }

    


    return (
       <div className="lg:grid lg:grid-cols-5 relative flex w-screen h-screen overflow-hidden">
 
        {/* ++++++++++++++++++ FULLSCREEN NAV +++++++++++++++++ */}
        <DesktopMenu sendActive= {"dashboard"}/>


        {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
        <div className="relative overflow-y-scroll lg:col-span-4 flex flex-col w-full">
            <div className="my-screen-padding absolute top-6 left-0 right-0 flex flex-col w-full">
                
            <h1 className="italic font-bold text-red-500 mb-6 border ">
                "NOTE: This dashboard analytic contains dummy data that you can't interact with, to interact with real data, go to other navigation menu like models and users."
            </h1>
                <div className="lg:grid lg:grid-cols-4 lg:h-32 lg:gap-x-10 flex flex-col text-sm font-medium text-center">
                    <div className="lg:my-0 my-4 h-[150px]  bg-[#91D958] lg:py-2 py-5 flex flex-col justify-start  shadow-md shadow-gray-500 rounded-lg my-hover-transition">
                        Total Model uploaded
                        <h1 className="mt-8 text-[60px]">
                            789
                        </h1>
                    </div>

                    <div className="lg:my-0 my-4 h-[150px]  bg-[#ffffff] lg:py-2 py-5 flex flex-col justify-start  shadow-md shadow-gray-500 rounded-lg my-hover-transition">
                        Total Users
                        <h1 className="mt-8 text-[60px]">
                            15
                        </h1>
                    </div>

                    <div className="lg:my-0 my-4 h-[150px]  bg-[#ffffff] lg:py-2 py-5 flex flex-col justify-start  shadow-md shadow-gray-500 rounded-lg my-hover-transition">
                        Updated Models
                        <h1 className="mt-8 text-[60px]">
                            24
                        </h1>
                    </div>

                    <div className="lg:my-0 my-4 h-[150px]  bg-[#91D958] lg:py-2 py-5 flex flex-col justify-start  shadow-md shadow-gray-500 rounded-lg my-hover-transition">
                        Deleted Models
                        <h1 className="mt-8 text-[60px]">
                            12
                        </h1>
                    </div>

                </div>



                {/* ++++++++++++++ CHARTS +++++++++++++ */}
                <div className="lg:grid lg:grid-cols-2 flex flex-col w-full my-16 lg:gap-x-8">
                    <PieChartSuperAdmin />

                    <HistogramChartSuperAdmin />
                </div>


                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 flex flex-col w-full">

                    {/* ++++++++++++++++ RECENT TAGGERS +++++++++++ */}
                    {/* ++++++++ DON'T USE PADDING INSIDE THE CHILD ELEMENTS, IT MAY AFFECT YOUR OBJECT BEING CENTERED WHEN CHANGING TO DIFFERENT SCREEN RESPONSIVENESS ++++ */}
                    <div className="lg:col-span-2 flex flex-col justify-between mt-2 mb-16 w-full border rounded-lg shadow-md shadow-gray-500 px-8 py-6 hover:scale-105 duration-300 hover:border-2 hover:border-yellow-500">
                        <div className="text-header  mt-2 mb-10">
                            Recent Taggers
                        </div>


                        <div className="xl:grid xl:grid-cols-3 flex flex-col w-full gap-x-2 xl:gap-y-0 gap-y-6">
                            <div className="bg-black/10 flex flex-col w-full justify-between mx-auto border p-4">
                                <div className="my-picture-style lg:w-14 lg:h-14 sm:w-28 sm:h-28 w-14 h-14 mb-3 mx-auto">
                                    <img src={profile_pic1} className="my-image-cover-style w-[100%] h-[100%]  flex"/>
                                </div>
                                
                                <h1 className="lg:text-[12px] sm:text-[12px] text-[9px] font-bold text-center w-[62px] mx-auto truncate">David</h1>

                                <button className="my-button-style my-shadow-style lg:text-[9px] lg:py-2 sm:py-3 py-2 sm:text-[13px] text-[9px]">
                                    View
                                </button>
                            </div>

                            <div className="bg-black/10 flex flex-col w-full justify-between mx-auto border p-4">
                                <div className="my-picture-style lg:w-14 lg:h-14 sm:w-28 sm:h-28 w-14 h-14 mb-3 mx-auto">
                                    <img src={profile_pic2} className="my-image-cover-style w-[100%] h-[100%]  flex"/>
                                </div>
                                
                                <h1 className="lg:text-[12px] sm:text-[12px] text-[9px] font-bold text-center w-[62px] mx-auto truncate">Fakorede...</h1>

                                <button className="my-button-style my-shadow-style lg:text-[9px] lg:py-2 sm:py-3 py-2 sm:text-[13px] text-[9px]">
                                    View
                                </button>
                            </div>

                            <div className="bg-black/10 flex flex-col w-full justify-between mx-auto border p-4">
                                <div className="my-picture-style lg:w-14 lg:h-14 sm:w-28 sm:h-28 w-14 h-14 mb-3 mx-auto">
                                    <img src={profile_pic3} className="my-image-cover-style w-[100%] h-[100%]  flex"/>
                                </div>
                                
                                <h1 className="lg:text-[12px] sm:text-[12px] text-[9px] font-bold text-center w-[62px] mx-auto truncate">Johnson...</h1>

                                <button className="my-button-style my-shadow-style lg:text-[9px] lg:py-2 sm:py-3 py-2 sm:text-[13px] text-[9px]">
                                    View
                                </button>
                            </div>

                        </div>

                        <button className="my-button-border-style my-shadow-style lg:text-base text-[14px]">
                            View all taggers
                        </button>
                    </div>



                    {/* +++++++++++++++ RECENT MODELS ++++++++++++ */}
                    <div className="lg:col-span-3 flex flex-col justify-center mt-2 mb-16 w-full border rounded-lg shadow-md shadow-gray-500 px-8 py-6 hover:scale-105 duration-300 hover:border-2 hover:border-yellow-500">
                        <div className="text-header  mt-2 mb-10">
                            Recent Models
                        </div>


                        <div className="xl:grid xl:grid-cols-3 flex flex-col w-full gap-x-2 xl:gap-y-0 gap-y-6">
                            <div className="bg-black/10 flex flex-col w-full justify-between mx-auto border rounded-3xl p-4">
                                <div className="my-picture-style rounded-2xl mb-3 flex w-full h-[100px]">
                                    <img src={model_room} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                                </div>
                                
                                <h1 className="lg:text-[12px] sm:text-[12px] text-[9px] font-bold w-[80px] truncate">Big room</h1>
                                <h1 className="lg:text-[11px] sm:text-[11px] text-[8px] italic w-[80px] truncate">14 hrs ago</h1>

                                <button className="my-button-style my-shadow-style lg:text-[9px] lg:py-2 sm:py-3 py-2 sm:text-[13px] text-[9px]">
                                    View
                                </button>
                            </div>

                            <div className="bg-black/10 flex flex-col w-full justify-between mx-auto border rounded-3xl p-4">
                                <div className="my-picture-style rounded-2xl mb-3 flex w-full h-[100px]">
                                    <img src={model_room} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                                </div>
                                
                                <h1 className="lg:text-[12px] sm:text-[12px] text-[9px] font-bold w-[80px] truncate">Small Room...</h1>
                                <h1 className="lg:text-[11px] sm:text-[11px] text-[8px] italic w-[80px] truncate">14 hrs ago</h1>

                                <button className="my-button-style my-shadow-style lg:text-[9px] lg:py-2 sm:py-3 py-2 sm:text-[13px] text-[9px]">
                                    View
                                </button>
                            </div>

                            <div className="bg-black/10 flex flex-col w-full justify-between mx-auto border rounded-3xl p-4">
                                <div className="my-picture-style rounded-2xl mb-3 flex w-full h-[100px] ">
                                    <img src={model_room} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                                </div>
                                
                                <h1 className="lg:text-[12px] sm:text-[12px] text-[9px] font-bold w-[80px] truncate">Desi Factory...</h1>
                                <h1 className="lg:text-[11px] sm:text-[11px] text-[8px] italic w-[80px] truncate">14 hrs ago</h1>

                                <button className="my-button-style my-shadow-style lg:text-[9px] lg:py-2 sm:py-3 py-2 sm:text-[13px] text-[9px]">
                                    View
                                </button>
                            </div>

                        </div>

                        <button className="my-button-border-style my-shadow-style lg:text-base text-[14px] h-[60px]">
                            View all models
                        </button>
                    </div>
                </div> 




                {/* ++++++++++++++++ RECENTLY UPDATED ++++++++++++++++++ */}
                <div className="flex flex-col w-full gap-y-6 mt-4">
                    <div className="flex justify-between items-center w-full font-bold">
                        <h1>
                            Recently Updated
                        </h1>

                        <div className="cursor-pointer flex gap-x-2 items-center">
                            <h1 >
                                View all
                            </h1>

                            <h1 className="text-2xl -mt-1">
                                {`>`}
                            </h1>
                        </div>
                    </div>


                    <div className="mb-20 flex flex-col w-full items-center justify-center gap-y-4">
                        <div className="bg-black/10 my-hover-transition flex sm:flex-row flex-col sm:items-center justify-between w-full sm:h-[65px] p-3 border my-shadow-style rounded-xl">
                            <div className="flex items-center sm:justify-start justify-center sm:w-fit w-full gap-x-3">
                                <div className="my-picture-style w-[52px] h-[42px] rounded-xl flex">
                                    <img src={model_room2} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                                </div>

                                <div className="flex flex-col">
                                    <h1 className="font-medium sm:text-[20px] sm:w-[220px] truncate">
                                        Rose court factory
                                    </h1> 

                                    <h1 className="text-[12px] italic sm:w-[220px] truncate">
                                        21 Ruthy US
                                    </h1> 
                                </div>
                            </div>

                            <button className="sm:underline font-bold sm:h-fit h-[60px] sm:text-base sm:py-0 py-2 cursor-pointer flex sm:justify-start justify-center sm:items-start items-center text-[12px] sm:px-0 px-6 sm:text-black text-white sm:bg-transparent bg-black sm:mt-0 mt-6 sm:rounded-none rounded-3xl sm:border-none border sm:border-transparent border-white hover:bg-white hover:border hover:border-black hover:text-black hover:animate-pulse ">
                                View model
                            </button>
                        </div>




                        <div className="bg-black/10 my-hover-transition flex sm:flex-row flex-col sm:items-center justify-between w-full sm:h-[65px] p-3 border my-shadow-style rounded-xl">
                            <div className="flex items-center sm:justify-start justify-center sm:w-fit w-full gap-x-3">
                                <div className="my-picture-style w-[52px] h-[42px] rounded-xl flex">
                                    <img src={model_room2} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                                </div>

                                <div className="flex flex-col">
                                    <h1 className="font-medium sm:text-[20px]  sm:w-[220px] truncate">
                                        Marie Apartment
                                    </h1> 

                                    <h1 className="text-[12px] italic sm:w-[220px] truncate">
                                        21 Ruthy US
                                    </h1> 
                                </div>
                            </div>

                            <button className="sm:underline font-bold sm:h-fit h-[60px] sm:text-base sm:py-0 py-2 cursor-pointer flex sm:justify-start justify-center sm:items-start items-center text-[12px] sm:px-0 px-6 sm:text-black text-white sm:bg-transparent bg-black sm:mt-0 mt-6 sm:rounded-none rounded-3xl sm:border-none border sm:border-transparent border-white hover:bg-white hover:border hover:border-black hover:text-black hover:animate-pulse ">
                                View model
                            </button>
                        </div>

                    </div>

                </div>       
            </div>





            <NavHeader navTitle= {"Dashboard"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

        </div>




        <MobileMenu mobileMenu= {mobileMenu} sendActive= {"dashboard"}/>

       </div>
    );
  }
