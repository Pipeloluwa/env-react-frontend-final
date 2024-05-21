import { useEffect, useState } from "react";
import DesktopMenu from "../../components/1_super_admin/desktop_menu";
import HistogramChartSuperAdmin from "../../components/1_super_admin/histogram_chart_super_admin";
import UsersLists from "../../components/1_super_admin/users_lists";
import PieChartSuperAdmin from "../../components/1_super_admin/pie_chart_super_admin";
import MobileMenu from "../../components/1_super_admin/mobile_menu";
import { FaSearch } from "react-icons/fa";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavHeader from "../nav_header";
import axios from "axios";
import { admins_gotten, api_root, keep_json_data, keep_json_data_tracker, selected_admins, set_admins_gotten } from "../../api/api_variables";
import { DeleteForever } from "@mui/icons-material";
import { IoCheckmarkDoneCircle, IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { getCookie } from "../../api/cookies_logic";


export default function SuperUsersManagement(){
    var access_token;
    

    const handleGetCookie = () => {
        // Retrieve the value of the "exampleCookie" cookie
        access_token = getCookie('access_token');
    };


    const navigate= useNavigate();

    const [mobileMenu, setMobileMenu]= useState(false);
    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }

    const navigate_add_user = (e) => {
        navigate("/admin-user-add", {relative: true});
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
        keep_json_data.length= 0;

        keep_json_data.length= 0;
        if (res.data.length !== 0){
            keep_json_data.push(res.data);
        }
        

        if (res.data.length === 0){
            keep_json_data_tracker.length= 0;
            keep_json_data_tracker.push(true);
        }
        else{
            keep_json_data_tracker.length= 0;
            keep_json_data.length === 0 ? keep_json_data_tracker.push(false) : keep_json_data_tracker.push(true);
        }


    };


    const [is_admin_delete, set_is_admin_delete]= useState(false);



    useEffect(() => {

        if (keep_json_data.length === 0){
          handleGetCookie();
          const login_role = getCookie('login_role');
          if (access_token === null){
            navigate('/', {relative: true});
            }
          if (login_role !== "superuser"){
            navigate(-1);
          }

    
          else{
              axios.get(api_root + 'admin/get-all-users', {
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

      const [showUpdateProcessed, setshowUpdateProcessed]= useState(false);
      const [showUpdateProcessing, setshowUpdateProcessing]= useState(false);
      const [cancel_delete, setDelete]= useState(false);





    //   +++++++++++ UPDATE USER ++++++++++
      const update_role = (admin_data) => {

        // console.log(selected_admins);

        handleGetCookie();
        if (access_token === null){
            navigate('/', {relative: true});
        }
        
        else{
            axios.request(
                {
                    method: 'put',
                    url: api_root + "admin/update-user-role",
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'application/json'
                    },

                    data: admin_data
                }
            )
            .then((response) => {
                keep_json_data.length= 0;
                admins_gotten.length= 0;
                selected_admins.length= 0;

                set_is_admin_delete(!is_admin_delete);
                setshowUpdateProcessing(false);
                setshowUpdateProcessed(true);
            })
            .catch((e) => {
                if (e.response.status === 404){
                    api_error_disp_("This data does not exist or has alread been deleted on the database")
                }
        
                else if (e.message === "Network Error"){
                    api_error_disp_(e)
                }
        
                else{
                    api_error_disp_(e);
                }
                

                setshowUpdateProcessing(false);
            });
            setshowUpdateProcessing(false);

        }
      }







    //   ++++++++++ DELETE USER +++++++++
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

        access_token = getCookie('access_token');
        if (access_token === null){
            navigate('/', {relative: true});
        }
        
        else{
            console.log(admins_gotten);
            axios.request(
                {
                    method: 'delete',
                    url: api_root + "admin/delete-admin",
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'application/json'
                    },

                    data: admins_gotten
                }
            )
            .then((response) => {
                keep_json_data.length= 0;
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
        <div className="lg:grid lg:grid-cols-5 relative flex w-screen h-screen overflow-hidden">
            
            {/* ++++++++++++++++++ FULLSCREEN NAV +++++++++++++++++ */}
            <DesktopMenu sendActive= {"users"}/>


            {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
            <div className="relative overflow-y-scroll lg:col-span-4 flex flex-col w-full">
                {/* ++++++++++++++++++++ ADD USER BUTTON ++++++++++ */}


                <div className="my-screen-padding absolute md:top-0 top-6 left-0 right-0 grid grid-rows-4 w-full h-screen">
                    <div className="flex flex-col w-full">


                        {/* +++++++++++++ SEARCH INPUT +++++++++ */}
                        <div className="relative top-12 flex items-center w-full">
                            <input type="text" placeholder="Search users" className="absolute border rounded-3xl p-4 w-full sm:h-[53px] h-[40px] my-shadow-style sm:focus:pl-[68px] focus:pl-[40px] focus:placeholder-transparent sm:pl-[64px] pl-[35px] sm:text-base text-sm"/>

                            <FaSearch className="absolute left-0 sm:mx-[30px] mx-[12px] scale-[130%] text-gray-500"/>

                            <button className="my-button-style sm:text-[18px] text-sm my-0 absolute right-0 sm:py-[16px] sm:px-[29px] px-2 sm:h-[55px] h-[43px] ">Search</button>
                        </div>



                        {/* +++++++ USERS LIST ++++++++++ */}
                        <UsersLists model_json_data= {keep_json_data} model_json_data_tracker= {keep_json_data_tracker} cancel_delete_= {cancel_delete_} update_role= {update_role}/>

                    </div>

                </div>




                <button onMouseLeave={(e) => {setFloatButtonHelp(false)}} onMouseEnter={(e) => {setFloatButtonHelp(true)}} onClick={ (e) => {navigate_add_user(e)}} className="fixed sm:right-[50px] right-[12px] w-[60px] bottom-8 my-small-button-style my-black-button-color-style  my-shadow-style flex items-center rounded-full text-2xl">
                    +
                </button>
                
                {floatButtonHelp 
                    ? 
                    <h1 className="fixed right-[43px] sm:flex hidden bottom-[95px] text-white bg-black rounded-xl px-2 text-sm font-medium text-center">Add User</h1>
                    : ""
                }






                
                {/* +++++++++++ DELETE PROMPT +++++++++ */}
                {
                    !showProcessed 
                        ? 
                        
                            cancel_delete 
                            ? 
                            <div id="shadow_delete2"  onClick={(e) => {if(e.target.id === "shadow_delete2"){cancel_delete_();}}} className='bg-black/55 fixed flex items-center justify-center w-full h-full top-0 bottom-0'>
                                <div className="fixed left-0 right-0 sm:mx-auto bg-white flex flex-col justify-center py-8 px-2 rounded-2xl my-shadow-style items-center md:w-[400px] sm:w-[300px] w-[80%] mx-auto h-[250px]">
                                    {
                                        !showProcessing
                                        ?
                                        <flex className="flex flex-col gap-y-4 items-center justify-center w-full h-full">      
                                            <DeleteForever className="text-red-700 scale-[150%]"/>
                                            <h1 className="text-center text-md font-medium">Are you sure you want to delete this user?</h1>

                                            <flex className="flex gap-x-12">
                                                <button onClick={(e) => {continue_delete_();}} className=" bg-white border hover:bg-black my-shadow-style hover:text-white w-[70px] rounded-3xl">Yes</button>
                                                <button onClick={ (e) => {cancel_delete_();}} className="my-shadow-style text-white bg-red-700 hover:bg-red-500 w-[70px] rounded-3xl">No</button>
                                            </flex>
                                        </flex>
                                        
                                        
                                        :
                                        <flex className="text-md font-medium flex flex-col gap-y-4 justify-center items-center">
                                            
                                            <CircularProgress />
                                            Deleting ...
                                        </flex>
                                    }


                                </div>
                            </div>

                            : ""

                        : ""
                    }




                {/* +++++++++++++++++ DELETED SUCCESFULLY ++++++++ */}
                {
                    showProcessed 
                        ? 
                        <div  id="shadow_id2" onClick={(e) => {if(e.target.id === "shadow_id2"){setshowProcessed(false);}}} className="cursor-pointer pointer-events-auto bg-black/55 fixed top-0 bottom-0 left-0 right-0">
        
                            <div className="flex flex-col gap-y-3 items-center justify-center absolute bg-white sm:top-20 top-40 bottom-0 left-0 right-0 sm:h-[70%] h-[50%] md:w-[400px] sm:w-[300px] w-[80%] px-2 mt-[50px] mx-auto my-shadow-style">
                                <IoCheckmarkDoneCircleOutline className="size-[100px] text-green-600"/>

                                <h1 className="text-center text-black sm:text-2xl text-base">
                                        Deleted Successfully
                                </h1>
                            </div>
                        
                        </div>

                        : ""
                }


                {/* +++++++++++ ERROR MESSAGE +++++++++++ */}
                {
                    api_error_disp !== "" 
                    ? 
                    <div id="shadow_id3" onClick={(e) => {if(e.target.id === "shadow_id3"){set_api_error_disp("")}}} className="fixed cursor-pointer pointer-events-auto bg-black/55 flex items-center top-0 bottom-0 left-0 right-0 ">
                        <div className="fixed left-0 right-0 mx-auto bg-white flex flex-col justify-center py-8 px-2 rounded-2xl my-shadow-style items-center md:w-[400px] sm:w-[300px] w-[80%] h-[250px]">

                            <h1 className="text-center text-red-700 text-md ">
                                    {api_error_disp}
                            </h1>

                            {/* <Close onClick={(e) => {setshowProcessed(true)}} className="my-hover-circle absolute top-0 right-0 m-4 rounded-full bg-white text-red-700 my-shadow-style"/> */}
                        </div>
                    </div>

                    : ""
                }


                <NavHeader navTitle= {"Users"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

            </div>





        
            {/* +++++++++++ LINEAR PROGRESS BAR ++++++++ */}
            <div className={`${showUpdateProcessing ? "fixed h-full flex bg-black/50 top-0 bottom-0 left-0 right-0" : ""}`} />
            {
                showUpdateProcessing 
                    ? 
                    <Box sx= {{width: "100%"}} className="fixed left-0 right-0 ">
                        <LinearProgress />
                    </Box>
                : ""
            }


            {/* +++++++++++++++++ UPLOADED SUCCESFULLY ++++++++ */}
            {
                showUpdateProcessed 
                    ? 

                    <div id="shadow_id_update" onClick={(e) => {if(e.target.id === "shadow_id_update"){setshowUpdateProcessed(false);}}} className="cursor-pointer pointer-events-auto bg-black/55 fixed h-full top-0 bottom-0 left-0 right-0">
                        {/* onBlur={(e) => {setshowProcessed(true)}} */}
                        {/* <button>  */}
                            <div onClick={(e) => {}} className="flex flex-col gap-y-3 items-center justify-center absolute bg-white sm:top-20 top-40 bottom-0 left-0 right-0 sm:h-[70%] h-[50%] md:w-[400px] sm:w-[300px] w-[80%] px-2 mt-[50px] mx-auto my-shadow-style">
                                <IoCheckmarkDoneCircle className="size-[100px] text-green-600"/>

                                <h1 className="text-center text-black sm:text-2xl text-base">
                                        User role was changed succcessfully
                                </h1>

                                {/* <Close onClick={(e) => {setshowProcessed(true)}} className="my-hover-circle absolute top-0 right-0 m-4 rounded-full bg-white text-red-700 my-shadow-style"/> */}
                            </div>
                        {/* </button> */}
                    </div>

                    : ""
            }


            <MobileMenu mobileMenu= {mobileMenu} sendActive= {"users"} />

        </div>
    );
}