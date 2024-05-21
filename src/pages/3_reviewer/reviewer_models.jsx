import { useEffect, useState } from "react";
import DesktopMenu from "../../components/2_tagger/desktop_menu";
import HistogramChartSuperAdmin from "../../components/2_tagger/histogram_chart_super_admin";
import PieChartSuperAdmin from "../../components/2_tagger/pie_chart_super_admin";
import MobileMenu from "../../components/2_tagger/mobile_menu";
import { FaSearch } from "react-icons/fa";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavHeader from "./nav_header";
import axios from "axios";
import { admins_gotten, api_root, keep_json_data_model, keep_json_data_model_tracker, selected_admins, set_admins_gotten } from "../../api/api_variables";
import { DeleteForever } from "@mui/icons-material";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ModelsLists from "../../components/3_reviewer/models_lists";
import { getCookie } from "../../api/cookies_logic";


export default function ReviewerModels(){
    var access_token;
    

    const handleGetCookie = () => {
        // Retrieve the value of the "exampleCookie" cookie
        access_token = getCookie('access_token');
    };

    const [mobileMenu, setMobileMenu]= useState(false);

    const navigate= useNavigate();

    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }

    const navigate_add_model = (e) => {
        navigate("/tagger-model-add", {relative: true});
    }



    const [is_expired, set_is_expired]= useState(false);
    const is_expired_ = (e) => {
      if (e.code === "ERR_BAD_REQUEST"){
          set_is_expired(true)
      }
      else{set_is_expired(false)}
    }


    const [refreshState, setRefreshState]= useState();
    const model_json_data_= (res) => {
        // ++++++++++++++ I HAVE TO REFRESH THE STATE SO THAT AFTER THE KEEP_JSON_DATA IS POPULATED, IT WILL DISPLAY ON THE SCREEN ++++++++++++
        setRefreshState("");

        keep_json_data_model.length= 0;
        if (res.data.length !== 0){
            keep_json_data_model.push(res.data);
        }
        
        keep_json_data_model_tracker.length= 0;
        keep_json_data_model.length === 0 ? keep_json_data_model_tracker.push(false) : keep_json_data_model_tracker.push(true);
    };


    const [is_admin_delete, set_is_admin_delete]= useState(false);

    useEffect(() => {

        if (keep_json_data_model.length === 0){
          handleGetCookie();
          const login_role = getCookie('login_role');
          if (access_token === null){
              navigate('/', {relative: true});
          }
          if (login_role !== "user"){
            navigate(-1);
          }
    
          else{
              axios.get(api_root + 'home-models/get-all-models', {
                  headers: {
                      'Authorization': access_token,
                      'Content-Type': 'application/json', // Add other headers if needed
                    },
              }).then(res => {model_json_data_(res); })
              .catch(e => is_expired_(e));
          }
        }
    
      }, [access_token, is_admin_delete]); 




      const [api_error_disp, set_api_error_disp]= useState('');
      const api_error_disp_= (e) => {
        try{
          set_api_error_disp(e.response.data.detail);
        }
        catch(e){
          set_api_error_disp("Sorry, something went wrong, try again later");
        } 
        setshowProcessing(false);
      }


      const [showProcessed, setshowProcessed]= useState(false);
      const [showProcessing, setshowProcessing]= useState(false);
      const [cancel_delete, setDelete]= useState(false);

      const cancel_delete_= (admin_id) => {
        admins_gotten.length= 0;

        if (admin_id){admins_gotten.push(admin_id);}
        else{
            set_admins_gotten(selected_admins);
        }

        setDelete(!cancel_delete);
      }

      
      
      const continue_delete_= () => {
        setDelete(!cancel_delete);
        setshowProcessing(true);
        // console.log(selected_admins);

        handleGetCookie();
        if (access_token === null){
            navigate('/', {relative: true});
        }
        
        else{
            console.log(admins_gotten);
            axios.request(
                {
                    method: 'delete',
                    url: api_root + "admin/delete-model-super-admin",
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'application/json'
                    },

                    data: admins_gotten
                }
            )
            .then((response) => {
                keep_json_data_model.length= 0;
                admins_gotten.length= 0;
                selected_admins.length= 0;

                set_is_admin_delete(!is_admin_delete);
                
                setshowProcessing(false);
                setshowProcessed(true);
            })
            .catch((e) => {
                if (e.response.status === 404){
                    api_error_disp_(e)
                }
        
                else if (e.message === "Network Error"){
                    api_error_disp_(e)
                }
        
                else{
                    api_error_disp_("Sorry, Something went wrong");
                }
                
                cancel_delete_();

                setshowProcessing(false);
            });
            setshowProcessing(false);

        }
      }


      const [floatButtonHelp, setFloatButtonHelp]= useState(false);


    return (
        <div className="lg:grid lg:grid-cols-4 relative flex w-screen h-screen overflow-hidden">
            

        {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
        <div className="relative overflow-y-scroll lg:col-span-4 flex flex-col w-full">
            {/* ++++++++++++++++++++ ADD USER BUTTON ++++++++++ */}

            <div className="my-screen-padding md:px-40 absolute md:top-0 top-6 left-0 right-0 grid grid-rows-4 w-full h-screen">
                <div className="flex flex-col w-full">

                    
                    {/* +++++++++++++ SEARCH INPUT +++++++++ */}
                    <div className="relative top-12 flex items-center w-full">
                        <input type="text" placeholder="Search users" className="absolute border rounded-3xl p-4 w-full h-[53px] my-shadow-style sm:focus:pl-[68px] focus:pl-[40px] focus:placeholder-transparent sm:pl-[64px] pl-[35px] sm:text-base text-sm"/>

                        <FaSearch className="absolute left-0 sm:mx-[30px] mx-[12px] scale-[130%] text-gray-500"/>

                        <button className="my-button-style sm:text-[18px] text-sm my-0 absolute right-0 sm:py-[16px] sm:px-[29px] px-2 h-[55px]">Search</button>
                    </div>



                    {/* +++++++ MODELS LIST ++++++++++ */}
                    <ModelsLists model_json_data= {keep_json_data_model} model_json_data_tracker= {keep_json_data_model_tracker} cancel_delete_= {cancel_delete_}/>



                </div>

            </div>

            <NavHeader navTitle= {"Models"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

        </div>


    </div>
    );
}