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

import MobileMenu from "../../components/2_tagger/mobile_menu";
import NavHeader from "../nav_header";
import { api_root, bearer_token, keep_json_data } from "../../api/api_variables";
import SessionExpired from "../../components/2_tagger/session_expired";
import { handleDeleteCookie } from "../../api/delete_cookie";
import DesktopMenu from "../../components/2_tagger/desktop_menu";
import PieChartSuperAdmin from "../../components/2_tagger/pie_chart_super_admin";
import HistogramChartSuperAdmin from "../../components/2_tagger/histogram_chart_super_admin";
import { getCookie } from "../../api/cookies_logic";




export let selected_models= [];

export default function TaggerManagement() {
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

        alert(access_token);
    };

    

    useEffect(() => {
        selected_models=[];

        access_token = getCookie('access_token');
        const login_role = getCookie('login_role');
        if (access_token === null){
            navigate('/', {relative: true});
            }
        if (login_role !== "admin"){
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
     
            </div>





            <NavHeader navTitle= {"Dashboard"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

        </div>




        <MobileMenu mobileMenu= {mobileMenu} sendActive= {"dashboard"}/>

       </div>
    );
  }
