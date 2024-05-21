import Group from "../../assets/images/Group.png";
import { FaCircleUser } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { api_root, keep_json_data, keep_user_data } from "../../api/api_variables";
import { getCookie } from "../../api/cookies_logic";
import axios from "axios";
import { handleDeleteCookie } from "../../api/delete_cookie";


export default function NavHeader (props) {
    const titleMenuProp_= props.navTitle;
    const mobileMenuProp_= props.mobileMenuProp_;
    const mobileMenu= props.mobileMenu;

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const navigate= useNavigate();


    const Logout= () => {
        handleDeleteCookie();
        navigate("/");
    }


    var access_token;
    

    const handleGetCookie = () => {
        // Retrieve the value of the "exampleCookie" cookie
        access_token = getCookie('access_token');
    };

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
        keep_user_data.push(res.data);
    };


    useEffect(() => {

        if (keep_user_data.length === 0){
          handleGetCookie();
          if (access_token === null){
              navigate('/', {relative: true});
          }
    
          else{
              axios.get(api_root + 'admin/get-user', {
                  headers: {
                      'Authorization': access_token,
                      'Content-Type': 'application/json', // Add other headers if needed
                    },
              }).then(res => {model_json_data_(res); })
              .catch(e => is_expired_(e));
          }
        }
    
      }, []); 


    {/* ++++++++++++++++++++++ HEADER +++++++++++++++++ */}
    {/*IF YOU APPLY STICKY TO AN ELEMENT, IT WILL SCROLL BUT WHEN IT GETS TO THE TOP IT STICKS*/}
    return (
        <div className="sticky top-0 lg:py-4 py-2 lg:px-16 sm:px-10 px-3 border sm:gap-x-8 bg-green-100 flex justify-between items-center shadow-md">
            
            <div className='flex items-center gap-x-4 md:w-full'>
                <button onClick={(e) => {Logout(e)}} className='border p-[4px] rounded-full bg-black/20 hover:bg-white my-shadow-style'>
                    <CgLogOut className='sm:size-[25px]'/>
                </button>

                {
                    keep_user_data.length !== 0
                    ? 
                    <div className=" md:flex hidden flex-row justify-between w-full border-0 ">  
                        <h1 className=" font-bold text-2xl scale-100">{keep_user_data[0].role === "superuser" ? "Admin" : keep_user_data[0].role === "admin" ? "Tagger" : "Reviewer"} {titleMenuProp_}</h1>

      
                        <div className="flex items-center space-x-4 scale-100 ">
                            <div className="my-picture-style w-10 h-10">
                                {/* <img alt="profile picture" src={p1} className="object-cover"/> */}


                                <LazyLoadImage 
                                    alt="profile picture" 
                                    src={keep_user_data[0].profile_picture !== null
                                        ? keep_user_data[0].profile_picture : Group}
                                    onLoad={e => {setIsImageLoaded(true)}}
                                    className={`object-cover ${!isImageLoaded ? "animate-pulse bg-gray-500 w-full h-full" : "flex"} `}
                                />

                            </div>
                            <h1 className="font-bold">{keep_user_data[0].username}</h1>
                        </div>

                    </div>
                    : <div className="animate-pulse flex sm:w-[200px] w-[50px] h-[50px] bg-gray-300 rounded-lg" />
                }
            </div>

            {keep_user_data.length !== 0
            ? 
                <div className=" sm:mx-0 mx-4 md:hidden w-full flex flex-col items-center border shadow">  
                    <h1 className=" font-bold sm:text-2xl text-xl scale-75 ">{keep_user_data[0].role === "superuser" ? "Admin" : keep_user_data[0].role === "admin" ? "Tagger" : "Reviewer"} {titleMenuProp_}</h1>

             
                    <div className="flex items-center space-x-4 scale-75">
                        <div className="my-picture-style w-10 h-10">
 
                            <LazyLoadImage 
                                alt="profile picture" 
                                src={keep_user_data[0].profile_picture !== null
                                    ? keep_user_data[0].profile_picture : Group}
                                onLoad={e => {setIsImageLoaded(true)}}
                                className={`object-cover ${!isImageLoaded ? "animate-pulse bg-gray-500 w-full h-full" : "flex"} `}
                            />

                        </div>
                        <h1 className="font-bold">{keep_user_data[0].username}</h1>
                    </div>
                </div>

            : <div className="animate-pulse flex sm:w-[400px] w-[100px] h-[50px] bg-gray-300 rounded-lg" />
            }


        </div>
    );
}
