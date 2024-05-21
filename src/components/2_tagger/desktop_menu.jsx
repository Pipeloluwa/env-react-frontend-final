import { useNavigate } from "react-router-dom";
import emapping from "../../assets/images/emapping.png";
import { active } from "../../api/api_variables";

import { useEffect, useState } from "react";
import { handleDeleteCookie } from "../../api/delete_cookie";


export default function DesktopMenu (props) {
    const get_active= active[0];
    const [current_active, setCurrentActive] = useState(props.sendActive);


    const navigate= useNavigate();

    const navigateMenu = (menu_value) => {
        if (menu_value === "dashboard"){
            navigate("/tagger-management", {relative: true});
        }

        if (menu_value === "models"){
            navigate("/tagger-model-management", {relative: true});
        }

        if (menu_value === "logout"){
            handleDeleteCookie();
            navigate("/");
        }

        active[0]= menu_value;
        setCurrentActive(active[0])
    }


    return (
        <div className="h-screen lg:flex flex-col pb-8 pt-2 hidden bg-[#363636]">

            <img alt="logo" src={emapping} className="xl:scale-[65%] lg:scale-[75%] mx-auto"/>

            <div className="flex flex-col items-center justify-between h-full w-full mt-6 -ml-6">
                <div className="h-full flex w-full items-center justify-center py-4">
                    <div className="flex flex-col justify-between h-full  mt-6 ">
                        <div className="flex flex-col justify-center gap-y-4 w-[100px] "> 
                            <flex onClick={(e) => {navigateMenu("dashboard")}} className= " flex">
                                <label value= {"dashboard"} className={`${current_active === "dashboard" ? "font-medium border-2 border-green-300 " : "font-normal opacity-65 border-transparent border-2"} rounded-2xl hover:border-2 hover:border-yellow-300 cursor-pointer text-white p-[8px]`}>
                                Dashboard
                                </label>
                            </flex>

                            <flex onClick={(e) => {navigateMenu("models")}} className= " flex">
                                <label value= {"models"} className={`${current_active === "models" ? "font-medium border-2 border-green-300 " : "font-normal opacity-65 border-transparent border-2"} rounded-2xl hover:border-2 hover:border-yellow-300 cursor-pointer text-white p-[8px]`}>
                                Models
                                </label>
                            </flex>

                        </div>



                        <div onClick={(e) => {navigateMenu("logout")}} className="cursor-pointer text-white"> 
                            Sign out
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
