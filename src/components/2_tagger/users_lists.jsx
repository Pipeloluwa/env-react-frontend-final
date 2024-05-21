import React, { useEffect, useState } from 'react'

import { RiDeleteBinLine } from "react-icons/ri";
// import SearchIcon from '@mui/icons-material/Search';

import { CircularProgress, MenuItem, Select } from "@mui/material";
import { access_token, handleGetCookie } from '../../api/cookies_logic';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { admins_gotten, api_root, selectAllValue, selected_admins, setSelectAllValue } from '../../api/api_variables';
import axios from 'axios';


const UsersLists = (props) => {
    const model_json_data= props.model_json_data;
    const cancel_delete_= props.cancel_delete_;
    const update_role= props.update_role;


    const role_= (user_id, user_role) => {
        let selectedRole= user_role;
        user_role === "Tagger" ? selectedRole="admin" : selectedRole="user";

        const roleJson= {"id": user_id, "role": selectedRole};
        update_role(roleJson);
    }


    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const navigate= useNavigate();



    const [selectStates1, setSelectStates1]= useState(false);
    const [selectStates2, setSelectStates2]= useState(false);
    const [selectStates3, setSelectStates3]= useState(false);
    const [selectStates4, setSelectStates4]= useState(false);
    const [selectStates5, setSelectStates5]= useState(false);
    
    const keepSelectStates= [[selectStates1,setSelectStates1], [selectStates2,setSelectStates2], [selectStates3,setSelectStates3], [selectStates4,setSelectStates4], [selectStates5,setSelectStates5]];


    //+++++++ IF at the end of the useEffect callback, the [] is not supplied, it will automatically triggers on any state changes.
    useEffect( () => {
        admins_gotten.length= 0;
        selected_admins.length= 0;

        setSelectAllValue(false);

        setSelectStates1(false);
        setSelectStates2(false);
        setSelectStates3(false);
        setSelectStates4(false);
        setSelectStates5(false);
    },[model_json_data.length]);

    // useEffect( () => {
    //     alert("Hey")
    // },[selected_admins.length]);

    const single_delete = (item_id) => {
        cancel_delete_(item_id);
    }

    const selectValue_= (index) => {
        if (!selected_admins.includes(index)){
            selected_admins.push(index);
        }
        else{
            const get_index= selected_admins.indexOf(index);
            selected_admins.splice(get_index, 1);
        }

        // console.log(selected_admins);
    }


    const selectAllValue_= () => {
        if (!selectAllValue){
            selected_admins.length= 0;
      
            model_json_data[0].map(item => (
                selected_admins.push(item.id)
            ));

            setSelectStates1(true);
            setSelectStates2(true);
            setSelectStates3(true);
            setSelectStates4(true);
            setSelectStates5(true);

        }
        else{
            selected_admins.length= 0;
            
            setSelectStates1(false);
            setSelectStates2(false);
            setSelectStates3(false);
            setSelectStates4(false);
            setSelectStates5(false);

        }

        setSelectAllValue(!selectAllValue);
        // console.log(selected_admins);
    }

      





    return (
        <div className="relative top-[100px] flex flex-col gap-y-4 w-full">
            <flex className='text-sm flex justify-between absolute left-0 right-0 top-0 items-center border py-1 px-2'>
                
                <flex onClick={e => {selectAllValue_()}} className= "cursor-pointer flex items-center gap-x-3 ">
                    <input checked={selectAllValue} type='checkbox' className='size-5'/>
                    <h1>Select All</h1>
                </flex>

                <button onClick={e => {cancel_delete_()}} className={`${selected_admins.length === 0 ? "opacity-35 pointer-events-none " : ""}rounded-3xl my-shadow-style text-white bg-red-500 sm:px-8 px-5 sm:py-2 py-1 hover:bg-black/75 hover:text-red-500 font-medium `}>
                    Delete
                </button>
            </flex>

            <br />
            <br />

            {
                model_json_data.length !== 0
                    ? 

                    
                    model_json_data[0].map((item, index) => (
                        <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 sm:px-2 px-2 border rounded-xl">     
                            <div className="sm:relative sm:flex sm:justify-between md:hidden hidden">
                                <input checked={keepSelectStates[index][0]} onClick={e => {selectValue_(item.id); keepSelectStates[index][1](!keepSelectStates[index][0])}} type='checkbox'  className='size-5'/>
                                <RiDeleteBinLine onClick={e => {single_delete(item.id)}} className=" hover:bg-gray-300 rounded-full text-red-700 flex scale-[150%] cursor-pointer"/>
                            </div>



                            <div className="md:flex md:pr-4 sm:hidden flex justify-between ">
                                {/* ++++++++++++++++++++++++++ I PUT Z-10 TO MAKE THE CHECKBUTTON CLICKABLE  BECAUSE THE DIV ELEMENT THAT FOLLOWS IT PREVENTS IT FROM  RECEIVING POINTER +++++++++++++ */}
                                <input checked={keepSelectStates[index][0]} onClick={e => {selectValue_(item.id); keepSelectStates[index][1](!keepSelectStates[index][0])}} type='checkbox'  className='z-10 size-5'/>
                                <RiDeleteBinLine onClick={e => {single_delete(item.id)}} className="sm:hidden text-red-700  flex scale-[150%] cursor-pointer"/>
                            </div>

                            <div className="sm:-mt-0 -mt-4 flex items-center md:justify-start justify-center md:w-fit w-full">  
                                <div className="flex md:flex-row flex-col gap-x-3 items-center">
                                    <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                                        <LazyLoadImage 
                                            src={item.profile_picture} 
                                            onLoad={e => {setIsImageLoaded(true)}}
                                            className={`${!isImageLoaded ? "animate-pulse bg-gray-500 px-4 py-4 object-cover w-full h-full" : "my-image-cover-style w-[100%] h-[100%] flex"} `}
                                        />
                                        {/* <img onLoad={e => {setIsImageLoaded(true)}} src={item.profile_picture} className={`${!isImageLoaded ? "animate-pulse bg-gray-500 px-4 py-4 object-cover w-full h-full" : "my-image-cover-style w-[100%] h-[100%] flex"} `}/> */}
                                    </div>

                                    <div className="flex flex-col w-[190px] md:pr-3">
                                        <h1 className="md:text-start text-center text-[20px] truncate">
                                            {item.username}
                                        </h1> 

                                        <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                            {item.role === "admin" ? "tagger" : "reviewer"}
                                        </h1> 
                                    </div>
                                </div>

                            </div>



                            <div className='text-center md:mt-0 mt-3 text-sm'>
                                Reg Date: {item.registration_date}
                            </div>

                            <div className="flex md:mt-0 mt-6 md:w-fit w-full mx-auto">
                                <select value= {item.role === "admin" ? "Tagger" : "Reviewer"}  onChange={e => {role_(item.id, e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px] h-[60px] md:h-fit">
                                    <option >Tagger</option>
                                    <option >Reviewer</option>
                                </select>

                            </div>


                            <div className="flex items-center gap-x-6 md:w-fit w-full">
                                <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white h-[60px] md:h-fit">
                                    View Profile
                                </button>

                                <RiDeleteBinLine onClick={e => {single_delete(item.id)}} className="hover:bg-gray-300 rounded-full text-red-700 md:flex hidden scale-[150%] cursor-pointer"/>
                            </div>
                        </div>
                    ))
                    

                    : 

                    <grid className= "grid grid-rows-3 gap-y-4">
                        <div className="animate-pulse bg-gray-500 h-36 flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl" />
                        <div className="animate-pulse bg-gray-500 h-36 flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl" />
                        <div className="animate-pulse bg-gray-500 h-36 flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl" />
                    </grid>
            }  

        </div>



    )
}

export default UsersLists;