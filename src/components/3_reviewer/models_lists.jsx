import React, { useEffect, useState } from 'react'

import { RiDeleteBinLine } from "react-icons/ri";
// import SearchIcon from '@mui/icons-material/Search';

import { CircularProgress, MenuItem, Select } from "@mui/material";
import { access_token, handleGetCookie } from '../../api/cookies_logic';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { admins_gotten, api_root, selectAllValue, selected_admins, setSelectAllValue } from '../../api/api_variables';
import axios from 'axios';


const ModelsLists = (props) => {
    const model_json_data= props.model_json_data;
    const model_json_data_tracker= props.model_json_data_tracker;
    const cancel_delete_= props.cancel_delete_;

    const [role, setRole]= useState("Tagger");
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    const navigate= useNavigate();
    const navigate_add_objects= (model_name) => {
        navigate(`/add-objects-model/${model_name.toUpperCase().trim()}`, {relative: true});
    }

    const navigate_view_objects= (model_name) => {
        navigate(`/view-objects-model/${model_name.toUpperCase().trim()}`, {relative: true});
    }



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

            {
                model_json_data_tracker[0] === false
                ? <h1 className='font-medium text-xl text-center'>No Model available!</h1>


                :model_json_data.length !== 0
                    ? 

                    <grid className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-x-4 gap-y-6">
                        {
                            model_json_data[0].map((item, index) => (
                                    <div className='p-2 rounded-xl border my-shadow-style2 overflow-hidden flex flex-col w-full justify-center items-center gap-y-2'>
                                        
                                        <div className='relative w-full h-[160px] rounded-xl overflow-hidden'>
                                            <LazyLoadImage 
                                                src={item.picture_cover} 
                                                onLoad={e => {setIsImageLoaded(true)}}
                                                className={`${!isImageLoaded ? "animate-pulse bg-gray-500 px-4 py-4 object-cover w-full h-full" : "absolute my-image-cover-style w-[100%] h-[100%] flex"} `}
                                            />

                                            <div className='opacity-0 hover:opacity-100 hover:scale-105 hover:transition hover:duration-300 flex flex-col items-center justify-center absolute text-white bg-black/60 w-full h-full p-2'>
                                                <h1 className='text-lg font-medium'>
                                                    {item.id}
                                                </h1>

                                                <div className='flex flex-col w-full px-2 items-center justify-center overflow-hidden mt-3 text-sm italic font-mono'>
                                                    <h1 className='truncate w-full text-wrap'>
                                                        {item.description_model}
                                                    </h1>

                                                    <h1 className='truncate w-full text-wrap'>
                                                        Date & Time: {item.date_and_time_of_sample}
                                                    </h1>
                                                </div>

                                            </div>

                                        </div>


                                        <button onClick={(e) => {navigate_view_objects(item.id)}} className='my-small-button-style my-black-button-color-style w-full'>
                                            View Model
                                        </button>

                                    </div>

                            ))
                        }
                    </grid>
                    

                    : 

                    <grid className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-4 gap-y-6">
                        <div className="animate-pulse bg-gray-500 h-[250px] rounded-xl" />
                        <div className="animate-pulse bg-gray-500 h-[250px] rounded-xl" />
                        <div className="animate-pulse bg-gray-500 h-[250px] rounded-xl" />
                    </grid>
            }  

        </div>



    )
}

export default ModelsLists;