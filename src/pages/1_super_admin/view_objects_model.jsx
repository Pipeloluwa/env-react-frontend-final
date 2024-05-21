
import { IoCheckmarkDoneCircle, IoSearchSharp } from "react-icons/io5";

import { useEffect, useState } from "react";
import { FirstJsonClass, api_root, keep_current_object, keep_for_edit_name, keep_for_edit_url, keep_for_object_view, keep_for_view_url, keep_m_name, keep_objects_data, keep_objects_data_reference, keep_objects_reference, reset_values, store_first_json, store_form_data } from "../../api/api_variables";
import { ViewAnimation } from "../../animation_three_js/view_animation";


import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import background from '../animation_three_js/assets/images/background2.jpg';
import { ModelAnimation } from "../../animation_three_js/animation_components/model_animation";
import { AmbientLight } from "../../animation_three_js/animation_components/ambient_light";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteCookie } from "../../api/delete_cookie";
import DesktopMenu from "../../components/1_super_admin/desktop_menu";
import NavHeader from "../nav_header";
import MobileMenu from "../../components/1_super_admin/mobile_menu";
import { getCookie } from "../../api/cookies_logic";
import { BsBoxArrowUp } from "react-icons/bs";
import { LinearProgress } from "@mui/material";



export default function ViewObjectsModel() {
      const { dynamicParam } = useParams();


      const navigate= useNavigate();

      function home_page_(event){
          // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
          navigate('/', {relative: true});
      }
    

      const keep_for_model_file= [];

      const [has_loaded, set_has_loaded]= useState(false);
      const model_json_data_= (res) => {
          set_has_loaded(false);

          keep_for_object_view.length= 0;

          reset_values();

          const get_for_object_view= res.data;
            
          keep_for_model_file.push(get_for_object_view['file_model']);

          keep_for_view_url.push(get_for_object_view['file_model']);

          for (let i =0; i < get_for_object_view['objects_relationship'].length; i++){
            const get_object= get_for_object_view['objects_relationship'][i];
            keep_for_object_view[get_object['object_name']]= get_object;
          }

          set_has_loaded(true);
      };

      const [is_expired, set_is_expired]= useState(false);
      const is_expired_ = (e) => {
          if (e.code === "ERR_BAD_REQUEST"){
              handleDeleteCookie();
              set_is_expired(true)
          }
          else{set_is_expired(false)}
      }



      let access_token;

      const handleGetCookie = () => {
          access_token = getCookie('access_token');
      };
  

      useEffect(() => {
        handleGetCookie();
        const login_role = getCookie('login_role');
        if (access_token === null){
          navigate('/', {relative: true});
          }
        if (login_role !== "superuser"){
            navigate(-1);
        }


        else{
            const req= axios.request(
                {
                    method: 'get',
                    timeout: 450000,
                    // maxBodyLength: Infinity,
                    url: api_root + 'home-models/get-a-model/'+dynamicParam,
                    headers: { 
                      'Authorization': access_token,
                      'Content-Type': 'application/json'
                    }
                    
                }
            )
            .then(res => model_json_data_(res))
            .catch((error) => {
                // is_expired_(error);
                console.log(error);
            });

        }
    }, []); 




    const [mobileMenu, setMobileMenu]= useState(false);
    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }
  
  
  
  
    const [listeria, set_listeria]= useState('');
    const [apc, set_apc]= useState('');
    const [salmonella, set_salmonella]= useState('');
    const [date_, set_date_]= useState('');
    const [time_, set_time_]= useState('');
    const [type_, set_type_]= useState('');
    const [comment_, set_comment_]= useState('');
  

    let [is_double_clk, set_is_double_clk]= useState(false);

    const notify_double_click= (value, state_value) => {
      set_is_double_clk(state_value);
    }




    let [show_obj_d, set_show_obj_d] =useState({});
    const show_obj_d_= (obj) => {
      try{
        if (obj){ 
          notify_double_click(true);

          set_listeria(keep_for_object_view[obj].listeria);
          set_apc(keep_for_object_view[obj].apc);
          set_salmonella(keep_for_object_view[obj].salmonella);
          set_date_(keep_for_object_view[obj].date_of_sample);
          set_time_(keep_for_object_view[obj].time_of_sample);
          set_type_(keep_for_object_view[obj].type_of_sample);
          set_comment_(keep_for_object_view[obj].comment_box);
          // alert(keep_objects_data_reference[obj].comment_box);
        }

        else{
          notify_double_click(false);

          set_listeria("");
          set_apc("");
          set_salmonella("");
          set_date_("");
          set_time_("");
          set_type_("");
          set_comment_("");
        
        }
      }
      catch{}
    }






  


    
  return (
    <div className="relative flex w-screen h-screen overflow-hidden">

      {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
      <div className="overflow-hidden flex flex-col h-screen w-full">
        <NavHeader navTitle= {"Models"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>
        
        <div className=" flex w-full h-full">    
          <div className="bg-black h-full w-full">
            {
                has_loaded 
                  ?
                    <ViewAnimation show_obj_= {show_obj_d_} for_object_view= {keep_for_object_view} for_model_file= {keep_for_model_file}/>
                  
                  : ""
              }
          </div>


          <div className={"overflow-scroll w-[400px] h-full pt-4 bg-white"}>
            <div className="flex flex-col w-full px-4 mb-[200px]">
                <h1 className="text-lg font-medium">
                  Input Model Data
                </h1>

                <div className="pointer-events-none flex flex-col mt-[30px] gap-y-3 text-sm">
                  <div className='pointer-events-none opacity-30 flex flex-col'>
                      <label className='pl-2'>
                          Name of tagger:
                      </label>

                      <input type='text' placeholder='Enter the tagger here' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Location:
                      </label>

                      <input type='text' placeholder='Enter the location here' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className="flex flex-col">
                      <label className='pl-2'>
                        Listeria:
                      </label>

                      <select value={listeria} onChange={e => {set_listeria(e.target.value)}}  className="cursor-pointer w-full border shadow border-gray-300 rounded-2xl h-[47px] pl-1">
                          <option >Positive</option>
                          <option >Negative</option>
                      </select>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        APC:
                      </label>

                      <input value={apc} onChange={e =>  {e.target.value <1001 ?  set_apc(e.target.value) : e.target.value=1000}} type="number" min={0} max={1000} placeholder="0 - 1000"  className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className="flex flex-col">
                      <label className='pl-2'>
                        Salmonella:
                      </label>

                      <select className="cursor-pointer w-full border shadow border-gray-300 rounded-2xl h-[47px] pl-1">
                          <option >Positive</option>
                          <option >Negative</option>
                      </select>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Date:
                      </label>

                      <input value={date_} onChange={e => {set_date_(e.target.value)}} type='date' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Time:
                      </label>

                      <input value={time_} onChange={e => {set_time_(e.target.value)}} type='time' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Type of sample:
                      </label>

                      <input  value={type_} onChange={e => {set_type_(e.target.value)}} type="text"  placeholder="Type here" className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Comment Box:
                      </label>

                      <textarea  value={comment_} onChange={e => {set_comment_(e.target.value)}} type="text" min={0} max={1000} placeholder="Type here"  className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='pointer-events-none opacity-30 flex flex-col'>
                      <label className='pl-2'>
                        Evidence:
                      </label>

                      <div className={`cursor-pointer relative hover:bg-black/60 hover:border-white hover:text-white sm:mt-2 flex flex-col w-full justify-center items-center gap-y-4 border-2 border-gray-400 border-dashed py-8 px-2 rounded-2xl`}>
                          <BsBoxArrowUp className="size-10"/>
                          
                          <div className="flex flex-col gap-y-2 items-center">
                              <h1 className="font-bold text-center">( Click to view file )</h1>
                          </div>

                      </div>
                  </div>

                </div>

            </div>
          </div>


        </div>


      </div>


      <MobileMenu mobileMenu= {mobileMenu} sendActive= {"models"} />
  </div>
  );
  }
