import React from 'react';
import login_background from "../assets/images/login-background.webp";



export default function NOT_FOUND_404() {

  return (
    <div className='relative flex items-center h-screen w-screen'>
        <div className='absolute top-0 bottom-0 left-0 right-0 grid grid-cols-2 w-screen h-screen bg-white overflow-hidden'>
            <div className='bg-white'></div>

            <img src={login_background} className='flex object-cover h-screen w-screen'/>
        </div>



        <div className='flex flex-col md:scale-[85%] scale-90 absolute left-0 right-0  mx-auto justify-center items-center gap-y-4 font-medium bg-white p-4 rounded-2xl shadow border'>
          <h1 className='md:text-[70px] sm:text-[50px] text-[20px]'>THIS PAGE IS NOT FOUND</h1>
          <p>Ensure the url path is correct</p>
        </div>

    </div>
  );
}
